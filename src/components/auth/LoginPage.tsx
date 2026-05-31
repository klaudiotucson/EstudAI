import { BarChart3, Beaker, BookOpen, Lightbulb, Star } from "lucide-react";
import type { ReactNode } from "react";
import LoginForm from "./LoginForm";
import LogoEstudia from "@/components/ui/LogoEstudia";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#030712,#07142f_55%,#020617)] px-5 py-10 text-white">
      <div className="absolute left-[20%] top-[20%] h-[360px] w-[360px] rounded-full bg-[#00C8FF]/18 blur-[90px]" />
      <div className="absolute right-[10%] top-[30%] h-[340px] w-[340px] rounded-full bg-[#8B35FF]/16 blur-[90px]" />
      <div className="absolute bottom-[-140px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#0B7CFF]/10 blur-[100px]" />

      <section className="relative grid w-full max-w-6xl items-stretch gap-6 lg:grid-cols-[1fr_430px]">
        <div className="relative hidden overflow-hidden rounded-[32px] border border-white/12 bg-[rgba(7,18,43,0.58)] p-10 shadow-[0_0_50px_rgba(0,132,255,0.14)] backdrop-blur-2xl lg:flex lg:flex-col">
          <LogoEstudia />
          <div className="mt-14 max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00C8FF]">Seu jeito de aprender começa aqui.</p>
            <h1 className="mt-4 text-[56px] font-black leading-[1.02] tracking-tight">
              Estudo inteligente, visual e acolhedor.
            </h1>
            <p className="mt-5 text-base leading-7 text-[#B9C4D8]">
              Uma experiencia premium do 6o ano ao Ensino Medio, ENEM, pre-militares, ITA/IME e concursos:
              resumos, planos, flashcards, quiz, professor IA, tutor de ingles e atualidades em um so lugar.
            </p>
          </div>

          <div className="relative mt-auto pt-12">
            <div className="relative mx-auto h-64 max-w-xl rounded-[32px] border border-white/12 bg-gradient-to-br from-[#0B7CFF]/18 to-[#8B35FF]/18 p-6 shadow-[inset_0_0_50px_rgba(255,255,255,0.04)]">
              <FloatingIcon className="left-6 top-5" icon={<Lightbulb size={18} />} tone="yellow" />
              <FloatingIcon className="right-10 top-8" icon={<Beaker size={18} />} tone="purple" />
              <FloatingIcon className="bottom-12 left-12" icon={<BarChart3 size={18} />} tone="blue" />
              <FloatingIcon className="bottom-8 right-12" icon={<Star size={18} />} tone="yellow" />
              <FloatingIcon className="left-1/2 top-3" icon={<BookOpen size={18} />} tone="green" />

              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-end gap-6">
                <StudentFigure color="from-[#0B7CFF] to-[#00C8FF]" />
                <div className="mb-4 grid h-28 w-36 place-items-center rounded-3xl border border-[#00C8FF]/35 bg-[#081229] shadow-[0_0_32px_rgba(0,200,255,0.2)]">
                  <BookOpen size={42} className="text-[#00C8FF]" />
                </div>
                <StudentFigure color="from-[#8B35FF] to-[#B832FF]" />
              </div>
            </div>
            <blockquote className="mt-8 max-w-2xl text-sm leading-6 text-[#B9C4D8]">
              “A educação é a arma mais poderosa que você pode usar para mudar o mundo.”
              <span className="block pt-1 font-black text-white">— Nelson Mandela</span>
            </blockquote>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/12 bg-[rgba(7,18,43,0.78)] p-8 shadow-[0_0_50px_rgba(0,132,255,0.18),inset_0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-[20px] md:p-[42px]">
          <div className="mb-10 flex justify-center lg:hidden">
            <LogoEstudia />
          </div>
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#00C8FF]">Bem-vindo</p>
            <h2 className="mt-2 text-4xl font-black text-white">EstudAI</h2>
            <p className="mt-2 text-base leading-6 text-[#B9C4D8]">Seu jeito de aprender começa aqui.</p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

function FloatingIcon({ icon, className, tone }: { icon: ReactNode; className: string; tone: "blue" | "green" | "purple" | "yellow" }) {
  const tones = {
    blue: "bg-[#0B7CFF]/20 text-[#00C8FF]",
    green: "bg-[#2EDB88]/20 text-[#2EDB88]",
    purple: "bg-[#8B35FF]/20 text-[#B832FF]",
    yellow: "bg-[#FFD54A]/20 text-[#FFD54A]",
  };
  return <div className={`absolute grid h-11 w-11 place-items-center rounded-2xl border border-white/12 ${tones[tone]} ${className}`}>{icon}</div>;
}

function StudentFigure({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${color} shadow-[0_0_30px_rgba(0,200,255,0.18)]`} />
      <div className={`mt-2 h-24 w-20 rounded-t-[30px] bg-gradient-to-br ${color} opacity-90`} />
    </div>
  );
}
