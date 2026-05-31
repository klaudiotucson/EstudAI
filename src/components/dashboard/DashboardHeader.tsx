import { Flame, Shield } from "lucide-react";
import StatsCard from "./StatsCard";
import UserProfileCard from "@/components/layout/UserProfileCard";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00C8FF] sm:text-sm sm:tracking-[0.22em]">Dashboard EstudAI</p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-white md:text-[40px]">
          Olá, Aluno! <span className="inline-block">👋</span>
        </h1>
        <p className="mt-2 text-base leading-6 text-[#B9C4D8]">Do 6o ano ao Ensino Medio, ENEM, ITA/IME, pre-militares e concursos.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <StatsCard icon={Flame} label="Sequência de estudos" value="7 dias" tone="orange" />
        <StatsCard icon={Shield} label="XP total" value="1.250 XP" tone="blue" />
        <div className="col-span-2 sm:col-span-1">
          <UserProfileCard />
        </div>
      </div>
    </header>
  );
}
