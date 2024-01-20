import { LOGO } from '../../assets';

export default function Topbar() {
  return (
    <div className="w-full h-[80px] bg-green_primary flex items-center px-10">
      <div className="flex items-center gap-2">
        <img src={LOGO} alt="Logo" className="w-[50px] h-[50px]" />
        <h1 className="text-white text-xl font-semibold">TK INDONESIA</h1>
      </div>
    </div>
  );
}
