import { Badge, NumberFormatter } from '@mantine/core';
import Card from '../../components/Card';
import { DataStatus } from '../../interfaces/pages';
import ButtonViewUrl from '../../components/ButtonViewUrl';

type Props = {
  dataStatus: DataStatus;
};

export default function TabStatus({ dataStatus }: Props) {
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
            <p>Ijazah</p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p>: {dataStatus?.tahun_ajaran}</p>
            <p>: {dataStatus?.no_pendaftaran}</p>
            <p>: {dataStatus?.tgl_daftar}</p>
            <p>
              : <Badge color="blue">{dataStatus?.jenjang}</Badge>
            </p>
            <p>
              :{' '}
              {dataStatus?.kelas ? (
                <Badge color="blue">{dataStatus?.kelas}</Badge>
              ) : (
                '-'
              )}
            </p>
            <p>
              :{' '}
              <b>
                <NumberFormatter
                  prefix="Rp "
                  thousandSeparator="."
                  decimalSeparator=","
                  value={dataStatus?.biaya_pendaftaran}
                />
              </b>
            </p>
            <p className="text-red-500">
              :{' '}
              <Badge
                variant="light"
                color={dataStatus?.status_bayar ? 'teal' : 'red'}>
                {dataStatus?.status_bayar ? 'Lunas' : 'Belum Lunas'}
              </Badge>
            </p>
            <p>: {dataStatus?.nis ? dataStatus?.nis : '-'}</p>
            <ButtonViewUrl
              className="mb-[2px]"
              url={dataStatus?.ijazah as string}
              title="Ijazah Siswa">
              <p>
                :{' '}
                <b className="text-sm underline text-blue-500 cursor-pointer font-medium">
                  Lihat Ijazah
                </b>
              </p>
            </ButtonViewUrl>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center mr-3">
          <img
            src={dataStatus?.foto}
            alt=""
            className="h-[130px] rounded-[5px]"
          />
          <Badge
            variant="light"
            color={
              dataStatus?.status === 'pendaftar'
                ? 'yellow'
                : dataStatus?.status === 'siswa'
                ? 'teal'
                : dataStatus?.status === 'keluar'
                ? 'red'
                : 'blue'
            }>
            {dataStatus?.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
