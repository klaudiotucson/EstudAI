"use client";

import LogoEstudia from "@/components/ui/LogoEstudia";
import { sidebarItems } from "@/data/sidebarItems";
import SidebarItem from "./SidebarItem";
import UserProfileCard from "./UserProfileCard";

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export default function Sidebar({ activeTab, onNavigate }: SidebarProps) {
  const handleSignOut = async () => {
    await fetch("/auth/sign-out", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <aside className="hidden h-screen w-[280px] shrink-0 flex-col border-r border-white/12 bg-[rgba(4,13,34,0.88)] px-[18px] py-6 shadow-2xl backdrop-blur-[22px] lg:flex">
      <LogoEstudia />

      <nav className="custom-scrollbar mt-8 flex-1 space-y-1 overflow-y-auto pr-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeTab === item.tab || (activeTab === "search" && item.label === "Início")}
            onClick={() => onNavigate(item.tab)}
          />
        ))}
      </nav>

      <div className="mt-4 rounded-3xl border border-[#00C8FF]/25 bg-gradient-to-br from-[#0B7CFF]/15 to-[#8B35FF]/10 p-4 shadow-[0_16px_38px_rgba(11,124,255,0.16)]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00C8FF]">Plano Educacional</p>
        <p className="mt-1 text-lg font-black text-white">Gratuito</p>
        <p className="mt-2 text-xs leading-5 text-[#B9C4D8]">IA, flashcards, quiz e atualidades para estudar melhor todos os dias.</p>
      </div>

      <div className="mt-4 space-y-3">
        <UserProfileCard />
        <SidebarItem label="Sair" icon="LogOut" danger onClick={handleSignOut} />
      </div>
    </aside>
  );
}
