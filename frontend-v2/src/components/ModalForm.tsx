import { Modal as MantineModal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import FormTahunAjaran from './FormTahunAjaran';
import FormKelas from './FormKelas';

type Props = {
  children: React.ReactNode;
  title: string;
  actionType: 'create' | 'edit';
  formType: 'tahun_ajaran' | 'kelas';
  id?: string;
};

export default function ModalForm({
  children,
  title,
  actionType,
  formType,
  id,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const formRender = () => {
    switch (formType) {
      case 'tahun_ajaran':
        return <FormTahunAjaran id={id} type={actionType} close={close} />;
      case 'kelas':
        return <FormKelas id={id} type={actionType} close={close} />;
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

      <div onClick={open}>{children}</div>
    </>
  );
}
