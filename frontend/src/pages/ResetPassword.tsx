import Button from '../components/atoms/Button';
import InputText from '../components/atoms/InputText';
import AuthLayout from '../components/organisms/AuthLayout';

export default function ResetPassword() {
  return (
    <AuthLayout>
      <h1 className="text-center font-bold mb-5">Lupa Kata Sandi</h1>
      <p className="text-[14px] text-center max-w-[300px] m-auto my-3">
        Masukkan email yang terdaftar dan pastikan email aktif.
      </p>
      <form className="flex flex-col">
        <InputText
          label="Kata sandi baru"
          id="newPassword"
          type="password"
          required
          placeholder="Kata sandi baru"
          value=""
          onChange={() => {}}
        />
        <InputText
          label="Ulangi kata sandi baru"
          id="newPassword2"
          type="password"
          required
          placeholder="Ulangi kata sandi baru"
          value=""
          onChange={() => {}}
        />
        <Button className="mt-8 mx-10">Simpan</Button>
      </form>
    </AuthLayout>
  );
}
