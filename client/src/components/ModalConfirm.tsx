import { Button, Modal as MantineModal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cn from '../utils/cn';

type Props = {
  children: React.ReactNode;
  text: string | React.ReactNode;
  title: string;
  btnTitle: string;
  onAction: () => void;
  icon?: React.ReactNode;
  type: 'danger' | 'warning' | 'info';
};

export default function ModalConfirm({
  children,
  text,
  title,
  btnTitle,
  onAction,
  icon,
  type,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

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
        <div className="flex flex-col gap-7 items-center py-4">
          {icon && (
            <div
              className={cn(
                'p-5 bg-blue-100 text-blue-500 rounded-full [&>svg]:w-[40px] [&>svg]:h-[40px]',
                {
                  'bg-yellow-100 text-yellow-500': type === 'warning',
                  'bg-red-100 text-red-500': type === 'danger',
                }
              )}>
              {icon}
            </div>
          )}
          <h1 className="font-medium leading-8 max-w-[300px] text-center">
            {text}
          </h1>
          <div className="flex items-center gap-3 justify-end my-2">
            <Button
              variant="default"
              onClick={close}
              color={
                type === 'danger'
                  ? 'red'
                  : type === 'warning'
                  ? 'yellow'
                  : 'blue'
              }>
              Batal
            </Button>
            <Button
              variant="filled"
              color="red"
              onClick={() => {
                onAction();
                close();
              }}>
              {btnTitle}
            </Button>
          </div>
        </div>
      </MantineModal>

      <div onClick={open}>{children}</div>
    </>
  );
}
