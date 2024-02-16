import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import {
  TahunAjaranAsync,
  fetchSearchTahunAjaran,
} from '../redux/slices/tahunAjaranSlice';
import {
  Button,
  Group,
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
import { IconUserCheck } from '@tabler/icons-react';
import ModalForm from './ModalForm';
import { useParams } from 'react-router-dom';

type Props = {
  type: 'create' | 'edit';
  handleSubmit: (e: FormType) => void;
  values?: FormType;
  isLoading?: boolean;
};

const initialValue: FormType = {
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
  status: '',
};

export default function FormSiswa({
  type,
  handleSubmit,
  values = initialValue,
  isLoading,
}: Props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [debounced] = useDebouncedValue(searchValue, 500);
  const tahunData = useSelector(
    (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
  );
  const { role } = useSelector((state: { auth: DataUser }) => state.auth);
  const [errorAkta, setErrorAkta] = useState('');
  const [errorKK, setErrorKK] = useState('');
  const [errorFoto, setErrorFoto] = useState('');

  const isAdmin = role === 'admin';
  const isUserEditble = type === 'edit' && !isAdmin;
  const isPendaftar = values?.status === 'pendaftar' ? false : isUserEditble;

  const isMinimumLength = (value: string) => value?.length >= 3;
  const isAlphabeticWithSpaces = (value: string) =>
    /^[a-zA-Z]+(?:\s{0,2}[a-zA-Z]+)*$/.test(value);
  const isNumeric = (value: number) => value > 0;

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
        value?.replace(/[-\s+]/g, '')?.length > 10
          ? null
          : 'Nomor tidak valid dan Wajib diisi',
      alamat: (value: string) =>
        isMinimumLength(value) &&
        /^[a-zA-Z0-9.,]+(?:\s{0,2}[a-zA-Z0-9.,]+)*$/.test(value)
          ? null
          : 'Minimal 3 karakter. Hanya boleh huruf, angka, titik, koma, dan spasi diantara kata',
      jenjang: (value: string) => (value ? null : 'Wajib diisi'),
      tahun_ajaran: (value: string) => (value ? null : 'Wajib diisi'),
    },
  });

  useEffect(() => {
    if (type === 'edit' && values) {
      setSearchValue(values.tahun_ajaran);
      form.setValues(values);
      // console.log(form.values.akta);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, values]);

  useEffect(() => {
    if (debounced !== null) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchSearchTahunAjaran({ searchQuery: debounced })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const isValidForm =
    !form.isValid() || !!errorAkta || !!errorKK || !!errorFoto;

  return (
    <div>
      <form
        className="flex flex-col gap-5 px-1"
        onSubmit={form.onSubmit((e) => {
          handleSubmit(e);
        })}>
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
                disabled={isPendaftar}
                readOnly={isLoading}
              />
              <DateInput
                label="Tanggal Lahir"
                valueFormat="DD/MM/YYYY"
                placeholder="Tanggal lahir"
                value={form.values.tanggal_lahir as Date}
                maxDate={new Date()}
                onChange={(e) => {
                  form.setFieldValue('tanggal_lahir', e);
                  form.setFieldValue(
                    'umur',
                    calculateAge(e as Date).toString()
                  );
                }}
                disabled={isPendaftar}
                readOnly={isLoading}
              />
              <Select
                required
                label="Jenis Kelamin"
                placeholder="Jenis kelamin"
                data={GENDER_LIST}
                value={form.values.jenis_kelamin}
                error={form.errors.jenis_kelamin as string}
                onChange={(e) =>
                  form.setFieldValue('jenis_kelamin', e as string)
                }
                disabled={isPendaftar}
                comboboxProps={{
                  transitionProps: {
                    transition: 'pop',
                    duration: 200,
                  },
                }}
                readOnly={isLoading}
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
                onChange={(e) =>
                  form.setFieldValue('tinggi_badan', e as number)
                }
                min={1}
                max={200}
                readOnly={isLoading}
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
                disabled={isPendaftar}
                readOnly={isLoading}
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
                readOnly={isLoading}
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
                readOnly={isLoading}
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
                readOnly={isLoading}
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
                disabled={isPendaftar}
                readOnly={isLoading}
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
                disabled={isPendaftar}
                readOnly={isLoading}
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
                readOnly={isLoading}
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
                  readOnly={isLoading}
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
                readOnly={isLoading}
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
                readOnly={isLoading}
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Berkas Dokumen Siswa</h1>
          <div className="flex flex-col gap-3 p-2">
            <InputFile
              label="Akta"
              description="Berupa foto atau softcopy (PDF,JPEG,PNG) - Max.1MB"
              placeholder="Pilih File"
              value={form.values.akta as File}
              error={errorAkta}
              setError={setErrorAkta}
              onChange={(e) => {
                form.setFieldValue('akta', e as File);
              }}
              accept={['image/png', 'image/jpeg', 'application/pdf']}
              readOnly={isLoading}
            />
            <InputFile
              label="Kartu Keluarga"
              description="Berupa foto atau softcopy (PDF,JPEG,PNG) - Max.1MB"
              placeholder="Pilih File"
              value={form.values.kartu_keluarga as File}
              error={errorKK}
              setError={setErrorKK}
              onChange={(e) => {
                form.setFieldValue('kartu_keluarga', e as File);
              }}
              accept={['image/png', 'image/jpeg', 'application/pdf']}
              readOnly={isLoading}
            />
            <InputFile
              label="Foto"
              description="Foto berpakaian sopan dan rapi (JPEG, JPG ,PNG) - Max.1MB"
              placeholder="Pilih File"
              value={form.values.foto as File}
              error={errorFoto}
              setError={setErrorFoto}
              onChange={(e) => {
                form.setFieldValue('foto', e as File);
              }}
              accept={['image/png', 'image/jpeg']}
              readOnly={isLoading}
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
                disabled={
                  isUserEditble || type === 'edit'
                    ? values?.status !== 'pendaftar'
                    : false
                }
                comboboxProps={{
                  transitionProps: {
                    transition: 'pop',
                    duration: 200,
                  },
                }}
                readOnly={isLoading}
              />
            </div>
            <div className="w-full flex flex-col">
              <Select
                required
                label="Tahun Ajaran"
                placeholder="Tahun ajaran"
                data={tahunData.data?.map((item) => item.tahun_ajaran).sort()}
                value={searchValue}
                error={form.errors.tahun_ajaran as string}
                onChange={(e) =>
                  form.setFieldValue('tahun_ajaran', e as string)
                }
                searchable
                searchValue={searchValue as string}
                onSearchChange={setSearchValue}
                disabled={
                  isUserEditble || type === 'edit'
                    ? values?.status !== 'pendaftar'
                    : false
                }
                comboboxProps={{
                  transitionProps: {
                    transition: 'pop',
                    duration: 200,
                  },
                }}
                readOnly={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="w-full p-5 flex gap-5">
          <Button
            fullWidth
            className="flex-1"
            rightSection={<IconDeviceFloppy size={16} />}
            type="submit"
            loading={isLoading}
            disabled={isValidForm}>
            Simpan
          </Button>
          {isAdmin && type === 'edit' && values?.status === 'pendaftar' && (
            <ModalForm
              title="Konfirmasi Penerimaan Siswa"
              id={id}
              formType="terima"
              className="flex-1">
              <Button
                variant="outline"
                color="teal"
                fullWidth
                rightSection={<IconUserCheck size={16} />}>
                Terima
              </Button>
            </ModalForm>
          )}
        </div>
      </form>
      <Group justify="center" className="w-full px-7 mt-5">
        {isAdmin && type === 'edit' && values?.status === 'siswa' && (
          <ModalForm
            title="Konfirmasi Keluarnya Siswa"
            id={id}
            formType="keluarkan"
            className="flex-1 w-full">
            <Button
              variant="outline"
              color="red"
              fullWidth
              rightSection={<IconTransferOut size={16} />}>
              Keluarkan
            </Button>
          </ModalForm>
        )}

        {isAdmin && type === 'edit' && values?.status === 'siswa' && (
          <ModalForm
            title="Konfirmasi Kelulusan Siswa"
            id={id}
            formType="luluskan"
            className="flex-1 w-full">
            <Button
              variant="outline"
              color="teal"
              fullWidth
              rightSection={<IconSchool size={16} />}>
              Luluskan
            </Button>
          </ModalForm>
        )}
      </Group>
    </div>
  );
}
