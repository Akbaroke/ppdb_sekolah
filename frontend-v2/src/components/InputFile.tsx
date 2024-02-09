import { FileInput } from '@mantine/core';
import convertUrlToFile from '../utils/convertUrlToFile';
import { useEffect, useState } from 'react';
import ButtonViewUrl from './ButtonViewUrl';

type Props = {
  label: string;
  description: string;
  placeholder: string;
  value: File | string;
  error: string;
  onChange: (e: File | string) => void;
  accept: Accept[];
};

type Accept = 'application/pdf' | 'image/png' | 'image/jpeg';

export default function InputFile({
  label,
  description,
  placeholder,
  value,
  error,
  onChange,
  accept,
}: Props) {
  const [inputValue, setinputValue] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [showType, setShowType] = useState<'image' | 'pdf' | null>(null);

  const valueValidate = async (value: string | File): Promise<File> => {
    if (typeof value === 'string') {
      setImgUrl(value);
      const file = await convertUrlToFile(value);
      checkFileType(file);
      return file;
    } else {
      checkFileType(value);
      setImgUrl(URL.createObjectURL(value));
      return value;
    }
  };

  const checkFileType = (value: File) => {
    if (value.type === 'application/pdf') {
      setShowType('pdf');
    } else {
      setShowType('image');
    }
  };

  useEffect(() => {
    if (!value) return;
    valueValidate(value).then((file) => {
      setinputValue(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleOnChange = (e: File) => {
    setinputValue(e);
    onChange(e);
  };

  const isShowButtonView = !error && inputValue !== null && value !== '';

  return (
    <div className="flex items-end gap-2 w-full">
      <FileInput
        label={label}
        description={description}
        placeholder={placeholder}
        required
        value={inputValue}
        error={error}
        onChange={(e) => handleOnChange(e as File)}
        clearable
        accept={accept.join(',')}
        className="w-full flex-1"
      />
      {isShowButtonView && (
        <ButtonViewUrl
          className="mb-[2px]"
          url={imgUrl}
          title={label}
          type={showType}
        />
      )}
    </div>
  );
}
