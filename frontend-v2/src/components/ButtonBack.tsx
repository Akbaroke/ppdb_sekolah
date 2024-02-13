import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ButtonBack() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const spiter = location.split('/').filter((item) => item !== '');

  const handleBack = () => {
    spiter.pop();
    navigate('/' + spiter.join('/'));
  };

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      aria-label="Back"
      onClick={handleBack}>
      <IconChevronLeft size={18} />
    </ActionIcon>
  );
}
