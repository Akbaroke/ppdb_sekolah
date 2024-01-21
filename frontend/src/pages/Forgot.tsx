import Button from '../components/atoms/Button';
import InputText from '../components/atoms/InputText';
import AuthLayout from '../components/organisms/AuthLayout';

export default function Forgot() {
  return (
    <AuthLayout>
      <h1 className="text-center font-bold mb-5">Lupa Kata Sandi</h1>
      <p className="text-[14px] text-center max-w-[300px] m-auto my-3">
        Masukkan email yang terdaftar dan pastikan email aktif.
      </p>
      <form className="flex flex-col">
        <InputText
          label="Alamat email"
          id="email"
          required
          placeholder="Masukkan alamat email yang terdaftar"
          value=""
          onChange={() => {}}
        />
        <Button className="mt-8 mx-10">Lanjutkan</Button>
      </form>
    </AuthLayout>
  );
}
