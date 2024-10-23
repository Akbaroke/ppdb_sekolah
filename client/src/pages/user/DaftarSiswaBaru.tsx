import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import FormSiswa from '../../components/FormSiswa';
import { FormType } from '../../interfaces/components';
import api from '../../api';
import { useState } from 'react';
import handleErrorResponse from '../../services/handleErrorResponse';
import { Notify } from '../../components/Notify';

export default function DaftarSiswaBaru() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormType) => {
    setIsLoading(true);
    try {
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

      formData.append('akta', e.akta);
      formData.append('kartu_keluarga', e.kartu_keluarga);
      formData.append('foto', e.foto);
      formData.append('jenjang', e.jenjang);
      formData.append('tahun_ajaran', e.tahun_ajaran);
      // formData.forEach((value, key) => {
      //   console.log(key, '->', value);
      // });

      const { data } = await api.post('/daftar_siswa', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/user/siswa-terdaftar/${data.id}?tab=status`, {
        replace: true,
      });
      Notify('success', data.message);
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card header={<h1 className="font-bold">Formulir Pendaftaran</h1>}>
      <FormSiswa
        handleSubmit={handleSubmit}
        type="create"
        isLoading={isLoading}
      />
    </Card>
  );
}
