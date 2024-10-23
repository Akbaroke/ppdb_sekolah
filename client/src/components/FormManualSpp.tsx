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
  nis: string;
  spp_bulan: string;
  metode: string;
};

export default function FormManualSpp({ close }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      no_transaksi: '',
      tanggal: new Date(),
      nis: '',
      spp_bulan: '',
      metode: '',
    },
    validate: {
      no_transaksi: (value) => (value.trim().length > 0 ? null : 'Wajib diisi'),
      tanggal: (value) => (value ? null : 'Wajib diisi'),
      nis: (value) => (value.trim().length > 0 ? null : 'Wajib diisi'),
      spp_bulan: (value) => (value.trim().length > 0 ? null : 'Wajib diisi'),
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
        label="NIS"
        placeholder="Masukkan Nomor Induk Siswa"
        data={[]}
        value={form.values.nis}
        error={form.errors.nis as string}
        onChange={(e) => form.setFieldValue('nis', e as string)}
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
        label="SPP Bulan"
        placeholder="Pilih SPP Bulan"
        data={[]}
        value={form.values.spp_bulan}
        error={form.errors.spp_bulan as string}
        onChange={(e) => form.setFieldValue('spp_bulan', e as string)}
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
