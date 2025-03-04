export type Asset = {
  id: number;
  media_type: string;
  url_media: string;
  created_at: string;
  project_id: number;
  media_use: "media" | "cover"; // Asegurar que solo pueda ser "media" o "cover"
};

export type Project = {
  id: number;
  project_name: string;
  project_type: string;
  created: string;
  delivery_date: string;
  client_name?: string; // Propiedad opcional
  client?: { client_name: string } | null; 
  image_url?: string;
  assets?: Asset[]; // 🔹 Relación con los assets
};
