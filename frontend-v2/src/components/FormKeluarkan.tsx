import { Autocomplete, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import api from '../api';
import handleErrorResponse from '../services/handleErrorResponse';
import { useNavigate } from 'react-router-dom';
import { Notify } from './Notify';
import { KETERANGAN_KELUAR } from '../data/config';
import { IconTransferOut } from '@tabler/icons-react';

type Props = {
  id?: string;
  close: () => void;
};

type FormType = {
  id: string;
  keterangan: string;
};

export default function FormKeluarkan({ id, close }: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      id: id || '',
      keterangan: '',
    },
    validate: {
      keterangan: (value: string) => (value ? null : 'Wajib diisi'),
    },
  });

  const handleSubmitTerima = async () => {
    if (form.isValid()) {
      setIsLoading(true);
      try {
        await api.post('/siswa/keluar', {
          siswa_id: form.values.id,
          keterangan: form.values.keterangan,
        });
        Notify('success', 'Siswa berhasil dikeluarkan.');
        close();
        navigate('/admin/siswa?tab=keluar');
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      form.validate();
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-3">
        <p className="text-sm mb-3">
          Pastikan siswa sudah melunasi tunggakan lainnya. Masukkan keterangan
          alasan siswa keluar pada dibawah ini sebelum mengklik tombol
          keluarkan.
        </p>
        <Autocomplete
          required
          label="Tahun Ajaran"
          placeholder="Tahun ajaran"
          data={KETERANGAN_KELUAR}
          value={form.values.keterangan}
          error={form.errors.keterangan as string}
          onChange={(value) => form.setFieldValue('keterangan', value)}
          comboboxProps={{
            transitionProps: {
              transition: 'pop',
              duration: 200,
            },
          }}
          readOnly={isLoading}
        />
        <div className="px-8 my-5">
          <Button
            fullWidth
            color="red"
            rightSection={<IconTransferOut size={16} />}
            onClick={handleSubmitTerima}
            loading={isLoading || isLoading}>
            Keluarkan
          </Button>
        </div>
      </form>
    </div>
  );
}
