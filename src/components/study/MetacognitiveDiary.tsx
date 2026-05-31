"use client"
import React, { useState } from 'react';
import { Brain, Send, CheckCircle2, X } from 'lucide-react';

interface MetacognitiveDiaryProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function MetacognitiveDiary({ onClose, onSave }: MetacognitiveDiaryProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    learned: '',
    difficulty: '',
    nextStep: ''
  });

  const questions = [
    { id: 'learned', label: 'O que eu aprendi de mais importante hoje?', icon: Brain },
    { id: 'difficulty', label: 'Em qual parte eu tive mais dificuldade?', icon: X },
    { id: 'nextStep', label: 'O que eu quero revisar na próxima vez?', icon: Send }
  ];

  const currentQuestion = questions[step - 1];

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      onSave(answers);
      setStep(step + 1); // Success step
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
      <div className="bg-[#0a1428] border border-white/10 w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white">
          <X size={24} />
        </button>

        {step <= questions.length ? (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                <currentQuestion.icon className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-blue-500 uppercase tracking-widest">Passo {step} de 3</p>
                <h3 className="text-xl font-black text-white">Reflexão Diária</h3>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-200 block">{currentQuestion.label}</label>
              <textarea 
                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-6 text-slate-100 min-h-[150px] focus:border-blue-500/50 outline-none transition-all font-medium"
                placeholder="Escreva aqui sua reflexão..."
                value={(answers as any)[currentQuestion.id]}
                onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
              />
            </div>

            <button 
              onClick={handleNext}
              disabled={!(answers as any)[currentQuestion.id]}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
            >
              {step === 3 ? 'Concluir Estudo' : 'Próxima Pergunta'}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6 py-10">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-emerald-400" />
            </div>
            <h3 className="text-3xl font-black text-white">Sessão Concluída!</h3>
            <p className="text-slate-400 font-medium">Suas reflexões foram salvas. <br/> Isso ajuda muito no seu aprendizado de longo prazo.</p>
            <button 
              onClick={onClose}
              className="mt-8 px-12 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl transition-all"
            >
              Voltar ao Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
