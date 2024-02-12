import { useState } from 'react';
import TabSiswa from './TabSiswa';
import Card from '../../../components/Card';
import { Button } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import TabLulus from './TabLulus';
import TabKeluar from './TabKeluar';
import ButtonRefresh from '../../../components/ButtonRefresh';
import InputSearch from '../../../components/InputSearch';

const tabs = [
  {
    key: 'siswa',
    label: 'Siswa',
  },
  {
    key: 'lulus',
    label: 'Lulus',
  },
  {
    key: 'keluar',
    label: 'Keluar',
  },
];

export default function Siswa() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string | null>(
    searchParams.get('tab') || tabs[0].key
  );

  const TabsRender = () => {
    switch (activeTab) {
      case 'siswa':
        return <TabSiswa />;
      case 'lulus':
        return <TabLulus />;
      case 'keluar':
        return <TabKeluar />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Card
        header={
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">Siswa</h1>
            <div className="flex items-center gap-2">
              <InputSearch searchValue="" setSearchValue={() => null} />
              <ButtonRefresh isLoading={false} onClick={() => null} />
            </div>
          </div>
        }
        className="pb-0">
        <div>
          {tabs.map((item) => (
            <Button
              variant="subtle"
              key={item.key}
              radius="xs"
              color={activeTab === item.key ? 'blue' : 'gray'}
              onClick={() => {
                setActiveTab(item.key);
                setSearchParams({ tab: item.key });
              }}
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
