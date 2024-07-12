import {
  ActionIcon,
  Badge,
  Loader,
  LoadingOverlay,
  NumberFormatter,
  Pagination,
  Table,
} from '@mantine/core';
import Card from '../../components/Card';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KelasAsync,
  fetchPaginatedKelas,
  fetchSearchKelas,
} from '../../redux/slices/kelasSlice';
import NotDataFound from '../../components/NotDataFound';
import ModalConfirm from '../../components/ModalConfirm';
import api from '../../api';
import { Notify } from '../../components/Notify';
import ButtonRefresh from '../../components/ButtonRefresh';
import handleErrorResponse from '../../services/handleErrorResponse';
import { useEffect, useState } from 'react';
import ButtonDelete from '../../components/ButtonDelete';
import InputSearch from '../../components/InputSearch';
import ModalForm from '../../components/ModalForm';
// import calculateShowingEntriesText from '../../utils/calculateShowEntries';

export default function Kelas() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [loadingDelete, setLoadingDelete] = useState('');
  const { data, pagination, isLoading } = useSelector(
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

  useEffect(() => {
    dispatch(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetchSearchKelas({ searchQuery: searchValue })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const refresh = () => {
    setSearchValue('');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchPaginatedKelas({}));
  };

  const handleChangePage = (page: number) => {
    if (searchValue) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchSearchKelas({ page: page, searchQuery: searchValue })
      );
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchPaginatedKelas({ page: page }));
  };

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td className="font-semibold text-[#c59004] uppercase">
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
      <Table.Td>
        <NumberFormatter
          thousandSeparator="."
          decimalSeparator=","
          value={element.kapasitas}
        />
      </Table.Td>
      <Table.Td className="flex items-center gap-3 justify-evenly">
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
        <ModalForm title="Ubah Kelas" formType="kelas" data={element}>
          <ActionIcon variant="light" size="lg">
            <IconPencil size={18} />
          </ActionIcon>
        </ModalForm>
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
      <Table.Th>Kapasitas</Table.Th>
      <Table.Th w={120}>Aksi</Table.Th>
    </Table.Tr>
  );

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-wrap items-center justify-between gap-y-3">
        <h1 className="text-lg font-bold">Kelas</h1>
        <div className="flex items-center gap-2 ml-auto">
          <InputSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <ButtonRefresh isLoading={isLoading} onClick={refresh} />
          <ModalForm title="Tambah Kelas" formType="kelas">
            <ActionIcon variant="light" size="lg">
              <IconPlus size={18} />
            </ActionIcon>
          </ModalForm>
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
        <div className="flex items-center justify-end mt-5">
          {/* {data?.length > 0 && (
            <p className="font-semibold text-blue-400">
              {calculateShowingEntriesText(pagination)}
            </p>
          )} */}
          <Pagination
            value={pagination.currentPage}
            total={pagination.totalPage}
            onChange={handleChangePage}
          />
        </div>
      </Card>
    </div>
  );
}
