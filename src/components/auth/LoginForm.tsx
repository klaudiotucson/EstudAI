"use client";

import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import GradientButton from "@/components/ui/GradientButton";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginForm() {
  const supabaseReady = isSupabaseConfigured();
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("password") === "updated") {
      setStatus("Senha atualizada. Entre com sua nova senha.");
    }
    if (params.get("error")) {
      setError("Nao foi possivel concluir a autenticacao. Tente novamente.");
    }
  }, []);

  const redirectToApp = () => {
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.href = next || "/";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setStatus("");

    if (!supabaseReady) {
      setError("Supabase ainda nao esta configurado. Use o modo demonstracao ou preencha as variaveis de ambiente.");
      return;
    }

    if (password.length < 8) {
      setError("Use uma senha com pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { error: authError } = mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/confirm`,
              data: { display_name: email.split("@")[0] },
            },
          })
        : await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(toFriendlyAuthError(authError.message));
        return;
      }

      if (!remember) {
        await supabase.auth.refreshSession();
      }

      if (mode === "signup") {
        setStatus("Cadastro criado. Verifique seu e-mail se a confirmacao estiver ativada.");
        return;
      }

      redirectToApp();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");

    if (!supabaseReady) {
      setError("Configure Supabase Auth e o provider Google antes de usar este login.");
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });

    if (authError) setError(toFriendlyAuthError(authError.message));
  };

  const handleResetPassword = async () => {
    setError("");
    setStatus("");

    if (!supabaseReady) {
      setError("Configure Supabase Auth antes de recuperar senha.");
      return;
    }

    if (!email) {
      setError("Informe o e-mail primeiro.");
      return;
    }

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });

    if (resetError) {
      setError(toFriendlyAuthError(resetError.message));
      return;
    }

    setStatus("Enviamos o link de recuperacao para o e-mail informado.");
  };

  const enterDemoMode = () => {
    localStorage.setItem("estudai_demo_mode", "true");
    redirectToApp();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!supabaseReady && (
        <div className="flex gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-5 text-amber-100">
          <AlertCircle className="mt-0.5 shrink-0 text-amber-300" size={18} />
          <span>Auth real ainda nao configurado. O modo demonstracao nao salva dados em conta.</span>
        </div>
      )}

      <label className="block space-y-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B9C4D8]">E-mail</span>
        <div className="flex h-[54px] items-center gap-3 rounded-2xl border border-white/12 bg-[#081229]/80 px-4 transition-all focus-within:border-[#00C8FF]/65 focus-within:shadow-[0_0_28px_rgba(0,200,255,0.14)]">
          <Mail size={19} className="text-[#00C8FF]" />
          <input
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-[#6F7C96]"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="aluno@estudai.com"
            required
            type="email"
            value={email}
          />
        </div>
      </label>

      <label className="block space-y-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B9C4D8]">Senha</span>
        <div className="flex h-[54px] items-center gap-3 rounded-2xl border border-white/12 bg-[#081229]/80 px-4 transition-all focus-within:border-[#00C8FF]/65 focus-within:shadow-[0_0_28px_rgba(0,200,255,0.14)]">
          <Lock size={19} className="text-[#00C8FF]" />
          <input
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-[#6F7C96]"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimo de 8 caracteres"
            required
            type={showPassword ? "text" : "password"}
            value={password}
          />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-[#6F7C96] transition-colors hover:text-white" aria-label="Mostrar senha">
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>
      </label>

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 font-semibold text-[#B9C4D8]">
          <input
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-[#081229] accent-[#0B7CFF]"
          />
          Lembrar de mim
        </label>
        <button type="button" onClick={handleResetPassword} className="font-bold text-[#00C8FF] transition-colors hover:text-white">Esqueci minha senha</button>
      </div>

      {error && <p className="rounded-2xl border border-red-400/25 bg-red-500/10 p-3 text-sm font-semibold text-red-100">{error}</p>}
      {status && <p className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-100">{status}</p>}

      <GradientButton type="submit" disabled={loading} className="w-full">
        {loading ? "Acessando..." : mode === "login" ? "Entrar" : "Criar conta"}
      </GradientButton>

      {!supabaseReady && (
        <button
          type="button"
          onClick={enterDemoMode}
          className="h-[48px] w-full rounded-2xl border border-[#00C8FF]/25 bg-[#00C8FF]/10 text-sm font-black text-[#00C8FF] transition-colors hover:bg-[#00C8FF]/15 hover:text-white"
        >
          Entrar em modo demonstracao
        </button>
      )}

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#6F7C96]">ou</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button type="button" onClick={handleGoogle} className="flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] font-black text-white transition-all hover:border-[#00C8FF]/45 hover:bg-white/[0.08]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-black text-[#0B7CFF]">G</span>
        Entrar com Google
      </button>

      <p className="text-center text-sm font-semibold text-[#B9C4D8]">
        {mode === "login" ? "Ainda nao tem conta?" : "Ja tem conta?"}{" "}
        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-black text-[#00C8FF] hover:text-white">
          {mode === "login" ? "Criar conta" : "Entrar"}
        </button>
      </p>
    </form>
  );
}

function toFriendlyAuthError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (normalized.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (normalized.includes("already registered") || normalized.includes("already exists")) return "Este e-mail ja possui cadastro.";
  if (normalized.includes("password")) return "Revise a senha. Ela deve ter pelo menos 8 caracteres.";
  return "Nao foi possivel concluir a autenticacao. Tente novamente.";
}
