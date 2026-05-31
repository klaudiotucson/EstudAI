"use client";

import React from "react";
import { Flame, Trophy, Lightbulb, Calendar, Brain, Target, BookOpen, CheckCircle, Layers } from "lucide-react";

import BlankPageRecall from './BlankPageRecall';

interface TurboStudyModeProps {
  plan: any;
}

export default function TurboStudyMode({ plan }: TurboStudyModeProps) {
  if (!plan) {
    return (
      <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/70 text-slate-300">
        Modo turbo ainda nao disponivel para este tema.
      </div>
    );
  }

  const methods = plan.metodos || [];
  const configs = plan.configuracoes || [];
  const macetes = plan.bizusEMacetes || [];
  const recursosPremium = plan.recursosPremium || [];
  const bizusPorDisciplina = plan.bizusPorDisciplina || [];
  const sprint = plan.sprintConcurso || [];
  const memoria = plan.memoriaPremium;
  const duasPassagens = plan.treinoDuasPassagens;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <section className="rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-slate-950 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-orange-300 font-black">Modo Turbo</p>
            <h2 className="text-2xl font-black text-white">{plan.tema}</h2>
            <p className="text-slate-400 text-sm">{plan.anoEscolar} • {plan.disciplina}</p>
          </div>
        </div>
        <p className="text-slate-300 mt-5 max-w-3xl">
          Um pacote estilo prova/concurso escolar: teoria minima, macetes responsaveis, questoes,
          revisao espacada, caderno de erros e sprint de alta produtividade.
        </p>

        {/* Integração do Novo Recurso de Folha em Branco */}
        <BlankPageRecall topic={plan.tema} />
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {methods.map((method: any) => (
          <div key={method.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-yellow-300 shrink-0" size={20} />
              <div>
                <h3 className="font-black text-white">{method.nome}</h3>
                <p className="text-sm text-slate-400 mt-1">{method.comoFunciona}</p>
                <p className="text-sm text-blue-300 mt-3 font-semibold">{method.noApp}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <h3 className="font-black text-white flex items-center gap-2"><Brain size={18} /> Recursos premium pesquisados</h3>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {recursosPremium.map((feature: any) => (
            <div key={feature.id} className="rounded-xl bg-slate-950/70 border border-white/5 p-4">
              <p className="text-cyan-300 text-sm font-black">{feature.nome}</p>
              <p className="text-[11px] text-slate-500 mt-1">Inspirado em {feature.inspiradoEm}</p>
              <p className="text-sm text-slate-300 mt-2">{feature.valor}</p>
              <p className="text-xs text-blue-300 mt-3 font-semibold">{feature.primeiroPasso}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
          <h3 className="font-black text-white flex items-center gap-2"><Trophy size={18} /> Bizus e macetes</h3>
          <div className="mt-4 space-y-3">
            {macetes.map((item: any, index: number) => (
              <div key={index} className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                <p className="text-orange-300 font-bold text-sm">{item.macete}</p>
                <p className="text-slate-400 text-xs mt-1">{item.cuidado}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 lg:col-span-2">
          <h3 className="font-black text-white flex items-center gap-2"><Calendar size={18} /> Sprint de estudo</h3>
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            {sprint.map((item: any) => (
              <div key={item.id} className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                <p className="text-blue-300 font-bold text-sm">{item.titulo}</p>
                <p className="text-slate-400 text-xs mt-1">{item.acao}</p>
                <p className="text-slate-500 text-xs mt-2">{item.minutos} min</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
          <h3 className="font-black text-white flex items-center gap-2"><BookOpen size={18} /> Bizus por disciplina</h3>
          <div className="mt-4 space-y-3">
            {bizusPorDisciplina.map((item: any) => (
              <div key={item.id} className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                <p className="text-emerald-300 text-sm font-bold">{item.bizu}</p>
                <p className="text-slate-400 text-xs mt-1">{item.quandoUsar}</p>
                <p className="text-slate-500 text-xs mt-2">{item.validacao}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {memoria && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="font-black text-white flex items-center gap-2"><Layers size={18} /> Motor de memoria</h3>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                  <p className="text-slate-500 text-xs">Retencao alvo</p>
                  <p className="text-blue-300 text-xl font-black">{Math.round(memoria.retencaoAlvo * 100)}%</p>
                </div>
                <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                  <p className="text-slate-500 text-xs">Novos cards/dia</p>
                  <p className="text-blue-300 text-xl font-black">{memoria.novosCardsPorDia}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {(memoria.regras || []).slice(0, 4).map((rule: string) => (
                  <p key={rule} className="text-xs text-slate-300 flex items-start gap-2"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" /> {rule}</p>
                ))}
              </div>
            </div>
          )}

          {duasPassagens && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="font-black text-white flex items-center gap-2"><Target size={18} /> Prova em duas passagens</h3>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                  <p className="text-orange-300 text-sm font-bold">1a passagem</p>
                  <p className="text-slate-400 text-xs mt-1">{duasPassagens.primeiraPassagem.regra}</p>
                  <p className="text-slate-500 text-xs mt-2">{duasPassagens.primeiraPassagem.tempo} min</p>
                </div>
                <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                  <p className="text-orange-300 text-sm font-bold">2a passagem</p>
                  <p className="text-slate-400 text-xs mt-1">{duasPassagens.segundaPassagem.regra}</p>
                  <p className="text-slate-500 text-xs mt-2">{duasPassagens.segundaPassagem.tempo} min</p>
                </div>
              </div>
              <p className="text-xs text-blue-300 mt-4 font-semibold">{duasPassagens.posTreino}</p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <h3 className="font-black text-white">Configuracoes premium recomendadas</h3>
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          {configs.map((config: any) => (
            <div key={config.id} className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
              <p className="text-emerald-300 text-sm font-bold">{config.nome}</p>
              <p className="text-slate-400 text-xs mt-1">{config.valor}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
