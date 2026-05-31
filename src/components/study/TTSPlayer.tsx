"use client";
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

interface TTSPlayerProps {
  text: string;
}

export default function TTSPlayer({ text }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [volume, setVolume] = useState(1);

  // Remove markdown symbols to read cleanly
  const cleanText = text.replace(/[*#_`~]/g, '').trim();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      // Prioritize PT-BR voices
      const ptVoices = availableVoices.filter(v => v.lang.includes('pt-BR'));
      const sortedVoices = ptVoices.length > 0 ? ptVoices : availableVoices;
      setVoices(sortedVoices);
      if (sortedVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(sortedVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.volume = volume;
    utterance.rate = 1.0;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-black/20 border border-white/5 p-3 rounded-2xl mb-6 shadow-inner">
      <div className="flex items-center gap-2">
        <button 
          onClick={isPlaying ? handlePause : handlePlay}
          className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
        <button 
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-red-400 hover:bg-slate-700 disabled:opacity-50 transition-all"
        >
          <Square size={16} />
        </button>
      </div>

      <div className="flex-1 min-w-[200px]">
        <select 
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full bg-slate-900 border border-white/10 text-xs font-bold text-slate-300 p-2.5 rounded-xl outline-none cursor-pointer"
        >
          {voices.map(v => (
            <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-xl">
        <Volume2 size={16} className="text-slate-400" />
        <input 
          type="range" 
          min="0" max="1" step="0.1" 
          value={volume}
          onChange={(e) => {
              const newVol = parseFloat(e.target.value);
              setVolume(newVol);
              // if playing, it won't affect current utterance in most browsers, but we set state.
          }}
          className="w-20 accent-blue-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
