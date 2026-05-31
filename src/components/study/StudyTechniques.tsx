"use client";
import React from 'react';

interface StudyTechniquesProps {
  tecnicas: any;
  onStartMode?: (mode: string) => void;
}

export default function StudyTechniques({ tecnicas, onStartMode }: StudyTechniquesProps) {
  const lista = tecnicas?.tecnicas || [];
  const atividades = tecnicas?.atividades || [];

  if (!lista.length) return <p className="text-slate-400">Plano de técnicas ainda não disponível.</p>;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-2xl font-black text-slate-100">Estudo ativo recomendado</h3>
        <p className="text-slate-400 mt-2">Estas técnicas foram escolhidas conforme tema, disciplina e desempenho estimado.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {lista.map((tec: any) => (
          <div key={tec.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-lg font-bold text-slate-100">{tec.name}</h4>
              <span className="text-[11px] px-2 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20">{tec.evidence}</span>
            </div>
            <p className="text-slate-300 text-sm mt-3">{tec.goal}</p>
            <p className="text-emerald-300 text-sm mt-3 font-semibold">{tec.appFeature}</p>
            <p className="text-slate-400 text-sm mt-1">{tec.studentAction}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h4 className="font-bold text-slate-100 mb-4">Iniciar Prática Ativa</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => onStartMode?.('feynman')}
            className="flex flex-col items-center justify-center p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-2xl hover:bg-indigo-900/40 transition group"
          >
             <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🗣️</span>
             <span className="font-bold text-slate-100">Modo Feynman</span>
             <span className="text-[10px] text-slate-400 mt-1">Explicar para o professor IA</span>
          </button>
          <button 
            onClick={() => onStartMode?.('recall')}
            className="flex flex-col items-center justify-center p-6 bg-emerald-900/20 border border-emerald-500/30 rounded-2xl hover:bg-emerald-900/40 transition group"
          >
             <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🧠</span>
             <span className="font-bold text-slate-100">Modo Recall</span>
             <span className="text-[10px] text-slate-400 mt-1">Recuperar da memória</span>
          </button>
          <button 
            onClick={() => onStartMode?.('socratico')}
            className="flex flex-col items-center justify-center p-6 bg-amber-900/20 border border-amber-500/30 rounded-2xl hover:bg-amber-900/40 transition group"
          >
             <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔀</span>
             <span className="font-bold text-slate-100">Prática Intercalada</span>
             <span className="text-[10px] text-slate-400 mt-1">Misturar tópicos</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h4 className="font-bold text-slate-100 mb-4">Atividades que o app deve gerar</h4>
        <div className="space-y-3">
          {atividades.map((act: any) => (
            <div key={act.techniqueId} className="border border-slate-800 rounded-xl p-4 bg-slate-950/60">
              <p className="font-semibold text-indigo-300">{act.title}</p>
              <p className="text-sm text-slate-300 mt-1">{act.prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
