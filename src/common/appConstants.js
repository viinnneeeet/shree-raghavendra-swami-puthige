import { Heart, Users, Book, Star, Clock, MapPin } from 'lucide-react';

export const TEMPLE_NAME = 'Shree Raghavendra Swami Temple';

export const QUICK_LINKS = [
  {
    name: 'About Us',
    url: '/#about',
  },
  {
    name: 'Services',
    url: '/#services',
  },
  {
    name: 'Gallery',
    url: '/gallery',
  },
  {
    name: 'Donate',
    url: '/sevas-offerings',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
];

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/register-event', label: 'Register Event' },
  { href: '/visit-us', label: 'Visit Us' },
  { href: '/plan-visit', label: 'Plan Visit' },
  { href: '/sevas-offerings', label: 'Sevas & Offerings' },
  { href: '/events-calendar', label: 'Events Calendar' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/join-community', label: 'Join Community' },
];

export const EVENTS_DATA = [
  {
    date: '2024-03-15',
    title: 'Holi Celebration',
    type: 'Festival',
    time: '6:00 PM - 9:00 PM',
    location: 'Temple Courtyard',
    attendees: 200,
    description:
      'Colorful festival of joy and unity with traditional celebrations',
  },
  {
    date: '2024-03-20',
    title: 'Spring Equinox Meditation',
    type: 'Retreat',
    time: '5:30 AM - 7:30 AM',
    location: 'Sacred Garden',
    attendees: 50,
    description: 'Welcome spring with peaceful meditation and prayers',
  },
  {
    date: '2024-04-02',
    title: 'Hanuman Jayanti',
    type: 'Festival',
    time: '6:00 AM - 8:00 PM',
    location: 'Main Temple',
    attendees: 500,
    description: 'Celebrate the birth of Lord Hanuman with special prayers',
  },
  {
    date: '2024-04-10',
    title: 'Ram Navami',
    type: 'Festival',
    time: '6:00 AM - 9:00 PM',
    location: 'Main Temple',
    attendees: 800,
    description: "Nine-day celebration of Lord Rama's birth",
  },
  {
    date: '2024-04-15',
    title: 'Community Service Day',
    type: 'Service',
    time: '9:00 AM - 4:00 PM',
    location: 'Various Locations',
    attendees: 100,
    description: 'Serve the community with food distribution and help',
  },
  {
    date: '2024-05-01',
    title: 'Akshaya Tritiya',
    type: 'Festival',
    time: '6:00 AM - 12:00 PM',
    location: 'Main Temple',
    attendees: 300,
    description: 'Auspicious day for new beginnings and prayers',
  },
  {
    date: '2024-08-19',
    title: 'Krishna Janmashtami',
    type: 'Festival',
    time: '7:00 PM - 12:00 AM',
    location: 'Main Hall & Courtyard',
    attendees: 1000,
    description:
      'Night-long celebration of Lord Krishna’s birth with bhajans, plays, and dahi-handi',
  },
  {
    date: '2024-09-07',
    title: 'Ganesh Chaturthi',
    type: 'Festival',
    time: '6:00 AM - 10:00 PM',
    location: 'Main Temple & Streets',
    attendees: 1500,
    description:
      'Welcoming Lord Ganesha with idol installation, aartis, and cultural programs',
  },
  {
    date: '2025-10-02',
    title: 'Mahatma Gandhi Jayanti & Special Bhajans',
    type: 'Festival',
    time: '6:00 AM - 12:00 PM',
    location: 'Main Temple',
    attendees: 400,
    description:
      'Prayer meeting and bhajan sessions in honor of Mahatma Gandhi.',
  },
  {
    date: '2025-10-12',
    title: 'Navaratri Starts',
    type: 'Festival',
    time: '6:00 AM - 9:00 PM',
    location: 'Temple Courtyard',
    attendees: 800,
    description:
      'Nine nights of devotion with daily pooja, bhajans, and cultural activities.',
  },
  {
    date: '2024-10-31',
    title: 'Diwali Deepotsav',
    type: 'Festival',
    time: '6:00 PM - 10:00 PM',
    location: 'Entire Temple Complex',
    attendees: 2000,
    description:
      'Festival of Lights with diya lighting, Lakshmi puja, and cultural shows',
  },
  {
    date: '2025-11-01',
    title: 'Kannada Rajyotsava',
    type: 'Festival',
    time: '7:00 AM - 1:00 PM',
    location: 'Main Temple',
    attendees: 500,
    description:
      'Celebrating Karnataka Formation Day with cultural programs and prayers.',
  },
  {
    date: '2025-11-14',
    title: 'Children’s Day Celebration',
    type: 'Community',
    time: '10:00 AM - 4:00 PM',
    location: 'Community Hall',
    attendees: 300,
    description: 'Fun events, games, and cultural performances by kids.',
  },

  {
    date: '2024-11-14',
    title: 'Kartik Purnima Ganga Aarti',
    type: 'Ritual',
    time: '5:30 PM - 8:00 PM',
    location: 'Temple Riverbank',
    attendees: 700,
    description:
      'Sacred aarti on the holy river with lamps and prayers on Kartik Purnima',
  },
  {
    date: '2024-12-25',
    title: 'Annadana Seva',
    type: 'Service',
    time: '12:00 PM - 3:00 PM',
    location: 'Community Hall',
    attendees: 400,
    description: 'Free food distribution to devotees and the underprivileged',
  },
  {
    date: '2025-01-14',
    title: 'Makar Sankranti & Kite Festival',
    type: 'Festival',
    time: '8:00 AM - 6:00 PM',
    location: 'Temple Grounds',
    attendees: 900,
    description:
      'Harvest festival with prayers, kite flying, and prasada distribution',
  },
  {
    date: '2025-01-26',
    title: 'Republic Day Flag Hoisting & Bhajan Sandhya',
    type: 'Cultural',
    time: '8:00 AM - 10:00 AM & 6:00 PM - 9:00 PM',
    location: 'Temple Courtyard',
    attendees: 500,
    description:
      'Patriotic flag hoisting ceremony in the morning followed by devotional songs in the evening',
  },
  {
    date: '2025-02-26',
    title: 'Maha Shivaratri',
    type: 'Festival',
    time: '6:00 PM - 6:00 AM (next day)',
    location: 'Shiva Shrine',
    attendees: 1200,
    description:
      'All-night vigil, chanting, and special abhishekam for Lord Shiva',
  },
];

export const COMMUNITY_BENEFITS = [
  {
    icon: Heart,
    title: 'Spiritual Growth',
    description: 'Regular prayers, meditation, and spiritual guidance',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Strong network of like-minded spiritual seekers',
  },
  {
    icon: Book,
    title: 'Learning Opportunities',
    description: 'Educational programs on scriptures and traditions',
  },
  {
    icon: Star,
    title: 'Service Opportunities',
    description: 'Participate in community service and temple activities',
  },
];

export const TEMPLE_HISTORY = [
  {
    year: '1985',
    event: 'Temple Foundation',
    description: 'Established by devoted spiritual seekers',
  },
  {
    year: '1990',
    event: 'First Major Festival',
    description: 'Celebrated first grand Raghavendra Jayanti',
  },
  {
    year: '2000',
    event: 'Community Expansion',
    description: 'Built community hall and education center',
  },
  {
    year: '2015',
    event: 'Digital Outreach',
    description: 'Launched online services and virtual programs',
  },
];

export const SPIRITUAL_CARDS = [
  {
    icon: '🏛️',
    title: 'Ancient Wisdom',
    description:
      'Preserving timeless teachings and spiritual practices passed down through generations of devoted practitioners.',
  },
  {
    icon: '🧘',
    title: 'Inner Peace',
    description:
      'Offering prayer, and contemplative practices to nurture spiritual growth and inner tranquility.',
  },
  {
    icon: '🤝',
    title: 'Community Unity',
    description:
      'Building bridges of understanding and compassion among all peoples, fostering a spirit of universal brotherhood.',
  },
];
