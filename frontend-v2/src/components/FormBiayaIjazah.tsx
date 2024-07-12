import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, NumberInput, Select } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { TahunAjaranAsync } from '../redux/slices/tahunAjaranSlice';
import { JENJANG_LIST } from '../data/config';

type Props = {
  data?: any;
  close: () => void;
};

type FormType = {
  id: string;
  tahun_ajaran: string;
  jenjang: string;
  biaya: number;
};

export default function FormBiayaIjazah({ data, close }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>(
    data?.tahun_ajaran || null
  );
  const { data: dataTahunAjaran, isLoading: isLoadingTahunAjaran } =
    useSelector(
      (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
    );

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id || '',
      tahun_ajaran: data?.tahun_ajaran || '',
      jenjang: data?.jenjang?.toLowerCase() || '',
      biaya: data?.biaya || 0,
    },
    validate: {
      tahun_ajaran: (value) =>
        value?.trim()?.length > 0 ? null : 'Wajib diisi',
      jenjang: (value) => (value ? null : 'Wajib diisi'),
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(form.values);
    form.reset();
    close();
    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.onSubmit(handleSubmit)}>
      <Select
        withAsterisk
        label="Tahun Ajaran"
        placeholder="Tahun Ajaran"
        data={dataTahunAjaran.map((item) => item.tahun_ajaran).sort() || []}
        value={searchValue}
        error={form.errors.tahun_ajaran as string}
        onChange={(e) => form.setFieldValue('tahun_ajaran', e as string)}
        searchable
        searchValue={searchValue as string}
        onSearchChange={setSearchValue}
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
        label="Jenjang"
        placeholder="Jenjang"
        data={JENJANG_LIST}
        value={form.values.jenjang}
        error={form.errors.jenjang as string}
        onChange={(e) => form.setFieldValue('jenjang', e as string)}
        readOnly={isLoading}
        comboboxProps={{
          transitionProps: {
            transition: 'pop',
            duration: 200,
          },
        }}
      />
      <NumberInput
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
        loading={isLoadingTahunAjaran || isLoading}
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
