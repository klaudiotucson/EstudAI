"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Loader2, Volume2 } from 'lucide-react';

interface OpenAIPodcastPlayerProps {
  playlist: { host: string; fala: string }[];
  onProgress?: (index: number) => void;
}

export default function OpenAIPodcastPlayer({ playlist, onProgress }: OpenAIPodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Record<number, string>>({});

  useEffect(() => {
    // Cleanup blobs on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      Object.values(cacheRef.current).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const getVoiceForHost = (host: string) => {
      const h = host.toLowerCase();
      // Mapeamento simples de vozes (nova = feminina, onyx = masculina grave, alloy = masculina padrão)
      if (h.includes('2') || h.includes('especialista') || h.includes('convidada') || h.includes('professora')) return 'nova';
      return 'onyx'; 
  }

  const loadAndPlay = async (index: number) => {
    if (index >= playlist.length) {
      setIsPlaying(false);
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(index);
    if (onProgress) onProgress(index);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    let audioUrl = cacheRef.current[index];

    if (!audioUrl) {
      setIsLoading(true);
      try {
        const item = playlist[index];
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: item.fala,
            voice: getVoiceForHost(item.host)
          })
        });

        if (!res.ok) throw new Error("Falha ao gerar áudio");
        
        const blob = await res.blob();
        audioUrl = URL.createObjectURL(blob);
        cacheRef.current[index] = audioUrl;
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsPlaying(false);
        return;
      }
      setIsLoading(false);
    }

    const audio = new Audio(audioUrl);
    audio.volume = volume;
    audioRef.current = audio;
    
    audio.onended = () => {
      loadAndPlay(index + 1);
    };

    audio.play();
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current && cacheRef.current[currentIndex]) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        loadAndPlay(currentIndex);
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-emerald-950/40 border border-emerald-500/20 p-4 rounded-3xl shadow-inner mb-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={handlePlayPause}
          disabled={isLoading}
          className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={24} className="animate-spin" /> : isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button 
          onClick={handleStop}
          className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-red-400 hover:bg-slate-700 transition-all"
        >
          <Square size={16} />
        </button>
      </div>

      <div className="flex-1 min-w-[200px] px-2">
        <div className="flex justify-between text-xs font-bold text-emerald-400 mb-2 uppercase tracking-widest">
            <span>{isLoading ? 'Sintetizando Voz (OpenAI)...' : isPlaying ? 'Reproduzindo...' : 'Pronto para Tocar'}</span>
            <span>{currentIndex + (isPlaying || isLoading ? 1 : 0)} / {playlist.length}</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
                className="h-full bg-emerald-500 transition-all duration-300 relative" 
                style={{ width: `${playlist.length > 0 ? ((currentIndex + (isPlaying || isLoading ? 1 : 0)) / playlist.length) * 100 : 0}%` }}
            >
               <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 rounded-2xl border border-white/5">
        <Volume2 size={18} className="text-emerald-500" />
        <input 
          type="range" 
          min="0" max="1" step="0.1" 
          value={volume}
          onChange={(e) => {
              const newVol = parseFloat(e.target.value);
              setVolume(newVol);
              if (audioRef.current) audioRef.current.volume = newVol;
          }}
          className="w-20 accent-emerald-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
