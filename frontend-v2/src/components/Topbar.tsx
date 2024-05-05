import { Group, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/Topbar.module.css';
import { LOGO } from '../assets';
import { Link } from 'react-router-dom';

const links = [
  { link: '/', label: 'Home' },
  { link: '/', label: 'Kontak' },
  { link: '/login', label: 'Masuk' },
];

export default function Topbar() {
  const [opened, { close, open }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Logo />
        </Group>

        <Group>
          <Burger opened={opened} onClick={open} size="sm" hiddenFrom="sm" />
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>

        <Drawer opened={opened} onClose={close} size="xs" title={<Logo />}>
          <div className="flex flex-col gap-2 py-3 border-t">{items}</div>
        </Drawer>
      </div>
    </header>
  );
}

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={LOGO} alt="Logo" width={35} className="drop-shadow-lg" />
      <h1 className="text-lg font-bold tracking-tight drop-shadow-lg">
        TK ISLAM Pelita Insan
      </h1>
    </div>
  );
};
