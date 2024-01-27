import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputText from '../components/atoms/InputText';
import AuthLayout from '../layouts/AuthLayout';
import { isEmail, useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import api from '../api';

type FormType = {
  email: string;
  password: string;
};

export default function Login() {
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
    <AuthLayout>
      <h1 className="text-center font-bold mb-5">Masuk</h1>
      <form className="flex flex-col" onSubmit={form.onSubmit(handleSubmit)}>
        <InputText
          label="Alamat email"
          id="email"
          type="email"
          required
          placeholder="Masukkan alamat email yang terdaftar"
          value={form.values.email}
          errorLabel={form.errors.email as string}
          onChange={(e) => form.setFieldValue('email', e as string)}
        />
        <InputText
          label="Kata sandi"
          id="password"
          required
          placeholder="Kata sandi"
          type="password"
          value={form.values.password}
          errorLabel={form.errors.password as string}
          onChange={(e) => form.setFieldValue('password', e as string)}
        />
        <Button className="mt-5 mx-10" type="submit" disabled={!form.isValid()}>
          Masuk
        </Button>
      </form>
      <div className="flex flex-col items-center gap-3 text-[14px] mt-5">
        <p className="">
          Belum punya akun ?{' '}
          <Link to="/register" className="font-bold text-gold">
            Daftar
          </Link>
        </p>
        <p>
          Lupa kata sandi ?{' '}
          <Link to="/forgot" className="font-bold text-gold">
            Ganti
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
