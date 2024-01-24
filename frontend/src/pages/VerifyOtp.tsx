import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/atoms/Button';
import AuthLayout from '../layouts/AuthLayout';
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import InputText from '../components/atoms/InputText';
import { isEmail, useForm } from '@mantine/form';
import useCountdown from '../hooks/useCountdown';

type FormType = {
  email: string;
};

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramEmail = searchParams.get('email');
  const paramType = searchParams.get('type');
  const [otp, setOtp] = useState('');
  const { time, setTime } = useCountdown();

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: paramEmail || '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
    },
  });

  const handleSubmitEmail = () => {
    console.log(form.values);
    setSearchParams({ email: form.values.email });
  };
  const handleSubmitOtp = () => {
    if (paramType === 'forgot')
      return navigate(`/forgot?token=${otp}`, { replace: true });
    navigate('/login', { replace: true });
  };

  const handleResendOtp = () => {
    setTime(60);
  };

  const Page1 = () => (
    <>
      <h1 className="text-center font-bold mb-5">Verifikasi Akun</h1>
      <p className="text-[14px] text-center max-w-[300px] m-auto my-3">
        Masukkan email yang terdaftar dan pastikan email aktif.
      </p>
      <form
        className="flex flex-col"
        onSubmit={form.onSubmit(handleSubmitEmail)}>
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
        <Button className="mt-8 mx-10" type="submit" disabled={!form.isValid()}>
          Lanjutkan
        </Button>
      </form>
    </>
  );

  const Page2 = () => (
    <>
      <h1 className="text-center font-bold mb-5">Verifikasi Akun</h1>
      <p className="text-[14px] text-center max-w-[300px] m-auto my-3">
        Silahkan cek email pesan masuk dan spam. Masukkan kode OTP yang telah
        diberikan!
      </p>
      <form className="flex flex-col" onSubmit={form.onSubmit(handleSubmitOtp)}>
        <div className="grid place-items-center mt-5">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={5}
            placeholder="•"
            inputStyle={{
              border: '1px solid #EFF0F0',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              fontSize: '14px',
              fontWeight: '400',
              margin: '0 10px',
            }}
            renderInput={(props) => <input {...props} type="password" />}
          />
        </div>
        <Button className="mt-8 mx-10" type="submit" disabled={otp.length < 5}>
          Verifikasi
        </Button>
      </form>
      <div className="flex flex-col items-center gap-3 text-[14px] mt-5">
        <p className="">
          Tidak menerima kode OTP ?{' '}
          {time ? (
            <span className="font-bold text-gold">{time} detik</span>
          ) : (
            <span
              className="font-bold text-gold cursor-pointer"
              onClick={handleResendOtp}>
              Minta kode baru
            </span>
          )}
        </p>
      </div>
    </>
  );

  return <AuthLayout>{!paramEmail ? Page1() : Page2()}</AuthLayout>;
}
