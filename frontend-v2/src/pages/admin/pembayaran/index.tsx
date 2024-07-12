import { Badge, Grid } from '@mantine/core';
import Card from '../../../components/Card';
import { useNavigate } from 'react-router-dom';
import { MdHistory } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';

const pembayaran = [
  {
    title: 'Riwayat Pembayaran SPP',
    href: '/riwayat-spp',
    icon: <MdHistory />,
    code: 'r-spp',
  },
  {
    title: 'Riwayat Pembayaran Daftar Ulang Siswa Baru',
    href: '/riwayat-dusb',
    icon: <MdHistory />,
    code: 'r-dusb',
  },
  {
    title: 'Detail Biaya Daftar Ulang Siswa Baru',
    href: '/detail-dusb',
    icon: <TbListDetails />,
    code: 'd-dusb',
  },
  {
    title: 'Riwayat Pembayaran Daftar Ulang Kenaikan Kelas',
    href: '/riwayat-dukk',
    icon: <MdHistory />,
    code: 'r-dukk',
  },
  {
    title: 'Detail Biaya Daftar Ulang Kenaikan Kelas',
    href: '/detail-dukk',
    icon: <TbListDetails />,
    code: 'd-dukk',
  },
  {
    title: 'Riwayat Pembayaran Ijazah',
    href: '/riwayat-ijazah',
    icon: <MdHistory />,
    code: 'r-ijazah',
  },
  {
    title: 'Detail Biaya Ijazah',
    href: '/detail-ijazah',
    icon: <TbListDetails />,
    code: 'd-ijazah',
  },
];

export default function Pembayaran() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Pembayaran</h1>
      </Card>
      <Grid gutter="xs">
        {pembayaran.map((item, index) => (
          <Grid.Col
            span={{ base: 12, md: 6 }}
            key={index}
            onClick={() => navigate(`/admin/pembayaran${item.href}`)}>
            <Card className="relative cursor-pointer shadow-md hover:shadow-none transition-all duration-300 overflow-hidden h-[120px] flex items-center [&>svg]:text-[120px] [&>svg]:absolute [&>svg]:opacity-10 [&>svg]:top-0 [&>svg]:right-0 [&>svg]:text-yellow-600">
              {item.icon}
              <div className="flex flex-col gap-2 justify-center">
                <h1 className="font-semibold text-base max-w-[220px]">
                  {item.title}
                </h1>
                <Badge size="xs">{item.code}</Badge>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
