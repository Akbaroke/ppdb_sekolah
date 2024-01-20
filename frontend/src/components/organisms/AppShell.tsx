import Topbar from '../molecules/Topbar';

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <div className="font-jakarta bg-white_primary min-h-screen">
      <Topbar />
      {children}
    </div>
  );
}
