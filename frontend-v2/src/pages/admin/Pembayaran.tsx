import { Badge, Grid } from '@mantine/core';
import Card from '../../components/Card';
import InputSearch from '../../components/InputSearch';

const pembayaran = [
  {
    code: 'SPP',
    type: 'Pembayaran SPP',
    href: '/pembayaran-spp',
    updated_at: '01/01/2024',
  },
  {
    code: 'DUSB',
    type: 'Daftar Ulang Siswa Baru',
    href: '/daftar-ulang-siswa-baru',
    updated_at: '01/01/2024',
  },
  {
    code: 'DUKK',
    type: 'Daftar Ulang Kenaikan Kelas',
    href: '/daftar-ulang-kenaikan-kelas',
    updated_at: '01/01/2024',
  },
  {
    code: 'PI',
    type: 'Pembayaran Ijazah',
    href: '/pembayaran-ijazah',
    updated_at: '01/01/2024',
  },
];

export default function Pembayaran() {
  return (
    <div className="flex flex-col gap-3">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Pembayaran</h1>
        <div className="flex items-center gap-2">
          <InputSearch />
        </div>
      </Card>
      <Grid gutter="xs">
        {pembayaran.map((item) => (
          <Grid.Col span={{ base: 12, md: 6 }}>
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
