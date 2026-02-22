import Link from "next/link";
import { projects } from "@/lib/projects";
import TiltCard from "@/components/TiltCard";

export default function WorkPreview() {
  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">Work</h2>
        <Link
          href="/work"
          className="text-sm md:text-base underline underline-offset-4 opacity-80 hover:opacity-100"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <TiltCard key={p.slug} className="rounded-2xl">
            <Link
              href={`/work/${p.slug}`}
              className="group block border border-black/10 rounded-2xl overflow-hidden bg-white
                         transition-all duration-300 hover:border-black/20"
            >
              <div className="aspect-[4/5] bg-black/5 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-full h-full flex items-center justify-center text-xs opacity-60">
                  {p.title} cover
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <span className="text-xs opacity-70 group-hover:opacity-100">
                    Open →
                  </span>
                </div>
                <div className="text-xs tracking-[0.2em] opacity-70">
                  {p.tags.join(" · ")}
                </div>
              </div>
            </Link>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}