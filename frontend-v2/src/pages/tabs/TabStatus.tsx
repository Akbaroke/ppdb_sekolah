import { Badge } from '@mantine/core';
import Card from '../../components/Card';

export default function TabStatus() {
  return (
    <Card>
      <div className="flex justify-between sm:flex-row flex-col-reverse gap-10 p-2">
        <div className="flex gap-5">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <p>Tahun Ajaran</p>
            <p>No. Pendaftaran</p>
            <p>Tanggal Daftar</p>
            <p>Jenjang</p>
            <p>Kelas</p>
            <p>Biaya Pendaftaran</p>
            <p>Status Pembayaran</p>
            <p>NIS</p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p>: 2023/2024</p>
            <p>: 0601241</p>
            <p>: 6 Januari 2024</p>
            <p>: TKA</p>
            <p>: -</p>
            <p>
              : <b>Rp 50.000</b>
            </p>
            <p className="text-red-500">: Belum Lunas</p>
            <p>: -</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center mr-3">
          <img
            src="https://cdn.discordapp.com/attachments/1015028360759492710/1199297491431067648/images_1.png?ex=65c207d3&is=65af92d3&hm=57e728daa7e3c6202a1f6a9cae814309e9bc2657e046a48f9389cff2f3340379&"
            alt=""
            className="h-[130px] rounded-[5px]"
          />
          <Badge variant="light" color="yellow">
            pendaftar
          </Badge>
        </div>
      </div>
    </Card>
  );
}
