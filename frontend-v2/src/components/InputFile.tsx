import { ActionIcon, FileInput } from '@mantine/core';
import convertUrlToFile from '../utils/convertUrlToFile';
import { useEffect, useState } from 'react';
import ButtonViewUrl from './ButtonViewUrl';
import { IconEye } from '@tabler/icons-react';

type Props = {
  label: string;
  description: string;
  placeholder: string;
  value: File | string;
  error: string;
  onChange: (e: File | string) => void;
  accept: Accept[];
  disabled?: boolean;
  readOnly?: boolean;
  setError: (e: string) => void;
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
  disabled,
  readOnly,
  setError,
}: Props) {
  const [inputValue, setInputValue] = useState<File | null>();
  const [imgUrl, setImgUrl] = useState<string>('');
  const [showType, setShowType] = useState<'image' | 'pdf' | null>(null);

  const isFileSizeValid = (file: File) => file?.size < 1000000;

  const valueValidate = async (value: string | File): Promise<File> => {
    if (typeof value === 'string') {
      setImgUrl(value);
      const file = await convertUrlToFile(value);
      const fileFormat = file.type.split('/')[1];
      const finalFile = new File(
        [file],
        `${label.toLowerCase().replace(' ', '-')}.${fileFormat}`,
        { type: file.type }
      );
      checkFileType(finalFile);
      return finalFile;
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
      setInputValue(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    inputValue
      ? isFileSizeValid(inputValue as File)
        ? setError('')
        : setError('File tidak boleh melebihi 1MB')
      : setError('Wajib diisi');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleOnChange = (e: File) => {
    setInputValue(e);
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
        disabled={disabled}
        readOnly={readOnly}
      />
      {isShowButtonView && (
        <ButtonViewUrl
          className="mb-[2px]"
          url={imgUrl}
          title={label}
          type={showType}>
          <ActionIcon variant="light" aria-label="Settings" size="lg">
            <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </ButtonViewUrl>
      )}
    </div>
  );
}
