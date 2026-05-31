"use client";
import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

interface FlashcardContainerProps {
  topic: string;
  flashcards?: any[];
  onResult?: (flashcard: any, result: 'correct' | 'incorrect') => void;
}

export default function FlashcardContainer({ topic, flashcards: initialFlashcards = [], onResult }: FlashcardContainerProps) {
  const [flashcards, setFlashcards] = useState<any[]>(initialFlashcards);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [rated, setRated] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(6);

  useEffect(() => {
    if (initialFlashcards.length > 0) setFlashcards(initialFlashcards);
  }, [initialFlashcards]);

  const generateFlashcards = async () => {
      setLoading(true);
      try {
          const res = await fetch('/api/generate/flashcards', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic, count })
          });
          const data = await res.json();
          if (data.flashcards) setFlashcards(data.flashcards);
      } catch {
          alert('Erro ao gerar flashcards.');
      }
      setLoading(false);
  };

  const handleRate = (index: number, result: 'correct' | 'incorrect') => {
    if (onResult) {
      onResult(flashcards[index], result);
    }
    setRated(p => ({...p, [index]: true}));
  };

  if (flashcards.length === 0) {
      return (
          <div className="bg-[#0a1428]/40 border border-white/5 p-8 rounded-3xl text-center max-w-xl mx-auto shadow-2xl">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Layers size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Gerar Baralho de Flashcards</h3>
              <p className="text-slate-400 mb-8">Revise o tema <strong>{topic}</strong> com repetição espaçada</p>
              
              <div className="flex gap-4 mb-8">
                  <div className="flex-1 text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Quantidade de Cartões</label>
                      <select value={count} onChange={e => setCount(parseInt(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none">
                          <option value={6}>6 Cartões (Rápido)</option>
                          <option value={12}>12 Cartões (Padrão)</option>
                          <option value={20}>20 Cartões (Intenso)</option>
                      </select>
                  </div>
              </div>

              <button 
                  onClick={generateFlashcards} 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
              >
                  {loading ? 'Gerando...' : 'Criar Meu Baralho'}
              </button>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8 bg-blue-900/20 p-4 rounded-2xl border border-blue-500/20">
          <div className="flex items-center gap-3">
              <Layers className="text-blue-400" />
              <h3 className="text-lg font-black text-white">{flashcards.length} Flashcards Gerados</h3>
          </div>
          <button onClick={() => setFlashcards([])} className="text-xs text-blue-400 hover:text-white font-bold uppercase tracking-wider">
              Gerar Novo Baralho
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((fc, i) => (
        <div key={i} className="relative w-full h-72 perspective-1000 cursor-pointer" onClick={() => setFlipped(p => ({...p, [i]: !p[i]}))}>
          <div className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-xl ${flipped[i] ? 'rotate-y-180' : ''}`}>
            
            {/* Front */}
            <div className="absolute w-full h-full bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-center items-center text-center backface-hidden shadow-lg hover:border-violet-500 transition-colors">
              <span className="absolute top-3 left-3 text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">Frente</span>
              <p className="text-sm text-violet-400 font-semibold mb-2">[{fc.bloom}]</p>
              <h3 className="text-lg font-bold text-slate-100">{fc.front}</h3>
              <p className="absolute bottom-4 text-xs text-slate-500">Clique para girar ↺</p>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full bg-indigo-950 border border-indigo-700 rounded-xl p-6 flex flex-col justify-center items-center text-center backface-hidden shadow-lg rotate-y-180 overflow-y-auto">
              <span className="absolute top-3 left-3 text-xs bg-indigo-800 px-2 py-1 rounded text-slate-300">Verso</span>
              <h3 className="text-md font-medium text-slate-100 mb-6">{fc.back}</h3>
              
              {!rated[i] ? (
                <div className="absolute bottom-4 flex gap-1 w-full justify-center px-4">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRate(i, val >= 3 ? 'correct' : 'incorrect');
                      }}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-[10px] font-bold transition-all hover:scale-110 active:scale-90
                        ${val === 1 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                          val === 2 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
                          val === 3 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                          val === 4 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                          'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'}
                      `}
                      title={val === 1 ? 'Esqueci totalmente' : val === 5 ? 'Dominei perfeitamente' : `Nível ${val}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="absolute bottom-4 text-xs text-indigo-300 font-bold bg-indigo-900/50 px-3 py-1 rounded-full border border-indigo-500/30">
                  Avaliado! ✓
                </div>
              )}
            </div>

          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
