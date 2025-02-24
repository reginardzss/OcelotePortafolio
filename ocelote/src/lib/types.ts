// lib/types.ts
export type Project = {
    id: number;
    project_name: string;
    project_type: string;
    created: string;
    delivery_date: string;
    client: any;
  };

export type Client = {
    id: number;
    client_name: string;
    created_at: string;
  };

  