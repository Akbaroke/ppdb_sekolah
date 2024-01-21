import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';
import AuthLayout from '../components/organisms/AuthLayout';
import OTPInput from 'react-otp-input';
import { useState } from 'react';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  return (
    <AuthLayout>
      <h1 className="text-center font-bold mb-5">Verifikasi Akun</h1>
      <p className="text-[14px] text-center max-w-[300px] m-auto my-3">
        Silahkan cek email pesan masuk dan spam. Masukkan kode OTP yang telah
        diberikan!
      </p>
      <form className="flex flex-col">
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
        <Button className="mt-8 mx-10">Lanjutkan</Button>
      </form>
      <div className="flex flex-col items-center gap-3 text-[14px] mt-5">
        <p className="">
          Tidak menerima kode OTP ?{' '}
          <Link to="/login" className="font-bold text-gold">
            Minta kode baru
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
