import { Button, Text } from '@mantine/core';
import { STUDY_STORYSET } from '../assets';
import Layout from '../layouts';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-3xl hidden sm:inline mx-2 text-center">
            Penerimaan Peserta Didik Baru
          </h1>
          <h1 className="font-bold text-4xl inline sm:hidden mx-2 text-center">
            PPDB
          </h1>
          <Text
            styles={{
              root: {
                fontWeight: 'bold',
                fontSize: '24px',
              },
            }}
            variant="gradient"
            gradient={{ from: 'blue', to: 'gray', deg: 122 }}>
            TK ISLAM Pelita Insan
          </Text>
        </div>
        <Button
          radius="md"
          className="my-3"
          onClick={() => navigate('/register')}>
          Daftar Sekarang
        </Button>
        <img
          src={STUDY_STORYSET}
          alt="sekolah"
          className="w-[220px] mt-4 sm:w-[300px]"
        />
      </div>
    </Layout>
  );
}
