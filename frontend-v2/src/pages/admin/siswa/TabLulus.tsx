import { Badge, Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { listSiswaDummy } from '../../../data/dummy';
import Card from '../../../components/Card';

export default function TabLulus() {
  const navigate = useNavigate();

  return (
    <Grid gutter="xs">
      {listSiswaDummy.map((item) => (
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
                <Badge variant="light" color="blue">
                  lulus
                </Badge>
              </div>
            </div>
            <Badge color="blue">{item.kelas}</Badge>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
