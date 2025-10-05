export interface GalleryDetails {
  src: File | null;
  title: string;
  category: string;
  description: string;
  image_url: string;
  [key: string]: unknown;
}

export interface GalleryPayload {
  title: string;
  description: string;
  image_url: string;
  category: string;
}
