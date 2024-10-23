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
import { IconPlus, IconTrash } from '@tabler/icons-react';
import InputSearch from '../../../components/InputSearch';
import NotDataFound from '../../../components/NotDataFound';
import { riwayatPembayaranSPPDummy } from '../../../data/dummy';
import ModalConfirm from '../../../components/ModalConfirm';
import ButtonDelete from '../../../components/ButtonDelete';
import ModalForm from '../../../components/ModalForm';
import moment from 'moment';

export default function RiwayatPembayaranSPP() {
  const rows = riwayatPembayaranSPPDummy?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td className="font-semibold text-[#c59004] text-nowrap">
        {element.no_transaksi}
      </Table.Td>
      <Table.Td className="text-nowrap">
        {moment(element.tanggal).format('DD/MM/YYYY')}
      </Table.Td>
      <Table.Td className="text-nowrap">{element.nis}</Table.Td>
      <Table.Td className="capitalize text-nowrap">{element.nama}</Table.Td>
      <Table.Td>
        <Badge color="blue">{element.kelas}</Badge>
      </Table.Td>
      <Table.Td className="text-nowrap">{element.spp_bulan}</Table.Td>
      <Table.Td className="text-nowrap">
        <NumberFormatter
          prefix="Rp "
          thousandSeparator="."
          decimalSeparator=","
          value={element.nominal}
        />
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="teal">
          {element.metode}
        </Badge>
      </Table.Td>
      <Table.Td className="flex items-center justify-evenly gap-3">
        <ModalConfirm
          title="Hapus Riwayat Transaksi"
          icon={<IconTrash />}
          type="danger"
          text={
            <>
              Apakah anda yakin ingin menghapus transaksi ini "
              <b>{element.no_transaksi}</b>" ?
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
      <Table.Th>No.Trans</Table.Th>
      <Table.Th>Tanggal</Table.Th>
      <Table.Th>NIS</Table.Th>
      <Table.Th>Nama</Table.Th>
      <Table.Th>Kelas</Table.Th>
      <Table.Th>SPP Bulan</Table.Th>
      <Table.Th>Nominal</Table.Th>
      <Table.Th>Metode</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center gap-2">
          <ButtonBack />
          <h1 className="font-bold text-lg">Riwayat Pembayaran SPP</h1>
        </div>
        <div className="flex items-center gap-2">
          <InputSearch searchValue="" setSearchValue={() => null} />
          <ButtonRefresh isLoading={false} onClick={() => null} />
          <ModalForm
            title="Manual Input Riwayat Pembayaran SPP"
            formType="manual_spp">
            <ActionIcon variant="light" size="lg">
              <IconPlus size={18} />
            </ActionIcon>
          </ModalForm>
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
        {riwayatPembayaranSPPDummy?.length > 0 ? (
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
