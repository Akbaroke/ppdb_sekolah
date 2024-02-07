import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isEmail, useForm } from '@mantine/form';
import {
  Anchor,
  Button,
  Container,
  FocusTrap,
  Paper,
  PinInput,
  Text,
  TextInput,
} from '@mantine/core';
import useCountdown from '../../hooks/useCountdown';
import api from '../../api';
import { Notify } from '../../components/Notify';
import { ErrorResponse } from '../../interfaces/pages';
import { useDisclosure } from '@mantine/hooks';

type FormType = {
  email: string;
};

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramEmail = searchParams.get('email');
  const paramType = searchParams.get('type');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOtp, setIsErrorOtp] = useState(false);
  const { time, setTime } = useCountdown();
  const [active, { toggle }] = useDisclosure(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTime(60), []);

  useEffect(() => {
    otp.length > 0 && setIsErrorOtp(false);
  }, [otp]);

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
    setSearchParams({ email: form.values.email });
  };

  const handleSubmitOtp = async () => {
    try {
      if (paramType === 'forgot') {
        const { data } = await api.post('/otp', {
          type_otp: 'forgot',
          email: form.values.email,
          otp,
        });
        Notify('success', data.message);
        navigate(`/forgot?token=${data.token}`, { replace: true });
      } else {
        const { data } = await api.post('/otp', {
          type_otp: 'register',
          email: form.values.email,
          otp,
        });
        Notify('success', data.message);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      Notify('error', (error as ErrorResponse).response.data.message);
      setIsErrorOtp(true);
      setOtp('');
      toggle()
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      setTime(60);
      const { data } = await api.get('/otp', {
        params: {
          email: paramEmail,
          type_otp: paramType ? 'forgot' : 'register',
        },
      });
      Notify('success', data.message);
      setOtp('');
    } catch (error) {
      Notify('error', (error as ErrorResponse).response.data.message);
    } finally {
      setIsLoading(false);
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
        readOnly={isLoading}
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
      <FocusTrap active={active}>
        <PinInput
          type="number"
          placeholder="•"
          length={5}
          value={otp}
          error={isErrorOtp}
          readOnly={isLoading}
          onChange={(e) => setOtp(e)}
          oneTimeCode
          autoFocus
          className="w-max m-auto"
        />
      </FocusTrap>
      <Button
        fullWidth
        mt="xl"
        onClick={handleSubmitOtp}
        disabled={otp.length < 5}
        loading={isLoading}>
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
