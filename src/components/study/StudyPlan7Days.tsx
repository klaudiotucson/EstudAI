"use client"
import React from 'react';
import { Calendar, Circle } from 'lucide-react';

interface StudyPlan7DaysProps {
  plan: any[];
}

export default function StudyPlan7Days({ plan }: StudyPlan7DaysProps) {
  if (!plan || plan.length === 0) return <p className="text-slate-500 italic">Plano de 7 dias não disponível.</p>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-600/30">
          <Calendar className="text-blue-400" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-100">Jornada de 7 Dias</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Seu caminho para o domínio completo</p>
        </div>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600/50 via-slate-800 to-transparent"></div>

        <div className="space-y-6">
          {plan.map((day, i) => (
            <div key={i} className="relative pl-16 group">
              {/* Dot */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-600 z-10 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
              
              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] hover:bg-slate-900 hover:border-blue-500/30 transition-all flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex flex-col items-center justify-center border border-blue-600/20">
                  <span className="text-[10px] font-black text-blue-500 uppercase">Dia</span>
                  <span className="text-xl font-black text-white leading-none">{day.dia}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-slate-100">{day.titulo}</h4>
                  <p className="text-sm text-slate-400 font-medium">{day.atividade}</p>
                </div>
                <div className="text-slate-700 group-hover:text-blue-500 transition-colors">
                  <Circle size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
