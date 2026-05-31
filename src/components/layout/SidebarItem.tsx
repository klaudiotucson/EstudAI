import {
  BarChart3,
  BookOpen,
  Clock,
  GraduationCap,
  Home,
  LogOut,
  Medal,
  PanelsTopLeft,
  Settings,
  Star,
  Trophy,
} from "lucide-react";

interface SidebarItemProps {
  label: string;
  icon: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

const icons = {
  BarChart3,
  BookOpen,
  Clock,
  GraduationCap,
  Home,
  LogOut,
  Medal,
  PanelsTopLeft,
  Settings,
  Star,
  Trophy,
};

export default function SidebarItem({ label, icon, active = false, danger = false, onClick }: SidebarItemProps) {
  const Icon = icons[icon as keyof typeof icons] || Home;

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-[14px] px-4 py-3.5 text-[15px] font-bold leading-5 transition-all ${
        active
          ? "bg-gradient-to-br from-[#0B7CFF] to-[#274BFF] text-white shadow-[0_10px_28px_rgba(11,124,255,0.35)]"
          : danger
            ? "text-[#FF4D5E] hover:bg-[#FF4D5E]/10"
            : "text-[#B9C4D8] hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <Icon size={20} className={active ? "text-white" : danger ? "text-[#FF4D5E]" : "text-[#6F7C96]"} />
      {label}
    </button>
  );
}
