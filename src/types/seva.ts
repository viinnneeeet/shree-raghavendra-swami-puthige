export interface SevaState {
  title: string;
  description: string;
  amount: string;
  duration: string;
  benefitsValue?: string;
  benefits: string[];
  category: string;
  availability: string;
  [key: string]: unknown;
}

export interface SevaPayload {
  id?: string | number;
  title: string;
  description: string;
  amount: string | number;
  duration: string;
  benefits: string[];
  category: string;
  availability: string;
  isActive?: boolean;
  // [key: string]: unknown;
}
