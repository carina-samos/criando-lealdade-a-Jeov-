import React from 'react';
import { Sparkles, Play, Heart, Shield, Award } from 'lucide-react';
import { GameAgeMode } from '../types';
import { playSound } from '../utils/audio';

interface PhaseIntroProps {
  onStart: () => void;
  ageMode: GameAgeMode;
  onSelectAgeMode: (mode: GameAgeMode) => void;
}

export const PhaseIntro: React.FC<PhaseIntroProps> = ({
  onStart,
  ageMode,
  onSelectAgeMode,
}) => {
  return (
    <div className="w-full flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
      {/* Visual illustration banner */}
      <div className="relative w-full bg-gradient-to-b from-amber-100 via-orange-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-xl overflow-hidden">
        {/* Animated clouds and sun */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-yellow-300/40 rounded-full blur-xl" />
        <div className="absolute top-4 left-6 text-4xl animate-bounce">☀️</div>
        <div className="absolute top-6 right-10 text-3xl opacity-80">⛺</div>

        {/* Character showcase */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="text-5xl sm:text-6xl filter drop-shadow-md animate-float-slow">
            🧔🏻‍♂️
          </div>
          <div className="text-4xl text-amber-500 font-black">🤝</div>
          <div className="text-5xl sm:text-6xl filter drop-shadow-md animate-float-slow" style={{ animationDelay: '1s' }}>
            📜
          </div>
          <div className="text-4xl text-amber-500 font-black">✨</div>
          <div className="text-5xl sm:text-6xl filter drop-shadow-md animate-float-slow" style={{ animationDelay: '2s' }}>
            ⛺
          </div>
        </div>

        <span className="inline-block mt-2 bg-amber-200 text-amber-900 font-black text-xs sm:text-sm px-4 py-1 rounded-full uppercase tracking-wider border border-amber-300">
          Josué 9–10 • 2 Samuel 21 • Esdras • Neemias
        </span>

        <h2 className="text-2xl sm:text-4xl font-black text-amber-950 mt-3 font-heading tracking-tight">
          Vamos conhecer os gibeonitas?
        </h2>

        {/* Scripture story summary */}
        <div className="mt-4 bg-white/85 backdrop-blur-xs border-2 border-amber-200 rounded-2xl p-4 text-left max-w-xl mx-auto shadow-sm space-y-2">
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
            Há muito tempo, os israelitas estavam entrando na Terra Prometida.
          </p>
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
            Eles tinham visto Jeová ajudá-los a vencer grandes inimigos.
          </p>
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
            Um dia, alguns homens chegaram até Josué. Eles eram os gibeonitas.
          </p>
          <p className="text-base sm:text-lg font-extrabold text-amber-900 leading-relaxed">
            Vamos descobrir o que podemos aprender com eles?
          </p>
        </div>

        {/* 4 Core Pillars preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 max-w-xl mx-auto">
          <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-2xl mb-1">🙏</span>
            <span className="font-black text-xs text-amber-900 uppercase">Ter Fé</span>
            <span className="text-[11px] font-bold text-amber-800">Confiar em Jeová</span>
          </div>
          <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-2xl mb-1">🪵</span>
            <span className="font-black text-xs text-amber-900 uppercase">Ser Humilde</span>
            <span className="text-[11px] font-bold text-amber-800">Ajudar no trabalho</span>
          </div>
          <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-2xl mb-1">⏳</span>
            <span className="font-black text-xs text-amber-900 uppercase">Esperar nele</span>
            <span className="text-[11px] font-bold text-amber-800">Ter paciência</span>
          </div>
          <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-2xl mb-1">🏛️</span>
            <span className="font-black text-xs text-amber-900 uppercase">Ser Leal</span>
            <span className="text-[11px] font-bold text-amber-800">Adoração verdadeira</span>
          </div>
        </div>

        {/* Age Mode Picker inside welcome card */}
        <div className="mt-6 pt-5 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
            Escolha a idade da criança:
          </span>
          <div className="inline-flex rounded-2xl bg-amber-200/80 p-1 border border-amber-300">
            <button
              onClick={() => {
                playSound('tap');
                onSelectAgeMode('toddler');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                ageMode === 'toddler'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-300/60'
              }`}
            >
              👶 3 a 4 anos (Voz & Toques)
            </button>
            <button
              onClick={() => {
                playSound('tap');
                onSelectAgeMode('older');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                ageMode === 'older'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-300/60'
              }`}
            >
              👧 5 a 7 anos (Perguntas & Desafios)
            </button>
          </div>
        </div>

        {/* Big Start Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              playSound('correct');
              onStart();
            }}
            id="start-adventure-btn"
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white font-black text-xl sm:text-2xl px-10 py-4 sm:py-5 rounded-3xl shadow-xl border-b-6 border-emerald-800 transition-all cursor-pointer group"
          >
            <Play className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
            <span>COMEÇAR A AVENTURA!</span>
            <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
