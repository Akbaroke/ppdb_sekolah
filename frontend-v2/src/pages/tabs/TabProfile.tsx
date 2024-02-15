import FormSiswa from '../../components/FormSiswa';
import { FormType } from '../../interfaces/components';
import Card from '../../components/Card';
import NotDataFound from '../../components/NotDataFound';
import { Loader } from '@mantine/core';
import api from '../../api';
import { Notify } from '../../components/Notify';
import { useState } from 'react';
import handleErrorResponse from '../../services/handleErrorResponse';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: string;
  isLoading: boolean;
  dataSiswa?: FormType;
};

export default function TabProfile({ isLoading, dataSiswa, id }: Props) {
  const navigate = useNavigate();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleSubmit = async (e: FormType) => {
    if (!dataSiswa) return;

    setIsLoadingSubmit(true);
    const { akta: akta1, kartu_keluarga: kk1, foto: foto1 } = dataSiswa;
    const { akta: akta2, kartu_keluarga: kk2, foto: foto2 } = e;

    const isAktaChanged = akta1 !== akta2;
    const isKKChanged = kk1 !== kk2;
    const isFotoChanged = foto1 !== foto2;

    const formData = new FormData();
    formData.append('siswa[nama]', e.nama_lengkap);
    formData.append('siswa[tempat_lahir]', e.tempat_lahir);
    formData.append(
      'siswa[tanggal_lahir]',
      e.tanggal_lahir ? e.tanggal_lahir.toISOString() : ''
    );
    formData.append('siswa[umur]', e.umur.toString());
    formData.append('siswa[jenis_kelamin]', e.jenis_kelamin);
    formData.append('siswa[agama]', e.agama);
    formData.append('siswa[tinggi_badan]', e.tinggi_badan.toString());
    formData.append('siswa[berat_badan]', e.berat_badan.toString());

    formData.append('wali_siswa[nama_bapak]', e.nama_bapak);
    formData.append('wali_siswa[nama_ibu]', e.nama_ibu);
    formData.append('wali_siswa[nama_wali]', e.nama_wali);
    formData.append('wali_siswa[pekerjaan]', e.pekerjaan);
    formData.append(
      'wali_siswa[no_telepon]',
      e.no_telepon.replace(/[-\s+]/g, '')
    );
    formData.append('wali_siswa[alamat]', e.alamat);

    if (isAktaChanged) {
      formData.append('akta', e.akta);
    }
    if (isKKChanged) {
      formData.append('kartu_keluarga', e.kartu_keluarga);
    }
    if (isFotoChanged) {
      formData.append('foto', e.foto);
    }
    formData.append('jenjang', e.jenjang);
    formData.append('tahun_ajaran', e.tahun_ajaran);
    formData.append('status', 'pendaftar');

    try {
      const { data } = await api.patch(`/daftar_siswa/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Notify('success', data.message);
      navigate('/user/siswa-terdaftar', {
        replace: true,
      });
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <Card>
      {isLoading ? (
        <Loader color="blue" size="sm" type="dots" className="mx-auto my-10" />
      ) : dataSiswa ? (
        <FormSiswa
          type="edit"
          handleSubmit={handleSubmit}
          values={dataSiswa}
          isLoading={isLoading || isLoadingSubmit}
        />
      ) : (
        <NotDataFound />
      )}
    </Card>
  );
}
