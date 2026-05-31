import { User } from "lucide-react";

export default function UserProfileCard() {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#0B7CFF] to-[#8B35FF] text-white shadow-[0_0_24px_rgba(11,124,255,0.28)]">
        <User size={20} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-white">Aluno</p>
        <p className="text-xs font-semibold text-[#B9C4D8]">7º ano</p>
      </div>
    </div>
  );
}
