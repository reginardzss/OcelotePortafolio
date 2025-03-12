//Funcion para subir archivos a S3
export async function uploadFileToS3(file:File, folder: string): Promise<string> {
    try{
        //Pedir la url pre-firmada desde la API
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
                folder,
            }),
        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.error || "Error generating upload URL");

        //Subir el archivo a s3 usando la url pre-firmada
        const uploadResponse = await fetch(data.uploadUrl, {
            method: "PUT",
            body: file,
            headers: {"Content-Type": file.type},
        });

        if(!uploadResponse.ok) throw new Error ("Error uploading file to s3");

        console.log("Archivo subido correctamente:", data.fileURL);
        return data.fileURL; //url en s3

    } catch (error) {
        console.error("Error uploading to S3", error);
        throw error;
    }
}