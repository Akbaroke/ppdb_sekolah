import FormSiswa from '../../components/FormSiswa';
import { FormType } from '../../interfaces/components';
import Card from '../../components/Card';
import NotDataFound from '../../components/NotDataFound';
import { Loader } from '@mantine/core';

type Props = {
  isLoading: boolean;
  dataSiswa?: FormType;
};

export default function TabProfile({ isLoading, dataSiswa }: Props) {
  const handleSubmit = async (e: FormType) => {
    try {
      console.log(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      {isLoading ? (
        <Loader color="blue" size="sm" type="dots" className="mx-auto my-10" />
      ) : dataSiswa ? (
        <FormSiswa type="edit" handleSubmit={handleSubmit} values={dataSiswa} />
      ) : (
        <NotDataFound />
      )}
    </Card>
  );
}
