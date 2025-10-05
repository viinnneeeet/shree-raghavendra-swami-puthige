import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Input } from './input';

interface UploadFileProps {
  state: string | unknown;
  accept: string;
  handleFile: (file: File | null) => void;
  handleRemove: () => void;
}

const UploadFile = ({
  state,
  accept,
  handleFile,
  handleRemove,
}: UploadFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // programmatically trigger file input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="text-center border-temple-gold/30 focus:ring-temple-gold">
      {state ? (
        <div className="relative aspect-square bg-muted w-full h-60">
          <img
            src={String(state) || ''}
            alt={'image'}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />{' '}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <Upload
            className="lg:w-12 lg:h-12 md:w-24 md:h-24 text-muted-foreground mx-auto mb-4 cursor-pointer "
            onClick={handleClick}
          />
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple={false} // optional: allow multiple files
            accept={accept}
          />
          <h3 className="lg:text-lg md:text-4xl font-semibold mb-2">
            Upload New Images
          </h3>
          <p className="text-muted-foreground mb-4 lg:text-base md:text-3xl">
            Drag and drop images here or click to browse your files
          </p>
        </>
      )}
    </div>
  );
};

export default UploadFile;
