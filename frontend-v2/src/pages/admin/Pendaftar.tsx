import Card from '../../components/Card';
import {
  Badge,
  Checkbox,
  Loader,
  LoadingOverlay,
  Pagination,
  Table,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ButtonRefresh from '../../components/ButtonRefresh';
import InputSearch from '../../components/InputSearch';
import { useEffect, useState } from 'react';
import handleErrorResponse from '../../services/handleErrorResponse';
import api from '../../api';
import { SiswaResponse } from '../../interfaces/pages';
import NotDataFound from '../../components/NotDataFound';
import { useToggle } from '@mantine/hooks';
import { Pagination as TypePagination } from '../../interfaces/store';

export default function Pendaftar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [listDataSiswa, setListDataSiswa] = useState<SiswaResponse[]>([]);
  const [value, toggle] = useToggle();
  const [pagination, setPagination] = useState<TypePagination>({
    currentPage: 1,
    totalData: 0,
    totalPage: 0,
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          `/siswa?status=pendaftar&page=1&s=${searchValue}`
        );
        setListDataSiswa(data.data);
        setPagination(data.pagination);
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [searchValue, value]);

  const handleChangePage = async (page: number) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(
        `/siswa?status=pendaftar&page=${page}&s=${searchValue}`
      );
      setListDataSiswa(data.data);
      setPagination(data.pagination);
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  const rows = listDataSiswa?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Checkbox
          className="flex items-center justify-center"
          aria-label="Select row"
          checked={selectedRows.includes(element.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.id]
                : selectedRows.filter((position) => position !== element.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>
        <img
          src={element.imgUrl}
          alt=""
          className="w-[71px] h-[87px] rounded-[5px] m-auto"
        />
      </Table.Td>
      <Table.Td
        className="text-blue-400 text-nowrap font-bold cursor-pointer hover:underline"
        onClick={() => navigate(`/admin/pendaftar/${element.id}`)}>
        {element.nama}
      </Table.Td>
      <Table.Td>{element.jenis_kelamin}</Table.Td>
      <Table.Td>{element.tahun_ajaran}</Table.Td>
      <Table.Td>
        <Badge color="blue">{element.jenjang}</Badge>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th className="w-[70px]">
        <Checkbox
          className="flex items-center justify-center"
          checked={selectedRows.length !== 0}
          indeterminate={
            selectedRows.length !== 0 &&
            selectedRows.length !== listDataSiswa.length
          }
          onChange={() =>
            setSelectedRows(
              selectedRows.length === listDataSiswa.length
                ? []
                : listDataSiswa.map((position) => position.id)
            )
          }
        />
      </Table.Th>
      <Table.Th>Foto</Table.Th>
      <Table.Th>Nama</Table.Th>
      <Table.Th>Jenis Kel</Table.Th>
      <Table.Th>Tahun Ajaran</Table.Th>
      <Table.Th>Jenjang</Table.Th>
    </Table.Tr>
  );

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Pendaftar</h1>
        <div className="flex items-center gap-2 ml-auto">
          <InputSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <ButtonRefresh
            isLoading={false}
            onClick={() => {
              setSearchValue('');
              toggle();
            }}
          />
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
        {listDataSiswa?.length > 0 ? (
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