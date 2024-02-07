import { Badge } from '@mantine/core';
import Card from '../../../components/Card';

const dummyData = [
  {
    type: 'Biaya Pendaftaran',
    date: '10 Januari 2024',
    nominal: 'Rp 50.000',
    isPaid: false,
  },
];

export default function TabRiwayatPembayaran() {
  return (
    <div>
      {dummyData.map((item) => (
        <Card className="flex justify-between shadow-md cursor-pointer hover:shadow-none transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold">{item.type}</h1>
              <p className="text-sm">{item.date}</p>
            </div>
            <h1 className="font-bold text-green-600 text-lg">{item.nominal}</h1>
          </div>
          <Badge variant="light" color={item.isPaid ? 'green' : 'red'}>
            {item.isPaid ? 'Lunas' : 'Belum Lunas'}
          </Badge>
        </Card>
      ))}
    </div>
  );
}
