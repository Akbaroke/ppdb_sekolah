import { ActionIcon, CloseButton, Input, rem } from '@mantine/core';
import {
  useClickOutside,
  useDebouncedValue,
  useDisclosure,
} from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export default function InputSearch({ searchValue, setSearchValue }: Props) {
  const [value, setValue] = useState(searchValue || '');
  const [debounced] = useDebouncedValue(value, 500);
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(close);

  useEffect(() => {
    setSearchValue(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  return (
    <>
      {opened ? (
        <div ref={ref}>
          <Input
            autoFocus
            placeholder="Cari..."
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            rightSectionPointerEvents="all"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            rightSection={
              <CloseButton
                size="sm"
                aria-label="Clear input"
                onClick={() => setValue('')}
                style={{ display: value ? undefined : 'none', color: 'gray' }}
              />
            }
          />
        </div>
      ) : (
        <ActionIcon variant="light" size="lg" onClick={open}>
          <IconSearch size={18} />
        </ActionIcon>
      )}
    </>
  );
}
