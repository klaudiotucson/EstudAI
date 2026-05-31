"use client";

import { X } from "lucide-react";
import LogoEstudia from "@/components/ui/LogoEstudia";
import { sidebarItems } from "@/data/sidebarItems";
import SidebarItem from "./SidebarItem";
import UserProfileCard from "./UserProfileCard";

interface MobileDrawerProps {
  open: boolean;
  activeTab: string;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export default function MobileDrawer({ open, activeTab, onClose, onNavigate }: MobileDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[300px] max-w-[86vw] flex-col border-r border-white/12 bg-[rgba(4,13,34,0.96)] p-4 shadow-2xl backdrop-blur-[22px] transition-transform duration-300 sm:p-5 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <LogoEstudia />
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white">
            <X size={19} />
          </button>
        </div>

        <nav className="custom-scrollbar mt-6 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={activeTab === item.tab || (activeTab === "search" && item.label === "Início")}
              onClick={() => {
                onNavigate(item.tab);
                onClose();
              }}
            />
          ))}
        </nav>

        <div className="space-y-3 pt-4">
          <UserProfileCard />
          <SidebarItem label="Sair" icon="LogOut" danger onClick={() => { window.location.href = "/login"; }} />
        </div>
      </aside>
    </>
  );
}
