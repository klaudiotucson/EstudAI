"use client";
import React from 'react';
import { Target, TrendingUp, Clock, BookOpen, ChevronRight, Brain, Zap } from 'lucide-react';

interface StudyDashboardProps {
  stats: {
    sessions: number;
    cardsReviewed: number;
    accuracy: number;
    timeSpent: number;
  };
  srsQueue: any[];
  knowledgeMap: any[];
  onAction: (action: string) => void;
}

export default function StudyDashboard({ stats, srsQueue, knowledgeMap, onAction }: StudyDashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Sessões', value: stats.sessions, icon: BookOpen, color: 'text-blue-400' },
          { label: 'Cards Revisados', value: stats.cardsReviewed, icon: Brain, color: 'text-violet-400' },
          { label: 'Precisão', value: `${stats.accuracy}%`, icon: Target, color: 'text-emerald-400' },
          { label: 'Tempo (min)', value: stats.timeSpent, icon: Clock, color: 'text-amber-400' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-slate-800 ${item.color}`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</p>
              <p className="text-2xl font-black text-slate-100">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Recommended Action */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                   <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30 uppercase">Recomendação da IA</span>
                   <h3 className="text-3xl font-black text-slate-100 mt-4">Pronto para o Próximo Desafio?</h3>
                   <p className="text-slate-300 mt-2 max-w-md">Com base no seu desempenho no último quiz, sugerimos focar na **Técnica de Feynman** para solidificar os conceitos de base.</p>
                   <button 
                     onClick={() => onAction('memorizacao')}
                     className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all group"
                   >
                     Iniciar Estudo Ativo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
                
                <div className="w-full md:w-auto">
                   <button 
                     onClick={() => onAction('vespera')}
                     className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white p-6 rounded-2xl flex flex-col items-center gap-2 shadow-xl shadow-red-600/20 transition-all active:scale-95"
                   >
                      <Zap size={32} />
                      <div className="text-center">
                         <p className="font-black text-lg">Tenho Prova!</p>
                         <p className="text-[10px] font-bold uppercase opacity-80">Ativar Modo Véspera</p>
                      </div>
                   </button>
                </div>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Brain size={160} className="text-indigo-400" />
             </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6">
            <h4 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-400" /> Histórico de Retenção (7 Dias)
            </h4>
            <div className="flex items-end gap-2 h-32 w-full">
               {[60, 75, 70, 85, 80, 95, 90].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                     <div className="relative w-full bg-slate-800 rounded-t-md flex items-end overflow-hidden h-full">
                        <div 
                           className={`w-full rounded-t-md transition-all duration-1000 ${val > 80 ? 'bg-emerald-500' : val > 65 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                           style={{ height: `${val}%` }}
                        ></div>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                     </div>
                     <span className="text-[10px] text-slate-500 font-bold uppercase">D{i+1}</span>
                  </div>
               ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Target size={20} className="text-emerald-400" /> Domínio de Disciplinas
                </h4>
                <span className="text-xs text-slate-500">MEC 6º Ano</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {knowledgeMap && knowledgeMap.length > 0 ? knowledgeMap.map((skill, i) => (
                 <div key={i} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400 font-medium">{skill.code}</span>
                        <span className="text-emerald-400 font-bold">{skill.mastery}%</span>
                    </div>
                    <p className="text-sm text-slate-200 font-semibold mb-3 truncate">{skill.title}</p>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${skill.mastery}%` }}></div>
                    </div>
                 </div>
               )) : (
                 <div className="col-span-2 text-center p-4">
                     <p className="text-slate-500 italic text-sm">Responda quizzes para gerar dados de domínio.</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* SRS Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between mb-2">
               <h4 className="text-lg font-black text-white">Nível Atual</h4>
               <span className="text-2xl font-black text-blue-400">LVL 4</span>
            </div>
            <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest relative z-10">Explorador do Conhecimento</p>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative z-10 mb-2">
                <div className="h-full bg-blue-500 w-[65%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            </div>
            <p className="text-xs text-slate-500 text-right relative z-10">650 / 1000 XP</p>
            <Brain className="absolute -bottom-4 -right-4 w-32 h-32 text-blue-500/5 opacity-50" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-amber-400" /> Fila de Revisão
            </h4>
            {!srsQueue || srsQueue.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slate-500 text-sm italic">Nenhum card para revisar hoje. Ótimo trabalho!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {srsQueue.slice(0, 5).map((item, i) => (
                        <div key={i} className="bg-slate-800/40 border border-slate-700 p-3 rounded-lg flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-200 font-medium truncate">{item.front}</p>
                                <p className="text-[10px] text-slate-500">Revisar em breve</p>
                            </div>
                        </div>
                    ))}
                    {srsQueue.length > 5 && (
                        <p className="text-center text-xs text-slate-500 font-medium mt-2">+{srsQueue.length - 5} outros na fila</p>
                    )}
                    <button 
                        onClick={() => onAction('flashcards')}
                        className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-sm font-bold transition">
                        Ver Fila Completa
                    </button>
                </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h4 className="text-lg font-bold text-slate-100 mb-4">Metas Diárias</h4>
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</div>
                    <p className="text-sm text-slate-300">Completar 1 sessão de busca</p>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-xs">2</div>
                    <p className="text-sm text-slate-300">Revisar 10 flashcards</p>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-xs">3</div>
                    <p className="text-sm text-slate-300">Fazer 1 Simulado</p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
