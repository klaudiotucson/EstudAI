"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, RefreshCw, Zap } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatTutorProps {
  initialData: any;
  mode: string;
  onModeChange: (mode: string) => void;
}

const DISCIPLINAS = [
  { id: 'padrao', label: 'Tutor Padrão (Geral)' },
  { id: 'matematica', label: 'Matemática (MEC)' },
  { id: 'portugues', label: 'Língua Portuguesa (MEC)' },
  { id: 'ciencias', label: 'Ciências (MEC)' },
  { id: 'historia', label: 'História (MEC)' },
  { id: 'geografia', label: 'Geografia (MEC)' },
  { id: 'artes', label: 'Artes (MEC)' },
  { id: 'ingles', label: 'Inglês (MEC)' },
  { id: 'ed_fisica', label: 'Educação Física (MEC)' }
];

export default function ChatTutor({ initialData, mode, onModeChange }: ChatTutorProps) {
  const [disciplina, setDisciplina] = useState('padrao');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Olá! Sou seu Tutor Premium. Estou configurado no modo **${mode.toUpperCase()}**. Como posso te ajudar com o tema **${initialData?.tema}** hoje?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          mode: mode,
          disciplina: disciplina,
          anoEscolar: initialData?.anoEscolar,
          context: initialData?.resumeContent
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ops, tive um probleminha na conexão. Pode tentar de novo?' }]);
    } finally {
      setLoading(false);
    }
  };

  const tutorModes = [
    { id: 'padrao', label: 'Padrão', desc: 'Ensino direto', icon: Sparkles },
    { id: 'socratico', label: 'Socrático', desc: 'Te ajuda a pensar', icon: Sparkles },
    { id: 'feynman', label: 'Feynman', desc: 'Explique para mim', icon: MessageCircle },
    { id: 'revisor', label: 'Revisor', desc: 'Foco em provas', icon: Zap },
    { id: 'correcao', label: 'Tutor de Erros', icon: RefreshCw, desc: 'Aprenda com erros' }
  ];

  return (
    <div className="flex flex-col h-[700px] bg-[#0a1428]/40 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-xl shadow-2xl animate-in zoom-in-95 duration-500">
      
      {/* Header / Mode Selector */}
      <div className="p-6 bg-white/5 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
               <Bot size={24} className="text-white" />
            </div>
            <div>
               <h3 className="text-lg font-black text-white flex items-center gap-2">
                   Professor IA 
                   <select 
                       value={disciplina} 
                       onChange={(e) => setDisciplina(e.target.value)}
                       className="ml-2 bg-slate-900 border border-white/10 text-xs font-bold text-blue-400 p-1.5 rounded-lg outline-none cursor-pointer"
                   >
                       {DISCIPLINAS.map(d => (
                           <option key={d.id} value={d.id}>{d.label}</option>
                       ))}
                   </select>
               </h3>
               <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Especialista Ativado</p>
            </div>
         </div>
         
         <div className="flex flex-wrap gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/5">
            {tutorModes.map(m => (
               <button 
                 key={m.id}
                 onClick={() => onModeChange(m.id)}
                 className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5
                   ${mode === m.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}
                 `}
               >
                 <m.icon size={12} />
                 {m.label}
               </button>
            ))}
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-blue-900/10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg 
                 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-blue-400'}`}>
                  {msg.role === 'user' ? <User size={20}/> : <Bot size={20}/>}
               </div>
               <div className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-xl
                 ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800/80 text-slate-100 border border-white/5 rounded-tl-none'}
               `}>
                 {msg.content}
               </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="flex gap-4 items-center animate-pulse">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400">
                   <Bot size={20}/>
                </div>
                <div className="bg-slate-800/50 px-6 py-3 rounded-full text-xs text-slate-500 font-bold italic">
                   Digitando resposta pedagógica...
                </div>
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-white/5 border-t border-white/5">
        <div className="relative flex items-center group">
          <input 
            type="text"
            className="w-full bg-slate-900/80 border border-white/10 rounded-[2rem] py-5 pl-8 pr-20 text-white font-medium focus:border-blue-500/50 outline-none transition-all shadow-inner"
            placeholder="Tira sua dúvida ou explique o que entendeu..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="absolute right-3 p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-full transition-all shadow-lg active:scale-95"
          >
            <Send size={24} />
          </button>
        </div>
      </div>

    </div>
  );
}
