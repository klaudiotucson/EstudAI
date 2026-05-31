import {
  Activity,
  Atom,
  BookOpen,
  Calculator,
  Dna,
  FlaskConical,
  Globe2,
  Landmark,
  Languages,
  Lightbulb,
  Palette,
  PenLine,
  PenTool,
  Rocket,
  ScrollText,
  Shield,
} from "lucide-react";

interface SubjectCardProps {
  title: string;
  description: string;
  progress: string;
  icon: string;
  color: string;
  onClick?: () => void;
}

const icons = {
  Activity,
  Atom,
  BookOpen,
  Calculator,
  Dna,
  FlaskConical,
  Globe2,
  Landmark,
  Languages,
  Lightbulb,
  Palette,
  PenLine,
  PenTool,
  Rocket,
  ScrollText,
  Shield,
};

const colorClasses: Record<string, string> = {
  blue: "from-[#0B7CFF] to-[#00C8FF] shadow-[0_0_32px_rgba(0,200,255,0.24)]",
  green: "from-[#2EDB88] to-[#00C8FF] shadow-[0_0_32px_rgba(46,219,136,0.2)]",
  purple: "from-[#8B35FF] to-[#B832FF] shadow-[0_0_32px_rgba(184,50,255,0.2)]",
  orange: "from-[#FF8A2A] to-[#FFD54A] shadow-[0_0_32px_rgba(255,138,42,0.2)]",
  yellow: "from-[#FFD54A] to-[#FF8A2A] shadow-[0_0_32px_rgba(255,213,74,0.2)]",
  red: "from-[#FF356B] to-[#FF6B35] shadow-[0_0_32px_rgba(255,53,107,0.2)]",
  pink: "from-[#FF35B8] to-[#FF356B] shadow-[0_0_32px_rgba(255,53,184,0.2)]",
  cyan: "from-[#00E5FF] to-[#009DFF] shadow-[0_0_32px_rgba(0,229,255,0.2)]",
  indigo: "from-[#5D35FF] to-[#8B35FF] shadow-[0_0_32px_rgba(93,53,255,0.2)]",
  teal: "from-[#00FFB2] to-[#00C8FF] shadow-[0_0_32px_rgba(0,255,178,0.2)]",
};

export default function SubjectCard({ title, description, progress, icon, color, onClick }: SubjectCardProps) {
  const Icon = icons[icon as keyof typeof icons] || BookOpen;

  return (
    <button
      onClick={onClick}
      className="group flex min-h-[184px] min-w-[228px] snap-start flex-col rounded-3xl border border-white/12 bg-[rgba(10,23,52,0.74)] p-5 text-left shadow-[inset_0_0_40px_rgba(255,255,255,0.025)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00C8FF]/45 hover:bg-[rgba(22,43,92,0.9)] hover:shadow-[0_18px_44px_rgba(0,200,255,0.18)] sm:min-w-[252px] sm:p-6 lg:min-h-[210px] lg:min-w-0"
    >
      <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${colorClasses[color] || colorClasses.blue} transition-transform group-hover:scale-110`}>
        <Icon size={26} className="text-white" />
      </div>
      <h3 className="mt-4 text-lg font-black text-white sm:mt-5 sm:text-xl">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-5 text-[#B9C4D8]">{description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#6F7C96]">{progress}</span>
        <span className="h-2 w-16 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-1/2 rounded-full bg-[#00C8FF]" />
        </span>
      </div>
    </button>
  );
}
