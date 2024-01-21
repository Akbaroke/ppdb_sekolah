import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputText from '../components/atoms/InputText';
import AuthLayout from '../components/organisms/AuthLayout';

export default function Login() {
  return (
    <AuthLayout>
      <h1 className="text-center font-bold mb-5">Masuk</h1>
      <form className="flex flex-col">
        <InputText
          label="Alamat email"
          id="email"
          required
          placeholder="Masukkan alamat email yang terdaftar"
          value=""
          onChange={() => {}}
        />
        <InputText
          label="Kata sandi"
          id="email"
          required
          placeholder="Kata sandi"
          type="password"
          value=""
          onChange={() => {}}
        />
        <Button className="mt-5 mx-10">Masuk</Button>
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
