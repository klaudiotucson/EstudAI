import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function GradientButton({ children, className = "", ...props }: GradientButtonProps) {
  return (
    <button
      className={`h-[54px] rounded-2xl bg-gradient-to-br from-[#0B7CFF] to-[#8B35FF] px-6 font-black text-white shadow-[0_14px_32px_rgba(11,124,255,0.35)] transition-all hover:brightness-110 hover:shadow-[0_18px_42px_rgba(0,200,255,0.32)] active:scale-[0.98] disabled:opacity-55 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
