import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/types/formField';

interface FormFieldsProps<T extends Record<string, unknown>> {
  fields: FormField[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  handleCheckboxChange?: (
    id: keyof T,
    option: string,
    checked: boolean
  ) => void;
  wrapperClass: string;
}

export function FormFields<T extends Record<string, unknown>>({
  fields,
  formData,
  setFormData,
  handleCheckboxChange,
  wrapperClass,
}: FormFieldsProps<T>) {
  return (
    <div className={wrapperClass}>
      {fields.map((field) => {
        switch (field.type) {
          case 'input':
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required ? (
                    <span className="text-red-700">*</span>
                  ) : null}
                </Label>
                <Input
                  id={field.id}
                  type={field.inputType || 'text'}
                  required={field.required}
                  value={(formData[field.id as keyof T] as string) || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  className="border-temple-gold/30 focus:ring-temple-gold"
                />
              </div>
            );

          case 'textarea':
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required ? (
                    <span className="text-red-700">*</span>
                  ) : null}
                </Label>
                <Textarea
                  id={field.id}
                  value={(formData[field.id as keyof T] as string) || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  placeholder={field.placeholder}
                  className="border-temple-gold/30 focus:ring-temple-gold"
                />
              </div>
            );

          case 'checkbox-group':
            return (
              <div key={field.id} className="space-y-2">
                <Label>
                  {field.label}
                  {field.required ? (
                    <span className="text-red-700">*</span>
                  ) : null}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {field.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${field.id}-${option}`}
                        checked={(
                          (formData[field.id as keyof T] as string[]) || []
                        ).includes(option)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange?.(
                            field.id as keyof T,
                            option,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`${field.id}-${option}`}
                        className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'select':
            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required ? (
                    <span className="text-red-700">*</span>
                  ) : null}
                </Label>
                <Select
                  value={(formData[field.id as keyof T] as string) || ''}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.id]: value,
                    }))
                  }>
                  <SelectTrigger className="border-temple-gold/30">
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field?.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
