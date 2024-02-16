import Card from '../../components/Card';
import { Badge, Grid, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ButtonRefresh from '../../components/ButtonRefresh';
import InputSearch from '../../components/InputSearch';
import { useEffect, useState } from 'react';
import handleErrorResponse from '../../services/handleErrorResponse';
import api from '../../api';
import { SiswaResponse } from '../../interfaces/pages';
import NotDataFound from '../../components/NotDataFound';

export default function Pendaftar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [listDataSiswa, setListDataSiswa] = useState<SiswaResponse[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get('/siswa?status=pendaftar');
        setListDataSiswa(data.data);
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Pendaftar</h1>
        <div className="flex items-center gap-2 ml-auto">
          <InputSearch searchValue="" setSearchValue={() => null} />
          <ButtonRefresh isLoading={false} onClick={() => null} />
        </div>
      </Card>
      <div>
        {isLoading ? (
          <Loader
            color="blue"
            size="sm"
            type="dots"
            className="mx-auto my-10"
          />
        ) : listDataSiswa.length > 0 ? (
          <Grid gutter="xs">
            {listDataSiswa?.map((item) => (
              <Grid.Col span={{ base: 12, md: 6 }} key={item.id}>
                <Card
                  className="flex justify-between shadow-md cursor-pointer hover:shadow-none transition-all duration-300"
                  onClick={() => navigate(`/admin/pendaftar/${item.id}`)}>
                  <div className="flex items-center gap-3 sm:gap-5">
                    <img
                      src={item.imgUrl}
                      alt=""
                      className="w-[71px] h-[87px] rounded-[5px]"
                    />
                    <div className="flex flex-col justify-between gap-3">
                      <div className="flex flex-col gap-[2px]">
                        <h1 className="text-[14px] font-semibold">
                          {item.nama} (
                          {item.nis ? item.nis : item.no_pendaftaran})
                        </h1>
                        <p className="text-[12px]">{item.jenis_kelamin}</p>
                        <p className="text-[12px]">{item.tahun_ajaran}</p>
                      </div>
                      <Badge variant="light" color="yellow">
                        pendaftar
                      </Badge>
                    </div>
                  </div>
                  <Badge color="blue">
                    {item.kelas ? item.kelas : item.jenjang}
                  </Badge>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <NotDataFound />
        )}
      </div>
    </div>
  );
}
