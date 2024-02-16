import { ActionIcon, Badge, Grid, Loader } from '@mantine/core';
import Card from '../../../components/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api';
import handleErrorResponse from '../../../services/handleErrorResponse';
import { SiswaResponse } from '../../../interfaces/pages';
import NotDataFound from '../../../components/NotDataFound';
import { Pagination } from '../../../interfaces/store';
import { IconChevronDown } from '@tabler/icons-react';

export default function TabSiswa({
  status,
  searchValue,
  trigerFetch,
}: {
  status: string;
  searchValue: string;
  trigerFetch: boolean;
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [listDataSiswa, setListDataSiswa] = useState<SiswaResponse[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalData: 0,
    totalPage: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          `/siswa?status=${status}&page=1&s=${searchValue}`
        );
        setListDataSiswa(data.data);
        setPagination(data.pagination);
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setIsLoading(false);
      }
    };

    setListDataSiswa([]);
    fetch();
  }, [status, searchValue, trigerFetch]);

  const handleNextPage = async () => {
    setIsLoading(true);
    try {
      const nextPage = pagination.currentPage + 1;
      const { data } = await api.get(
        `/siswa?status=${status}&page=${nextPage}&s=${searchValue}`
      );
      setListDataSiswa([...listDataSiswa, ...data.data]);
      setPagination(data.pagination);
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader color="blue" size="sm" type="dots" className="mx-auto my-10" />
      ) : listDataSiswa.length > 0 ? (
        <Grid gutter="xs">
          {listDataSiswa?.map((item) => (
            <Grid.Col span={{ base: 12, md: 6 }} key={item.id}>
              <Card
                className="flex justify-between shadow-md cursor-pointer hover:shadow-none transition-all duration-300"
                onClick={() => navigate(`/admin/siswa/${item.id}`)}>
                <div className="flex items-center gap-3 sm:gap-5">
                  <img
                    src={item.imgUrl}
                    alt=""
                    className="w-[71px] h-[87px] rounded-[5px]"
                  />
                  <div className="flex flex-col justify-between gap-3">
                    <div className="flex flex-col gap-[2px]">
                      <h1 className="text-[14px] font-semibold">
                        {item.nama} ({item.nis})
                      </h1>
                      <p className="text-[12px]">{item.jenis_kelamin}</p>
                      <p className="text-[12px]">{item.tahun_ajaran}</p>
                    </div>
                    <Badge
                      variant="light"
                      color={
                        status === 'siswa'
                          ? 'teal'
                          : status === 'keluar'
                          ? 'red'
                          : 'blue'
                      }>
                      {status}
                    </Badge>
                  </div>
                </div>
                <Badge color="blue">{item.kelas}</Badge>
              </Card>
            </Grid.Col>
          ))}
          {pagination.totalPage > pagination.currentPage ? (
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              radius="xl"
              mx="auto"
              mt={20}
              loading={isLoading}
              aria-label="loadmore"
              onClick={handleNextPage}>
              <IconChevronDown
                style={{ width: '70%', height: '70%' }}
                color="gray"
                stroke={1.5}
              />
            </ActionIcon>
          ) : null}
        </Grid>
      ) : (
        <NotDataFound />
      )}
    </div>
  );
}
