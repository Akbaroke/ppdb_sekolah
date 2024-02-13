import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

type Props = {
  isLoading: boolean;
  onClick?: () => void;
};

export default function ButtonDelete({ isLoading, onClick }: Props) {
  return (
    <ActionIcon
      variant="light"
      color="red"
      size="lg"
      onClick={onClick}
      loading={isLoading}>
      <IconTrash size={18} />
    </ActionIcon>
  );
}
