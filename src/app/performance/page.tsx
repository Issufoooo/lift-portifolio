import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Performance",
  description: "LIFT Performance — cultura, comunidade e execução. Em andamento.",
};

export default function PerformancePage() {
  const waDirect = buildWhatsAppUrl(
    "Olá! Vi a LIFT Performance e quero saber mais sobre os planos e atividades."
  );

  const waGroup = "https://chat.whatsapp.com/EAV9Jrn1nBTKEgSba3wJW7?mode=gi_t";

  return (
    <main className="min-h-[100svh] pt-20 md:pt-24">
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-[0.22em] opacity-60">
            LIFT PERFORMANCE
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
            Cultura e consistência.
            <br />
            <span className="opacity-40">Em desenvolvimento.</span>
          </h1>

          <p className="text-sm md:text-base opacity-65 leading-relaxed max-w-2xl">
            A LIFT Performance representa a vertente física da marca: treinos,
            corridas de domingo, disciplina e mentalidade de evolução contínua.
            A estrutura oficial está a ser finalizada. Entretanto, as atividades,
            planos e anúncios serão partilhados através do grupo oficial no WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {/* GRUPO WHATSAPP */}
          <a
            href={waGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative
              rounded-3xl p-7 md:p-8
              border border-black/10 dark:border-white/10
              bg-black/[0.02] dark:bg-white/[0.03]
              hover:bg-black/[0.04] dark:hover:bg-white/[0.06]
              transition
            "
          >
            <div className="text-xs font-semibold tracking-[0.20em] opacity-55">
              GRUPO OFICIAL
            </div>

            <div className="mt-3 text-xl font-semibold tracking-tight">
              Entrar no Grupo WhatsApp
            </div>

            <div className="mt-2 text-sm opacity-60 leading-relaxed">
              Recebe anúncios de treinos, corridas, planos semanais
              e novidades da LIFT Performance.
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold opacity-70 underline underline-offset-4">
                Aceder ao grupo →
              </span>

              <span
                className="
                  text-[10px] font-semibold tracking-[0.25em]
                  px-3 py-1 rounded-full
                  border border-black/20 dark:border-white/20
                  opacity-60
                "
              >
                ACESSO ILIMITADO
              </span>
            </div>
          </a>

          {/* CONTACTO DIRETO */}
          <a
            href={waDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-3xl p-7 md:p-8
              border border-black/10 dark:border-white/10
              bg-black/[0.02] dark:bg-white/[0.03]
              hover:bg-black/[0.04] dark:hover:bg-white/[0.06]
              transition
            "
          >
            <div className="text-xs font-semibold tracking-[0.20em] opacity-55">
              CONTACTO DIRETO
            </div>

            <div className="mt-3 text-xl font-semibold tracking-tight">
              Falar com a LIFT
            </div>

            <div className="mt-2 text-sm opacity-60 leading-relaxed">
              Para parcerias, planos personalizados ou dúvidas específicas.
            </div>

            <div className="mt-5 text-sm font-semibold opacity-70 underline underline-offset-4">
              Enviar mensagem →
            </div>
          </a>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm font-semibold opacity-60 hover:opacity-100 transition underline underline-offset-4"
          >
            ← Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}