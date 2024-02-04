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

type FormType = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    console.log(form.values);
    const { email, password } = form.values;
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });
      dispatch(login(data));
      navigate('/user');
    } catch (error) {
      console.log(error);
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
        />
        <Button fullWidth mt="xl" type="submit" disabled={!form.isValid()}>
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
