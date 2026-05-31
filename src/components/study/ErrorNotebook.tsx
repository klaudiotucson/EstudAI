"use client";
import React from 'react';
import { AlertCircle, CheckCircle, RefreshCcw, Trash2 } from 'lucide-react';

interface ErrorEntry {
  id: string;
  tema: string;
  enunciado: string;
  respostaAluno: string;
  respostaEsperada: string;
  causaProvavel: string;
  createdAt: string;
}

interface ErrorNotebookProps {
  errors: ErrorEntry[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  onExplainError?: (error: ErrorEntry) => void;
}

export default function ErrorNotebook({ errors, onRemove, onClearAll, onExplainError }: ErrorNotebookProps) {
  if (errors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-in fade-in duration-1000">
        <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-5xl shadow-2xl">📙</div>
        <div className="space-y-2">
           <h3 className="text-3xl font-black text-slate-100 tracking-tight">Caderno de Erros Limpo!</h3>
           <p className="text-slate-500 max-w-sm mx-auto font-medium">Isso é sinal de progresso. Seus erros mapeados aparecerão aqui para revisão estratégica.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-slate-900/80 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
        <div className="text-center md:text-left">
          <h3 className="text-4xl font-black text-white tracking-tighter">Meu Caderno de Erros</h3>
          <p className="text-slate-400 font-medium mt-2">Você tem <span className="text-blue-400 font-bold">{errors.length} pontos de atenção</span> mapeados pela IA.</p>
        </div>
        <div className="flex flex-wrap gap-4">
           {onClearAll && (
              <button 
                onClick={onClearAll}
                className="bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/5"
              >
                <Trash2 size={16} /> Limpar Tudo
              </button>
           )}
           <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
             <AlertCircle size={18} /> Recuperação Ativa
           </div>
        </div>
      </div>

      <div className="grid gap-6">
        {errors.map((error) => (
          <div key={error.id} className="group bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-xl hover:border-blue-500/30 transition-all">
            <div className="bg-white/5 p-5 px-8 flex justify-between items-center border-b border-white/5">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">{error.tema}</span>
              <span className="text-[10px] text-slate-500 font-bold">{new Date(error.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Desafio Identificado</p>
                <p className="text-lg text-white font-bold leading-relaxed">{error.enunciado}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-2xl">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Sua Tentativa</p>
                  <p className="text-slate-300 text-sm font-medium">{error.respostaAluno || "(Sem resposta)"}</p>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Correção do Tutor</p>
                  <p className="text-slate-300 text-sm font-medium">{error.respostaEsperada}</p>
                </div>
              </div>

              <div className="bg-blue-600/5 border border-blue-600/10 p-6 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Análise Cognitiva do Erro</p>
                   <p className="text-slate-200 text-sm font-medium leading-relaxed italic">"{error.causaProvavel}"</p>
                </div>
                <AlertCircle className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-400/10 rotate-12" />
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => onExplainError && onExplainError(error)}
                  className="flex-1 min-w-[140px] bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
                >
                  <AlertCircle size={16} /> Me Explique (Tutor IA)
                </button>
                <button className="flex-1 min-w-[140px] bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95">
                  <RefreshCcw size={16} /> Tentar Novamente
                </button>
                <button 
                  onClick={() => onRemove(error.id)}
                  className="flex-1 min-w-[140px] bg-white/5 hover:bg-emerald-600 hover:text-white text-slate-400 text-[10px] font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all border border-white/5 active:scale-95"
                >
                  <CheckCircle size={16} /> Marcar como Dominado
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
