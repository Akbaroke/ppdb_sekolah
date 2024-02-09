import FormSiswa from '../../components/FormSiswa';
import { FormType } from '../../interfaces/components';
import Card from '../../components/Card';

export default function TabProfile() {
  const handleSubmit = async (e: FormType) => {
    try {
      console.log(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <FormSiswa
        handleSubmit={handleSubmit}
        initialValue={{
          nama_lengkap: 'Muhammad Akbar',
          tanggal_lahir: new Date(),
          jenis_kelamin: 'Laki-laki',
          tinggi_badan: 170,
          tempat_lahir: 'Bandung',
          umur: '',
          agama: 'Islam',
          berat_badan: 65,
          nama_ibu: '',
          nama_bapak: '',
          nama_wali: '',
          pekerjaan: '',
          no_telepon: '',
          alamat: '',
          akta: '',
          kartu_keluarga: '',
          foto: '',
          jenjang: '',
          tahun_ajaran: '',
        }}
      />
    </Card>
  );
}
