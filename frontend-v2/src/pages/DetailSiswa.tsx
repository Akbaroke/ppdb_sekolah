import { Button } from '@mantine/core';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import TabProfile from './tabs/TabProfile';
import TabStatus from './tabs/TabStatus';
import TabRiwayatPembayaran from './tabs/TabRiwayatPembayaran';
import { useSearchParams, useParams } from 'react-router-dom';
import ButtonBack from '../components/ButtonBack';
import { FormType } from '../interfaces/components';
import { DataStatus, SiswaDetailResponse } from '../interfaces/pages';
import api from '../api';
import handleErrorResponse from '../services/handleErrorResponse';

const tabs = [
  {
    key: 'profile',
    label: 'Profile',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'riwayat_pembayaran',
    label: 'Riwayat Pembayaran',
  },
];

export default function DetailSiswa() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string | null>(
    searchParams.get('tab') || tabs[0].key
  );
  const [isLoading, setIsLoading] = useState(false);
  const [dataSiswa, setDataSiswa] = useState<FormType>();
  const [dataStatus, setDataStatus] = useState<DataStatus>();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get<{ data: SiswaDetailResponse }>(
          `/daftar_siswa/${id}`
        );
        setDataSiswa({
          nama_lengkap: data.data?.siswa?.nama,
          tanggal_lahir: new Date(data.data?.siswa?.tanggal_lahir),
          jenis_kelamin: data.data?.siswa?.jenis_kelamin,
          tinggi_badan: data.data?.siswa.tinggi_badan,
          tempat_lahir: data.data?.siswa.tempat_lahir,
          umur: data.data?.siswa.umur.toString(),
          agama: data.data?.siswa.agama,
          berat_badan: data.data?.siswa.berat_badan,
          nama_ibu: data.data?.wali.nama_ibu,
          nama_bapak: data.data?.wali.nama_bapak,
          nama_wali: data.data?.wali.nama_wali,
          pekerjaan: data.data?.wali.pekerjaan,
          no_telepon: data.data?.wali.no_telepon,
          alamat: data.data?.wali.alamat,
          akta: data.data?.berkas.akta,
          kartu_keluarga: data.data?.berkas.kartu_keluarga,
          foto: data.data?.berkas.foto,
          jenjang: data.data?.jenjang,
          tahun_ajaran: data.data?.tahun_ajaran,
          status: data.data?.status,
        });

        setDataStatus({
          status: data.data?.status,
          foto: data.data?.berkas.foto,
          tahun_ajaran: data.data?.tahun_ajaran,
          no_pendaftaran: '-',
          tgl_daftar: '-',
          jenjang: data.data?.jenjang,
          // kelas: '-',
          biaya_pendaftaran: '-',
          status_bayar: false,
          // nis: '-',
        });
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setIsLoading(false);
      }
    };

    id && fetch();
  }, [id]);

  const TabsRender = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <TabProfile
            dataSiswa={dataSiswa}
            isLoading={isLoading}
            id={id as string}
          />
        );
      case 'status':
        return <TabStatus dataStatus={dataStatus as DataStatus} />;
      case 'riwayat_pembayaran':
        return <TabRiwayatPembayaran />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Card
        header={
          <div className="flex gap-2 items-center">
            <ButtonBack />
            <h1 className="font-bold">
              Data {dataSiswa?.status === 'pendaftar' ? 'Pendaftar' : 'Siswa'}
            </h1>
          </div>
        }
        className="pb-0">
        <div>
          {tabs.map((item) => (
            <Button
              variant="subtle"
              key={item.key}
              radius="xs"
              color={activeTab === item.key ? 'blue' : 'gray'}
              onClick={() => {
                setActiveTab(item.key);
                setSearchParams({ tab: item.key });
              }}
              styles={{
                root: {
                  color: activeTab === item.key ? '' : 'gray',
                  fontWeight: activeTab === item.key ? '' : '400',
                  borderBottom:
                    activeTab === item.key ? '2px solid #228be6' : '',
                },
              }}>
              {item.label}
            </Button>
          ))}
        </div>
      </Card>

      {TabsRender()}
    </div>
  );
}
