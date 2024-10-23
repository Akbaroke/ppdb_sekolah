import { Container } from '@mantine/core';
import Topbar from '../components/Topbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Topbar />
      <Container size={1200}>{children}</Container>
    </div>
  );
}
