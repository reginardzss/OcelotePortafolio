//Solo los admin pueden generar URLs de subida
//AWS no recibe credenciales en el frontend solo URLs firmadas
//Los archivos solo se pueden subir si el backend lo aprueba

//import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//Acceso a AWS S3
const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest){
    try{
        //Autenticacion con supabase
        const supabase = createServerComponentClient({cookies});
        const {data: {user}} = await supabase.auth.getUser();

        if(!user){
            return NextResponse.json({error: "unautharized"}, {status: 401});
        }

        //verificar si el usuario es admin
        const {data, error} = await supabase
            .from("admin_users")
            .select("id")
            .eq("user_id", user.id)
            .single();

        if(error || !data){
            return NextResponse.json ({error: "Access Denied"}, {status: 403});
        }

        //Extraer datos al frontend
        const {fileName, fileType, folder} = await req.json();

        if (!fileName || !fileType || !folder) {
            return NextResponse.json({error: "Missing parameters"}, {status: 400});
        }

        //generar URL firmada para subida
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${folder}/${fileName}`,
            ContentType: fileType,
            //Expires: 60, //expira en 60 segundos
            //ACL: "private", // Solo accesible desde tu backend
        };

        const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(params), {expiresIn: 60});

        return NextResponse.json({uploadUrl, fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`});
    } catch (error) {
        console.error("Error generating s3 upload URL: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

/* export default async function handler(req: NextApiRequest, res:NextApiResponse){
    //Si no es metodo POST regresar error
    if(req.method != "POST"){
        return res.status(405).json({error: "Method Not Allowed"});
    }

    try{
        //Obtener el archivo desde el request
        const{fileName, fileType, folder} = req.body; 
        if(!fileName || !fileType || !folder){
            return res.status(400).json({error: "Missing parameters"})
        }

        //Generar los parametros para la subida
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${folder}/${fileName}`,
            ContentType: fileType,
            ACL: "private", // Solo accesible desde tu backend
        };

        //URL pre-firmada para la subida
        const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
        res.status(200).json({uploadUrl, fileURL: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`});
    } catch(error) {
        console.error("Error generating s3 upload URL: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}*/