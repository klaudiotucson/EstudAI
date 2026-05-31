"use client";

import React, { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, MessageCircle, Send, Sparkles, Target } from "lucide-react";
import { criarBlueprintTutorIngles } from "@/lib/funcoes-planejamento-interativo";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const scenarioOptions = [
  "school routine",
  "introducing myself safely",
  "ordering food",
  "asking for directions",
  "talking about hobbies",
  "test review",
  "grammar correction",
  "pronunciation practice"
];

export default function EnglishTutorAI() {
  const [level, setLevel] = useState("A1");
  const [mode, setMode] = useState("roleplay");
  const [scenario, setScenario] = useState("school routine");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I am your English tutor. Choose a level and a scenario. Then write one sentence in English and I will help you improve it."
    }
  ]);

  const blueprint = useMemo(() => criarBlueprintTutorIngles({ nivel: level, objetivo: scenario }), [level, scenario]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const nextMessages: Message[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/english-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, level, mode, scenario })
      });
      const json = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: json.response || "I could not answer now." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I could not connect right now. Try: I like math because it is interesting." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <section className="rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300 font-black">English AI Tutor</p>
            <h2 className="text-3xl font-black text-white mt-2">Tutor IA de ingles</h2>
            <p className="text-slate-400 mt-3 max-w-3xl">
              Conversa por nivel CEFR, roleplay, correcao explicada, vocabulario salvo e pratica de pronuncia.
              Inspirado em modelos como Duolingo Max, Busuu Conversations e ELSA Speak.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["A1", "A2", "B1"].map((item) => (
              <button
                key={item}
                onClick={() => setLevel(item)}
                className={`rounded-xl px-4 py-3 font-black text-sm ${level === item ? "bg-emerald-500 text-white" : "bg-slate-950 border border-white/10 text-slate-400"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-[320px_1fr] gap-5">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><Target size={18} /> Configuracao</h3>
            <div className="space-y-3 mt-4">
              <label className="space-y-1 block">
                <span className="text-xs text-slate-500 font-bold">Modo</span>
                <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm">
                  <option value="roleplay">roleplay</option>
                  <option value="explain">explain my answer</option>
                  <option value="grammar">grammar coach</option>
                  <option value="pronunciation">pronunciation coach</option>
                  <option value="vocabulary">vocabulary SRS</option>
                  <option value="test">school test practice</option>
                </select>
              </label>
              <label className="space-y-1 block">
                <span className="text-xs text-slate-500 font-bold">Cenario</span>
                <select value={scenario} onChange={(e) => setScenario(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm">
                  {scenarioOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><BookOpen size={18} /> Rotina premium</h3>
            <div className="space-y-2 mt-4">
              {blueprint.rotina.map((item: string) => (
                <p key={item} className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><Sparkles size={18} /> Sugestoes</h3>
            <div className="space-y-2 mt-4">
              {[
                "I like science because...",
                "Can you correct my sentence?",
                "Let's roleplay ordering food.",
                "Explain why this is wrong."
              ].map((suggestion) => (
                <button key={suggestion} onClick={() => setInput(suggestion)} className="w-full text-left rounded-xl bg-slate-950/70 border border-white/5 px-3 py-2 text-xs text-blue-200 hover:border-blue-400/40">
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 min-h-[620px] flex flex-col">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="font-black text-white flex items-center gap-2"><MessageCircle size={18} /> Conversa guiada</h3>
            <span className="text-xs text-emerald-300 font-bold">{level} - {mode}</span>
          </div>

          <div className="flex-1 overflow-y-auto py-5 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-950 border border-white/10 text-slate-200"}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-emerald-300 font-bold animate-pulse">Thinking in English...</div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-3 pt-4 border-t border-white/5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-emerald-400 text-sm"
              placeholder="Write in English..."
            />
            <button disabled={loading} className="rounded-2xl bg-emerald-500 disabled:opacity-50 px-5 py-3 text-white font-black flex items-center gap-2">
              <Send size={18} /> Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
