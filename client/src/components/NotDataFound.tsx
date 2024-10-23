import { IconHourglassEmpty } from '@tabler/icons-react';

export default function NotDataFound() {
  return (
    <div className="flex flex-col gap-2 items-center text-gray-300 p-5">
      <IconHourglassEmpty size={30} />
      <h1>Data Tidak Ditemukan</h1>
    </div>
  );
}
