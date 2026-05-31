import React, { useState, useEffect } from 'react';
import { Music, Lightbulb, Mic2, Star, Settings2, Headphones } from 'lucide-react';
import OpenAIPodcastPlayer from './OpenAIPodcastPlayer';

interface MemoryTechniquesProps {
  topic: string;
  shortSummary?: string;
  mnemonicos: any[];
  parodias?: any[];
  audioScript?: string;
  podcastScript?: any[];
}

export default function MemoryTechniques({ topic, shortSummary = "", mnemonicos: initMnemonicos = [], parodias: initParodias = [], podcastScript: initPodcast = [] }: MemoryTechniquesProps) {
  const [mnemonicos, setMnemonicos] = useState<any[]>(initMnemonicos);
  const [parodias, setParodias] = useState<any[]>(initParodias);
  const [podcast, setPodcast] = useState<any[]>(initPodcast);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(-1);
  
  const [loadingMnemonicos, setLoadingMnemonicos] = useState(false);
  const [loadingParodia, setLoadingParodia] = useState(false);
  const [parodiaStyle, setParodiaStyle] = useState('Funk');
  
  const [loadingPodcast, setLoadingPodcast] = useState(false);
  const [podcastStyle, setPodcastStyle] = useState('Debate');
  const [podcastDuration, setPodcastDuration] = useState(5);

  useEffect(() => {
    if (initMnemonicos.length > 0) setMnemonicos(initMnemonicos);
    if (initParodias.length > 0) setParodias(initParodias);
    if (initPodcast.length > 0) setPodcast(initPodcast);
  }, [initMnemonicos, initParodias, initPodcast]);

  const generateMnemonicos = async () => {
      setLoadingMnemonicos(true);
      try {
          const res = await fetch('/api/generate/creative', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic, type: 'mnemonico', context: shortSummary })
          });
          const data = await res.json();
          if (data.mnemonicos) setMnemonicos(data.mnemonicos);
      } catch { alert("Erro ao gerar mnemônicos"); }
      setLoadingMnemonicos(false);
  };

  const generateParodia = async () => {
      setLoadingParodia(true);
      try {
          const res = await fetch('/api/generate/creative', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic, type: 'parodia', style: parodiaStyle })
          });
          const data = await res.json();
          if (data.parodias) setParodias(data.parodias);
      } catch { alert("Erro ao gerar paródia"); }
      setLoadingParodia(false);
  };

  const generatePodcast = async () => {
      setLoadingPodcast(true);
      try {
          const res = await fetch('/api/generate/creative', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic, type: 'podcast', style: podcastStyle, duration: podcastDuration })
          });
          const data = await res.json();
          if (data.podcastScript) setPodcast(data.podcastScript);
      } catch { alert("Erro ao gerar podcast"); }
      setLoadingPodcast(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* Mnemonics Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
            <Lightbulb className="text-amber-400" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-100">Mneumônicos Inteligentes</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Siglas e frases para nunca mais esquecer</p>
          </div>
        </div>

        {(!mnemonicos || mnemonicos.length === 0) ? (
            <div className="bg-[#0a1428]/40 border border-amber-500/20 p-8 rounded-3xl max-w-xl mx-auto shadow-2xl text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                 <Lightbulb className="text-amber-400" />
                 <h4 className="text-lg font-bold text-white">Criar Mnemônicos Inteligentes</h4>
              </div>
              <p className="text-slate-400 text-sm mb-6">A IA usará os pontos mais críticos do seu Resumo Rápido para criar acrônimos ou frases inesquecíveis.</p>
              <button onClick={generateMnemonicos} disabled={loadingMnemonicos} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black uppercase tracking-widest py-3 rounded-xl disabled:opacity-50 transition-colors">
                 {loadingMnemonicos ? 'Quebrando a cabeça...' : 'Gerar Mnemônicos'}
              </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <button onClick={() => setMnemonicos([])} className="absolute -top-12 right-0 text-xs text-amber-400 hover:text-white uppercase font-bold tracking-wider">Novos Mnemônicos</button>
              {mnemonicos.map((m, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] hover:border-amber-500/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Star size={64} className="text-amber-400" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-4xl font-black text-amber-500 mb-4 block tracking-tighter">{m.sigla}</span>
                    {m.frase && <p className="text-xl font-bold text-slate-100 mb-4 leading-tight italic">"{m.frase}"</p>}
                    <div className="h-px bg-slate-800 w-full my-6"></div>
                    <div className="space-y-3">
                      <p className="text-xs font-black text-amber-500/50 uppercase tracking-widest">Significado:</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">{m.significado}</p>
                    </div>
                    {m.explicacao && (
                        <div className="mt-4 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                            <p className="text-xs text-slate-400 italic">{m.explicacao}</p>
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
        )}
      </section>

      {/* Parodies Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
            <Music className="text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-100">Paródias Musicais</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Aprenda cantando com melodias conhecidas</p>
          </div>
        </div>

        {parodias.length === 0 ? (
           <div className="bg-[#0a1428]/40 border border-indigo-500/20 p-8 rounded-3xl max-w-xl mx-auto shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                 <Settings2 className="text-indigo-400" />
                 <h4 className="text-lg font-bold text-white">Criar Paródia Inédita</h4>
              </div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Ritmo / Estilo Musical</label>
              <select value={parodiaStyle} onChange={e => setParodiaStyle(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none mb-6">
                 <option value="Funk">Funk Carioca</option>
                 <option value="Forró">Forró / Piseiro</option>
                 <option value="Sertanejo">Sertanejo Universitário</option>
                 <option value="Poema Clássico">Poema Clássico (Rimas Ricas)</option>
                 <option value="Trap">Trap / Rap</option>
              </select>
              <button onClick={generateParodia} disabled={loadingParodia} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest py-3 rounded-xl disabled:opacity-50">
                 {loadingParodia ? 'Compondo Música...' : 'Gerar Paródia'}
              </button>
           </div>
        ) : (
          <div className="space-y-6">
            {parodias.map((p, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] hover:border-indigo-500/30 transition-all flex flex-col md:flex-row gap-10 relative">
                <button onClick={() => setParodias([])} className="absolute top-4 right-6 text-xs text-indigo-400 hover:text-white uppercase font-bold tracking-wider">Nova Paródia</button>
                <div className="md:w-1/3 space-y-4">
                   <div className="bg-indigo-600 w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <Mic2 size={32} className="text-white" />
                   </div>
                   <h4 className="text-2xl font-black text-white leading-tight">{p.titulo}</h4>
                   <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 text-xs font-black tracking-widest uppercase">
                      Melodia: {p.melodia}
                   </div>
                </div>
                <div className="flex-1 bg-slate-950/50 p-8 rounded-[2rem] border border-white/5">
                   <pre className="whitespace-pre-wrap font-sans text-lg font-bold text-slate-300 leading-relaxed italic text-center">
                      {p.letra}
                   </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Podcast Debate Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
            <Headphones className="text-emerald-400" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-100">Estúdio de Áudio (Podcast / Debate)</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Escute e absorva o conhecimento</p>
          </div>
        </div>

        {podcast.length === 0 ? (
           <div className="bg-[#0a1428]/40 border border-emerald-500/20 p-8 rounded-3xl max-w-xl mx-auto shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                 <Settings2 className="text-emerald-400" />
                 <h4 className="text-lg font-bold text-white">Configurar Gravação</h4>
              </div>
              <div className="flex gap-4 mb-6">
                 <div className="flex-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Formato</label>
                    <select value={podcastStyle} onChange={e => setPodcastStyle(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none">
                       <option value="Conversa Normal">Podcast Normal</option>
                       <option value="Debate">Debate Intenso</option>
                       <option value="Monólogo">Monólogo de Professor</option>
                    </select>
                 </div>
                 <div className="flex-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Duração Alvo</label>
                    <select value={podcastDuration} onChange={e => setPodcastDuration(parseInt(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none">
                       <option value={2}>Curto (~2 min)</option>
                       <option value={5}>Médio (~5 min)</option>
                       <option value={10}>Longo (~10 min)</option>
                    </select>
                 </div>
              </div>
              <button onClick={generatePodcast} disabled={loadingPodcast} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest py-3 rounded-xl disabled:opacity-50">
                 {loadingPodcast ? 'Gravando Episódio...' : 'Gravar Podcast'}
              </button>
           </div>
        ) : (
           <div className="space-y-6">
              <OpenAIPodcastPlayer playlist={podcast} onProgress={setCurrentAudioIndex} />
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/20 p-8 md:p-10 rounded-[3rem] relative overflow-hidden">
                 <button onClick={() => setPodcast([])} className="absolute top-6 right-8 text-xs text-emerald-400 hover:text-white uppercase font-bold tracking-wider z-20">Novo Episódio</button>
                 <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar pr-4 relative z-10">
                    {podcast.map((msg: any, i: number) => {
                        const isHost1 = i % 2 === 0;
                        const isPlayingNow = currentAudioIndex === i;
                        return (
                            <div key={i} className={`flex w-full ${isHost1 ? 'justify-start' : 'justify-end'} transition-all duration-500 ${isPlayingNow ? 'scale-105 opacity-100' : currentAudioIndex > -1 ? 'opacity-40' : 'opacity-100'}`}>
                                <div className={`flex flex-col max-w-[80%] ${isHost1 ? 'items-start' : 'items-end'}`}>
                                    <span className={`text-xs font-black uppercase mb-2 px-3 py-1 rounded-full shadow-lg ${isHost1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'} ${isPlayingNow ? 'animate-pulse' : ''}`}>
                                        {msg.host} {isPlayingNow && '🎤'}
                                    </span>
                                    <div className={`p-5 rounded-3xl text-sm md:text-base font-medium leading-relaxed border shadow-xl transition-colors ${
                                        isHost1 
                                        ? `bg-slate-800/80 border-white/5 rounded-tl-sm ${isPlayingNow ? 'text-white border-emerald-500/50' : 'text-slate-200'}` 
                                        : `bg-blue-900/40 border-blue-500/20 rounded-tr-sm ${isPlayingNow ? 'text-white border-emerald-500/50' : 'text-slate-100'}`
                                    }`}>
                                        {msg.fala}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                 </div>
              </div>
           </div>
        )}
      </section>

    </div>
  );
}
