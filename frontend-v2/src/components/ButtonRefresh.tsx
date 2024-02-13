import { ActionIcon } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';

type Props = {
  isLoading: boolean;
  onClick?: () => void;
};

export default function ButtonRefresh({ isLoading, onClick }: Props) {
  return (
    <ActionIcon variant="light" size="lg" onClick={onClick} loading={isLoading}>
      <IconReload size={18} />
    </ActionIcon>
  );
}
