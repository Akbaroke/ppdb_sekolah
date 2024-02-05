import { IconPlus, IconSearch } from '@tabler/icons-react';
import Card from '../../components/Card';
import { ActionIcon } from '@mantine/core';

export default function Siswa() {
  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Kelas</h1>
        <div className="flex items-center gap-2">
          <ActionIcon variant="light" size="lg">
            <IconSearch size={18} />
          </ActionIcon>
          <ActionIcon variant="light" size="lg">
            <IconPlus size={18} />
          </ActionIcon>
        </div>
      </Card>
    </div>
  );
}
