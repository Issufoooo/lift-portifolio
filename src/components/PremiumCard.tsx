import SpotlightCard from "@/components/SpotlightCard";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function PremiumCard({ className = "", children }: Props) {
  return <SpotlightCard className={className}>{children}</SpotlightCard>;
}
