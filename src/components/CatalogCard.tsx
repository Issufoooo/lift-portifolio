import Image from "next/image";
import PremiumCard from "@/components/PremiumCard";

export default function CatalogCard({ item }: { item: any }) {
  return (
    <PremiumCard className="p-0 overflow-hidden group">
      <div className="relative aspect-[4/5]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 86vw, 420px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />

        {/* editorial overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.68)_100%)] opacity-60" />
        <div className="grain opacity-[0.28]" />

        {/* micro-grid overlay */}
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="space-y-1">
            <div className="text-xs font-semibold tracking-[0.22em] text-white/75">
              {item.note ?? "LOOKBOOK"}
            </div>
            <div className="text-2xl font-semibold tracking-tight text-white">
              {item.name}
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs tracking-[0.2em] text-white/55 font-semibold">
                LIFT WEAR
              </span>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span className="text-xs tracking-[0.2em] text-white/55 font-semibold">
                DROP
              </span>
            </div>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
}
