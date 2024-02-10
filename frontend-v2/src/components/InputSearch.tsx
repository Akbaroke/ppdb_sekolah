import { ActionIcon, Autocomplete, CloseButton, rem } from '@mantine/core';
import {
  useClickOutside,
  useDebouncedValue,
  useDisclosure,
} from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function InputSearch() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(close);

  useEffect(() => {
    console.log(debounced);
  }, [debounced]);

  return (
    <>
      {opened ? (
        <div ref={ref}>
          <Autocomplete
            autoFocus
            placeholder="Search"
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
            data={[]}
            visibleFrom="xs"
            value={value}
            onChange={setValue}
            comboboxProps={{
              transitionProps: { transition: 'pop', duration: 200 },
            }}
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
