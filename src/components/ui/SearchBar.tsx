"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  loading = false,
  placeholder = "O que você quer estudar hoje?",
}: SearchBarProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="group flex min-h-14 items-center gap-3 rounded-[18px] border border-white/14 bg-[rgba(8,18,41,0.88)] px-4 shadow-[inset_0_0_28px_rgba(255,255,255,0.025)] backdrop-blur-2xl transition-all focus-within:border-[#00C8FF]/70 focus-within:shadow-[0_0_36px_rgba(0,200,255,0.16)]"
    >
      <Search size={21} className="text-[#00C8FF]" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent py-4 text-[15px] font-semibold text-white outline-none placeholder:text-[#6F7C96]"
        placeholder={placeholder}
      />
      <button
        type="button"
        disabled
        title="Filtros em breve"
        className="hidden h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#6F7C96] opacity-60 sm:grid"
        aria-label="Filtros em breve"
      >
        <SlidersHorizontal size={18} />
      </button>
      <button
        type="submit"
        disabled={loading}
        className="grid h-11 min-w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0B7CFF] to-[#8B35FF] px-3 text-sm font-black text-white shadow-[0_12px_26px_rgba(11,124,255,0.3)] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 sm:px-5"
        aria-label="Buscar"
      >
        <Search size={18} className="sm:hidden" />
        <span className="hidden sm:inline">{loading ? "Buscando..." : "Buscar"}</span>
      </button>
    </form>
  );
}
