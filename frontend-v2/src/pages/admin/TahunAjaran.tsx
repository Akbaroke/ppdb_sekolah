import {
  ActionIcon,
  Loader,
  LoadingOverlay,
  NumberFormatter,
  Table,
} from '@mantine/core';
import Card from '../../components/Card';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import ModalTahunAjaran from '../../components/ModalTahunAjaran';
import { useDispatch, useSelector } from 'react-redux';
import {
  TahunAjaranAsync,
  fetchTahunAjaran,
} from '../../redux/slices/tahunAjaranSlice';
import NotDataFound from '../../components/NotDataFound';
import ButtonRefresh from '../../components/ButtonRefresh';
import InputSearch from '../../components/InputSearch';

type TahunAjaran = {
  id: string;
  tahun_ajaran: string;
  biaya_daftar: number;
  biaya_spp: number;
};

export default function TahunAjaran() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (state: { tahunAjaran: TahunAjaranAsync }) => state.tahunAjaran
  );

  const rows = data?.map((element) => (
    <Table.Tr key={element.tahun_ajaran_id}>
      <Table.Td className="font-semibold">{element.tahun_ajaran}</Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          value={element.biaya_daftar}
        />
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          value={element.besar_spp}
        />
      </Table.Td>
      <Table.Td className="flex items-center justify-evenly">
        <ModalTahunAjaran type="edit" id={element.tahun_ajaran_id}>
          <ActionIcon variant="light" size="lg">
            <IconPencil size={18} />
          </ActionIcon>
        </ModalTahunAjaran>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Tahun Ajaran</Table.Th>
      <Table.Th>Biaya Daftar</Table.Th>
      <Table.Th>Biaya SPP</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const refresh = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchTahunAjaran());
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Tahun Ajaran</h1>
        <div className="flex items-center gap-2">
          <InputSearch />
          <ButtonRefresh isLoading={isLoading} onClick={refresh} />
          <ModalTahunAjaran type="create">
            <ActionIcon variant="light" size="lg">
              <IconPlus size={18} />
            </ActionIcon>
          </ModalTahunAjaran>
        </div>
      </Card>
      <Card>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{
            children: <Loader color="blue" size="sm" type="dots" />,
          }}
        />
        {data.length > 0 ? (
          <Table.ScrollContainer minWidth={500}>
            <Table
              withTableBorder
              withColumnBorders
              styles={{
                thead: {
                  background: '#f0f0f0',
                },
                th: {
                  textAlign: 'center',
                },
                td: {
                  textAlign: 'center',
                },
              }}>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : (
          <NotDataFound />
        )}
      </Card>
    </div>
  );
}
