import { Button, Modal as MantineModal, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy } from '@tabler/icons-react';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { KelasAsync, fetchKelas } from '../redux/slices/kelasSlice';
import { TahunAjaranAsync } from '../redux/slices/tahunAjaranSlice';
import { Kelas } from '../interfaces/store';
import { useEffect } from 'react';

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
    validate: {},
  });

  useEffect(() => {
    if (dataEdit) {
      form.setFieldValue('jenjang', dataEdit.jenjang);
      form.setFieldValue('tahun_ajaran', dataEdit.tahun_ajaran);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit]);

  const handleSubmit = async () => {
    try {
      const { id, jenjang, tahun_ajaran } = form.values;
      if (type === 'edit') {
        const { data } = await api.patch(`/kelas/${id}`, {
          jenjang: jenjang.toLowerCase(),
          tahun_ajaran,
        });
        console.log(data);
      } else {
        const { data } = await api.post('/kelas', {
          jenjang: jenjang.toLowerCase(),
          tahun_ajaran,
        });
        console.log(data);
      }
      form.reset();
      close();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(fetchKelas());
    } catch (error) {
      console.log(error);
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
            data={[
              {
                value: 'pg',
                label: 'PG',
              },
              {
                value: 'tka',
                label: 'TKA',
              },
              {
                value: 'tkb',
                label: 'TKB',
              },
            ]}
            value={form.values.jenjang}
            error={form.errors.jenjang as string}
            onChange={(e) => form.setFieldValue('jenjang', e as string)}
          />
          <Select
            required
            label="Tahun Ajaran"
            placeholder="Tahun Ajaran"
            data={tahunData.data?.map((item) => item.tahun_ajaran).sort()}
            value={form.values.tahun_ajaran}
            error={form.errors.tahun_ajaran as string}
            onChange={(e) => form.setFieldValue('tahun_ajaran', e as string)}
          />

          <Button
            rightSection={<IconDeviceFloppy size={16} />}
            type="submit"
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
