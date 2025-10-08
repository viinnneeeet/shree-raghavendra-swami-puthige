// src/data/volunteerFormFields.ts
import { FormField } from '@/types/formField';

export const volunteerFormFields: FormField[] = [
  {
    id: 'name',
    type: 'input',
    label: 'Full Name',
    inputType: 'text',
    required: true,
    placeholder: 'Enter your full name',
  },
  {
    id: 'email',
    type: 'input',
    label: 'Email Address',
    inputType: 'email',
    required: true,
    placeholder: 'yourname@example.com',
  },
  {
    id: 'phone',
    type: 'input',
    label: 'Phone Number',
    inputType: 'tel',
    required: true,
    placeholder: '9876543210',
  },
  {
    id: 'address',
    type: 'textarea',
    label: 'Address',
    placeholder: 'Your full address',
    required: true,
  },
  {
    id: 'interests',
    type: 'checkbox-group',
    label: 'Areas of Interest (Select all that apply)',
    required: true,
    options: [
      'Pooja Seva',
      'Cultural Programs',
      'Community Service',
      'Event Management',
      'Fundraising',
      'Temple Maintenance',
    ],
  },
  {
    id: 'availability',
    type: 'select',
    label: 'Availability',
    required: true,
    options: [
      { label: 'Weekdays', value: 'weekdays' },
      { label: 'Weekends Only', value: 'weekends' },
      { label: 'Evenings After Work', value: 'evenings' },
      { label: 'Flexible Schedule', value: 'flexible' },
      { label: 'Festivals & Special Events', value: 'festivals' },
    ],
  },
  {
    id: 'message',
    type: 'textarea',
    label: 'Why do you want to join our community?',
    placeholder: 'Share your spiritual journey and motivations...',
    row: 6,
  },
];

export const eventFormFields = (
  eventsOptions: { label: string; value: string }[]
): FormField[] => [
  {
    id: 'name',
    type: 'input',
    label: 'Full Name',
    inputType: 'text',
    required: true,
    placeholder: 'Enter your full name',
  },
  {
    id: 'email',
    type: 'input',
    label: 'Email Address',
    inputType: 'email',
    required: true,
    placeholder: 'yourname@example.com',
  },
  {
    id: 'phone',
    type: 'input',
    label: 'Phone Number',
    inputType: 'tel',
    required: true,
    placeholder: 'Enter your phone number',
  },
  {
    id: 'event',
    type: 'select',
    label: 'Select Event',
    required: true,
    placeholder: 'Choose an event',
    options: eventsOptions,
  },
  {
    id: 'message',
    type: 'textarea',
    label: 'Special Requirements (Optional)',
    placeholder:
      'Any dietary restrictions, accessibility needs, or special requests...',
    required: false,
    row: 5,
  },
];

export const donationFormFields: FormField[] = [
  {
    id: 'fullName',
    type: 'input',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'email',
    type: 'input',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    id: 'phone',
    type: 'input',
    label: 'Mobile Number',
    placeholder: 'Enter your mobile number',
    required: true,
    inputType: 'tel',
    pattern: '[0-9]{10}',
    isNumberAllowed: true,
    allowDecimal: false,
  },
  {
    id: 'seva',
    type: 'input',
    label: 'Select Seva',
    placeholder: 'Choose a seva',
    required: true,
    isDisabled: true,
  },
  {
    id: 'amount',
    type: 'input',
    label: 'Donation Amount (₹)',
    placeholder: 'Enter donation amount',
    required: true,
    inputType: 'numeric',
    isDisabled: true,
    isNumberAllowed: true,
    allowDecimal: false,
  },
  {
    id: 'notes',
    type: 'textarea',
    label: 'Additional Notes',
    placeholder: 'Any specific requests or details',
    required: false,
    row: 4,
  },
];
