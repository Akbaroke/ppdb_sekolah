import { matchesField, useForm } from '@mantine/form';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import InputText from '../components/atoms/InputText';

type FormType = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function ResetPassword() {
  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: {
      newPassword: (value) =>
        value.length < 8
          ? 'Kata sandi minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Kata sandi harus mengandung angka dan huruf.',
      confirmNewPassword: matchesField(
        'newPassword',
        'Harus sama dengan kata sandi.'
      ),
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
    form.reset();
  };

  return (
    <Card header={<h1 className="font-bold">Ganti Kata Sandi</h1>}>
      <div>
        <h1 className="mb-2 text-[15px] font-medium">
          Silakan ganti kata sandi dengan yang baru.
        </h1>
        <form className="flex flex-col" onSubmit={form.onSubmit(handleSubmit)}>
          <InputText
            label="Kata sandi baru"
            id="newPassword"
            type="password"
            required
            placeholder="Kata sandi baru"
            value={form.values.newPassword}
            errorLabel={form.errors.newPassword as string}
            onChange={(e) => form.setFieldValue('newPassword', e as string)}
          />
          <InputText
            label="Ulangi kata sandi baru"
            id="newPassword2"
            type="password"
            required
            placeholder="Ulangi kata sandi baru"
            value={form.values.confirmNewPassword}
            errorLabel={form.errors.confirmNewPassword as string}
            onChange={(e) =>
              form.setFieldValue('confirmNewPassword', e as string)
            }
          />
          <Button
            className="mt-8 mx-10 mb-5"
            type="submit"
            disabled={!form.isValid()}>
            Simpan
          </Button>
        </form>
      </div>
    </Card>
  );
}
