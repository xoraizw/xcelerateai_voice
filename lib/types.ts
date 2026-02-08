export interface Demo {
  id: string;
  name: string;
  prompt: string;
  publicId: string;
  apiKey?: string | null;
  vapiConfig?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDemoInput {
  name: string;
  prompt: string;
  apiKey?: string;
  vapiConfig?: string;
}
