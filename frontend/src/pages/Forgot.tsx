import Button from '../components/atoms/Button';
import InputText from '../components/atoms/InputText';
import AuthLayout from '../layouts/AuthLayout';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

  const handleSubmitEmail = () => {
    console.log(form1.values);
    navigate(`/otp?email=${form1.values.email}&type=forgot`, { replace: true });
  };

  const handleSubmitResetPassword = () => {
    console.log(form2.values);
    navigate('/login', { replace: true });
  };

  const Page1 = () => (
    <>
      <h1 className="text-center font-bold mb-5">Lupa Kata Sandi</h1>
      <p className="text-[14px] text-center max-w-[300px] m-auto my-3">
        Masukkan email yang terdaftar dan pastikan email aktif.
      </p>
      <form
        className="flex flex-col"
        onSubmit={form1.onSubmit(handleSubmitEmail)}>
        <InputText
          label="Alamat email"
          id="email"
          required
          placeholder="Masukkan alamat email yang terdaftar"
          value={form1.values.email}
          errorLabel={form1.errors.email as string}
          onChange={(e) => form1.setFieldValue('email', e as string)}
        />
        <Button
          className="mt-8 mx-10"
          type="submit"
          disabled={!form1.isValid()}>
          Lanjutkan
        </Button>
      </form>
    </>
  );

  const Page2 = () => (
    <>
      <h1 className="text-center font-bold mb-5">Lupa Kata Sandi</h1>
      <p className="text-[14px] text-center max-w-[300px] m-auto my-3">
        Masukkan kata sandi baru kamu. Pastikan untuk mengingat sandi baru ini.
      </p>
      <form
        className="flex flex-col"
        onSubmit={form2.onSubmit(handleSubmitResetPassword)}>
        <InputText
          label="Kata sandi baru"
          id="newPassword"
          type="password"
          required
          placeholder="Kata sandi baru"
          value={form2.values.newPassword}
          errorLabel={form2.errors.newPassword as string}
          onChange={(e) => form2.setFieldValue('newPassword', e as string)}
        />
        <InputText
          label="Ulangi kata sandi baru"
          id="newPassword2"
          type="password"
          required
          placeholder="Ulangi kata sandi baru"
          value={form2.values.confirmNewPassword}
          errorLabel={form2.errors.confirmNewPassword as string}
          onChange={(e) =>
            form2.setFieldValue('confirmNewPassword', e as string)
          }
        />
        <Button
          className="mt-8 mx-10"
          type="submit"
          disabled={!form2.isValid()}>
          Simpan
        </Button>
      </form>
    </>
  );

  return <AuthLayout>{!token ? Page1() : Page2()}</AuthLayout>;
}
