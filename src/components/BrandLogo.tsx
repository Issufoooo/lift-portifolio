import Image from "next/image";

type Props = {
  variant?: "light" | "dark";
  className?: string;
};

export default function BrandLogo({ variant = "dark", className = "" }: Props) {
  const src = variant === "dark" ? "/brand/logo-white.png" : "/brand/logo-black.png";

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={src}
        alt="LIFT"
        fill
        sizes="(max-width: 768px) 200px, 360px"
        className="object-contain"
        priority
      />
    </div>
  );
}