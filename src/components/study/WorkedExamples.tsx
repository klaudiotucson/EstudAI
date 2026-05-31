"use client"
import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Send, User, Bot, Loader2 } from 'lucide-react';
import { markdownToSafeHtml } from '@/lib/safeMarkdown';

interface WorkedExamplesProps {
  topic: string;
  disciplina: string;
}

export default function WorkedExamples({ topic, disciplina }: WorkedExamplesProps) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting based on time
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    
    setMessages([
        { 
            role: 'assistant', 
            content: `${timeGreeting}! Vamos aprender sobre **${topic}**?\n\nSe você responder "sim", eu te explico como funciona na prática, trago imagens visuais, proponho um problema real e te chamo para resolvermos juntos, passo a passo, de forma colaborativa. Topa?` 
        }
    ]);
  }, [topic]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: newMessages,
                mode: 'colaborador_resolucao', // Novo modo que criamos
                tema: topic,
                disciplina: disciplina,
                context: "O aluno está na aba de 'Como Resolver' que é puramente colaborativa e prática. Você é o agente colaborador."
            })
        });

        const data = await res.json();
        if (data.response) {
            setMessages([...newMessages, { role: 'assistant', content: data.response }]);
        }
    } catch (err) {
        console.error(err);
        setMessages([...newMessages, { role: 'assistant', content: "Desculpe, tive um problema de conexão. Podemos tentar de novo?" }]);
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  const renderMarkdown = (text: string) => {
      // Configuramos para renderizar imagens grandonas e texto legal
      const html = markdownToSafeHtml(text || '');
      return <div className="prose prose-invert prose-lg max-w-none text-slate-200 prose-img:rounded-3xl prose-img:border-4 prose-img:border-slate-800 prose-img:shadow-2xl prose-img:w-full prose-a:text-blue-400" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="flex flex-col h-[800px] bg-slate-900/50 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex items-center gap-4 p-6 md:p-8 bg-slate-900/90 border-b border-white/5 backdrop-blur-xl z-10">
        <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <HelpCircle className="text-amber-400" size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-100">Laboratório de Resolução</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Colaboração passo a passo com IA visual</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar relative bg-[#0a1428]/40">
        {messages.map((msg, i) => {
            const isAI = msg.role === 'assistant';
            return (
                <div key={i} className={`flex ${isAI ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                    <div className={`flex gap-4 md:gap-6 max-w-[95%] md:max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
                        {/* Avatar */}
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-xl
                            ${isAI ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-blue-600 text-white border-blue-500'}
                        `}>
                            {isAI ? <Bot size={24} /> : <User size={24} />}
                        </div>
                        
                        {/* Balão */}
                        <div className={`p-6 md:p-8 rounded-[2.5rem] shadow-2xl border ${
                            isAI 
                            ? 'bg-slate-800/90 border-white/10 rounded-tl-sm' 
                            : 'bg-blue-900/40 border-blue-500/30 rounded-tr-sm'
                        }`}>
                            {renderMarkdown(msg.content)}
                        </div>
                    </div>
                </div>
            );
        })}
        {isLoading && (
            <div className="flex justify-start">
                <div className="flex gap-6 max-w-[85%] flex-row">
                    <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/30 text-amber-400">
                        <Loader2 size={28} className="animate-spin" />
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-slate-800/90 border border-white/10 rounded-tl-sm flex items-center gap-3">
                        <span className="w-3 h-3 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-3 h-3 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-3 h-3 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 md:p-8 bg-slate-900/90 border-t border-white/5 backdrop-blur-xl z-10">
          <div className="flex items-end gap-4 max-w-5xl mx-auto">
              <textarea 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Responda, faça sua tentativa ou tire uma dúvida..."
                  className="flex-1 bg-slate-950/80 border-2 border-white/10 rounded-[2rem] px-6 py-5 text-lg text-white resize-none outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all custom-scrollbar placeholder:text-slate-600"
                  rows={2}
              />
              <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-16 h-16 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 rounded-[2rem] flex items-center justify-center transition-all hover:scale-105 shrink-0 shadow-xl shadow-amber-500/20"
              >
                  <Send size={28} className={isLoading ? 'opacity-0' : 'ml-1'} />
                  {isLoading && <Loader2 size={28} className="absolute animate-spin text-slate-900" />}
              </button>
          </div>
          <p className="text-center text-slate-500 text-xs mt-6 font-bold uppercase tracking-widest">
            ✨ O Aprendizado Colaborativo fixa até 80% mais conteúdo
          </p>
      </div>
    </div>
  );
}
