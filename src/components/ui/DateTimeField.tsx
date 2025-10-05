import React from 'react';
import { Calendar, Clock } from 'lucide-react';

type BaseProps = {
  value?: string;
  onChange: (v: string) => void;
  name?: string;
  required?: boolean;
  className?: string;
};

export const DateField: React.FC<
  BaseProps & { min?: string; max?: string }
> = ({
  value = '',
  onChange,
  name = 'date',
  required = true,
  min,
  max,
  className = '',
}) => (
  <label className={`relative block ${className}`}>
    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
    <input
      type="date"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      min={min}
      max={max}
      className="w-full pl-11 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
    />
  </label>
);

export const TimeField: React.FC<BaseProps> = ({
  value = '',
  onChange,
  name = 'time',
  required = false,
  className = '',
}) => (
  <label className={`relative block ${className}`}>
    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
    <input
      type="time"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full pl-11 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
    />
  </label>
);
