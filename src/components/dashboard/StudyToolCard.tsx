import {
  Brain,
  CircleHelp,
  FileDown,
  FileText,
  MessageCircle,
  Mic,
  Music,
  PanelsTopLeft,
} from "lucide-react";

interface StudyToolCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick?: () => void;
}

const icons = { Brain, CircleHelp, FileDown, FileText, MessageCircle, Mic, Music, PanelsTopLeft };

const colorClasses: Record<string, string> = {
  blue: "from-[#0B7CFF] to-[#00C8FF]",
  green: "from-[#2EDB88] to-[#00C8FF]",
  purple: "from-[#8B35FF] to-[#B832FF]",
  cyan: "from-[#00C8FF] to-[#0B7CFF]",
  pink: "from-[#B832FF] to-[#FF4D9D]",
  red: "from-[#FF4D5E] to-[#FF8A2A]",
};

export default function StudyToolCard({ title, description, icon, color, onClick }: StudyToolCardProps) {
  const Icon = icons[icon as keyof typeof icons] || FileText;

  return (
    <button
      onClick={onClick}
      className="group flex min-h-[124px] flex-col items-start gap-3 rounded-[20px] border border-white/12 bg-[rgba(13,25,55,0.78)] p-4 text-left backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00C8FF]/45 hover:bg-[rgba(22,43,92,0.9)] hover:shadow-[0_16px_34px_rgba(0,200,255,0.14)] sm:min-h-[104px] sm:flex-row sm:items-center sm:gap-4"
    >
      <div className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${colorClasses[color] || colorClasses.blue} shadow-[0_12px_28px_rgba(11,124,255,0.22)] transition-transform group-hover:scale-110`}>
        <Icon size={23} className="text-white" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-black leading-5 text-white">{title}</h3>
        <p className="mt-1 text-xs leading-4 text-[#B9C4D8]">{description}</p>
      </div>
    </button>
  );
}
