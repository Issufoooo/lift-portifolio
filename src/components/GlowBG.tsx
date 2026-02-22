export default function GlowBG() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft glow top */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl opacity-35 bg-white/20" />
      {/* side glow */}
      <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-20 bg-white/20" />
      <div className="absolute bottom-0 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-20 bg-white/20" />
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.85)_90%)]" />
    </div>
  );
}
