import {
  ActionIcon,
  Badge,
  Loader,
  LoadingOverlay,
  NumberFormatter,
  Table,
} from '@mantine/core';
import Card from '../../components/Card';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { KelasAsync, fetchKelas } from '../../redux/slices/kelasSlice';
import NotDataFound from '../../components/NotDataFound';
import ModalKelas from '../../components/ModalKelas';
import ModalConfirm from '../../components/ModalConfirm';
import api from '../../api';
import { Notify } from '../../components/Notify';
import ButtonRefresh from '../../components/ButtonRefresh';
import handleErrorResponse from '../../services/handleErrorResponse';
import { useState } from 'react';
import ButtonDelete from '../../components/ButtonDelete';
import InputSearch from '../../components/InputSearch';

export default function Kelas() {
  const dispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = useState('');
  const { data, isLoading } = useSelector(
    (state: { kelas: KelasAsync }) => state.kelas
  );

  const handleDeleteKelas = async (id: string) => {
    setLoadingDelete(id);
    Notify('loading', 'Menghapus kelas...', 'delete-kelas');
    try {
      const { data } = await api.delete(`/kelas/${id}`);
      refresh();
      Notify('success', data.message, 'delete-kelas');
    } catch (error) {
      handleErrorResponse(error, 'delete-kelas');
    } finally {
      setLoadingDelete('');
    }
  };

  const refresh = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchKelas());
  };

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td className="font-semibold text-blue-400 uppercase">
        {element.jenjang}
      </Table.Td>
      <Table.Td className="capitalize text-nowrap">{element.kelas}</Table.Td>
      <Table.Td>
        <Badge color="blue">{element.kode_kelas}</Badge>
      </Table.Td>
      <Table.Td>{element.tahun_ajaran}</Table.Td>
      <Table.Td>
        <NumberFormatter
          thousandSeparator="."
          decimalSeparator=","
          value={element.jumlah_siswa}
        />
      </Table.Td>
      <Table.Td className="flex items-center justify-evenly gap-3">
        <ModalConfirm
          title="Hapus Kelas"
          icon={<IconTrash />}
          type="danger"
          text={
            <>
              Apakah anda yakin ingin menghapus kelas ini "
              <b>{element.kode_kelas}</b>" ?
            </>
          }
          btnTitle="Ya, Hapus"
          onAction={() => handleDeleteKelas(element.id)}>
          <ButtonDelete isLoading={loadingDelete === element.id} />
        </ModalConfirm>
        <ModalKelas type="edit" id={element.id}>
          <ActionIcon variant="light" size="lg">
            <IconPencil size={18} />
          </ActionIcon>
        </ModalKelas>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Jenjang</Table.Th>
      <Table.Th>Kelas</Table.Th>
      <Table.Th>Kode</Table.Th>
      <Table.Th>Tahun Ajaran</Table.Th>
      <Table.Th>Jumlah Siswa</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Kelas</h1>
        <div className="flex items-center gap-2">
          <InputSearch />
          <ButtonRefresh isLoading={isLoading} onClick={refresh} />
          <ModalKelas type="create">
            <ActionIcon variant="light" size="lg">
              <IconPlus size={18} />
            </ActionIcon>
          </ModalKelas>
        </div>
      </Card>
      <Card>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{
            children: <Loader color="blue" size="sm" type="dots" />,
          }}
        />
        {data.length > 0 ? (
          <Table.ScrollContainer minWidth={500}>
            <Table
              withTableBorder
              withColumnBorders
              styles={{
                thead: {
                  background: '#f0f0f0',
                },
                th: {
                  textAlign: 'center',
                },
                td: {
                  textAlign: 'center',
                },
              }}>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : (
          <NotDataFound />
        )}
      </Card>
    </div>
  );
}
