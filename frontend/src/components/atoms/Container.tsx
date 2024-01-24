type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="max-w-[1200px] mx-auto">{children}</div>;
}
