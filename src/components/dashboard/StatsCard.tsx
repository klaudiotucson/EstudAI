import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "blue" | "orange" | "green" | "purple";
}

const toneClasses = {
  blue: "from-[#0B7CFF]/20 to-[#00C8FF]/10 text-[#00C8FF]",
  orange: "from-[#FF8A2A]/20 to-[#FFD54A]/10 text-[#FFD54A]",
  green: "from-[#2EDB88]/20 to-[#00C8FF]/10 text-[#2EDB88]",
  purple: "from-[#8B35FF]/20 to-[#B832FF]/10 text-[#B832FF]",
};

export default function StatsCard({ icon: Icon, label, value, tone = "blue" }: StatsCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(13,25,55,0.72)] px-4 py-3 backdrop-blur-xl">
      <div className={`grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br ${toneClasses[tone]}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6F7C96]">{label}</p>
        <p className="text-sm font-black text-white">{value}</p>
      </div>
    </div>
  );
}
