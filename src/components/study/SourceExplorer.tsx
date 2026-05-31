"use client"
import React from 'react';
import { ExternalLink, PlayCircle, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SourceExplorerProps {
  sources: any[];
}

export default function SourceExplorer({ sources }: SourceExplorerProps) {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-3xl font-black text-white tracking-tighter">Fontes e Vídeos Recomendados</h3>
           <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em] mt-2">Curadoria de confiança para o seu estudo</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
           <ShieldCheck className="text-emerald-400" size={20} />
           <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Fontes Verificadas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources?.map((s, i) => {
          const isVideo = s.url?.includes('youtube.com') || s.url?.includes('youtu.be') || s.type === 'video';
          return (
            <a 
              key={i} 
              href={s.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 hover:bg-slate-900 hover:border-blue-500/30 transition-all flex flex-col h-full shadow-lg"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg 
                ${isVideo ? 'bg-red-600/20 text-red-500 border border-red-600/30' : 'bg-blue-600/20 text-blue-400 border border-blue-600/30'}`}>
                {isVideo ? <PlayCircle size={24} /> : <BookOpen size={24} />}
              </div>
              
              <h4 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                {s.title}
              </h4>
              
              <p className="text-sm text-slate-500 font-medium mb-8 flex-1 line-clamp-3">
                {s.description || "Acesse este recurso externo para aprofundar seu conhecimento sobre o tema estudado."}
              </p>

              <div className="flex items-center justify-between mt-auto">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.source || "Confiável"}</span>
                 </div>
                 <ExternalLink size={18} className="text-slate-700 group-hover:text-white transition-all" />
              </div>
            </a>
          );
        })}
      </div>

      {(!sources || sources.length === 0) && (
        <div className="text-center py-20 bg-slate-900/30 border border-dashed border-slate-800 rounded-[3rem]">
           <p className="text-slate-500 font-bold">Nenhuma fonte recomendada disponível para este tema no momento.</p>
        </div>
      )}

      <div className="bg-blue-600/5 border border-blue-600/10 p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-10">
         <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/20 shrink-0">
            <ShieldCheck size={40} className="text-white" />
         </div>
         <div>
            <h4 className="text-2xl font-black text-white">Por que estas fontes são seguras?</h4>
            <p className="text-slate-400 font-medium mt-2 leading-relaxed">
               Nossa curadoria prioriza portais educacionais oficiais (MEC, Khan Academy, Futura), universidades e canais verificados. 
               Lembre-se de sempre conferir a autoria das informações!
            </p>
         </div>
      </div>

    </div>
  );
}
