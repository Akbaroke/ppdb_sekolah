import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Select, TextInput } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';

type Props = {
  close: () => void;
};

type FormType = {
  no_transaksi: string;
  tanggal: Date;
  no_pendaftaran: string;
  metode: string;
};

export default function FormManualDUKK({ close }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      no_transaksi: '',
      tanggal: new Date(),
      no_pendaftaran: '',
      metode: '',
    },
    validate: {
      no_transaksi: (value) => (value.trim().length > 0 ? null : 'Wajib diisi'),
      tanggal: (value) => (value ? null : 'Wajib diisi'),
      no_pendaftaran: (value) =>
        value.trim().length > 0 ? null : 'Wajib diisi',
      metode: (value) => (value?.length > 0 ? null : 'Wajib diisi'),
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
        label="No. Transaksi"
        placeholder="000xxxx"
        withAsterisk
        value={form.values.no_transaksi}
        error={form.errors.no_transaksi as string}
        onChange={(e) =>
          form.setFieldValue('no_transaksi', e.currentTarget.value)
        }
        readOnly={isLoading}
      />
      <DateInput
        label="Tanggal Transaksi"
        withAsterisk
        valueFormat="DD/MM/YYYY"
        placeholder="Tanggal Transaksi"
        value={form.values.tanggal as Date}
        maxDate={new Date()}
        onChange={(e) => {
          form.setFieldValue('tanggal', e as Date);
        }}
        readOnly={isLoading}
      />
      <Select
        withAsterisk
        label="No. Pendaftaran"
        placeholder="Masukkan Nomor Pendaftaran"
        data={[]}
        value={form.values.no_pendaftaran}
        error={form.errors.no_pendaftaran as string}
        onChange={(e) => form.setFieldValue('no_pendaftaran', e as string)}
        searchable
        readOnly={isLoading}
        comboboxProps={{
          transitionProps: {
            transition: 'pop',
            duration: 200,
          },
        }}
      />
      <Select
        withAsterisk
        label="Metode"
        placeholder="Pilih Metode"
        data={['BCA', 'Mandiri', 'BNI', 'QRIS', 'DANA']}
        value={form.values.metode}
        error={form.errors.metode as string}
        onChange={(e) => form.setFieldValue('metode', e as string)}
        searchable
        readOnly={isLoading}
        comboboxProps={{
          transitionProps: {
            transition: 'pop',
            duration: 200,
          },
        }}
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
