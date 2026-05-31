"use client"
import React from 'react';
import { Zap, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

interface ExamEveModeProps {
  onAction: (action: string) => void;
}

export default function ExamEveMode({ onAction }: ExamEveModeProps) {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={32} className="fill-white" />
            <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Modo Prioridade Máxima</span>
          </div>
          <h2 className="text-4xl font-black mb-4">Faltam poucas horas!</h2>
          <p className="text-lg font-medium opacity-90 max-w-xl">
            O Modo Véspera foca 100% em **Prática de Recuperação** e **Revisão de Erros**. Não tente aprender temas novos agora, vamos garantir o que você já sabe.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Zap size={300} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-red-500/20 p-8 rounded-[2.5rem] space-y-6">
           <h3 className="text-xl font-black text-white flex items-center gap-3">
              <AlertTriangle className="text-orange-500" /> O que fazer agora:
           </h3>
           <ul className="space-y-4">
              {[
                { t: 'Revisar Cards Vermelhos', d: 'Focar nos flashcards que você errou recentemente.', act: 'flashcards' },
                { t: 'Simulado de 10 Minutos', d: 'Um teste rápido com questões variadas.', act: 'quiz' },
                { t: 'Ler Resumo Rápido', d: 'Apenas os pontos principais para ativar a memória.', act: 'resumo' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all cursor-pointer group" onClick={() => onAction(item.act)}>
                   <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1">{i+1}</div>
                   <div className="flex-1">
                      <p className="font-bold text-slate-100 group-hover:text-red-400 transition-colors">{item.t}</p>
                      <p className="text-xs text-slate-500">{item.d}</p>
                   </div>
                   <ArrowRight size={18} className="text-slate-700 group-hover:text-red-500 mt-2" />
                </li>
              ))}
           </ul>
        </div>

        <div className="bg-slate-900 border border-emerald-500/20 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center space-y-4">
           <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 size={40} className="text-emerald-500" />
           </div>
           <h3 className="text-2xl font-black text-white">Você está preparado!</h3>
           <p className="text-slate-400 text-sm max-w-xs">
              Mantenha a calma, durma bem e confie no processo. O EstudAI Premium organizou tudo para você.
           </p>
           <button 
             onClick={() => onAction('dashboard')}
             className="mt-4 text-slate-500 hover:text-white text-sm font-bold uppercase tracking-widest"
           >
              Voltar ao Início
           </button>
        </div>
      </div>
    </div>
  );
}
