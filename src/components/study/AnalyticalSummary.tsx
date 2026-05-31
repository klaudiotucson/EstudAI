"use client";
import React from 'react';

interface AnalyticalSummaryProps {
  data: any;
}

function InfoList({ title, items }: { title: string, items: any[] }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
      <h4 className="font-bold text-slate-100 mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-slate-300">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-blue-400">•</span>
            <span>{typeof item === 'string' ? item : item.title || item.prompt || JSON.stringify(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AnalyticalSummary({ data }: AnalyticalSummaryProps) {
  if (!data) return <p className="text-slate-400">Resumo analítico ainda não disponível.</p>;

  return (
    <div className="space-y-6">
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-bold mb-2">Ideia central</p>
        <p className="text-lg text-slate-100 leading-relaxed">{data.centralIdea}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {(data.mostImportantTopics || []).map((item: any) => (
          <div key={item.priority} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <span className="text-xs text-emerald-400 font-bold">Prioridade {item.priority}</span>
            <h3 className="text-xl font-bold text-slate-100 mt-2">{item.title}</h3>
            <p className="text-slate-300 text-sm mt-3">{item.explanation}</p>
            <p className="text-indigo-300 text-sm mt-3">{item.studyAction}</p>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <InfoList title="Entender primeiro" items={data.understandFirst || []} />
        <InfoList title="Memorizar depois" items={data.memorizeAfterUnderstanding || []} />
        <InfoList title="Como pode cair em prova" items={data.likelyExamQuestions || []} />
      </section>
    </div>
  );
}
