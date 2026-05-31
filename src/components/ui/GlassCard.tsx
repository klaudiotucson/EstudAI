import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`border border-white/12 bg-[rgba(13,25,55,0.72)] shadow-[inset_0_0_40px_rgba(255,255,255,0.025)] backdrop-blur-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
