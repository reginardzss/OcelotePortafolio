import AWS from "aws-sdk";

//Credenciales AWS  
const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,

});

//Funcion para subir archivos a S3
export async function uploadFileToS3(file:File, path: string): Promise<string> {
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: path,
        Body: file,
        ContentType: file.type,    };
    try{
        const result = await s3.upload(params).promise();
        const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${path}`;
        return fileUrl;

    } catch (error) {
        console.error("Error uploading to S3", error);
        throw error;
    }
}