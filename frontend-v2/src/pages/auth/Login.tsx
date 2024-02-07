import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { login } from '../../redux/slices/authSlice';
import { Notify } from '../../components/Notify';
import { ErrorResponse } from '../../interfaces/pages';
import { useState } from 'react';

type FormType = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
      password: (value) =>
        value.length < 8
          ? 'Kata sandi minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Kata sandi harus mengandung angka dan huruf.',
    },
  });

  const handleSubmit = async () => {
    const { email, password } = form.values;
    setIsLoading(true);
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });
      Notify('success', data.message);
      dispatch(login(data));
      navigate('/user');
    } catch (error) {
      Notify('error', (error as ErrorResponse).response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}>
        <h1 className="font-semibold text-lg m-auto w-max mb-4">Masuk</h1>
        <TextInput
          label="Email"
          placeholder="saya@email.com"
          type="email"
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
        <Button
          fullWidth
          mt="xl"
          type="submit"
          disabled={!form.isValid()}
          loading={isLoading}>
          Masuk
        </Button>
        <div className="mt-6 flex flex-col gap-1">
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Belum punya akun ?{' '}
            <Link to="/register">
              <Anchor size="sm" component="button">
                Daftar
              </Anchor>
            </Link>
          </Text>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Lupa kata sandi ?{' '}
            <Link to="/forgot">
              <Anchor size="sm" component="button">
                Ganti
              </Anchor>
            </Link>
          </Text>
        </div>
      </Paper>
    </Container>
  );
}
