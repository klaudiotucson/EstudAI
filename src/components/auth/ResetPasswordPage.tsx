"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import GradientButton from "@/components/ui/GradientButton";
import LogoEstudia from "@/components/ui/LogoEstudia";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!isSupabaseConfigured()) {
      setError("Supabase Auth ainda nao esta configurado.");
      return;
    }

    if (password.length < 8) {
      setError("Use uma senha com pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas nao conferem.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Senha atualizada com sucesso. Voce ja pode entrar com a nova senha.");
      window.setTimeout(() => {
        window.location.href = "/login?password=updated";
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#030712,#07142f_55%,#020617)] px-5 py-10 text-white">
      <section className="w-full max-w-md rounded-[28px] border border-white/12 bg-[rgba(7,18,43,0.78)] p-8 shadow-[0_0_50px_rgba(0,132,255,0.18),inset_0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-[20px]">
        <div className="mb-8 flex justify-center">
          <LogoEstudia />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#00C8FF]">Seguranca da conta</p>
        <h1 className="mt-2 text-3xl font-black">Criar nova senha</h1>
        <p className="mt-2 text-sm leading-6 text-[#B9C4D8]">Escolha uma senha forte para proteger o acesso ao EstudAI.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <PasswordInput
            label="Nova senha"
            onToggle={() => setShowPassword((value) => !value)}
            setValue={setPassword}
            show={showPassword}
            value={password}
          />
          <PasswordInput
            label="Confirmar senha"
            onToggle={() => setShowPassword((value) => !value)}
            setValue={setConfirmPassword}
            show={showPassword}
            value={confirmPassword}
          />

          {error && <p className="rounded-2xl border border-red-400/25 bg-red-500/10 p-3 text-sm font-semibold text-red-100">{error}</p>}
          {message && <p className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-100">{message}</p>}

          <GradientButton type="submit" disabled={loading} className="w-full">
            {loading ? "Salvando..." : "Atualizar senha"}
          </GradientButton>
        </form>
      </section>
    </main>
  );
}

function PasswordInput({
  label,
  onToggle,
  setValue,
  show,
  value,
}: {
  label: string;
  onToggle: () => void;
  setValue: (value: string) => void;
  show: boolean;
  value: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B9C4D8]">{label}</span>
      <div className="flex h-[54px] items-center gap-3 rounded-2xl border border-white/12 bg-[#081229]/80 px-4 transition-all focus-within:border-[#00C8FF]/65 focus-within:shadow-[0_0_28px_rgba(0,200,255,0.14)]">
        <Lock size={19} className="text-[#00C8FF]" />
        <input
          autoComplete="new-password"
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-[#6F7C96]"
          minLength={8}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Minimo de 8 caracteres"
          required
          type={show ? "text" : "password"}
          value={value}
        />
        <button type="button" onClick={onToggle} className="text-[#6F7C96] transition-colors hover:text-white" aria-label="Mostrar senha">
          {show ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
    </label>
  );
}
