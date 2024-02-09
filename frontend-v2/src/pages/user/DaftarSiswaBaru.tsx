import Card from '../../components/Card';
import FormSiswa from '../../components/FormSiswa';
import { FormType } from '../../interfaces/components';

export default function DaftarSiswaBaru() {
  const handleSubmit = async (e: FormType) => {
    try {
      console.log(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card header={<h1 className="font-bold">Formulir Pendaftaran</h1>}>
      <FormSiswa
        handleSubmit={handleSubmit}
        initialValue={{
          nama_lengkap: '',
          tanggal_lahir: null,
          jenis_kelamin: '',
          tinggi_badan: 0,
          tempat_lahir: '',
          umur: '',
          agama: '',
          berat_badan: 0,
          nama_ibu: '',
          nama_bapak: '',
          nama_wali: '',
          pekerjaan: '',
          no_telepon: '',
          alamat: '',
          akta: null,
          kartu_keluarga: null,
          foto: null,
          jenjang: '',
          tahun_ajaran: '',
        }}
      />
    </Card>
  );
}
