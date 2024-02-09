import { Button, Modal as MantineModal, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy } from '@tabler/icons-react';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { KelasAsync, fetchKelas } from '../redux/slices/kelasSlice';
import { TahunAjaranAsync } from '../redux/slices/tahunAjaranSlice';
import { Kelas } from '../interfaces/store';
import { useEffect, useState } from 'react';
import { JENJANG_LIST } from '../data/config';
import { Notify } from './Notify';
import handleErrorResponse from '../services/handleErrorResponse';

type Props = {
  children: React.ReactNode;
  type: 'create' | 'edit';
  id?: string;
};

type FormType = {
  id: string;
  jenjang: string;
  tahun_ajaran: string;
};

export default function ModalKelas({ children, type, id }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const tahunData = useSelector(
    (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
  );
  const kelasData = useSelector((state: { kelas: KelasAsync }) => state.kelas);
  const dataEdit = kelasData.data?.find((item: Kelas) => item.id === id);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      id: id || '',
      jenjang: '',
      tahun_ajaran: '',
    },
    validate: {
      jenjang: (value: string) => (value ? null : 'Wajib diisi'),
      tahun_ajaran: (value: string) => (value ? null : 'Wajib diisi'),
    },
  });

  useEffect(() => {
    if (dataEdit) {
      form.setFieldValue('jenjang', dataEdit.jenjang);
      form.setFieldValue('tahun_ajaran', dataEdit.tahun_ajaran);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { id, jenjang, tahun_ajaran } = form.values;
      if (type === 'edit') {
        const { data } = await api.patch(`/kelas/${id}`, {
          jenjang: jenjang.toLowerCase(),
          tahun_ajaran,
        });
        Notify('success', data.message);
      } else {
        const { data } = await api.post('/kelas', {
          jenjang: jenjang.toLowerCase(),
          tahun_ajaran,
        });
        Notify('success', data.message);
      }
      form.reset();
      close();
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(fetchKelas());
      }, 350);
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MantineModal
        centered
        opened={opened}
        onClose={close}
        title={type === 'create' ? 'Buat Kelas' : 'Ubah Kelas'}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          title: {
            fontWeight: 600,
          },
          header: {
            borderBottom: '1px solid #f0f0f0',
          },
          body: {
            padding: 20,
          },
        }}>
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
          />
          <Select
            required
            label="Tahun Ajaran"
            placeholder="Tahun Ajaran"
            data={tahunData.data?.map((item) => item.tahun_ajaran).sort()}
            value={form.values.tahun_ajaran}
            error={form.errors.tahun_ajaran as string}
            onChange={(e) => form.setFieldValue('tahun_ajaran', e as string)}
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
      </MantineModal>

      <div onClick={open}>{children}</div>
    </>
  );
}
