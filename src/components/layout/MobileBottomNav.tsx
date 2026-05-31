"use client";

import { BookOpen, GraduationCap, Home, Star, User } from "lucide-react";
import { mobileNavItems } from "@/data/sidebarItems";

interface MobileBottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const icons = { BookOpen, GraduationCap, Home, Star, User };

export default function MobileBottomNav({ activeTab, onNavigate }: MobileBottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[76px] items-center justify-around border-t border-white/12 bg-[rgba(5,13,34,0.94)] px-2 backdrop-blur-[18px] lg:hidden">
      {mobileNavItems.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons] || Home;
        const active = activeTab === item.tab || (activeTab === "search" && item.label === "Início");
        return (
          <button
            key={item.label}
            onClick={() => onNavigate(item.tab)}
            className={`flex min-w-0 flex-1 flex-col items-center gap-1 text-[10px] font-black transition-colors ${active ? "text-[#00C8FF]" : "text-[#6F7C96]"}`}
          >
            <Icon size={21} />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
