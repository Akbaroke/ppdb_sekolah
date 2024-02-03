import * as React from 'react';
import { Loader } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';

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
    console.log(file.type);
    console.log(file.name);

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
      <label htmlFor={id} className="text-[14px]">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <p className="text-gray-400 text-[14px] mb-1">{placeholder}</p>
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
          className="border border-two border-dashed rounded-[10px] min-h-[90px] hover:bg-transparent cursor-default">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] italic font-medium">{fileName}</p>
            {blob && (
              <img
                src={blob}
                alt="tes"
                width={100}
                height={100}
                className="w-max h-[200px] object-cover rounded-md shadow-xl"
              />
            )}
          </div>
        </Dropzone>
        {value ? (
          <button
            className="text-[14px] px-4 py-[2px] border rounded-md w-max border-black absolute right-5 bottom-5 font-semibold"
            type="button"
            onClick={() => openRef.current && openRef.current()}>
            Ganti File
          </button>
        ) : (
          <button
            className="text-[14px] px-4 py-[2px] border rounded-md w-max bg-green_primary  text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium"
            type="button"
            onClick={() => openRef.current && openRef.current()}>
            Pilih File
          </button>
        )}
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
