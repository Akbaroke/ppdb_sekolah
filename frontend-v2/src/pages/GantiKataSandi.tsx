import { Button, PasswordInput } from '@mantine/core';
import Card from '../components/Card';
import { matchesField, useForm } from '@mantine/form';
import { Notify } from '../components/Notify';
import api from '../api';
import { useState } from 'react';
import handleErrorResponse from '../services/handleErrorResponse';

type FormType = {
  password_old: string;
  password_new: string;
  confirmPassword_new: string;
};

export default function GantiKataSandi() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      password_old: '',
      password_new: '',
      confirmPassword_new: '',
    },
    validate: {
      password_old: (value) =>
        value.length < 8
          ? 'Kata sandi minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Kata sandi harus mengandung angka dan huruf.',
      password_new: (value) =>
        value.length < 8
          ? 'Kata sandi minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Kata sandi harus mengandung angka dan huruf.',
      confirmPassword_new: matchesField(
        'password_new',
        'Harus sama dengan kata sandi.'
      ),
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.patch('/change_password', {
        old_password: form.values.password_old,
        new_password: form.values.password_new,
      });
      Notify('success', data.message);
      console.log(data);
      form.reset();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card header={<h1 className="font-bold">Ganti Kata Sandi</h1>}>
      <form
        className="px-2 flex flex-col gap-1"
        onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          label="Kata Sandi Lama"
          placeholder="Kata sandi lama"
          required
          mt="md"
          value={form.values.password_old}
          error={form.errors.password_old as string}
          onChange={(e) =>
            form.setFieldValue('password_old', e.currentTarget.value)
          }
          readOnly={isLoading}
        />
        <PasswordInput
          label="Kata Sandi Baru"
          placeholder="Kata sandi baru"
          required
          mt="md"
          value={form.values.password_new}
          error={form.errors.password_new as string}
          onChange={(e) =>
            form.setFieldValue('password_new', e.currentTarget.value)
          }
          readOnly={isLoading}
        />
        <PasswordInput
          label="Ulangi Kata Sandi Baru"
          placeholder="Ulangi Kata sandi baru"
          required
          mt="md"
          value={form.values.confirmPassword_new}
          error={form.errors.confirmPassword_new as string}
          onChange={(e) =>
            form.setFieldValue('confirmPassword_new', e.currentTarget.value)
          }
          readOnly={isLoading}
        />
        <Button
          fullWidth
          mt="xl"
          type="submit"
          disabled={!form.isValid()}
          loading={isLoading}>
          Simpan
        </Button>
      </form>
    </Card>
  );
}
