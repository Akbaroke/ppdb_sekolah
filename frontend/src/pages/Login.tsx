import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import InputText from '../components/atoms/InputText';

export default function Login() {
  return (
    <div className="grid place-items-center pt-10 px-5">
      <Card className="lg:max-w-[525px]">
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
            value=""
            onChange={() => {}}
          />
          <Button isLoading className="mt-5 mx-10">
            Masuk
          </Button>
        </form>
        <div className="flex flex-col">
          <p className="">
            Belum punya akun ? <Link to="/register">Daftar</Link>
          </p>
          <p>
            Lupa kata sandi ? <Link to="/forgot">Ganti</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
