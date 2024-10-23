import { useState } from 'react';
import { TahunAjaran } from '../interfaces/store';
import { useForm } from '@mantine/form';
import api from '../api';
import { Notify } from './Notify';
import handleErrorResponse from '../services/handleErrorResponse';
import { Button, NumberInput, TextInput } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { fetchPaginatedTahunAjaran } from '../redux/slices/tahunAjaranSlice';
import { useDispatch } from 'react-redux';

type Props = {
  data?: any;
  close: () => void;
};

export default function FormTahunAjaran({ data, close }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const tahunAjaranNow = `${new Date().getFullYear().toString()}/${(
    new Date().getFullYear() + 1
  ).toString()}`;

  const form = useForm<TahunAjaran>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      tahun_ajaran_id: data?.tahun_ajaran_id || '',
      tahun_ajaran: data?.tahun_ajaran || tahunAjaranNow,
      biaya_daftar: data?.biaya_daftar || 0,
      besar_spp: data?.besar_spp || 0,
    },
    validate: {
      tahun_ajaran: (value: string) => (value ? null : 'Wajib diisi'),
      biaya_daftar: (value: number) => (value > 0 ? null : 'Wajib diisi'),
      besar_spp: (value: number) => (value > 0 ? null : 'Wajib diisi'),
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { tahun_ajaran_id, tahun_ajaran, biaya_daftar, besar_spp } =
        form.values;
      if (data) {
        const { data } = await api.patch(`/tahun_ajaran/${tahun_ajaran_id}`, {
          biaya_daftar,
          besar_spp,
        });
        Notify('success', data.message);
      } else {
        const { data } = await api.post('/tahun_ajaran', {
          tahun_ajaran,
          biaya_daftar,
          besar_spp,
        });
        Notify('success', data.message);
      }
      form.reset();
      close();
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchPaginatedTahunAjaran({})
      );
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Tahun Ajaran"
        placeholder="Tahun ajaran"
        required
        disabled
        value={form.values.tahun_ajaran}
        error={form.errors.tahun_ajaran as string}
        onChange={(e) =>
          form.setFieldValue('tahun_ajaran', e.currentTarget.value)
        }
        readOnly={isLoading}
      />
      <NumberInput
        required
        label="Biaya Daftar"
        placeholder="Rp 0"
        prefix="Rp "
        thousandSeparator="."
        decimalSeparator=","
        hideControls
        value={form.values.biaya_daftar === 0 ? '' : form.values.biaya_daftar}
        error={form.errors.biaya_daftar as string}
        onChange={(e) => form.setFieldValue('biaya_daftar', e as number)}
        readOnly={isLoading}
      />
      <NumberInput
        required
        label="Biaya SPP (per bulan)"
        placeholder="Rp 0"
        prefix="Rp "
        thousandSeparator="."
        decimalSeparator=","
        hideControls
        value={form.values.besar_spp === 0 ? '' : form.values.besar_spp}
        error={form.errors.besar_spp as string}
        onChange={(e) => form.setFieldValue('besar_spp', e as number)}
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
