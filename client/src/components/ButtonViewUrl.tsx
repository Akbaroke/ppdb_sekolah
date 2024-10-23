import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from 'react';
import convertUrlToFile from '../utils/convertUrlToFile';

type Props = {
  title: string;
  url: string;
  className?: string;
  children: React.ReactNode;
};

export default function ButtonViewUrl({
  title,
  url,
  className,
  children,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [, setInputValue] = useState<File | null>();
  const [fileUrl, setFileUrl] = useState<string>('');
  const [showType, setShowType] = useState<'image' | 'pdf' | null>(null);

  const valueValidate = async (value: string | File): Promise<File> => {
    if (typeof value === 'string') {
      setFileUrl(value);
      const file = await convertUrlToFile(value);
      const fileFormat = file.type.split('/')[1];
      const finalFile = new File(
        [file],
        `${title.toLowerCase().replace(' ', '-')}.${fileFormat}`,
        { type: file.type }
      );
      checkFileType(finalFile);
      return finalFile;
    } else {
      checkFileType(value);
      setFileUrl(URL.createObjectURL(value));
      return value;
    }
  };

  const checkFileType = (value: File) => {
    if (value.type === 'application/pdf') {
      setShowType('pdf');
    } else {
      setShowType('image');
    }
  };

  useEffect(() => {
    if (!url) return;
    valueValidate(url).then((file) => {
      setInputValue(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <>
      <Modal
        centered
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
        {showType === 'image' && (
          <img
            src={fileUrl}
            alt={title}
            className="w-[50vw] max-w-[50vw] max-h-screen rounded-md"
          />
        )}
        {showType === 'pdf' && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className="w-[80vw] sm:w-[50vw] rounded-md">
              <Viewer fileUrl={fileUrl} />
            </div>
          </Worker>
        )}
      </Modal>

      <div onClick={open} className={className}>
        {children}
      </div>
    </>
  );
}
