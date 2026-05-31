import React, { useState } from 'react';
import { FileEdit, CheckCircle, Brain, X } from 'lucide-react';

interface BlankPageRecallProps {
  topic: string;
}

export default function BlankPageRecall({ topic }: BlankPageRecallProps) {
  const [content, setContent] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleEvaluate = async () => {
    if (content.trim().length < 10) {
      alert("Escreva um pouco mais para podermos avaliar!");
      return;
    }
    
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/evaluate/blank-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, content })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao avaliar folha em branco.');
    }
    setIsEvaluating(false);
  };

  if (result) {
    return (
      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 mt-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={() => setResult(null)} className="text-slate-500 hover:text-white"><X size={20}/></button>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Análise da sua Memória</h3>
            <p className="text-sm text-slate-400">Pontuação de recuperação ativa: <strong className="text-emerald-400">{result.score}/10</strong></p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl">
            <p className="text-sm text-emerald-300 font-bold uppercase tracking-widest mb-2">Você lembrou bem de:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {result.remembered.map((item: string, i: number) => <li key={i} className="text-sm">{item}</li>)}
            </ul>
          </div>
          <div className="p-4 bg-orange-950/30 border border-orange-500/20 rounded-xl">
            <p className="text-sm text-orange-300 font-bold uppercase tracking-widest mb-2">Ficou faltando:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {result.missed.map((item: string, i: number) => <li key={i} className="text-sm">{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
          <FileEdit size={20} />
        </div>
        <div>
          <h3 className="font-black text-white text-lg">Prática: Folha em Branco</h3>
          <p className="text-xs text-slate-400">Escreva TUDO que você lembra sobre <strong>{topic}</strong> antes de estudar a teoria.</p>
        </div>
      </div>
      
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-40 bg-slate-950 border border-white/10 rounded-xl p-4 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none mb-4"
        placeholder={`O que vem à sua mente quando ouve falar de ${topic}? Escreva sem pesquisar...`}
      />

      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-500 flex items-center gap-1"><Brain size={14}/> Método poderoso de recuperação ativa</p>
        <button 
          onClick={handleEvaluate}
          disabled={isEvaluating}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all flex items-center gap-2"
        >
          {isEvaluating ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <CheckCircle size={18} />
          )}
          {isEvaluating ? 'Avaliando...' : 'Avaliar Memória'}
        </button>
      </div>
    </div>
  );
}
