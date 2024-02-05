import {
  Button,
  Modal as MantineModal,
  NumberInput,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { TahunAjaran } from '../interfaces/store';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import {
  TahunAjaranAsync,
  fetchTahunAjaran,
} from '../redux/slices/tahunAjaranSlice';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  type: 'create' | 'edit';
  id?: string;
};

export default function ModalTahunAjaran({ children, type, id }: Props) {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const tahunData = useSelector(
    (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
  );
  const dataEdit = tahunData.data?.find(
    (item: TahunAjaran) => item.tahun_ajaran_id === id
  );

  const form = useForm<TahunAjaran>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      tahun_ajaran_id: id || '',
      tahun_ajaran: '',
      biaya_daftar: 0,
      besar_spp: 0,
    },
    validate: {},
  });

  useEffect(() => {
    if (dataEdit) {
      form.setFieldValue('tahun_ajaran', dataEdit.tahun_ajaran);
      form.setFieldValue('biaya_daftar', dataEdit.biaya_daftar);
      form.setFieldValue('besar_spp', dataEdit.besar_spp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit]);

  const handleSubmit = async () => {
    try {
      const { tahun_ajaran_id, tahun_ajaran, biaya_daftar, besar_spp } =
        form.values;
      if (type === 'edit') {
        const { data } = await api.patch(`/tahun_ajaran/${tahun_ajaran_id}`, {
          biaya_daftar,
          besar_spp,
        });
        console.log(data);
      } else {
        const { data } = await api.post('/tahun_ajaran', {
          tahun_ajaran,
          biaya_daftar,
          besar_spp,
        });
        console.log(data);
      }
      form.reset();
      close();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(fetchTahunAjaran());
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
        title={type === 'create' ? 'Buat Tahun Ajaran' : 'Ubah Tahun Ajaran'}
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
            label="Tahun Ajaran"
            placeholder="Tahun Ajaran"
            data={[
              '2023/2024',
              '2022/2023',
              '2021/2022',
              '2020/2021',
              '2019/2020',
              '2018/2019',
              '2017/2018',
              '2016/2017',
              '2015/2016',
              '2014/2015',
              '2013/2014',
              '2012/2013',
              '2011/2012',
              '2010/2011',
            ]}
            value={form.values.tahun_ajaran}
            error={form.errors.tahun_ajaran as string}
            onChange={(e) => form.setFieldValue('tahun_ajaran', e as string)}
            disabled={type === 'edit'}
          />
          <NumberInput
            required
            label="Biaya Daftar"
            placeholder="Rp 0"
            prefix="Rp "
            thousandSeparator="."
            decimalSeparator=","
            hideControls
            value={
              form.values.biaya_daftar === 0 ? '' : form.values.biaya_daftar
            }
            error={form.errors.biaya_daftar as string}
            onChange={(e) => form.setFieldValue('biaya_daftar', e as number)}
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
