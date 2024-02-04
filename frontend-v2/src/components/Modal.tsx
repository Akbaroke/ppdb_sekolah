import { Modal as MantineModal } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  buttonElement: React.ReactNode;
  title?: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export default function Modal({
  children,
  buttonElement,
  title,
  isOpen,
  setOpen,
}: Props) {
  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <MantineModal
        opened={isOpen}
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
        {children}
      </MantineModal>

      <div onClick={open}>{buttonElement}</div>
    </>
  );
}
