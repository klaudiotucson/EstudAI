"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Waves, BrainCircuit } from 'lucide-react';

type AudioMode = 'lofi' | 'classical' | 'binaural_alpha' | 'binaural_gamma' | 'none';

export default function FocusPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AudioMode>('none');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  // Refs para Web Audio API (Binaural)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRefs = useRef<{ left: OscillatorNode | null, right: OscillatorNode | null }>({ left: null, right: null });
  const gainNodeRef = useRef<GainNode | null>(null);

  // Ref para rádios
  const radioRef = useRef<HTMLAudioElement | null>(null);

  // Streams de Áudio Direto (Icecast/Shoutcast)
  const streams = {
    lofi: "https://streams.ilovemusic.de/iloveradio17.mp3", // I Love Lofi
    classical: "https://strm112.1.fm/classical_mobile_mp3" // 1.FM Classical
  };

  useEffect(() => {
    if (gainNodeRef.current) gainNodeRef.current.gain.value = volume * 0.5;
    if (radioRef.current) radioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
      // Limpeza
      return () => stopAll();
  }, []);

  function stopAll() {
    // Para Binaural
    if (oscRefs.current.left) {
      try { oscRefs.current.left.stop(); } catch {}
      oscRefs.current.left.disconnect();
      oscRefs.current.left = null;
    }
    if (oscRefs.current.right) {
      try { oscRefs.current.right.stop(); } catch {}
      oscRefs.current.right.disconnect();
      oscRefs.current.right = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    // Para Rádio
    if (radioRef.current) {
        radioRef.current.pause();
        radioRef.current.src = "";
    }
    setIsPlaying(false);
  }

  const playBinaural = (baseFreq: number, beatFreq: number) => {
    stopAll();
    
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    
    if (ctx.state === 'suspended') ctx.resume();

    if (!gainNodeRef.current) {
        gainNodeRef.current = ctx.createGain();
        gainNodeRef.current.connect(ctx.destination);
    }
    gainNodeRef.current.gain.value = volume * 0.5;

    const oscLeft = ctx.createOscillator();
    const oscRight = ctx.createOscillator();
    const panLeft = ctx.createStereoPanner();
    const panRight = ctx.createStereoPanner();

    oscLeft.type = 'sine';
    oscRight.type = 'sine';
    
    oscLeft.frequency.value = baseFreq;
    oscRight.frequency.value = baseFreq + beatFreq;

    panLeft.pan.value = -1; // Left ear
    panRight.pan.value = 1; // Right ear

    oscLeft.connect(panLeft);
    panLeft.connect(gainNodeRef.current);
    
    oscRight.connect(panRight);
    panRight.connect(gainNodeRef.current);

    oscLeft.start();
    oscRight.start();

    oscRefs.current = { left: oscLeft, right: oscRight };
    setIsPlaying(true);
  };

  const playRadio = (radioMode: 'lofi' | 'classical') => {
      stopAll();
      if (!radioRef.current) {
          radioRef.current = new Audio();
      }
      radioRef.current.src = streams[radioMode];
      radioRef.current.volume = volume;
      radioRef.current.play().catch(e => console.error("Erro ao tocar rádio:", e));
      setIsPlaying(true);
  }

  const togglePlay = () => {
    if (mode === 'none') {
        handleSelectMode('binaural_gamma');
        return;
    }

    if (isPlaying) {
      if (mode.includes('binaural')) {
          if (audioCtxRef.current) audioCtxRef.current.suspend();
      } else {
          if (radioRef.current) radioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (mode.includes('binaural')) {
          if (audioCtxRef.current) audioCtxRef.current.resume();
      } else {
          if (radioRef.current) radioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const handleSelectMode = (newMode: AudioMode) => {
      setMode(newMode);
      if (newMode === 'binaural_gamma') playBinaural(200, 40);
      else if (newMode === 'binaural_alpha') playBinaural(200, 10);
      else if (newMode === 'lofi' || newMode === 'classical') playRadio(newMode);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Painel Aberto */}
        {isOpen && (
            <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] w-72 animate-in slide-in-from-bottom-5">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <BrainCircuit size={16} className="text-blue-400" /> Focus Player
                    </h4>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                        <VolumeX size={14} />
                    </button>
                </div>

                <div className="space-y-2 mb-5">
                    <button 
                        onClick={() => handleSelectMode('binaural_gamma')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2
                        ${mode === 'binaural_gamma' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <Waves size={14} /> Frequência Gamma (40Hz) - Foco Total
                    </button>
                    <button 
                        onClick={() => handleSelectMode('binaural_alpha')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2
                        ${mode === 'binaural_alpha' ? 'bg-emerald-600 text-white' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <Waves size={14} /> Frequência Alpha (10Hz) - Leitura
                    </button>
                    <button 
                        onClick={() => handleSelectMode('lofi')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2
                        ${mode === 'lofi' ? 'bg-purple-600 text-white' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <Music size={14} /> Rádio Lofi Mix
                    </button>
                    <button 
                        onClick={() => handleSelectMode('classical')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2
                        ${mode === 'classical' ? 'bg-amber-600 text-white' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <Music size={14} /> Rádio Clássica
                    </button>
                </div>

                <div className="flex items-center gap-4 bg-black/20 p-2 rounded-xl">
                    <button onClick={togglePlay} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shrink-0">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                    </button>
                    <div className="flex-1 flex items-center gap-2" title="Volume do Áudio">
                        <Volume2 size={14} className="text-slate-400" />
                        <input 
                            type="range" 
                            min="0" max="1" step="0.01" 
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        )}

        {/* Botão Flutuante */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all border border-white/10
                ${isPlaying ? 'bg-blue-600 animate-pulse-slow shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-[#0a1428] hover:bg-[#1e293b]'}
            `}
        >
            <Music size={22} className={isPlaying ? 'text-white' : 'text-slate-300'} />
            {isPlaying && !isOpen && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0f172a]"></div>
            )}
        </button>
    </div>
  );
}
