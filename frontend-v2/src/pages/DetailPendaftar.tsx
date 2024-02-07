import { Button } from '@mantine/core';
import Card from '../components/Card';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import TabProfile from './tabs/TabProfile';
import TabStatus from './tabs/TabStatus';
import TabRiwayatPembayaran from './tabs/TabRiwayatPembayaran';

const tabs = [
  {
    key: 'profile',
    label: 'Profile',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'riwayat_pembayaran',
    label: 'Riwayat Pembayaran',
  },
];

export default function DetailSiswa() {
  const [activeTab, setActiveTab] = useState<string | null>(tabs[0].key);
  // const { id } = useParams();

  const TabsRender = () => {
    switch (activeTab) {
      case 'profile':
        return <TabProfile />;
      case 'status':
        return <TabStatus />;
      case 'riwayat_pembayaran':
        return <TabRiwayatPembayaran />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Card
        header={<h1 className="font-bold">Data Pendaftar</h1>}
        className="pb-0">
        <div>
          {tabs.map((item) => (
            <Button
              variant="subtle"
              key={item.key}
              radius="xs"
              color={activeTab === item.key ? 'blue' : 'gray'}
              onClick={() => setActiveTab(item.key)}
              styles={{
                root: {
                  color: activeTab === item.key ? '' : 'gray',
                  fontWeight: activeTab === item.key ? '' : '400',
                  borderBottom:
                    activeTab === item.key ? '2px solid #228be6' : '',
                },
              }}>
              {item.label}
            </Button>
          ))}
        </div>
      </Card>

      {TabsRender()}
    </div>
  );
}
