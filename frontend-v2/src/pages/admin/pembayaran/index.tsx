import { Badge, Grid } from '@mantine/core';
import Card from '../../../components/Card';
import InputSearch from '../../../components/InputSearch';
import { useNavigate } from 'react-router-dom';

const pembayaran = [
  {
    code: 'SPP',
    type: 'Pembayaran SPP',
    href: '/spp',
    updated_at: '01/01/2024',
  },
  {
    code: 'DUSB',
    type: 'Daftar Ulang Siswa Baru',
    href: '/dusb',
    updated_at: '01/01/2024',
  },
  {
    code: 'DUKK',
    type: 'Daftar Ulang Kenaikan Kelas',
    href: '/dukk',
    updated_at: '01/01/2024',
  },
  {
    code: 'PI',
    type: 'Pembayaran Ijazah',
    href: '/pi',
    updated_at: '01/01/2024',
  },
];

export default function Pembayaran() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Pembayaran</h1>
        <div className="flex items-center gap-2">
          <InputSearch searchValue="" setSearchValue={() => null} />
        </div>
      </Card>
      <Grid gutter="xs">
        {pembayaran.map((item, index) => (
          <Grid.Col
            span={{ base: 12, md: 6 }}
            key={index}
            onClick={() => navigate(`/admin/pembayaran${item.href}`)}>
            <Card className="flex justify-between cursor-pointer shadow-md hover:shadow-none transition-all duration-300">
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-sm">{item.type}</h1>
                <p className="text-xs">{item.updated_at}</p>
              </div>
              <Badge color="blue">{item.code}</Badge>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
