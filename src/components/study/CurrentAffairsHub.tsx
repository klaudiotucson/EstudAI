"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, BookOpen, CheckCircle2, Globe2, RefreshCw, Search, Sparkles } from "lucide-react";

type CurrentAffair = {
  id: string;
  title: string;
  summary: string;
  link: string;
  publishedAt?: string;
  source: string;
  category: string;
  disciplina: string;
  importance: string;
  perguntaEstudo?: string;
  atividade?: string;
};

export default function CurrentAffairsHub() {
  const [items, setItems] = useState<CurrentAffair[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(false);
  const [filter, setFilter] = useState("todos");
  const [query, setQuery] = useState("");
  const [refreshedAt, setRefreshedAt] = useState("");

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/current-affairs", { cache: "no-store" });
      const json = await response.json();
      setItems(json.itens || []);
      setSources(json.fontes || []);
      setOnline(Boolean(json.online));
      setRefreshedAt(json.refreshedAt || json.atualizadoEm || "");
    } catch {
      setItems([]);
      setOnline(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter = filter === "todos" || item.category === filter || item.disciplina === filter;
      const text = `${item.title} ${item.summary} ${item.source} ${item.disciplina}`.toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [items, filter, query]);

  const filters = ["todos", ...Array.from(new Set(items.flatMap((item) => [item.category, item.disciplina]).filter(Boolean)))];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <section className="rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-black">Atualidades vivas</p>
            <h2 className="text-3xl font-black text-white mt-2">Central de atualidades para estudantes</h2>
            <p className="text-slate-400 mt-3 max-w-3xl">
              Noticias nacionais e internacionais viram conhecimento: resumo, fonte, disciplina relacionada,
              pergunta critica e atividade de sala/estudo.
            </p>
          </div>
          <button onClick={loadNews} className="rounded-2xl bg-cyan-500 text-white px-5 py-3 font-black flex items-center gap-2">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> Atualizar
          </button>
        </div>
      </section>

      <section className="grid xl:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><Search size={18} /> Filtros</h3>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-3 text-sm mt-4 outline-none focus:border-cyan-400"
              placeholder="Buscar assunto"
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${filter === item ? "bg-cyan-500 text-white" : "bg-slate-950 border border-white/10 text-slate-400"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><Globe2 size={18} /> Status</h3>
            <div className="mt-4 rounded-xl bg-slate-950/70 border border-white/5 p-3">
              <p className={`text-sm font-black ${online ? "text-emerald-300" : "text-amber-300"}`}>
                {online ? "Fontes online ativas" : "Usando fallback educativo"}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {refreshedAt ? new Date(refreshedAt).toLocaleString("pt-BR") : "Aguardando atualizacao"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><BookOpen size={18} /> Metodo de leitura</h3>
            <div className="space-y-2 mt-4">
              {["O que aconteceu?", "Onde e quando?", "Quem foi afetado?", "Por que importa?", "Qual fonte confirma?"].map((item) => (
                <p key={item} className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" /> {item}
                </p>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          {loading && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-10 text-center">
              <RefreshCw size={26} className="animate-spin mx-auto text-cyan-300" />
              <p className="text-cyan-300 font-bold mt-3">Buscando atualidades em fontes confiaveis...</p>
            </div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-10 text-center">
              <AlertCircle className="mx-auto text-amber-300" />
              <p className="text-slate-300 mt-3">Nenhuma atualidade encontrada para esse filtro.</p>
            </div>
          )}

          {filteredItems.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 hover:border-cyan-400/40 transition-all">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[11px] text-cyan-200 font-bold">{item.category}</span>
                    <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] text-blue-200 font-bold">{item.disciplina}</span>
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] text-amber-200 font-bold">{item.importance}</span>
                  </div>
                  <h3 className="text-xl font-black text-white leading-snug">{item.title}</h3>
                </div>
                <a href={item.link} target="_blank" rel="noreferrer" className="rounded-xl bg-white text-slate-950 px-4 py-2 text-xs font-black">
                  Fonte
                </a>
              </div>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">{item.summary || "Sem resumo disponivel na fonte."}</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                  <p className="text-xs text-slate-500 font-bold">Pergunta de estudo</p>
                  <p className="text-sm text-cyan-200 mt-1">{item.perguntaEstudo}</p>
                </div>
                <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                  <p className="text-xs text-slate-500 font-bold">Atividade</p>
                  <p className="text-sm text-slate-300 mt-1">{item.atividade}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-2">
                <Sparkles size={13} /> Fonte: {item.source} {item.publishedAt ? `- ${item.publishedAt}` : ""}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <h3 className="font-black text-white">Fontes e curadoria</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {sources.map((source: any) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-950/70 border border-white/5 p-3 hover:border-cyan-400/40 transition-all">
              <p className="text-cyan-300 text-sm font-bold">{source.source}</p>
              <p className="text-slate-500 text-xs mt-1">{source.role}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
