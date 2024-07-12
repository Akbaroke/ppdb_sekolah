import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, MultiSelect, NumberInput, Select } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { listBiayaDUSBDummy } from '../data/dummy';
import { useSelector } from 'react-redux';
import { TahunAjaranAsync } from '../redux/slices/tahunAjaranSlice';
import { JENJANG_LIST } from '../data/config';
import IndonesiaFormat from '../utils/indonesiaFormat';

type Props = {
  data?: any;
  close: () => void;
};

type FormType = {
  id: string;
  tahun_ajaran: string;
  jenjang: string;
  total_biaya: number;
  details: string[];
};

export default function FormBiayaDUSB({ data, close }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [baseDetailBiaya, setBaseDetailBiaya] = useState<any[]>([]);
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
      total_biaya: data?.total_biaya || 0,
      details: data?.detail_biaya?.map((item: any) => item.kode) || [],
    },
    validate: {
      tahun_ajaran: (value) =>
        value?.trim()?.length > 0 ? null : 'Wajib diisi',
      jenjang: (value) => (value ? null : 'Wajib diisi'),
    },
  });

  useEffect(() => {
    setBaseDetailBiaya(listBiayaDUSBDummy || []);
  }, []);

  useEffect(() => {
    let total = 0;
    form.values.details.map((item) => {
      total += baseDetailBiaya.find((biaya) => biaya.kode === item)?.biaya;
    });
    form.setFieldValue('total_biaya', total);
  }, [form.values]);

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
        label="Total Biaya"
        placeholder="Rp 0"
        prefix="Rp "
        thousandSeparator="."
        decimalSeparator=","
        hideControls
        disabled
        value={form.values.total_biaya === 0 ? '' : form.values.total_biaya}
        error={form.errors.total_biaya as string}
        onChange={(e) => form.setFieldValue('total_biaya', e as number)}
        readOnly={isLoading}
      />
      <MultiSelect
        withAsterisk
        label="Detail Biaya"
        placeholder="Detail Biaya"
        data={baseDetailBiaya.map((item) => ({
          value: item.kode,
          label: `${item.kode} | ${item.title} | Rp ${IndonesiaFormat.format(
            item.biaya
          )}`,
        }))}
        value={form.values.details}
        error={form.errors.details as string}
        onChange={(e) => form.setFieldValue('details', e)}
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
