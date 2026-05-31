import { Flame, Shield } from "lucide-react";
import StatsCard from "./StatsCard";
import UserProfileCard from "@/components/layout/UserProfileCard";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00C8FF]">Dashboard EstudAI</p>
        <h1 className="mt-2 text-[34px] font-black leading-tight text-white md:text-[40px]">
          Olá, Aluno! <span className="inline-block">👋</span>
        </h1>
        <p className="mt-2 text-base leading-6 text-[#B9C4D8]">Do 6o ano ao Ensino Medio, ENEM, ITA/IME, pre-militares e concursos.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <StatsCard icon={Flame} label="Sequência de estudos" value="7 dias" tone="orange" />
        <StatsCard icon={Shield} label="XP total" value="1.250 XP" tone="blue" />
        <UserProfileCard />
      </div>
    </header>
  );
}
