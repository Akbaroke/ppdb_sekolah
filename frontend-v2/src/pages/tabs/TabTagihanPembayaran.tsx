import { Badge, NumberFormatter } from '@mantine/core';
import Card from '../../components/Card';
import moment from 'moment';

const dummyData = [
  {
    id: '1',
    type: 'p-reg',
    title: 'Biaya Registrasi',
    tanggal: 1720767341000,
    nominal: 50_000,
    status: 'Belum Lunas',
  },
  {
    id: '2',
    type: 'p-dusb',
    title: 'Biaya Pendaftaran Ulang Siswa Baru',
    tanggal: 1720767341000,
    nominal: 1_500_000,
    status: 'Belum Lunas',
  },
  {
    id: '3',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Januari 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '4',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Februari 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '5',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Maret 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '6',
    type: 'p-spp',
    title: 'Biaya SPP Bulan April 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '7',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Mei 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '8',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Juni 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '9',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Juli 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '10',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Agustus 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '11',
    type: 'p-spp',
    title: 'Biaya SPP Bulan September 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '12',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Oktober 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '13',
    type: 'p-spp',
    title: 'Biaya SPP Bulan November 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
  {
    id: '14',
    type: 'p-spp',
    title: 'Biaya SPP Bulan Desember 2024',
    tanggal: 1720767341000,
    nominal: 150_000,
    status: 'Belum Lunas',
  },
];

export default function TabTagihanPembayaran() {
  return (
    <div>
      {dummyData.map((item, index) => (
        <Card
          className="flex justify-between shadow-md cursor-pointer hover:shadow-none transition-all duration-300 mb-3"
          key={index}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold">{item.title}</h1>
              <p className="text-xs">
                Tagihan dibuat {moment(item.tanggal).format('DD MMMM YYYY')}
              </p>
            </div>
            <h1 className="font-bold text-green-600 text-lg">
              <NumberFormatter
                prefix="Rp "
                thousandSeparator="."
                decimalSeparator=","
                value={item.nominal}
              />
            </h1>
          </div>
          <Badge
            variant="light"
            color={
              item.status === 'Lunas'
                ? 'green'
                : item.status === 'Belum Lunas'
                ? 'red'
                : 'yellow'
            }>
            {item.status}
          </Badge>
        </Card>
      ))}
    </div>
  );
}
