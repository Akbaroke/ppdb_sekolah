import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputText from '../components/atoms/InputText';
import AuthLayout from '../components/organisms/AuthLayout';

export default function Register() {
  return (
    <AuthLayout>
      <h1 className="text-center font-bold mb-5">Daftar Akun</h1>
      <form className="flex flex-col">
        <InputText
          label="Alamat email"
          id="email"
          required
          placeholder="Masukkan alamat email yang aktif"
          value=""
          onChange={() => {}}
        />
        <InputText
          label="Kata sandi"
          id="password"
          required
          placeholder="Kata sandi"
          type="password"
          value=""
          onChange={() => {}}
        />
        <InputText
          label="Ulangi Kata sandi"
          id="confirmPassword"
          required
          placeholder="Ulangi Kata sandi"
          type="password"
          value=""
          onChange={() => {}}
        />
        <Button className="mt-5 mx-10">Daftar</Button>
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
