import { Button, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUserCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KelasAsync,
  fetchPaginatedKelas,
  fetchSearchKelas,
} from '../redux/slices/kelasSlice';
import { useDebouncedValue } from '@mantine/hooks';
import api from '../api';
import handleErrorResponse from '../services/handleErrorResponse';
import { useNavigate } from 'react-router-dom';
import { Notify } from './Notify';

type Props = {
  id?: string;
  close: () => void;
};

type FormType = {
  id: string;
  kelas: string;
};

export default function FormTerima({ id, close }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [debounced] = useDebouncedValue(searchValue, 500);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const { data, isLoading } = useSelector(
    (state: { kelas: KelasAsync }) => state.kelas
  );

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      id: id || '',
      kelas: '',
    },
    validate: {
      kelas: (value: string) => (value ? null : 'Wajib diisi'),
    },
  });

  useEffect(() => {
    if (debounced !== null) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchSearchKelas({ searchQuery: debounced })
      );
    } else {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchPaginatedKelas({})
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const handleSubmitTerima = async () => {
    if (form.isValid()) {
      setIsLoadingBtn(true);
      try {
        await api.post('/siswa/acc', {
          siswa_id: form.values.id,
          kelas_id: form.values.kelas,
        });
        Notify('success', 'Pendaftar berhasil diterima menjadi siswa.');
        close();
        navigate('/siswa');
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setIsLoadingBtn(false);
      }
    } else {
      form.validate();
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-3">
        <p className="text-sm mb-3">
          Pastikan siswa sudah melunasi biaya pendaftaran. Pilih kelas dibawah
          ini sebelum mengklik tombol terima.
        </p>
        <Select
          required
          label="Pilih Kelas"
          placeholder="Pilih Kelas"
          data={data?.map((item) => {
            return {
              value: item.id,
              label: item.kode_kelas.toUpperCase(),
            };
          })}
          error={form.errors.kelas as string}
          value={searchValue}
          onChange={(e) => form.setFieldValue('kelas', e as string)}
          searchable
          searchValue={searchValue as string}
          onSearchChange={setSearchValue}
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
            color="teal"
            rightSection={<IconUserCheck size={16} />}
            onClick={handleSubmitTerima}
            loading={isLoading || isLoadingBtn}>
            Terima
          </Button>
        </div>
      </form>
    </div>
  );
}
