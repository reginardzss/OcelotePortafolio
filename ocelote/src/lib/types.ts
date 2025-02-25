export type Asset = {
  id: number;
  media_type: string;
  url_media: string;
};

export type Project = {
  id: number;
  project_name: string;
  project_type?: string;
  created?: string;
  delivery_date: string;
  client_name?: any;
  client: any;
  image_url?: string;
  assets?: Asset[]; // 🔹 Relación con los assets
};
