import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputText from '../components/atoms/InputText';
import AuthLayout from '../layouts/AuthLayout';
import { isEmail, matchesField, useForm } from '@mantine/form';
import axios from '../axios';

type FormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
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
    console.log(form.values);
    try {
      const { data } = await axios.post('/register', {
        email: form.values.email,
        password: form.values.password,
      });
      console.log(data);
      navigate(`/otp?email=${form.values.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-center font-bold mb-5">Daftar Akun</h1>
      <form className="flex flex-col" onSubmit={form.onSubmit(handleSubmit)}>
        <InputText
          label="Alamat email"
          id="email"
          required
          placeholder="Masukkan alamat email yang aktif"
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
        <InputText
          label="Ulangi Kata sandi"
          id="confirmPassword"
          required
          placeholder="Ulangi Kata sandi"
          type="password"
          value={form.values.confirmPassword}
          errorLabel={form.errors.confirmPassword as string}
          onChange={(e) => form.setFieldValue('confirmPassword', e as string)}
        />
        <Button className="mt-5 mx-10" type="submit" disabled={!form.isValid()}>
          Daftar
        </Button>
      </form>
      <div className="flex flex-col items-center gap-3 text-[14px] mt-5">
        <p className="">
          Sudah punya akun ?{' '}
          <Link to="/login" className="font-bold text-gold">
            Masuk
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
