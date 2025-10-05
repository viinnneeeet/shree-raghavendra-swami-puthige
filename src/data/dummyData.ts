import { Member, ContactSubmission, Seva } from '@/types/admin';

export const dummyMembers: Member[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@gmail.com',
    phone: '+91 9876543210',
    interest: 'Devotional Activities',
    joinedDate: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 9876543211',
    interest: 'Cultural Events',
    joinedDate: '2024-02-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'Arjun Patel',
    email: 'arjun.patel@gmail.com',
    phone: '+91 9876543212',
    interest: 'Community Service',
    joinedDate: '2024-03-10',
    status: 'active',
  },
  {
    id: '4',
    name: 'Meera Iyer',
    email: 'meera.iyer@gmail.com',
    phone: '+91 9876543213',
    interest: 'Spiritual Learning',
    joinedDate: '2024-01-25',
    status: 'inactive',
  },
];

export const dummyContactSubmissions: ContactSubmission[] = [
  {
    id: '1',
    name: 'Sita Reddy',
    email: 'sita.reddy@gmail.com',
    phone: '+91 9876543220',
    subject: 'Inquiry about Wedding Ceremony',
    message:
      "I would like to book the temple for my daughter's wedding ceremony in March. Could you please provide details about the booking process and charges?",
    submittedAt: '2024-01-20T10:30:00Z',
    status: 'new',
  },
  {
    id: '2',
    name: 'Rahul Nair',
    email: 'rahul.nair@gmail.com',
    subject: 'Volunteering Opportunity',
    message:
      'I am interested in volunteering for temple activities and events. Please let me know how I can contribute to the community.',
    submittedAt: '2024-01-18T14:15:00Z',
    status: 'in-progress',
  },
  {
    id: '3',
    name: 'Lakshmi Rao',
    email: 'lakshmi.rao@gmail.com',
    phone: '+91 9876543221',
    subject: 'Pooja Booking',
    message:
      "I want to book a special pooja for my family's well-being. Please provide available dates and pricing.",
    submittedAt: '2024-01-15T09:00:00Z',
    status: 'resolved',
  },
];

export const dummySevas: Seva[] = [
  {
    id: '1',
    name: 'Annadana (Free Meal Service)',
    description:
      'Sponsor meals for devotees and the needy. Feeds approximately 100 people.',
    amount: 5000,
    category: 'annadana',
    availability: 'available',
  },
  {
    id: '2',
    name: 'Daily Pooja Sponsorship',
    description:
      'Sponsor the daily morning and evening poojas with special prayers for your family.',
    amount: 1500,
    category: 'pooja',
    availability: 'available',
  },
  {
    id: '3',
    name: 'Temple Flower Decoration',
    description:
      'Beautiful flower decorations for the deity and temple premises.',
    amount: 2500,
    category: 'decoration',
    availability: 'limited',
  },
  {
    id: '4',
    name: 'Temple Maintenance Fund',
    description:
      'Contribute towards temple upkeep, repairs, and facility improvements.',
    amount: 10000,
    category: 'maintenance',
    availability: 'available',
  },
  {
    id: '5',
    name: 'Special Festival Celebration',
    description:
      'Sponsor major festivals like Guru Raghavendra Aradhana with complete arrangements.',
    amount: 25000,
    category: 'pooja',
    availability: 'limited',
  },
];
