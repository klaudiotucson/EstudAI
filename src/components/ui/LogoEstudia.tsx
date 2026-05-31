import Image from "next/image";

interface LogoEstudiaProps {
  compact?: boolean;
  className?: string;
}

export default function LogoEstudia({ compact = false, className = "" }: LogoEstudiaProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-white/12 bg-white/95 shadow-[0_0_34px_rgba(0,200,255,0.22)] ${compact ? "h-16 w-16" : "h-24 w-24"} ${className}`}
      aria-label="estudAI"
    >
      <Image
        src="/brand/logo.png"
        alt="Logo estudAI"
        fill
        priority
        sizes={compact ? "64px" : "96px"}
        className="object-contain"
      />
    </div>
  );
}
