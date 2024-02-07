import { useEffect } from 'react';
import FormSiswa from '../../../components/FormSiswa';
import { FormType } from '../../../interfaces/components';
import Card from '../../../components/Card';

export default function TabProfile() {
  const handleInputChange = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const convertedFile = new File([blob], 'filename.png', {
        type: 'image/png',
      });
      return convertedFile;
    } catch (error) {
      console.error('Error converting URL to File:', error);
      return false;
    }
  };

  useEffect(() => {
    handleInputChange(
      'https://upload.wikimedia.org/wikipedia/id/thumb/e/e0/Iron_Man_bleeding_edge.jpg/250px-Iron_Man_bleeding_edge.jpg'
    ).then((file) => {
      console.log(file);
    });
  }, []);

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
