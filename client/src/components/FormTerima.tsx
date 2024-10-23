import { Button } from '@mantine/core';
import { IconUserCheck } from '@tabler/icons-react';
import { useState } from 'react';
import api from '../api';
import handleErrorResponse from '../services/handleErrorResponse';
import { useNavigate } from 'react-router-dom';
import { Notify } from './Notify';

type Props = {
  listId?: string[];
  close: () => void;
};

export default function FormTerima({ listId, close }: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitTerima = async () => {
    setIsLoading(true);
    try {
      await api.post('/siswa/acc', {
        siswa_id: listId,
      });
      Notify(
        'success',
        `${listId?.length} Pendaftar berhasil diterima menjadi siswa.`
      );
      close();
      navigate('/admin/siswa');
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <p className="mb-3 text-sm">
          Pastikan pendaftar sudah melunasi biaya pendaftaran. Yakin akan
          menerima <b>{listId?.length}</b> pendaftar ini ?
        </p>
        <div className="px-8 my-5">
          <Button
            fullWidth
            color="teal"
            rightSection={<IconUserCheck size={16} />}
            onClick={handleSubmitTerima}
            loading={isLoading}>
            Terima
          </Button>
        </div>
      </div>
    </div>
  );
}
