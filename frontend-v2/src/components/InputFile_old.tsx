import * as React from 'react';
import { Button, Loader } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import cn from '../utils/cn';

interface InputProps {
  label: string;
  id: string;
  value: string;
  errorLabel?: string;
  readOnly?: boolean;
  isLoading?: boolean;
  onChange: (e: FileWithPath | string) => void;
  required?: boolean;
  placeholder?: string;
  isDisablePdf?: boolean;
  isDisableImage?: boolean;
}

const InputFile: React.FC<InputProps> = ({
  label,
  id,
  value,
  errorLabel,
  isLoading,
  onChange,
  required,
  placeholder,
  isDisablePdf,
  isDisableImage,
}) => {
  const openRef = React.useRef<() => void>(null);
  const [error, setError] = React.useState('');
  const [blob, setBlob] = React.useState<string>(value);
  const [fileName, setFileName] = React.useState<string>(value);

  const handleDrop = (e: FileWithPath[]) => {
    const file = e[0];

    if (file.size > 1000000) {
      setError('File tidak boleh melebihi 1MB');
      onChange('');
      setFileName('');
      setBlob('');
    } else {
      setFileName(file.name);
      if (file.type !== 'application/pdf') {
        setBlob(URL.createObjectURL(file));
      } else {
        setBlob('');
      }
      onChange(file);
      setError('');
    }
  };

  return (
    <div className="flex flex-col my-2 relative">
      <label htmlFor={id} className="text-[14px] font-medium">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <p className="text-gray-400 text-[12px] mb-1">{placeholder}</p>
      <div className="relative">
        <Dropzone
          p={15}
          openRef={openRef}
          accept={
            isDisableImage
              ? [MIME_TYPES.pdf]
              : isDisablePdf
              ? [MIME_TYPES.png, MIME_TYPES.jpeg]
              : [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf]
          }
          onDrop={handleDrop}
          activateOnClick={false}
          onErrorCapture={() => console.log('File tidak boleh melebihi 1MB')}
          className={cn(
            'border border-two border-dashed border-gray-300 rounded-sm min-h-[90px] hover:bg-transparent cursor-default',
            !value
              ? 'grid place-items-center'
              : '[&>div]:flex [&>div]:flex-col [&>div]:gap-4'
          )}>
          {!value ? (
            <Button
              variant="filled"
              size="xs"
              onClick={() => openRef.current && openRef.current()}>
              Pilih File
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-[14px] italic font-medium">{fileName}</p>
              {blob && (
                <img
                  src={blob}
                  alt="tes"
                  width={100}
                  height={100}
                  className="w-max h-[150px] sm:h-[200px] object-cover rounded-md shadow-xl"
                />
              )}
            </div>
          )}
          {value && (
            <Button
              variant="default"
              className="ml-auto"
              size="xs"
              onClick={() => openRef.current && openRef.current()}>
              Ganti File
            </Button>
          )}
        </Dropzone>
      </div>

      {errorLabel || error ? (
        <p className="text-red-500 text-[12px]">{errorLabel || error}</p>
      ) : null}
      {isLoading ? (
        <Loader color="gray" size="xs" className="absolute bottom-2 right-3" />
      ) : null}
    </div>
  );
};

export default InputFile;
