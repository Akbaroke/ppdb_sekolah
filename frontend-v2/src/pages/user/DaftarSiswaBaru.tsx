import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import FormSiswa from '../../components/FormSiswa';
import { FormType } from '../../interfaces/components';

export default function DaftarSiswaBaru() {
  const navigate = useNavigate();
  const handleSubmit = async (e: FormType) => {
    try {
      const bodyRequest = {
        siswa: {
          nama: e.nama_lengkap,
          tempat_lahir: e.tempat_lahir,
          tanggal_lahir: e.tanggal_lahir,
          umur: e.umur,
          jenis_kelamin: e.jenis_kelamin,
          agama: e.agama,
          tinggi_badan: e.tinggi_badan,
          berat_badan: e.berat_badan,
        },
        wali: {
          nama_bapak: e.nama_bapak,
          nama_ibu: e.nama_ibu,
          nama_wali: e.nama_wali,
          pekerjaan: e.pekerjaan,
          no_telepon: e.no_telepon,
          alamat: e.alamat,
        },
        akta: e.akta,
        kartu_keluarga: e.kartu_keluarga,
        foto: e.foto,
        jenjang: e.jenjang,
        tahun_ajaran: e.tahun_ajaran,
      };
      console.log(bodyRequest);
      navigate(`/user/siswa-terdaftar/${1}?tab=status`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card header={<h1 className="font-bold">Formulir Pendaftaran</h1>}>
      <FormSiswa handleSubmit={handleSubmit} type="create" />
    </Card>
  );
}
