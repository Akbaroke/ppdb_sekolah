import { useNavigate } from 'react-router-dom';
import Badge from '../components/atoms/Badge';
import Card from '../components/atoms/Card';
import CardPlus from '../components/atoms/CardPlus';

export default function TahunAjaran() {
  const navigate = useNavigate();

  return (
    <div>
      <Card>
        <h1 className="font-medium text-[14px]">Tahun Ajaran</h1>
      </Card>
      <div className="flex flex-col gap-2 mt-5">
        <CardPlus />
        <Card
          className="flex justify-between shadow-md hover:shadow-none transition-all duration-300 cursor-pointer overflow-hidden rounded-[10px]"
          onClick={() => navigate('/admin/tahun-ajaran/123')}>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-[14px]">
              Tahun Ajaran 2022/2023
            </h1>
            <p className="font-semibold text-green-500 text-[12px]">
              SPP Rp 75.000
            </p>
            <p className="font-semibold text-blue-500 text-[12px]">
              Daftar Rp 50.000
            </p>
          </div>
          <Badge title="2022/2023" type="success" />
        </Card>
      </div>
    </div>
  );
}
