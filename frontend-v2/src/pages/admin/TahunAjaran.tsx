import {
  ActionIcon,
  Loader,
  LoadingOverlay,
  NumberFormatter,
  Pagination,
  Table,
} from '@mantine/core';
import Card from '../../components/Card';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TahunAjaranAsync,
  fetchPaginatedTahunAjaran,
  fetchSearchTahunAjaran,
} from '../../redux/slices/tahunAjaranSlice';
import NotDataFound from '../../components/NotDataFound';
import ButtonRefresh from '../../components/ButtonRefresh';
import InputSearch from '../../components/InputSearch';
import { useEffect, useState } from 'react';
import ModalForm from '../../components/ModalForm';

type TahunAjaran = {
  id: string;
  tahun_ajaran: string;
  biaya_daftar: number;
  biaya_spp: number;
};

export default function TahunAjaran() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const { data, pagination, isLoading } = useSelector(
    (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
  );

  const rows = data?.map((element) => (
    <Table.Tr key={element.tahun_ajaran_id}>
      <Table.Td className="text-blue-400 text-nowrap font-bold">
        {element.tahun_ajaran}
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          value={element.biaya_daftar}
        />
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          value={element.besar_spp}
        />
      </Table.Td>
      <Table.Td className="flex items-center justify-evenly">
        <ModalForm
          title="Ubah Tahun Ajaran"
          formType="tahun_ajaran"
          actionType="edit"
          id={element.tahun_ajaran_id}>
          <ActionIcon variant="light" size="lg">
            <IconPencil size={18} />
          </ActionIcon>
        </ModalForm>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Tahun Ajaran</Table.Th>
      <Table.Th>Biaya Daftar</Table.Th>
      <Table.Th>Biaya SPP</Table.Th>
      <Table.Th>Aksi</Table.Th>
    </Table.Tr>
  );

  useEffect(() => {
    dispatch(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetchSearchTahunAjaran({ searchQuery: searchValue })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const refresh = () => {
    setSearchValue('');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchPaginatedTahunAjaran({}));
  };

  const handleChangePage = (page: number) => {
    if (searchValue) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchSearchTahunAjaran({ page: page, searchQuery: searchValue })
      );
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchPaginatedTahunAjaran({ page: page }));
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center flex-wrap gap-y-3">
        <h1 className="font-bold text-lg">Tahun Ajaran</h1>
        <div className="flex items-center gap-2 ml-auto">
          <InputSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <ButtonRefresh isLoading={isLoading} onClick={refresh} />
          <ModalForm
            title="Buat Tahun Ajaran"
            formType="tahun_ajaran"
            actionType="create">
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
        {data?.length > 0 ? (
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
        <Pagination
          value={pagination.currentPage}
          total={pagination.totalPage}
          onChange={handleChangePage}
          className="mt-5 ml-auto w-max"
        />
      </Card>
    </div>
  );
}
