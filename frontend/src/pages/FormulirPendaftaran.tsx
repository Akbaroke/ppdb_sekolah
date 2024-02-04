import { useForm } from '@mantine/form';
import Card from '../components/atoms/Card';
import InputText from '../components/atoms/InputText';
import InputFile from '../components/atoms/InputFile';
import { FileWithPath } from '@mantine/dropzone';
import SelectOption from '../components/atoms/SelectOption';
import InputDate from '../components/atoms/InputDate';
import calculateAge from '../utils/calculateAge';
import InputNumber from '../components/atoms/InputNumber';
import { useState } from 'react';
import Button from '../components/atoms/Button';

type FormType = {
  nama_lengkap: string;
  tanggal_lahir: Date | null;
  jenis_kelamin: string;
  tinggi_badan: number;
  tempat_lahir: string;
  umur: string;
  agama: string;
  berat_badan: number;
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
  const [fileAkta, setFileAkta] = useState<FileWithPath>();
  const [fileKartuKeluarga, setFileKartuKeluarga] = useState<FileWithPath>();
  const [fileFoto, setFileFoto] = useState<FileWithPath>();

  const isMinimumLength = (value: string) => value.length >= 3;
  const isAlphabeticWithSpaces = (value: string) =>
    /^[a-zA-Z]+(?:\s{0,2}[a-zA-Z]+)*$/.test(value);
  const isNumeric = (value: number) => value > 0;

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
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
      akta: '',
      kartu_keluarga: '',
      foto: '',
      jenjang: '',
      tahun_ajaran: '',
    },
    validate: {
      nama_lengkap: (value: string) =>
        isMinimumLength(value) && isAlphabeticWithSpaces(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf dan spasi diantara kata',
      tanggal_lahir: (value) => (value ? null : 'Wajib diisi'),
      jenis_kelamin: (value: string) => (value ? null : 'Wajib diisi'),
      tinggi_badan: (value: number) =>
        isNumeric(value) ? null : 'Wajib diisi',
      tempat_lahir: (value: string) =>
        isMinimumLength(value) && isAlphabeticWithSpaces(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf dan spasi diantara kata',
      agama: (value: string) => (value ? null : 'Wajib diisi'),
      berat_badan: (value: number) => (isNumeric(value) ? null : 'Wajib diisi'),
      nama_ibu: (value: string) =>
        isMinimumLength(value) && isAlphabeticWithSpaces(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf dan spasi diantara kata',
      nama_bapak: (value: string) =>
        isMinimumLength(value) && isAlphabeticWithSpaces(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf dan spasi diantara kata',
      nama_wali: (value: string) =>
        isAlphabeticWithSpaces(value)
          ? null
          : 'Hanya boleh huruf dan spasi diantara kata',
      pekerjaan: (value: string) =>
        isMinimumLength(value) && isAlphabeticWithSpaces(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf dan spasi diantara kata',
      no_telepon: (value: string) =>
        value.replace(/[-\s+]/g, '').length > 10
          ? null
          : 'Nomor tidak valid dan Wajib diisi',
      alamat: (value: string) =>
        isMinimumLength(value) &&
        /^[a-zA-Z0-9.,]+(?:\s{0,2}[a-zA-Z0-9.,]+)*$/.test(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf, angka, titik, koma, dan spasi diantara kata',
      akta: (value: string) => (value ? null : 'Wajib diisi'),
      kartu_keluarga: (value: string) => (value ? null : 'Wajib diisi'),
      foto: (value: string) => (value ? null : 'Wajib diisi'),
      jenjang: (value: string) => (value ? null : 'Wajib diisi'),
      tahun_ajaran: (value: string) => (value ? null : 'Wajib diisi'),
    },
  });

  const handleSubmit = async () => {
    try {
      console.log(form.values);
      console.log({ fileAkta, fileKartuKeluarga, fileFoto });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card header={<h1 className="font-bold">Formulir Pendaftaran</h1>}>
      <form
        className="flex flex-col gap-5 px-1"
        onSubmit={form.onSubmit(handleSubmit)}>
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
              <InputDate
                label="Tanggal Lahir"
                id="tanggal_lahir"
                required
                maxDate={new Date()}
                placeholder="Tanggal lahir"
                value={form.values.tanggal_lahir as Date}
                errorLabel={form.errors.tanggal_lahir as string}
                onChange={(e) => {
                  form.setFieldValue('tanggal_lahir', e);
                  form.setFieldValue('umur', calculateAge(e).toString());
                }}
              />
              <SelectOption
                label="Jenis Kelamin"
                id="jenis_kelamin"
                required
                placeholder="Jenis kelamin"
                value={form.values.jenis_kelamin}
                errorLabel={form.errors.jenis_kelamin as string}
                onChange={(e) =>
                  form.setFieldValue('jenis_kelamin', e as string)
                }
                data={[
                  {
                    value: 'laki-laki',
                    label: 'Laki-laki',
                  },
                  {
                    value: 'perempuan',
                    label: 'Perempuan',
                  },
                ]}
              />
              <InputNumber
                label="Tinggi Badan"
                id="tinggi_badan"
                required
                placeholder="Tinggi badan (Angka)"
                value={form.values.tinggi_badan}
                errorLabel={form.errors.tinggi_badan as string}
                onChange={(e) => form.setFieldValue('tinggi_badan', e)}
                min={1}
                max={200}
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
                placeholder="Umur"
                disabled
                value={form.values.umur}
                errorLabel={form.errors.umur as string}
                onChange={(e) => form.setFieldValue('umur', e as string)}
              />
              <SelectOption
                label="Agama"
                id="agama"
                required
                placeholder="Agama"
                value={form.values.agama}
                errorLabel={form.errors.agama as string}
                onChange={(e) => form.setFieldValue('agama', e as string)}
                data={[
                  {
                    value: 'islam',
                    label: 'Islam',
                  },
                  {
                    value: 'protestan',
                    label: 'Protestan',
                  },
                  {
                    value: 'katolik',
                    label: 'Katolik',
                  },
                  {
                    value: 'hindu',
                    label: 'Hindu',
                  },
                  {
                    value: 'buddha',
                    label: 'Buddha',
                  },
                  {
                    value: 'khonghucu',
                    label: 'Khonghucu',
                  },
                ]}
              />
              <InputNumber
                label="Berat Badan"
                id="berat_badan"
                required
                placeholder="Berat badan (Angka)"
                value={form.values.berat_badan as number}
                errorLabel={form.errors.berat_badan as string}
                onChange={(e) => form.setFieldValue('berat_badan', e)}
                min={1}
                max={100}
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
                type="no_phone"
                required
                placeholder="08XX-XXXX-XXXX"
                value={form.values.no_telepon}
                errorLabel={form.errors.no_telepon as string}
                onChange={(e) => form.setFieldValue('no_telepon', e as string)}
              />
            </div>
            <div className="w-full flex flex-col">
              <InputText
                label="Nama Wali (Opsional)"
                id="nama_wali"
                placeholder="Nama wali"
                value={form.values.nama_wali}
                errorLabel={form.errors.nama_wali as string}
                onChange={(e) => form.setFieldValue('nama_wali', e as string)}
              />
              <InputText
                label="Alamat"
                id="alamat"
                type="textarea"
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
          <h1 className="font-semibold">Berkas Dokumen Siswa</h1>
          <div className="flex flex-col">
            <InputFile
              label="Akta"
              id="akta"
              placeholder="Unggah Akta dalam format PDF,JPEG,PNG dengan ukuran maksimal 1MB"
              required
              value={form.values.akta}
              errorLabel={form.errors.akta as string}
              onChange={(e) => {
                form.setFieldValue(
                  'akta',
                  URL.createObjectURL(e as FileWithPath)
                );
                setFileAkta(e as FileWithPath);
              }}
            />
            <InputFile
              label="Kartu Keluarga"
              id="kartu_keluarga"
              placeholder="Unggah Kartu Keluarga dalam format PDF,JPEG,PNG dengan ukuran maksimal 1MB"
              required
              value={form.values.kartu_keluarga}
              errorLabel={form.errors.kartu_keluarga as string}
              onChange={(e) => {
                form.setFieldValue(
                  'kartu_keluarga',
                  URL.createObjectURL(e as FileWithPath)
                );
                setFileKartuKeluarga(e as FileWithPath);
              }}
            />
            <InputFile
              label="Foto"
              id="foto"
              isDisablePdf={true}
              placeholder="Unggah Foto dalam format JPEG,PNG dengan ukuran maksimal 1MB (Berpakaian rapi dan sopan)"
              required
              value={form.values.foto}
              errorLabel={form.errors.foto as string}
              onChange={(e) => {
                form.setFieldValue(
                  'foto',
                  URL.createObjectURL(e as FileWithPath)
                );
                setFileFoto(e as FileWithPath);
              }}
            />
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Daftar Pengajuan</h1>
          <div className="flex justify-between gap-5 px-2">
            <div className="w-full flex flex-col">
              <SelectOption
                label="Jenjang"
                id="jenjang"
                required
                placeholder="Jenjang"
                value={form.values.jenjang}
                errorLabel={form.errors.jenjang as string}
                onChange={(e) => form.setFieldValue('jenjang', e as string)}
                data={[
                  {
                    value: 'pg',
                    label: 'PG',
                  },
                  {
                    value: 'tka',
                    label: 'TKA',
                  },
                  {
                    value: 'tkb',
                    label: 'TKB',
                  },
                ]}
              />
            </div>
            <div className="w-full flex flex-col">
              <SelectOption
                label="Tahun Ajaran"
                id="tahun_ajaran"
                required
                placeholder="Tahun ajaran"
                value={form.values.tahun_ajaran}
                errorLabel={form.errors.tahun_ajaran as string}
                onChange={(e) =>
                  form.setFieldValue('tahun_ajaran', e as string)
                }
                data={[
                  {
                    value: '2021/2022',
                    label: '2021/2022',
                  },
                  {
                    value: '2022/2023',
                    label: '2022/2023',
                  },
                  {
                    value: '2023/2024',
                    label: '2023/2024',
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <Button className="mx-20 my-10" type="submit">
          Simpan
        </Button>
      </form>
    </Card>
  );
}
