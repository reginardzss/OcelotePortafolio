import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },  
});

export async function POST(req: NextRequest){
    try{
        console.log("📩 Recibiendo solicitud de subida...");
        // Obtener el cliente de Supabase
        const supabase = await createClient();

        const { data: authData, error: authError } = await supabase.auth.getUser();

        if(authError || !authData.user){
            console.error("⛔ Usuario no autenticado:", authError);
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = authData.user;
        console.log("✅ Usuario autenticado:", user.email);
        

        //Verificar si es admin
        const { data: adminData, error: adminError } = await supabase
            .from("admin_users")
            .select("role")
            .eq("user_id", user.id)
            .single();

            if (adminError || !adminData || adminData.role !== "admin") {
                console.error("❌ Acceso denegado: usuario no es admin", adminError);
                return NextResponse.json({ error: "Access Denied" }, { status: 403 });
            }

        // Obtener datos de la solicitud
        const { fileName, fileType, folder } = await req.json();

        if (!fileName || !fileType || !folder) {
            console.error("🚨 Faltan parámetros en la solicitud");
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        console.log("📂 Subiendo archivo:", fileName, "a la carpeta:", folder);

        // Configurar parámetros para AWS S3
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${folder}/${fileName}`,
            ContentType: fileType,
        };

        // Generar URL firmada
        const command = new PutObjectCommand(params);
        const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

        console.log("✅ URL firmada generada correctamente");

        return NextResponse.json({
            uploadUrl,
            fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`,
        });

    } catch (error) {
        console.error("❌ Error en la generación de URL firmada:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}