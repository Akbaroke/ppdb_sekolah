import {
  ActionIcon,
  Badge,
  Loader,
  LoadingOverlay,
  NumberFormatter,
  Pagination,
  Table,
} from '@mantine/core';
import ButtonBack from '../../../components/ButtonBack';
import ButtonRefresh from '../../../components/ButtonRefresh';
import Card from '../../../components/Card';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import InputSearch from '../../../components/InputSearch';
import NotDataFound from '../../../components/NotDataFound';
import { biayaDUKKDummy } from '../../../data/dummy';
import ModalConfirm from '../../../components/ModalConfirm';
import ButtonDelete from '../../../components/ButtonDelete';
import ModalForm from '../../../components/ModalForm';
import { TbListDetails } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export default function DetailBiayaDUKK() {
  const navigate = useNavigate();
  const rows = biayaDUKKDummy?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td className="font-semibold text-[#c59004] text-nowrap">
        {element.tahun_ajaran}
      </Table.Td>
      <Table.Td>
        <Badge color="blue">{element.jenjang}</Badge>
      </Table.Td>
      <Table.Td className="text-nowrap">
        <NumberFormatter
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          value={element.total_biaya}
        />
      </Table.Td>
      <Table.Td className="text-nowrap">
        <NumberFormatter
          thousandSeparator="."
          decimalSeparator=","
          value={element.detail_biaya?.length}
        />
      </Table.Td>
      <Table.Td className="flex items-center justify-evenly gap-3">
        <ModalForm title="Edit Biaya DUKK" formType="biaya_dukk" data={element}>
          <ActionIcon variant="light" size="lg">
            <IconPencil size={18} />
          </ActionIcon>
        </ModalForm>
        <ModalConfirm
          title="Hapus Biaya DUKK"
          icon={<IconTrash />}
          type="danger"
          text={
            <>
              Apakah anda yakin ingin menghapus biaya DUKK ini "
              <b>{element.tahun_ajaran}</b>" ?
            </>
          }
          btnTitle="Ya, Hapus"
          onAction={() => null}>
          <ButtonDelete isLoading={false} />
        </ModalConfirm>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Tahun Ajaran</Table.Th>
      <Table.Th>Jenjang</Table.Th>
      <Table.Th>Total Biaya</Table.Th>
      <Table.Th>Total Detail</Table.Th>
      <Table.Th w={120}>Action</Table.Th>
    </Table.Tr>
  );

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center gap-2">
          <ButtonBack />
          <h1 className="font-bold text-lg">
            Biaya Daftar Ulang Kenaikan Kelas
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <InputSearch searchValue="" setSearchValue={() => null} />
          <ButtonRefresh isLoading={false} onClick={() => null} />
          <ModalForm title="Buat Biaya DUKK" formType="biaya_dukk">
            <ActionIcon variant="light" size="lg">
              <IconPlus size={18} />
            </ActionIcon>
          </ModalForm>
          <ActionIcon
            variant="light"
            size="lg"
            onClick={() => navigate('list')}>
            <TbListDetails size={18} />
          </ActionIcon>
        </div>
      </Card>
      <Card>
        <LoadingOverlay
          visible={false}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{
            children: <Loader color="blue" size="sm" type="dots" />,
          }}
        />
        {biayaDUKKDummy?.length > 0 ? (
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
        <Pagination
          value={1}
          total={1}
          onChange={() => null}
          className="mt-5 ml-auto w-max"
        />
      </Card>
    </div>
  );
}
