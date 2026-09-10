import React from 'react';
import { Sparkles, Star, RotateCcw, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { GameAgeMode } from '../types';
import { playSound } from '../utils/audio';

interface HeaderProps {
  currentPhase: number;
  totalPhases: number;
  starsCount: number;
  ageMode: GameAgeMode;
  onSelectAgeMode: (mode: GameAgeMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPhase,
  totalPhases,
  starsCount,
  ageMode,
  onSelectAgeMode,
  soundEnabled,
  onToggleSound,
  onRestart,
}) => {
  const progressPercent = Math.min(100, Math.round((currentPhase / (totalPhases - 1)) * 100));

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b-2 border-amber-200 sticky top-0 z-40 shadow-sm px-3 py-2.5 sm:px-6 sm:py-3">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Title and Icon */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-300 transform -rotate-3">
              🛡️
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-amber-900 leading-tight tracking-tight flex items-center gap-1.5 font-heading">
                A Jornada dos Gibeonitas
              </h1>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800/80">
                <span>Josué 9–10</span>
                <span>•</span>
                <span className="text-emerald-700">Fase {currentPhase} de {totalPhases - 1}</span>
              </div>
            </div>
          </div>

          {/* Quick restart on mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => {
                playSound('tap');
                onToggleSound();
              }}
              className={`p-2 rounded-xl border ${
                soundEnabled ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}
              title={soundEnabled ? 'Silenciar som' : 'Ativar som'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                playSound('tap');
                onRestart();
              }}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-300"
              title="Recomeçar jogo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Age Mode Selector */}
        <div className="flex items-center gap-1.5 bg-amber-100/80 p-1 rounded-2xl border border-amber-300/70 shadow-inner">
          <button
            id="mode-toddler-btn"
            type="button"
            onClick={() => {
              playSound('tap');
              onSelectAgeMode('toddler');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
              ageMode === 'toddler'
                ? 'bg-amber-500 text-white shadow-md scale-102'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <span>👶</span>
            <span>3 a 4 anos</span>
          </button>
          <button
            id="mode-older-btn"
            type="button"
            onClick={() => {
              playSound('tap');
              onSelectAgeMode('older');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
              ageMode === 'older'
                ? 'bg-amber-500 text-white shadow-md scale-102'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <span>👧</span>
            <span>5 a 7 anos</span>
          </button>
        </div>

        {/* Right: Stars, Sound, Restart (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Star counter */}
          <div className="flex items-center gap-1.5 bg-yellow-100 border border-yellow-300 px-3 py-1.5 rounded-2xl shadow-sm">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
            <span className="font-black text-yellow-900 text-base">{starsCount}</span>
          </div>

          <button
            onClick={() => {
              playSound('tap');
              onToggleSound();
            }}
            id="sound-toggle-btn"
            type="button"
            className={`p-2.5 rounded-2xl border transition-all ${
              soundEnabled
                ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                : 'bg-slate-100 text-slate-500 border-slate-300'
            }`}
            title={soundEnabled ? 'Silenciar som' : 'Ativar som'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              playSound('tap');
              onRestart();
            }}
            id="restart-game-btn"
            type="button"
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all active:scale-95"
            title="Recomeçar do início"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-4xl mx-auto mt-2 h-2.5 bg-amber-100 rounded-full overflow-hidden border border-amber-200">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-500 transition-all duration-500 rounded-full"
          style={{ width: `${Math.max(4, progressPercent)}%` }}
        />
      </div>
    </header>
  );
};
