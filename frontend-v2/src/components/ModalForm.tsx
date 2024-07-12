import { Modal as MantineModal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import FormTahunAjaran from './FormTahunAjaran';
import FormKelas from './FormKelas';
import FormTerima from './FormTerima';
import FormLuluskan from './FormLuluskan';
import FormKeluarkan from './FormKeluarkan';
import FormManualSpp from './FormManualSpp';
import FormManualDUSB from './FormManualDUSB';
import FormListBiayaDUSB from './FormListBiayaDUSB';
import FormBiayaDUSB from './FormBiayaDUSB';
import FormManualDUKK from './FormManualDUKK';
import FormBiayaDUKK from './FormBiayaDUKK';
import FormListBiayaDUKK from './FormListBiayaDUKK';
import FormManualIjazah from './FormManualIjazah';
import FormBiayaIjazah from './FormBiayaIjazah';

type Props = {
  children: React.ReactNode;
  title: string;
  formType:
    | 'tahun_ajaran'
    | 'kelas'
    | 'terima'
    | 'luluskan'
    | 'keluarkan'
    | 'manual_spp'
    | 'manual_dusb'
    | 'manual_dukk'
    | 'manual_ijazah'
    | 'list_biaya_dusb'
    | 'list_biaya_dukk'
    | 'biaya_dusb'
    | 'biaya_dukk'
    | 'biaya_ijazah';
  data?: any;
  id?: string;
  listId?: string[];
  className?: string;
  disable?: boolean;
};

export default function ModalForm({
  children,
  title,
  formType,
  data,
  id,
  listId,
  className,
  disable,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const formRender = () => {
    switch (formType) {
      case 'tahun_ajaran':
        return <FormTahunAjaran data={data} close={close} />;
      case 'kelas':
        return <FormKelas data={data} close={close} />;
      case 'terima':
        return <FormTerima listId={listId} close={close} />;
      case 'luluskan':
        return <FormLuluskan id={id} close={close} />;
      case 'keluarkan':
        return <FormKeluarkan id={id} close={close} />;
      case 'manual_spp':
        return <FormManualSpp close={close} />;
      case 'manual_dusb':
        return <FormManualDUSB close={close} />;
      case 'manual_dukk':
        return <FormManualDUKK close={close} />;
      case 'manual_ijazah':
        return <FormManualIjazah close={close} />;
      case 'list_biaya_dusb':
        return <FormListBiayaDUSB close={close} />;
      case 'list_biaya_dukk':
        return <FormListBiayaDUKK close={close} />;
      case 'biaya_dusb':
        return <FormBiayaDUSB data={data} close={close} />;
      case 'biaya_dukk':
        return <FormBiayaDUKK data={data} close={close} />;
      case 'biaya_ijazah':
        return <FormBiayaIjazah data={data} close={close} />;
    }
  };

  return (
    <>
      <MantineModal
        centered
        opened={opened}
        onClose={close}
        title={title}
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
        {formRender()}
      </MantineModal>

      <div onClick={disable ? () => null : open} className={className}>
        {children}
      </div>
    </>
  );
}
