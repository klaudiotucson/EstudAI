"use client";

import { Menu, Sparkles } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import SubjectCard from "./SubjectCard";
import StudyToolCard from "./StudyToolCard";
import SearchBar from "@/components/ui/SearchBar";
import LogoEstudia from "@/components/ui/LogoEstudia";
import { subjects } from "@/data/subjects";
import { studyTools } from "@/data/studyTools";
import { learningLevels, preparatoryTracks } from "@/data/learningTracks";

interface DashboardPageProps {
  query: string;
  anoEscolar: string;
  loading?: boolean;
  onQueryChange: (value: string) => void;
  onAnoEscolarChange: (value: string) => void;
  onSearch: () => void;
  onSearchTopic: (topic: string) => void;
  onNavigate: (tab: string) => void;
  onOpenMenu: () => void;
}

export default function DashboardPage({
  query,
  anoEscolar,
  loading = false,
  onQueryChange,
  onAnoEscolarChange,
  onSearch,
  onSearchTopic,
  onNavigate,
  onOpenMenu,
}: DashboardPageProps) {
  return (
    <div className="min-h-screen px-5 pb-28 pt-5 md:px-8 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1480px] space-y-8">
        <div className="flex items-center justify-between lg:hidden">
          <button onClick={onOpenMenu} className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white">
            <Menu size={22} />
          </button>
          <LogoEstudia compact className="h-12 w-12 rounded-2xl" />
          <div className="h-12 w-12" />
        </div>

        <DashboardHeader />

        <section className="rounded-[28px] border border-white/12 bg-[rgba(7,18,43,0.5)] p-4 shadow-[0_0_50px_rgba(0,132,255,0.08)] backdrop-blur-2xl md:p-5">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm font-black text-[#B9C4D8]">
              <Sparkles size={18} className="text-[#FFD54A]" />
              Busque qualquer tema: Fundamental, Ensino Medio, ENEM, pre-militares, ITA/IME e concursos.
            </div>
            <select
              value={anoEscolar}
              onChange={(event) => onAnoEscolarChange(event.target.value)}
              className="h-11 rounded-2xl border border-white/10 bg-[#081229] px-4 text-sm font-black text-[#00C8FF] outline-none focus:border-[#00C8FF]/60"
              aria-label="Ano escolar"
            >
              {learningLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearch} loading={loading} />
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[28px] font-black leading-[34px] text-white">Explore por materia</h2>
              <p className="mt-1 text-sm text-[#B9C4D8]">Escolha uma area e comece com trilhas do 6o ano ao pre-vestibular/concurso.</p>
            </div>
          </div>
          <div className="flex snap-x gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-4 xl:grid-cols-5 lg:overflow-visible lg:pb-0">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.title}
                {...subject}
                onClick={() => onSearchTopic(subject.title)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-[28px] font-black leading-[34px] text-white">Preparatórios e concursos</h2>
            <p className="mt-1 text-sm text-[#B9C4D8]">Trilhas para ENEM, pre-militares, ITA/IME e concursos por escolaridade.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {preparatoryTracks.map((track) => (
              <button
                key={track.title}
                onClick={() => onSearchTopic(track.title)}
                className="group rounded-3xl border border-white/12 bg-[rgba(13,25,55,0.72)] p-5 text-left backdrop-blur-2xl transition-all hover:-translate-y-1 hover:border-[#00C8FF]/45 hover:bg-[rgba(22,43,92,0.9)] hover:shadow-[0_18px_44px_rgba(0,200,255,0.16)]"
              >
                <p className="text-lg font-black text-white">{track.title}</p>
                <p className="mt-2 text-sm leading-5 text-[#B9C4D8]">{track.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {track.focus.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full border border-[#00C8FF]/20 bg-[#00C8FF]/10 px-3 py-1 text-[11px] font-bold text-[#00C8FF]">
                      {item}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-[28px] font-black leading-[34px] text-white">Ferramentas de estudo</h2>
            <p className="mt-1 text-sm text-[#B9C4D8]">Tudo para estudar, memorizar, revisar e produzir materiais.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-[18px] xl:grid-cols-4">
            {studyTools.map((tool) => (
              <StudyToolCard
                key={tool.title}
                {...tool}
                onClick={() => onNavigate(tool.tab)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
