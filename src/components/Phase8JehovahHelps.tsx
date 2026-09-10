import React, { useState, useEffect } from 'react';
import { Sun, CloudHail, Shield, Sparkles, Heart } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase8JehovahHelpsProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase8JehovahHelps: React.FC<Phase8JehovahHelpsProps> = ({ onNext, onCorrect }) => {
  const [hailstonesCount, setHailstonesCount] = useState<number>(0);
  const [sunTapped, setSunTapped] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    // When both hailstones tapped and sun tapped, trigger glory
    if (hailstonesCount >= 3 && sunTapped && !revealed) {
      setRevealed(true);
      playSound('sunbeam');
      playSound('victory');
      onCorrect();
    }
  }, [hailstonesCount, sunTapped, revealed, onCorrect]);

  const handleHailTap = () => {
    playSound('hail');
    setHailstonesCount((prev) => Math.min(5, prev + 1));
  };

  const handleSunTap = () => {
    playSound('sunbeam');
    setSunTapped(true);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Fase 8 — Jeová ajuda de forma grandiosa!
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          Milagres no céu e na terra
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Toque nas pedras de granizo 🌨️ e no sol ☀️ para ver Jeová agir!
        </p>
      </div>

      {/* Interactive Miracle Canvas */}
      <div
        className={`w-full relative rounded-3xl p-6 sm:p-8 border-4 transition-all duration-700 overflow-hidden shadow-xl text-center ${
          revealed
            ? 'bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-100 border-yellow-400 ring-8 ring-yellow-200/60'
            : 'bg-gradient-to-b from-sky-200 via-indigo-100 to-amber-50 border-sky-300'
        }`}
      >
        {/* Sky / Sun */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            id="hail-trigger-btn"
            type="button"
            onClick={handleHailTap}
            className="flex items-center gap-2 bg-white/90 hover:bg-sky-50 border-2 border-sky-300 p-3 rounded-2xl shadow active:scale-95 cursor-pointer"
          >
            <CloudHail className="w-8 h-8 text-sky-600" />
            <div className="text-left">
              <span className="block font-black text-xs text-sky-900 uppercase">Granizo ({hailstonesCount}/3)</span>
              <span className="text-[11px] font-bold text-sky-700">Toque aqui! 🧊</span>
            </div>
          </button>

          <button
            id="sun-trigger-btn"
            type="button"
            onClick={handleSunTap}
            className={`flex items-center gap-2 border-2 p-3 rounded-2xl shadow active:scale-95 cursor-pointer transition-all ${
              sunTapped
                ? 'bg-yellow-400 border-yellow-500 text-yellow-950 scale-105 animate-pulse'
                : 'bg-white/90 border-amber-300 hover:bg-yellow-50 text-amber-900'
            }`}
          >
            <Sun className={`w-8 h-8 ${sunTapped ? 'text-amber-800 fill-amber-300 animate-spin' : 'text-amber-500'}`} style={{ animationDuration: '8s' }} />
            <div className="text-left">
              <span className="block font-black text-xs uppercase">Sol Parado</span>
              <span className="text-[11px] font-bold">{sunTapped ? 'Luz do dia durou! ✨' : 'Toque no Sol! ☀️'}</span>
            </div>
          </button>
        </div>

        {/* Dynamic Hail Falling display */}
        <div className="flex items-center justify-center gap-3 my-3 text-3xl sm:text-4xl min-h-[50px]">
          {Array.from({ length: hailstonesCount }).map((_, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 150}ms` }}>
              🧊
            </span>
          ))}
          {hailstonesCount === 0 && (
            <span className="text-sm font-bold text-slate-500">
              Toque no botão de Granizo para lançar as pedras do céu!
            </span>
          )}
        </div>

        {/* THE MAIN GLORIOUS MOMENT */}
        {revealed ? (
          <div className="mt-4 p-5 bg-white/95 rounded-3xl border-3 border-yellow-400 shadow-xl animate-pulse-gentle">
            <div className="flex items-center justify-center gap-2 text-rose-600 mb-1">
              <Heart className="w-8 h-8 fill-rose-500 animate-bounce" />
              <Sparkles className="w-7 h-7 text-amber-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-rose-600 tracking-tight font-heading">
              ❤️ JEOVÁ PODE SALVAR!
            </h2>
            <p className="text-base sm:text-lg font-extrabold text-slate-800 mt-2">
              “Os gibeonitas confiaram em Jeová. Nós também podemos confiar nele!”
            </p>
          </div>
        ) : (
          <div className="text-sm font-black text-slate-600 bg-white/70 py-2 px-4 rounded-xl inline-block border border-slate-200">
            Dica: toque 3 vezes no granizo 🧊 e uma vez no sol ☀️ para ver a grande vitória!
          </div>
        )}
      </div>

      {/* Feedback Banner when revealed */}
      {revealed && (
        <FeedbackBanner
          status="correct"
          message="Jeová é Todo-Poderoso! Ele ouviu o pedido e defendeu os gibeonitas com milagres surpreendentes!"
          onNext={onNext}
        />
      )}
    </div>
  );
};
