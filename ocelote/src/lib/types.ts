export type Asset = {
  id?: number; // Opcional porque al subir aún no existe en la BD
  url_media?: string;
  media_type?: "photo" | "video";
  media_use: string | "cover" | "media"; // "cover" para portada, "media" para el resto de los archivos
  project_id?: number;
  file?: File; // Se usa solo en frontend antes de subir el archivo
};

export type Project = {
  id: number;
  project_name: string;
  project_type: "comercial" | "films" | "photo";
  created: string;
  delivery_date: string;
  client_name?: string;
  client?: { client_name: string } | null; // Relación con los clientes
  image_url?: string;
  assets?: Asset[]; // Relación con los assets
};

export type Client = {
  id: number;
  client_name: string;
  created_at: string;
};

export type UploadProjectData = {
  project_name: string;
  project_type: "comercial" | "films" | "photo";
  delivery_date: string;
  client_name: string;
  isNewClient: boolean;
};

export type UploadAsset = {
  file: File;
  media_use: "cover" | "media";
};

