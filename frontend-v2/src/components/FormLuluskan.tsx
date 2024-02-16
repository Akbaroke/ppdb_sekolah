import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import api from '../api';
import handleErrorResponse from '../services/handleErrorResponse';
import { useNavigate } from 'react-router-dom';
import { Notify } from './Notify';
import InputFile from './InputFile';
import { IconSchool } from '@tabler/icons-react';

type Props = {
  id?: string;
  close: () => void;
};

type FormType = {
  id: string;
  ijazah: File | string;
};

export default function FormLuluskan({ id, close }: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorIjazah, setErrorIjazah] = useState('');

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      id: id || '',
      ijazah: '',
    },
  });

  const handleSubmitTerima = async () => {
    if (form.isValid()) {
      setIsLoading(true);
      try {
        await api.post(
          '/siswa/lulus',
          {
            siswa_id: form.values.id,
            ijazah: form.values.ijazah,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        Notify('success', 'Siswa berhasil diluluskan.');
        close();
        navigate('/admin/siswa?tab=lulus');
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
          Pastikan siswa sudah melunasi biaya ijazah atau tunggakan lainnya.
          Masukkan file Ijazah dibawah ini sebelum mengklik tombol luluskan.
        </p>
        <InputFile
          label="Ijazah"
          description="Berupa foto atau softcopy (JPEG ,PNG, PDF) - Max.1MB"
          placeholder="Pilih File"
          value={form.values.ijazah as File}
          error={errorIjazah}
          setError={setErrorIjazah}
          onChange={(e) => {
            form.setFieldValue('ijazah', e as File);
          }}
          accept={['image/png', 'image/jpeg', 'application/pdf']}
          readOnly={isLoading}
        />
        <div className="px-8 my-5">
          <Button
            fullWidth
            color="teal"
            rightSection={<IconSchool size={16} />}
            onClick={handleSubmitTerima}
            loading={isLoading || isLoading}>
            Luluskan
          </Button>
        </div>
      </form>
    </div>
  );
}
