import { Button, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { Notify } from './Notify';
import handleErrorResponse from '../services/handleErrorResponse';
import { JENJANG_LIST } from '../data/config';
import { fetchPaginatedKelas } from '../redux/slices/kelasSlice';
import {
  TahunAjaranAsync,
  fetchPaginatedTahunAjaran,
  fetchSearchTahunAjaran,
} from '../redux/slices/tahunAjaranSlice';
import { useDebouncedValue } from '@mantine/hooks';

type Props = {
  id?: string;
  type: 'create' | 'edit';
  close: () => void;
};

type FormType = {
  id: string;
  jenjang: string;
  tahun_ajaran: string;
  kapasitas: number;
};

export default function FormKelas({ id, type, close }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [debounced] = useDebouncedValue(searchValue, 500);
  const { data: dataTahunAjaran, isLoading: isLoadingTahunAjaran } =
    useSelector(
      (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
    );

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      id: id || '',
      jenjang: '',
      tahun_ajaran: '',
      kapasitas: 0,
    },
    validate: {
      jenjang: (value: string) => (value ? null : 'Wajib diisi'),
      tahun_ajaran: (value: string) => (value ? null : 'Wajib diisi'),
    },
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get(`/kelas/${id}`);
      form.setFieldValue('jenjang', data.data.jenjang);
      form.setFieldValue('tahun_ajaran', data.data.tahun_ajaran);
      form.setFieldValue('kapasitas', data.data.kapasitas);
      setSearchValue(data.data.tahun_ajaran);
    };

    type === 'edit' && fetch();

    dispatch(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetchPaginatedTahunAjaran({})
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { id, jenjang, tahun_ajaran, kapasitas } = form.values;
      if (type === 'edit') {
        const { data } = await api.patch(`/kelas/${id}`, {
          jenjang: jenjang.toLowerCase(),
          tahun_ajaran,
          kapasitas,
        });
        Notify('success', data.message);
      } else {
        const { data } = await api.post('/kelas', {
          jenjang: jenjang.toLowerCase(),
          tahun_ajaran,
          kapasitas,
        });
        Notify('success', data.message);
      }
      form.reset();
      close();
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchPaginatedKelas({})
      );
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounced !== null) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchSearchTahunAjaran({ searchQuery: debounced })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.onSubmit(handleSubmit)}>
      <Select
        required
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
      <Select
        required
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
      <NumberInput
        required
        label="Kapasitas"
        placeholder="0 orang"
        suffix=" orang"
        thousandSeparator="."
        decimalSeparator=","
        hideControls
        value={form.values.kapasitas === 0 ? '' : form.values.kapasitas}
        error={form.errors.kapasitas as string}
        onChange={(e) => form.setFieldValue('kapasitas', e as number)}
        min={1}
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
