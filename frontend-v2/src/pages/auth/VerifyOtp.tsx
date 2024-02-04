import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isEmail, useForm } from '@mantine/form';
import {
  Anchor,
  Button,
  Container,
  Paper,
  PinInput,
  Text,
  TextInput,
} from '@mantine/core';
import useCountdown from '../../hooks/useCountdown';
import api from '../../api';

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTime(60), []);

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

  const handleSubmitOtp = async () => {
    if (paramType === 'forgot') {
      try {
        const { data } = await api.post('/otp', {
          type_otp: 'forgot',
          email: form.values.email,
          otp,
        });
        console.log(data);
        navigate(`/forgot?token=${data.token}`, { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await api.post('/otp', {
          type_otp: 'register',
          email: form.values.email,
          otp,
        });
        console.log(data);
        navigate('/login', { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      setTime(60);
      await api.get('/otp', {
        params: {
          email: paramEmail,
          type_otp: paramType ? 'forgot' : 'register',
        },
      });
      setOtp('');
    } catch (error) {
      console.log(error);
    }
  };

  const Page1 = () => (
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
      component="form"
      onSubmit={form.onSubmit(handleSubmitEmail)}>
      <div className="flex flex-col mb-3">
        <h1 className="font-semibold text-lg m-auto w-max mb-4">
          Verifikasi Akun
        </h1>
        <p className="text-sm text-center max-w-[250px] m-auto text-gray-500">
          Masukkan email yang terdaftar dan pastikan email aktif.
        </p>
      </div>
      <TextInput
        label="Email"
        placeholder="saya@email.com"
        type="email"
        required
        value={form.values.email}
        error={form.errors.email as string}
        onChange={(e) => form.setFieldValue('email', e.currentTarget.value)}
      />
      <Button fullWidth mt="xl" type="submit" disabled={!form.isValid()}>
        Lanjutkan
      </Button>
      <div className="mt-6 flex flex-col gap-1">
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Batal melanjutkan ?{' '}
          <Link to="/login">
            <Anchor size="sm" component="button">
              Kembali
            </Anchor>
          </Link>
        </Text>
      </div>
    </Paper>
  );

  const Page2 = () => (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form">
      <div className="flex flex-col mb-5">
        <h1 className="font-semibold text-lg m-auto w-max mb-4">
          Verifikasi Akun
        </h1>
        <p className="text-sm text-center max-w-[280px] m-auto text-gray-500">
          Silahkan cek email pesan masuk dan spam. Masukkan kode OTP yang telah
          diberikan!
        </p>
      </div>
      <PinInput
        type="number"
        placeholder="•"
        length={5}
        value={otp}
        error={false}
        disabled={false}
        onChange={(e) => setOtp(e)}
        oneTimeCode
        autoFocus
        className="w-max m-auto"
      />
      <Button
        fullWidth
        mt="xl"
        onClick={handleSubmitOtp}
        disabled={otp.length < 5}>
        Verifikasi
      </Button>
      <div className="mt-6 flex flex-col gap-1">
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Tidak menerima kode OTP ?{' '}
          {time ? (
            `${time} detik`
          ) : (
            <Anchor size="sm" component="button" onClick={handleResendOtp}>
              Minta kode baru
            </Anchor>
          )}
        </Text>
      </div>
    </Paper>
  );

  return (
    <Container size={420} my={40}>
      {!paramEmail ? Page1() : Page2()}
    </Container>
  );
}
