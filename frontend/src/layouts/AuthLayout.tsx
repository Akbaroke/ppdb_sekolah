import Card from '../components/atoms/Card';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="grid place-items-center pt-10 px-5">
      <Card className="lg:max-w-[525px] p-10">{children}</Card>
    </div>
  );
}
