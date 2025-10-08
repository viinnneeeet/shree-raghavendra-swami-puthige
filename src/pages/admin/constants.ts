import { FormField } from '@/types/formField';
import { BadgeProps } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';

export const galleryFields: FormField[] = [
  {
    id: 'src',
    type: 'file',
    label: 'Image URL',
    placeholder: 'Enter image URL or select file',
    required: true,
    accept: '.jpg,.jpeg,.png,.gif,.webp',
    name: 'image_url',
  },
  {
    id: 'title',
    type: 'input',
    label: 'Title',
    placeholder: 'Enter title',
    required: true,
  },
  {
    id: 'category',
    type: 'select',
    label: 'Category',
    placeholder: 'Enter category (e.g., Spiritual)',
    required: true,
    options: [
      { value: 'all', label: 'All Categories' },
      { label: 'Spiritual', value: 'spiritual' },
      { label: 'Festivals', value: 'festival' },
      { label: 'Service', value: 'service' },
      { label: 'Temple', value: 'temple' },
      { label: 'Education', value: 'education' },
      { label: 'Ritual', value: 'ritual' },
      { label: 'Ceremony', value: 'ceremony' },
      { label: 'Community Gathering', value: 'community' },
      { label: 'Temple Event', value: 'temple-event' },
    ],
  },
  {
    id: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter description',
    required: false,
    row: 5,
  },
];

export const eventFields: FormField[] = [
  {
    id: 'title',
    type: 'input',
    label: 'Title',
    placeholder: 'Enter event title',
    required: true,
    className: '',
  },
  {
    id: 'type',
    type: 'select',
    label: 'Event Type',
    placeholder: 'Select event type',
    required: true,
    options: [
      { value: 'festival', label: 'Festival' },
      { value: 'ritual', label: 'Ritual' },
      { value: 'ceremony', label: 'Ceremony' },
      { value: 'community', label: 'Community Gathering' },
      { value: 'temple', label: 'Temple Event' },
    ],
    className: '',
  },
  {
    id: 'date',
    type: 'date',
    label: 'Event Date',
    placeholder: 'Select event date',
    required: true,
  },
  {
    id: 'time',
    type: 'time',
    label: 'Event Time',
    placeholder: 'Select event time',
    required: true,
  },
  {
    id: 'location',
    type: 'input',
    label: 'Location',
    placeholder: 'Enter event location',
    required: true,
  },
  {
    id: 'participants',
    type: 'input',
    label: 'Participants',
    placeholder: 'Enter expected participants',
    required: true,
  },
  {
    id: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter detailed description',
    required: true,
    row: 5,
  },
  {
    id: 'src',
    type: 'file',
    label: 'Event Image',
    placeholder: 'Upload event image or select from files',
    required: true,
    accept: '.jpg,.jpeg,.png,.webp',
    name: 'image_url',
  },
  {
    id: 'status',
    type: 'select',
    label: 'Event Status',
    placeholder: 'Select event type',
    required: true,
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'upcoming', label: 'Upcoming' },
    ],
    className: '',
  },
];

export const sevaFields: FormField[] = [
  {
    id: 'title',
    label: 'Title',
    type: 'input',
    placeholder: 'Enter title',
    required: true,
  },
  {
    id: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter description',
    required: true,
  },
  {
    id: 'amount',
    label: 'Amount',
    type: 'input',
    placeholder: 'Enter amount',
    required: true,
    isNumberAllowed: true,
  },
  {
    id: 'duration',
    label: 'Duration',
    type: 'select',
    placeholder: 'Select duration (e.g., 3 months)',
    required: true,
    options: [
      { label: 'One Day', value: 'One Day' },
      { label: 'Daily', value: 'Daily' },
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Half-Yearly', value: 'Half Yearly' },
      { label: 'Yearly', value: 'Yearly' },
      { label: 'Lifetime', value: 'Lifetime' },
    ],
  },
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'Select category',
    options: [
      { label: 'Basic', value: 'basic' },
      { label: 'Premium', value: 'premium' },
      { label: 'Exclusive', value: 'exclusive' },
      { label: 'Pooja', value: 'pooja' },
      { label: 'Maintenance', value: 'maintenance' },
      { label: 'Decoration', value: 'decoration' },
      { label: 'Annadana', value: 'annadana' },
    ], // sample values
    required: true,
  },
  {
    id: 'availability',
    label: 'Availability',
    type: 'select',
    placeholder: 'Select availability',
    options: [
      { label: 'Available', value: 'available' },
      { label: 'Unavailable', value: 'unavailable' },
      { label: 'Upcoming', value: 'upcoming' },
    ],
  },
  {
    id: 'benefitsValue',
    label: 'Benefits Value',
    type: 'textarea',
    placeholder: 'Enter value or perks summary',
  },
];

export type BadgeConfig = {
  label: string;
  variant?: BadgeProps['variant'];
  className?: string;
};

export const BADGE_MAP: Record<string, BadgeConfig> = {
  upcoming: {
    label: 'Upcoming',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  completed: {
    label: 'Completed',
    className:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
};

export const CATEGORY_MAP: Record<string, BadgeConfig> = {
  pooja: {
    label: 'Pooja',
    variant: 'outline',
    className: 'text-purple-600 border-purple-200',
  },
  festival: {
    label: 'Festival',
    variant: 'outline',
    className: 'text-orange-600 border-orange-200',
  },
  community: {
    label: 'Community',
    variant: 'outline',
    className: 'text-green-600 border-green-200',
  },
  education: {
    label: 'Education',
    variant: 'outline',
    className: 'text-blue-600 border-blue-200',
  },
};
