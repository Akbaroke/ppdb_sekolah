import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import api from '../../api';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Notify } from '../../components/Notify';
import { ErrorResponse } from '../../interfaces/pages';
import Layout from '../../layouts';

type Form1Type = {
  email: string;
};

type Form2Type = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function Forgot() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);

  const form1 = useForm<Form1Type>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
    },
  });

  const form2 = useForm<Form2Type>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: {
      newPassword: (value) =>
        value.length < 8
          ? 'Kata sandi minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Kata sandi harus mengandung angka dan huruf.',
      confirmNewPassword: matchesField(
        'newPassword',
        'Harus sama dengan kata sandi.'
      ),
    },
  });

  const handleSubmitEmail = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/otp', {
        params: {
          email: form1.values.email,
          type_otp: 'forgot',
        },
      });
      Notify('success', data.message);
      localStorage.setItem('email', form1.values.email);
      navigate(`/otp?email=${form1.values.email}&type=forgot`, {
        replace: true,
      });
    } catch (error) {
      Notify('error', (error as ErrorResponse).response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResetPassword = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.patch('/reset_password', {
        token,
        email: localStorage.getItem('email'),
        new_password: form2.values.newPassword,
      });
      Notify('success', data.message);
      localStorage.removeItem('email');
      navigate('/login', { replace: true });
    } catch (error) {
      Notify('error', (error as ErrorResponse).response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const Page1 = () => (
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
      component="form"
      onSubmit={form1.onSubmit(handleSubmitEmail)}>
      <div className="flex flex-col mb-3">
        <h1 className="font-semibold text-lg m-auto w-max mb-4">
          Lupa Kata Sandi
        </h1>
        <p className="text-sm text-center max-w-[250px] m-auto text-gray-500">
          Masukkan email yang terdaftar dan pastikan email aktif.
        </p>
      </div>
      <TextInput
        label="Email"
        placeholder="saya@email.com"
        type="email"
        required
        value={form1.values.email}
        error={form1.errors.email as string}
        onChange={(e) => form1.setFieldValue('email', e.currentTarget.value)}
        readOnly={isLoading}
      />
      <Button
        fullWidth
        mt="xl"
        type="submit"
        disabled={!form1.isValid()}
        loading={isLoading}>
        Lanjutkan
      </Button>
      <div className="mt-6 flex flex-col gap-1">
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Batal ubah kata sandi ?{' '}
          <Link to="/login">
            <Anchor size="sm" component="button">
              Kembali
            </Anchor>
          </Link>
        </Text>
      </div>
    </Paper>
  );

  const Page2 = () => (
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
      component="form"
      onSubmit={form2.onSubmit(handleSubmitResetPassword)}>
      <div className="flex flex-col mb-5">
        <h1 className="font-semibold text-lg m-auto w-max mb-4">
          Lupa Kata Sandi
        </h1>
        <p className="text-sm text-center max-w-[280px] m-auto text-gray-500">
          Masukkan kata sandi baru kamu. Pastikan untuk mengingat sandi baru
          ini.
        </p>
      </div>
      <PasswordInput
        label="Kata sandi baru"
        placeholder="Kata sandi baru"
        required
        mt="md"
        value={form2.values.newPassword}
        error={form2.errors.newPassword as string}
        onChange={(e) =>
          form2.setFieldValue('newPassword', e.currentTarget.value)
        }
      />
      <PasswordInput
        label="Ulangi kata sandi baru"
        placeholder="Ulangi kata sandi baru"
        required
        mt="md"
        value={form2.values.confirmNewPassword}
        error={form2.errors.confirmNewPassword as string}
        onChange={(e) =>
          form2.setFieldValue('confirmNewPassword', e.currentTarget.value)
        }
      />
      <Button fullWidth mt="xl" type="submit" disabled={!form2.isValid()}>
        Simpan
      </Button>
      <div className="mt-6 flex flex-col gap-1">
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Batal ubah kata sandi ?{' '}
          <Link to="/login">
            <Anchor size="sm" component="button">
              Kembali
            </Anchor>
          </Link>
        </Text>
      </div>
    </Paper>
  );

  return (
    <Layout>
      <Container size={420}>{!token ? Page1() : Page2()}</Container>
    </Layout>
  );
}
