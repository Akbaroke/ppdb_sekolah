import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, NumberInput, TextInput } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';

type Props = {
  close: () => void;
};

type FormType = {
  title: string;
  biaya: number;
};

export default function FormListBiayaDUKK({ close }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      title: '',
      biaya: 0,
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : 'Wajib diisi'),
      biaya: (value) => (value !== 0 ? null : 'Wajib diisi'),
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    form.reset();
    close();
    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Title"
        placeholder="Title Biaya"
        withAsterisk
        value={form.values.title}
        error={form.errors.title as string}
        onChange={(e) => form.setFieldValue('title', e.currentTarget.value)}
        readOnly={isLoading}
      />
      <NumberInput
        withAsterisk
        label="Biaya"
        placeholder="Rp 0"
        prefix="Rp "
        thousandSeparator="."
        decimalSeparator=","
        hideControls
        value={form.values.biaya === 0 ? '' : form.values.biaya}
        error={form.errors.biaya as string}
        onChange={(e) => form.setFieldValue('biaya', e as number)}
        readOnly={isLoading}
      />
      <Button
        rightSection={<IconDeviceFloppy size={16} />}
        type="submit"
        loading={isLoading}
        disabled={!form.isValid()}
        styles={{
          root: {
            margin: '14px 30px',
          },
        }}>
        Simpan
      </Button>
    </form>
  );
}
