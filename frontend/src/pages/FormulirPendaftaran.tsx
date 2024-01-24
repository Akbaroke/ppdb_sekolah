import { useForm } from '@mantine/form';
import Card from '../components/atoms/Card';
import InputText from '../components/atoms/InputText';

type FormType = {
  nama_lengkap: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  tinggi_badan: string;
  tempat_lahir: string;
  umur: string;
  agama: string;
  berat_badan: string;
  nama_ibu: string;
  nama_bapak: string;
  nama_wali: string;
  pekerjaan: string;
  no_telepon: string;
  alamat: string;
  akta: string;
  kartu_keluarga: string;
  foto: string;
  jenjang: string;
  tahun_ajaran: string;
};

export default function FormulirPendaftaran() {
  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      nama_lengkap: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      tinggi_badan: '',
      tempat_lahir: '',
      umur: '',
      agama: '',
      berat_badan: '',
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
    },
    validate: {},
  });

  return (
    <Card header={<h1 className="font-bold">Formulir Pendaftaran</h1>}>
      <form className="flex flex-col gap-5 px-1">
        <div>
          <h1 className="font-semibold">Biodata Siswa</h1>
          <div className="flex justify-between gap-5 px-2">
            <div className="w-full flex flex-col">
              <InputText
                label="Nama Lengkap Siswa"
                id="nama_lengkap"
                required
                placeholder="Nama lengkap"
                value={form.values.nama_lengkap}
                errorLabel={form.errors.nama_lengkap as string}
                onChange={(e) =>
                  form.setFieldValue('nama_lengkap', e as string)
                }
              />
              <InputText
                label="Tanggal Lahir"
                id="tanggal_lahir"
                required
                placeholder="Tanggal lahir"
                value={form.values.tanggal_lahir}
                errorLabel={form.errors.tanggal_lahir as string}
                onChange={(e) =>
                  form.setFieldValue('tanggal_lahir', e as string)
                }
              />
              <InputText
                label="Jenis Kelamin"
                id="jenis_kelamin"
                required
                placeholder="Jenis kelamin"
                value={form.values.jenis_kelamin}
                errorLabel={form.errors.jenis_kelamin as string}
                onChange={(e) =>
                  form.setFieldValue('jenis_kelamin', e as string)
                }
              />
              <InputText
                label="Tinggi Badan"
                id="tinggi_badan"
                required
                placeholder="Tinggi badan"
                value={form.values.tinggi_badan}
                errorLabel={form.errors.tinggi_badan as string}
                onChange={(e) =>
                  form.setFieldValue('tinggi_badan', e as string)
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <InputText
                label="Tempat Lahir"
                id="tempat_lahir"
                required
                placeholder="Tempat lahir"
                value={form.values.tempat_lahir}
                errorLabel={form.errors.tempat_lahir as string}
                onChange={(e) =>
                  form.setFieldValue('tempat_lahir', e as string)
                }
              />
              <InputText
                label="Umur"
                id="umur"
                required
                placeholder="Umur"
                disabled
                value={form.values.umur}
                errorLabel={form.errors.umur as string}
                onChange={(e) => form.setFieldValue('umur', e as string)}
              />
              <InputText
                label="Agama"
                id="agama"
                required
                placeholder="Agama"
                value={form.values.agama}
                errorLabel={form.errors.agama as string}
                onChange={(e) => form.setFieldValue('agama', e as string)}
              />
              <InputText
                label="Berat Badan"
                id="berat_badan"
                required
                placeholder="Berat badan"
                value={form.values.berat_badan}
                errorLabel={form.errors.berat_badan as string}
                onChange={(e) => form.setFieldValue('berat_badan', e as string)}
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Data Orang Tua/Wali</h1>
          <div className="flex justify-between gap-5 px-2">
            <div className="w-full flex flex-col">
              <InputText
                label="Nama Ibu (Orang Tua)"
                id="nama_ibu"
                required
                placeholder="Nama ibu"
                value={form.values.nama_ibu}
                errorLabel={form.errors.nama_ibu as string}
                onChange={(e) => form.setFieldValue('nama_ibu', e as string)}
              />
              <InputText
                label="Nama Bapak (Orang Tua)"
                id="nama_bapak"
                required
                placeholder="Nama bapak"
                value={form.values.nama_bapak}
                errorLabel={form.errors.nama_bapak as string}
                onChange={(e) => form.setFieldValue('nama_bapak', e as string)}
              />
              <InputText
                label="Pekerjaan"
                id="pekerjaan"
                required
                placeholder="Pekerjaan"
                value={form.values.pekerjaan}
                errorLabel={form.errors.pekerjaan as string}
                onChange={(e) => form.setFieldValue('pekerjaan', e as string)}
              />
              <InputText
                label="No. Telepon"
                id="no_telepon"
                required
                placeholder="08XXXXXXXXX"
                value={form.values.no_telepon}
                errorLabel={form.errors.no_telepon as string}
                onChange={(e) => form.setFieldValue('no_telepon', e as string)}
              />
            </div>
            <div className="w-full flex flex-col">
              <InputText
                label="Nama (Wali)"
                id="nama_wali"
                required
                placeholder="Nama wali"
                value={form.values.nama_wali}
                errorLabel={form.errors.nama_wali as string}
                onChange={(e) => form.setFieldValue('nama_wali', e as string)}
              />
              <InputText
                label="Alamat"
                id="alamat"
                required
                placeholder="Alamat"
                value={form.values.alamat}
                errorLabel={form.errors.alamat as string}
                onChange={(e) => form.setFieldValue('alamat', e as string)}
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Daftar Pengajuan</h1>
          <div className="flex justify-between gap-5 px-2">
            <InputText
              label="Jenjang"
              id="jenjang"
              required
              placeholder="Jenjang"
              value={form.values.jenjang}
              errorLabel={form.errors.jenjang as string}
              onChange={(e) => form.setFieldValue('jenjang', e as string)}
            />
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Daftar Pengajuan</h1>
          <div className="flex justify-between gap-5 px-2">
            <div className="w-full flex flex-col">
              <InputText
                label="Jenjang"
                id="jenjang"
                required
                placeholder="Jenjang"
                value={form.values.jenjang}
                errorLabel={form.errors.jenjang as string}
                onChange={(e) => form.setFieldValue('jenjang', e as string)}
              />
            </div>
            <div className="w-full flex flex-col">
              <InputText
                label="Tahun Ajaran"
                id="tahun_ajaran"
                required
                placeholder="Tahun ajaran"
                value={form.values.tahun_ajaran}
                errorLabel={form.errors.tahun_ajaran as string}
                onChange={(e) =>
                  form.setFieldValue('tahun_ajaran', e as string)
                }
              />
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}
