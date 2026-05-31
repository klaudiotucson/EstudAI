"use client";
import React, { useState, useEffect } from 'react';
import { Zap, Settings2 } from 'lucide-react';

interface QuizContainerProps {
  topic: string;
  initialQuestions?: any[];
  onIncorrectAnswer?: (question: any, answer: string) => void;
}

export default function QuizContainer({ topic, initialQuestions = [], onIncorrectAnswer }: QuizContainerProps) {
  const [questions, setQuestions] = useState<any[]>(initialQuestions);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('Médio');
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (initialQuestions.length > 0) setQuestions(initialQuestions);
  }, [initialQuestions]);

  const generateQuiz = async () => {
      setLoading(true);
      try {
          const res = await fetch('/api/generate/quiz', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic, difficulty, count })
          });
          const data = await res.json();
          if (data.questions) setQuestions(data.questions);
      } catch {
          alert('Erro ao gerar quiz.');
      }
      setLoading(false);
  };

  const handleVerify = (index: number) => {
    const q = questions[index];
    const userAnswer = selected[index];
    const isCorrect = userAnswer === q.correta;
    
    if (!isCorrect && onIncorrectAnswer) {
      onIncorrectAnswer(q, userAnswer);
    }
    
    setChecked(p => ({...p, [index]: true}));
  };

  if (questions.length === 0) {
      return (
          <div className="bg-[#0a1428]/40 border border-white/5 p-8 rounded-3xl text-center max-w-xl mx-auto shadow-2xl">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Settings2 size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Configurar Bateria de Testes</h3>
              <p className="text-slate-400 mb-8">Personalize seu desafio sobre <strong>{topic}</strong></p>
              
              <div className="flex gap-4 mb-8">
                  <div className="flex-1 text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Dificuldade</label>
                      <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none">
                          <option value="Fácil">Fácil (6º Ano)</option>
                          <option value="Médio">Médio (8º Ano)</option>
                          <option value="Difícil">Difícil (Olimpíada)</option>
                      </select>
                  </div>
                  <div className="flex-1 text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Quantidade</label>
                      <select value={count} onChange={e => setCount(parseInt(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none">
                          <option value={3}>3 Questões</option>
                          <option value={5}>5 Questões</option>
                          <option value={10}>10 Questões</option>
                      </select>
                  </div>
              </div>

              <button 
                  onClick={generateQuiz} 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
              >
                  {loading ? 'Gerando...' : 'Iniciar Desafio Agora'}
              </button>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8 bg-blue-900/20 p-4 rounded-2xl border border-blue-500/20">
          <div className="flex items-center gap-3">
              <Zap className="text-blue-400" />
              <h3 className="text-lg font-black text-white">Quiz de Nível {difficulty}</h3>
          </div>
          <button onClick={() => setQuestions([])} className="text-xs text-blue-400 hover:text-white font-bold uppercase tracking-wider">
              Reconfigurar
          </button>
      </div>

      {questions.map((q, i) => {
        const isVerified = checked[i];
        const isCorrect = selected[i] === q.correta;

        return (
          <div key={i} className={`border rounded-xl p-6 transition-all ${
            isVerified ? (isCorrect ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-red-900/20 border-red-500/50') : 'bg-slate-800 border-slate-700'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-200">{q.enunciado}</h3>
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">Q{i+1}</span>
            </div>
            
            <div className="space-y-3">
              {q.alternativas && q.alternativas.map((alt: string, j: number) => {
                const isSelected = selected[i] === alt;
                const isThisTheCorrectOne = q.correta === alt;
                
                let btnStyle = "border-slate-700 hover:border-blue-500 text-slate-300";
                
                if (isSelected) btnStyle = "border-blue-500 bg-blue-500/20 text-blue-200";
                if (isVerified && isThisTheCorrectOne) btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/50";
                if (isVerified && isSelected && !isThisTheCorrectOne) btnStyle = "border-red-500 bg-red-500/20 text-red-300";

                return (
                  <button key={j} 
                    onClick={() => !isVerified && setSelected(p => ({...p, [i]: alt}))}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${btnStyle}`}
                    disabled={isVerified}
                  >
                    {alt}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 flex justify-between items-center">
               {!isVerified ? (
                  <button 
                     onClick={() => handleVerify(i)} 
                     disabled={!selected[i]}
                     className="bg-blue-600 hover:bg-blue-500 py-1.5 px-4 rounded font-bold text-sm text-white disabled:opacity-50 transition-colors">
                     Confirmar Resposta
                  </button>
               ) : (
                  <div className="mt-2 text-sm p-3 bg-slate-900 rounded-lg text-slate-300 w-full border border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="font-bold text-violet-400 block mb-1">Explicação do Professor:</span>
                    {q.explicacao}
                  </div>
               )}
            </div>
          </div>
        )
      })}
    </div>
  );
}
