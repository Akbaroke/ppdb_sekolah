import Card from '../components/atoms/Card';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="grid place-items-center pt-10 px-5 lg:max-w-[525px] m-auto">
      <Card className=" p-10">{children}</Card>
    </div>
  );
}
