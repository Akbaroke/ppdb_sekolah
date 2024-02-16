import { ActionIcon, Badge, Grid, Loader } from '@mantine/core';
import Card from '../../components/Card';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import handleErrorResponse from '../../services/handleErrorResponse';
import api from '../../api';
import { SiswaResponse } from '../../interfaces/pages';
import NotDataFound from '../../components/NotDataFound';

export default function SiswaTerdaftar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [listDataSiswa, setListDataSiswa] = useState<SiswaResponse[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get('/daftar_siswa');
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
        <h1 className="font-bold text-lg">Siswa Terdaftar</h1>
        <div className="flex items-center gap-2">
          <ActionIcon variant="light" size="lg">
            <IconSearch size={18} />
          </ActionIcon>
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
            {listDataSiswa?.map((item, index) => (
              <Grid.Col span={{ base: 12, md: 6 }} key={index}>
                <Card
                  className="flex justify-between shadow-md cursor-pointer hover:shadow-none transition-all duration-300"
                  key={item.id}
                  onClick={() => navigate(`/user/siswa-terdaftar/${item.id}`)}>
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
                      <Badge
                        variant="light"
                        color={
                          item.status === 'pendaftar'
                            ? 'yellow'
                            : item.status === 'siswa'
                            ? 'teal'
                            : item.status === 'keluar'
                            ? 'red'
                            : 'blue'
                        }>
                        {item.status}
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
