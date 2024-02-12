import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import {
  TahunAjaranAsync,
  fetchSearchTahunAjaran,
} from '../redux/slices/tahunAjaranSlice';
import {
  Button,
  Input,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  IconDeviceFloppy,
  IconSchool,
  IconTransferOut,
} from '@tabler/icons-react';
import calculateAge from '../utils/calculateAge';
import { IMaskInput } from 'react-imask';
import {
  AGAMA_LIST,
  GENDER_LIST,
  JENJANG_LIST,
  JOBS_LIST,
} from '../data/config';
import { FormType } from '../interfaces/components';
import InputFile from './InputFile';
import { DataUser } from '../interfaces/store';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

type Props = {
  type: 'create' | 'edit';
  handleSubmit: (e: FormType) => void;
  initialValue?: FormType;
};

const defaultValue: FormType = {
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
};

export default function FormSiswa({
  type,
  handleSubmit,
  initialValue = defaultValue,
}: Props) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [debounced] = useDebouncedValue(searchValue, 500);
  const tahunData = useSelector(
    (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
  );
  const { role } = useSelector((state: { auth: DataUser }) => state.auth);
  const isAdmin = role === 'admin';
  const isUserEditble = type === 'edit' && !isAdmin;

  const isMinimumLength = (value: string) => value.length >= 3;
  const isAlphabeticWithSpaces = (value: string) =>
    /^[a-zA-Z]+(?:\s{0,2}[a-zA-Z]+)*$/.test(value);
  const isNumeric = (value: number) => value > 0;
  const isFileSizeValid = (file: File) => file.size < 1000000;

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: initialValue,
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
          : value === ''
          ? null
          : 'Hanya boleh huruf dan spasi diantara kata',
      pekerjaan: (value: string) => (value ? null : 'Wajib diisi'),
      no_telepon: (value: string) =>
        value.replace(/[-\s+]/g, '').length > 10
          ? null
          : 'Nomor tidak valid dan Wajib diisi',
      alamat: (value: string) =>
        isMinimumLength(value) &&
        /^[a-zA-Z0-9.,]+(?:\s{0,2}[a-zA-Z0-9.,]+)*$/.test(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf, angka, titik, koma, dan spasi diantara kata',
      akta: (value) =>
        value
          ? isFileSizeValid(value as File)
            ? null
            : 'File tidak boleh melebihi 1MB'
          : 'Wajib diisi',
      kartu_keluarga: (value) =>
        value
          ? isFileSizeValid(value as File)
            ? null
            : 'File tidak boleh melebihi 1MB'
          : 'Wajib diisi',
      foto: (value) =>
        value
          ? isFileSizeValid(value as File)
            ? null
            : 'File tidak boleh melebihi 1MB'
          : 'Wajib diisi',
      jenjang: (value: string) => (value ? null : 'Wajib diisi'),
      tahun_ajaran: (value: string) => (value ? null : 'Wajib diisi'),
    },
  });

  useEffect(() => {
    if (debounced !== null){
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchSearchTahunAjaran({ searchQuery: debounced })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <form
      className="flex flex-col gap-5 px-1"
      onSubmit={form.onSubmit((e) => handleSubmit(e))}>
      <div>
        <h1 className="font-semibold">Biodata Siswa</h1>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 p-2">
          <div className="w-full flex flex-col gap-3">
            <TextInput
              label="Nama Lengkap Siswa"
              placeholder="Nama lengkap"
              required
              value={form.values.nama_lengkap}
              error={form.errors.nama_lengkap as string}
              onChange={(e) =>
                form.setFieldValue('nama_lengkap', e.currentTarget.value)
              }
              disabled={isUserEditble}
            />
            <DateInput
              label="Tanggal Lahir"
              valueFormat="DD/MM/YYYY"
              placeholder="Tanggal lahir"
              value={form.values.tanggal_lahir as Date}
              maxDate={new Date()}
              onChange={(e) => {
                form.setFieldValue('tanggal_lahir', e);
                form.setFieldValue('umur', calculateAge(e as Date).toString());
              }}
              disabled={isUserEditble}
            />
            <Select
              required
              label="Jenis Kelamin"
              placeholder="Jenis kelamin"
              data={GENDER_LIST}
              value={form.values.jenis_kelamin}
              error={form.errors.jenis_kelamin as string}
              onChange={(e) => form.setFieldValue('jenis_kelamin', e as string)}
              disabled={isUserEditble}
              comboboxProps={{
                transitionProps: {
                  transition: 'pop',
                  duration: 200,
                },
              }}
            />
            <NumberInput
              required
              label="Tinggi Badan"
              placeholder="cm"
              suffix=" cm"
              thousandSeparator="."
              decimalSeparator=","
              hideControls
              value={
                form.values.tinggi_badan === 0 ? '' : form.values.tinggi_badan
              }
              error={form.errors.tinggi_badan as string}
              onChange={(e) => form.setFieldValue('tinggi_badan', e as number)}
              min={1}
              max={200}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <TextInput
              label="Tempat Lahir"
              placeholder="Tempat lahir"
              required
              value={form.values.tempat_lahir}
              error={form.errors.tempat_lahir as string}
              onChange={(e) =>
                form.setFieldValue('tempat_lahir', e.currentTarget.value)
              }
              disabled={isUserEditble}
            />
            <TextInput
              label="Umur"
              placeholder="Umur"
              disabled
              value={form.values.umur}
              error={form.errors.umur as string}
              onChange={(e) =>
                form.setFieldValue('umur', e.currentTarget.value)
              }
            />
            <Select
              required
              label="Agama"
              placeholder="Agama"
              data={AGAMA_LIST}
              value={form.values.agama}
              error={form.errors.agama as string}
              onChange={(e) => form.setFieldValue('agama', e as string)}
              comboboxProps={{
                transitionProps: {
                  transition: 'pop',
                  duration: 200,
                },
              }}
            />
            <NumberInput
              required
              label="Berat Badan"
              placeholder="Kg"
              suffix=" Kg"
              thousandSeparator="."
              decimalSeparator=","
              hideControls
              value={
                form.values.berat_badan === 0 ? '' : form.values.berat_badan
              }
              error={form.errors.berat_badan as string}
              onChange={(e) => form.setFieldValue('berat_badan', e as number)}
              min={1}
              max={100}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Data Orang Tua/Wali</h1>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 p-2">
          <div className="w-full flex flex-col gap-3">
            <TextInput
              label="Nama Bapak"
              placeholder="Nama bapak"
              required
              value={form.values.nama_bapak}
              error={form.errors.nama_bapak as string}
              onChange={(e) =>
                form.setFieldValue('nama_bapak', e.currentTarget.value)
              }
              disabled={isUserEditble}
            />
            <TextInput
              label="Nama Ibu"
              placeholder="Nama ibu"
              required
              value={form.values.nama_ibu}
              error={form.errors.nama_ibu as string}
              onChange={(e) =>
                form.setFieldValue('nama_ibu', e.currentTarget.value)
              }
              disabled={isUserEditble}
            />
            <Select
              required
              label="Pekerjaan"
              placeholder="Pekerjaan"
              data={JOBS_LIST}
              value={form.values.pekerjaan}
              error={form.errors.pekerjaan as string}
              onChange={(e) => form.setFieldValue('pekerjaan', e as string)}
              comboboxProps={{
                transitionProps: {
                  transition: 'pop',
                  duration: 200,
                },
              }}
            />
            <Input.Wrapper required label="No. Telepon">
              <Input
                component={IMaskInput}
                mask="0000-0000-00000"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                placeholder="08XX-XXXX-XXXX"
                value={form.values.no_telepon}
                error={form.errors.no_telepon as string}
                onChange={(e: { currentTarget: { value: string } }) =>
                  form.setFieldValue('no_telepon', e.currentTarget.value)
                }
              />
              <Input.Error>{form.errors.no_telepon}</Input.Error>
            </Input.Wrapper>
          </div>
          <div className="w-full flex flex-col gap-3">
            <TextInput
              label="Nama Wali (Opsional)"
              placeholder="Nama wali"
              value={form.values.nama_wali}
              error={form.errors.nama_wali as string}
              onChange={(e) =>
                form.setFieldValue('nama_wali', e.currentTarget.value)
              }
            />
            <Textarea
              label="Alamat"
              placeholder="Alamat"
              required
              value={form.values.alamat}
              error={form.errors.alamat as string}
              onChange={(e) =>
                form.setFieldValue('alamat', e.currentTarget.value)
              }
              maxLength={250}
              autosize
              minRows={4}
              maxRows={4}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Berkas Dokumen Siswa</h1>
        <div className="flex flex-col gap-3 p-2">
          <InputFile
            label="Akta"
            description="Unggah Akta dalam format PDF,JPEG,PNG dengan ukuran maksimal 1MB"
            placeholder="Pilih File"
            value={form.values.akta as File}
            error={form.errors.akta as string}
            onChange={(e) => {
              form.setFieldValue('akta', e as File);
            }}
            accept={['image/png', 'image/jpeg', 'application/pdf']}
          />
          <InputFile
            label="Kartu Keluarga"
            description="Unggah Kartu Keluarga dalam format PDF,JPEG,PNG dengan ukuran maksimal 1MB"
            placeholder="Pilih File"
            value={form.values.kartu_keluarga as File}
            error={form.errors.kartu_keluarga as string}
            onChange={(e) => {
              form.setFieldValue('kartu_keluarga', e as File);
            }}
            accept={['image/png', 'image/jpeg', 'application/pdf']}
          />
          <InputFile
            label="Foto"
            description="Unggah Foto dalam format JPEG,PNG dengan ukuran maksimal 1MB (Berpakaian rapi dan sopan)"
            placeholder="Pilih File"
            value={form.values.foto as File}
            error={form.errors.foto as string}
            onChange={(e) => {
              form.setFieldValue('foto', e as File);
            }}
            accept={['image/png', 'image/jpeg']}
          />
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Daftar Pengajuan</h1>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 p-2">
          <div className="w-full flex flex-col">
            <Select
              required
              label="Jenjang"
              placeholder="Jenjang"
              data={JENJANG_LIST}
              value={form.values.jenjang}
              error={form.errors.jenjang as string}
              onChange={(e) => form.setFieldValue('jenjang', e as string)}
              disabled={isUserEditble}
              comboboxProps={{
                transitionProps: {
                  transition: 'pop',
                  duration: 200,
                },
              }}
            />
          </div>
          <div className="w-full flex flex-col">
            <Select
              required
              label="Tahun Ajaran"
              placeholder="Tahun ajaran"
              data={tahunData.data?.map((item) => item.tahun_ajaran).sort()}
              // value={form.values.tahun_ajaran}
              error={form.errors.tahun_ajaran as string}
              onChange={(e) => form.setFieldValue('tahun_ajaran', e as string)}
              searchable
              searchValue={searchValue as string}
              onSearchChange={setSearchValue}
              disabled={isUserEditble}
              comboboxProps={{
                transitionProps: {
                  transition: 'pop',
                  duration: 200,
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-5 p-5">
        {isAdmin && type === 'edit' && (
          <Button
            variant="outline"
            color="red"
            className="w-full flex-1"
            rightSection={<IconTransferOut size={16} />}>
            Keluarkan
          </Button>
        )}

        <Button
          className="w-full flex-1"
          rightSection={<IconDeviceFloppy size={16} />}
          type="submit"
          disabled={!form.isValid()}>
          Simpan
        </Button>

        {isAdmin && type === 'edit' && (
          <Button
            variant="outline"
            color="indigo"
            className="w-full flex-1"
            rightSection={<IconSchool size={16} />}>
            Luluskan
          </Button>
        )}
      </div>
    </form>
  );
}
