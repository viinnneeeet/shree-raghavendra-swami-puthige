export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  interests: string[];
  availability?: string;
  message?: string;
  [key: string]: unknown;
}
