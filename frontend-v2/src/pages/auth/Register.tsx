import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { useState } from 'react';
import { Notify } from '../../components/Notify';
import { ErrorResponse } from '../../interfaces/pages';
import Layout from '../../layouts';

type FormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
      password: (value) =>
        value.length < 8
          ? 'Kata sandi minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Kata sandi harus mengandung angka dan huruf.',
      confirmPassword: matchesField(
        'password',
        'Harus sama dengan kata sandi.'
      ),
    },
  });

  const handleSubmit = async () => {
    const { email, password } = form.values;
    setIsLoading(true);
    try {
      const { data } = await api.post('/register', {
        email,
        password,
      });
      Notify('success', data.message);
      navigate(`/otp?email=${email}`);
    } catch (error) {
      Notify('error', (error as ErrorResponse).response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Container size={420}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          component="form"
          onSubmit={form.onSubmit(handleSubmit)}>
          <h1 className="font-semibold text-lg m-auto w-max mb-4">
            Daftar Akun
          </h1>
          <TextInput
            label="Email"
            placeholder="saya@email.com"
            required
            value={form.values.email}
            error={form.errors.email as string}
            onChange={(e) => form.setFieldValue('email', e.currentTarget.value)}
            readOnly={isLoading}
          />
          <PasswordInput
            label="Kata Sandi"
            placeholder="Kata sandi"
            required
            mt="md"
            value={form.values.password}
            error={form.errors.password as string}
            onChange={(e) =>
              form.setFieldValue('password', e.currentTarget.value)
            }
            readOnly={isLoading}
          />
          <PasswordInput
            label="Ulangi Kata Sandi"
            placeholder="Ulangi Kata sandi"
            required
            mt="md"
            value={form.values.confirmPassword}
            error={form.errors.confirmPassword as string}
            onChange={(e) =>
              form.setFieldValue('confirmPassword', e.currentTarget.value)
            }
            readOnly={isLoading}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            disabled={!form.isValid()}
            loading={isLoading}>
            Daftar
          </Button>
          <div className="mt-6 flex flex-col gap-1">
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Sudah punya akun ?{' '}
              <Link to="/login">
                <Anchor size="sm" component="button">
                  Masuk
                </Anchor>
              </Link>
            </Text>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
}
