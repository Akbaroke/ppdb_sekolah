import { ActionIcon, Badge, Grid } from '@mantine/core';
import Card from '../../components/Card';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const dataDummy = [
  {
    id: '1',
    imgUrl:
      'https://cdn.discordapp.com/attachments/1015028360759492710/1199297491431067648/images_1.png?ex=65c207d3&is=65af92d3&hm=57e728daa7e3c6202a1f6a9cae814309e9bc2657e046a48f9389cff2f3340379&',
    nama: 'Joni Sutejo',
    jenis_kelamin: 'Laki-laki',
    status: 'siswa',
    tahun_ajaran: '2022/2023',
    nis: '011001241',
    no_pendaftaran: '0601241',
    jenjang: 'TKA',
    kelas: 'TKA-1',
  },
  {
    id: '2',
    imgUrl:
      'https://cdn.discordapp.com/attachments/1015028360759492710/1199297491431067648/images_1.png?ex=65c207d3&is=65af92d3&hm=57e728daa7e3c6202a1f6a9cae814309e9bc2657e046a48f9389cff2f3340379&',
    nama: 'Joni Sutejo',
    jenis_kelamin: 'Laki-laki',
    status: 'pendaftar',
    tahun_ajaran: '2022/2023',
    nis: '',
    no_pendaftaran: '0601241',
    jenjang: 'TKA',
    kelas: '',
  },
  {
    id: '3',
    imgUrl:
      'https://cdn.discordapp.com/attachments/1015028360759492710/1199297491431067648/images_1.png?ex=65c207d3&is=65af92d3&hm=57e728daa7e3c6202a1f6a9cae814309e9bc2657e046a48f9389cff2f3340379&',
    nama: 'Joni Sutejo',
    jenis_kelamin: 'Laki-laki',
    status: 'keluar',
    tahun_ajaran: '2022/2023',
    nis: '011001241',
    no_pendaftaran: '0601241',
    jenjang: 'TKA',
    kelas: 'TKA-1',
  },
  {
    id: '4',
    imgUrl:
      'https://cdn.discordapp.com/attachments/1015028360759492710/1199297491431067648/images_1.png?ex=65c207d3&is=65af92d3&hm=57e728daa7e3c6202a1f6a9cae814309e9bc2657e046a48f9389cff2f3340379&',
    nama: 'Joni Sutejo',
    jenis_kelamin: 'Laki-laki',
    status: 'lulus',
    tahun_ajaran: '2022/2023',
    nis: '011001241',
    no_pendaftaran: '0601241',
    jenjang: 'TKA',
    kelas: 'TKA-1',
  },
];

export default function SiswaTerdaftar() {
  const navigate = useNavigate();

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
      <Grid gutter="xs">
        {dataDummy.map((item) => (
          <Grid.Col span={{ base: 12, md: 6 }}>
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
                      {item.nama} ({item.nis ? item.nis : item.no_pendaftaran})
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
    </div>
  );
}
