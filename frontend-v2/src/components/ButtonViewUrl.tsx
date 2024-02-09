import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

type Props = {
  title?: string;
  url: string;
  type: 'image' | 'pdf' | null;
  className?: string;
};

export default function ButtonViewUrl({ title, url, type, className }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        size="auto"
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
        {type === 'image' && (
          <img
            src={url}
            alt={title}
            className="w-[50vw] max-w-[50vw] max-h-screen rounded-md"
          />
        )}
        {type === 'pdf' && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className="w-[80vw] sm:w-[50vw] rounded-md">
              <Viewer fileUrl={url} />
            </div>
          </Worker>
        )}
      </Modal>

      <ActionIcon
        variant="light"
        aria-label="Settings"
        size="lg"
        onClick={open}
        className={className}>
        <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
