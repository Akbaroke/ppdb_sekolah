import { useNavigate } from 'react-router-dom';
import Badge from '../components/atoms/Badge';
import Card from '../components/atoms/Card';
import CardPlus from '../components/atoms/CardPlus';

export default function DaftarSiswa() {
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <h1 className="font-bold">Daftar Siswa</h1>
      </Card>
      <div className="flex flex-col gap-3">
        <Card className="flex justify-between shadow-md cursor-pointer transition-all hover:shadow-none duration-300">
          <div className="flex items-center gap-5">
            <img
              src="https://cdn.discordapp.com/attachments/1015028360759492710/1199297491431067648/images_1.png?ex=65c207d3&is=65af92d3&hm=57e728daa7e3c6202a1f6a9cae814309e9bc2657e046a48f9389cff2f3340379&"
              alt=""
              className="w-[71px] h-[87px] rounded-[5px]"
            />
            <div className="flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-[2px]">
                <h1 className="text-[14px] font-semibold">
                  Joni Sutejo (011001241)
                </h1>
                <p className="text-[12px]">Laki-laki</p>
                <p className="text-[12px]">2022/2023</p>
              </div>
              <Badge title="Siswa" type="success" />
            </div>
          </div>
          <Badge
            title="KTA-1"
            type="custom"
            className="bg-green_primary text-white"
          />
        </Card>
        <Card className="flex justify-between shadow-md cursor-pointer transition-all hover:shadow-none duration-300">
          <div className="flex items-center gap-5">
            <img
              src="https://cdn.discordapp.com/attachments/1015028360759492710/1199297491431067648/images_1.png?ex=65c207d3&is=65af92d3&hm=57e728daa7e3c6202a1f6a9cae814309e9bc2657e046a48f9389cff2f3340379&"
              alt=""
              className="w-[71px] h-[87px] rounded-[5px]"
            />
            <div className="flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-[2px]">
                <h1 className="text-[14px] font-semibold">
                  Joni Sutejo (011001241)
                </h1>
                <p className="text-[12px]">Laki-laki</p>
                <p className="text-[12px]">2022/2023</p>
              </div>
              <Badge title="Pendaftar" type="warning" />
            </div>
          </div>
          <Badge
            title="KTA"
            type="custom"
            className="bg-green_primary text-white"
          />
        </Card>
        <CardPlus
          onClick={() => navigate('/user/daftar-siswa/formulir-pendaftaran')}
        />
      </div>
    </>
  );
}
