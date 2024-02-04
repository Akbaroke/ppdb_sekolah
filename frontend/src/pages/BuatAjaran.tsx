import { useForm } from '@mantine/form';
import Card from '../components/atoms/Card';
import InputNumber from '../components/atoms/InputNumber';
import SelectOption from '../components/atoms/SelectOption';
import Button from '../components/atoms/Button';

type FormType = {
  tahun_ajaran: string;
  besar_spp: number;
  biaya_daftar: number;
};

export default function BuatAjaran() {
  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      tahun_ajaran: '',
      besar_spp: 0,
      biaya_daftar: 0,
    },
    validate: {},
  });

  return (
    <Card header={<h1>Buat Ajaran Baru</h1>}>
      <form>
        <SelectOption
          label="Tahun Ajaran"
          id="tahun_ajaran"
          required
          placeholder="Tahun ajaran"
          value={form.values.tahun_ajaran}
          errorLabel={form.errors.tahun_ajaran as string}
          onChange={(e) => form.setFieldValue('tahun_ajaran', e as string)}
          data={[
            {
              value: '2021/2022',
              label: '2021/2022',
            },
            {
              value: '2022/2023',
              label: '2022/2023',
            },
            {
              value: '2023/2024',
              label: '2023/2024',
            },
          ]}
        />
        <InputNumber
          label="Besar SPP"
          id="besar_spp"
          required
          placeholder="Besar SPP"
          value={form.values.besar_spp}
          errorLabel={form.errors.besar_spp as string}
          onChange={(e) => form.setFieldValue('besar_spp', e)}
        />
        <InputNumber
          label="Biaya Daftar"
          id="biaya_daftar"
          required
          placeholder="Biaya Daftar"
          value={form.values.biaya_daftar}
          errorLabel={form.errors.biaya_daftar as string}
          onChange={(e) => form.setFieldValue('biaya_daftar', e)}
        />
        <Button className="mx-20 my-10" type="submit">
          Simpan
        </Button>
      </form>
    </Card>
  );
}
