export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  category: 'pooja' | 'festival' | 'community' | 'education';
  status: 'upcoming' | 'completed' | 'cancelled';
  participants?: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'in-progress' | 'resolved';
}

export interface Seva {
  id: string;
  name: string;
  description: string;
  amount: number;
  category: 'pooja' | 'annadana' | 'decoration' | 'maintenance';
  availability: 'available' | 'limited' | 'unavailable';
  image?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: 'festivals' | 'rituals' | 'temple' | 'community';
  uploadedAt: string;
  description?: string;
}
