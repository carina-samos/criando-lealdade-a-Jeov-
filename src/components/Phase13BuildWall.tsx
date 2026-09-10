import React, { useState } from 'react';
import { Hammer, Sparkles, Trophy, Check } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase13BuildWallProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase13BuildWall: React.FC<Phase13BuildWallProps> = ({ onNext, onCorrect }) => {
  const stones = [
    { id: 'fe', text: 'FÉ', emoji: '🙏', color: 'from-amber-600 to-amber-700' },
    { id: 'humildade', text: 'HUMILDADE', emoji: '🪵', color: 'from-orange-600 to-orange-700' },
    { id: 'paciencia', text: 'PACIÊNCIA', emoji: '⏳', color: 'from-amber-700 to-stone-700' },
    { id: 'lealdade', text: 'LEALDADE', emoji: '🏛️', color: 'from-stone-700 to-slate-800' },
  ];

  const [placedStones, setPlacedStones] = useState<string[]>([]);

  const handlePlaceStone = (id: string) => {
    if (placedStones.includes(id)) return;

    playSound('stone');
    const next = [...placedStones, id];
    setPlacedStones(next);

    if (next.length === stones.length) {
      playSound('correct');
      playSound('victory');
      onCorrect();
    }
  };

  const isWallCompleted = placedStones.length === stones.length;

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <Hammer className="w-3.5 h-3.5 text-amber-800" />
          Fase 13 — Mini-game: Construa a muralha!
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          Encaixe as pedras para reconstruir a muralha de Jerusalém!
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Toque nas pedras de virtude abaixo para colocá-las no muro:
        </p>
      </div>

      {/* Wall Building Construction Site */}
      <div className="w-full bg-gradient-to-b from-sky-100 via-amber-50 to-amber-100 rounded-3xl p-6 border-3 border-amber-300 shadow-xl flex flex-col items-center">
        
        {/* Wall structure representation */}
        <div className="w-full max-w-md bg-stone-200/90 border-4 border-stone-400 rounded-2xl p-4 shadow-inner">
          <div className="text-xs font-black uppercase text-stone-600 tracking-wider text-center mb-3 flex items-center justify-center gap-1">
            <span>🧱 MURALHA DE JERUSALÉM 🧱</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {stones.map((s, index) => {
              const isPlaced = placedStones.includes(s.id);

              return (
                <div
                  key={s.id}
                  className={`h-24 sm:h-28 rounded-xl border-3 flex flex-col items-center justify-center transition-all duration-500 shadow-md ${
                    isPlaced
                      ? `bg-gradient-to-r ${s.color} text-white border-stone-800 scale-102`
                      : 'bg-stone-300/60 border-dashed border-stone-400 text-stone-400'
                  }`}
                >
                  {isPlaced ? (
                    <>
                      <span className="text-2xl sm:text-3xl mb-1">{s.emoji}</span>
                      <span className="font-black text-sm sm:text-base tracking-wider font-heading">
                        {s.text}
                      </span>
                      <span className="text-[10px] text-amber-200 font-bold">Pedra Firme</span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-center p-2">
                      <span className="text-xs font-black uppercase">Espaço {index + 1}</span>
                      <span className="text-[10px] font-bold mt-1">Toque na pedra {s.text}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Wall foundation ground */}
          <div className="h-3 bg-stone-500 rounded-full mt-3 border border-stone-600" />
        </div>

        {/* Trophy banner if completed */}
        {isWallCompleted && (
          <div className="mt-4 p-3 bg-white/95 rounded-2xl border-2 border-amber-400 text-center animate-bounce shadow">
            <span className="text-2xl">🏆</span>
            <span className="font-black text-base sm:text-lg text-amber-950 ml-2">
              MURALHA COMPLETA!
            </span>
          </div>
        )}
      </div>

      {/* Scattered Stones available to tap/place */}
      {!isWallCompleted && (
        <div className="w-full">
          <span className="block text-center text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
            Pedras disponíveis para assentar:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stones.map((s) => {
              const isPlaced = placedStones.includes(s.id);

              return (
                <button
                  key={s.id}
                  id={`wall-stone-${s.id}`}
                  type="button"
                  onClick={() => handlePlaceStone(s.id)}
                  disabled={isPlaced}
                  className={`p-3.5 rounded-2xl border-3 flex flex-col items-center justify-center font-black transition-all duration-200 cursor-pointer shadow active:scale-95 ${
                    isPlaced
                      ? 'opacity-30 bg-slate-100 border-slate-300 cursor-not-allowed'
                      : 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl mb-1">{s.emoji}</span>
                  <span className="text-sm font-heading">{s.text}</span>
                  <span className="text-[10px] text-amber-800 font-bold mt-0.5">
                    {isPlaced ? 'Encaixada ✓' : 'Toque para colocar'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Feedback Banner */}
      {isWallCompleted && (
        <FeedbackBanner
          status="correct"
          message="Muito bem! Os gibeonitas apoiaram lealmente a adoração verdadeira ajudando a erguer as muralhas de Jerusalém!"
          nextButtonLabel="Ver as 4 Lições de Vida! 🛤️"
          onNext={onNext}
        />
      )}
    </div>
  );
};
