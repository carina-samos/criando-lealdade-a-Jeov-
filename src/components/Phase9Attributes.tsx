import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSound, speakText } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase9AttributesProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase9Attributes: React.FC<Phase9AttributesProps> = ({ onNext, onCorrect }) => {
  const [tappedHearts, setTappedHearts] = useState<string[]>([]);

  const hearts = [
    {
      id: 'humilde',
      title: 'HUMILDE',
      phrase: 'Jeová é humilde.',
      desc: 'Ele ouve e aceita pessoas simples de coração.',
      color: 'from-amber-400 to-rose-400',
    },
    {
      id: 'misericordioso',
      title: 'MISERICORDIOSO',
      phrase: 'Jeová é misericordioso.',
      desc: 'Ele preservou a vida dos que buscaram a paz.',
      color: 'from-rose-400 to-pink-500',
    },
    {
      id: 'justo',
      title: 'JUSTO',
      phrase: 'Jeová é justo.',
      desc: 'Ele não se esquece de nenhum juramento e ama o que é certo.',
      color: 'from-sky-400 to-indigo-500',
    },
    {
      id: 'leal',
      title: 'LEAL',
      phrase: 'Jeová é leal.',
      desc: 'Ele nunca abandona quem confia nele.',
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  const handleHeartTap = (heart: typeof hearts[0]) => {
    playSound('heart');
    speakText(heart.phrase);

    if (!tappedHearts.includes(heart.id)) {
      const next = [...tappedHearts, heart.id];
      setTappedHearts(next);
      if (next.length === hearts.length) {
        playSound('correct');
        onCorrect();
      }
    }
  };

  const allCompleted = tappedHearts.length === hearts.length;

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          Fase 9 — O que aprendemos sobre Jeová?
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          Toque em cada um dos 4 corações ❤️
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Descubra quatro qualidades preciosas de Jeová:
        </p>
      </div>

      {/* 4 Hearts grid */}
      <div className="w-full grid grid-cols-2 gap-4">
        {hearts.map((h) => {
          const isTapped = tappedHearts.includes(h.id);

          return (
            <button
              key={h.id}
              id={`heart-btn-${h.id}`}
              type="button"
              onClick={() => handleHeartTap(h)}
              className={`p-5 rounded-3xl border-3 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
                isTapped
                  ? 'bg-gradient-to-br ' + h.color + ' text-white border-white scale-102 ring-4 ring-rose-200'
                  : 'bg-white hover:bg-rose-50 border-rose-200 text-slate-700'
              }`}
            >
              <div className="relative mb-2">
                <Heart
                  className={`w-14 h-14 sm:w-16 sm:h-16 transition-transform ${
                    isTapped ? 'fill-white text-white animate-pulse' : 'text-rose-400 fill-rose-100'
                  }`}
                />
                {isTapped && (
                  <div className="absolute top-0 right-0 bg-white text-emerald-600 p-1 rounded-full shadow">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              <span className={`text-xl sm:text-2xl font-black tracking-wide font-heading ${isTapped ? 'text-white' : 'text-slate-800'}`}>
                {h.title}
              </span>

              <p className={`text-xs sm:text-sm font-bold mt-1 text-center ${isTapped ? 'text-white/95' : 'text-slate-500'}`}>
                {isTapped ? `“${h.phrase}”` : 'Toque para ouvir!'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div className="text-sm font-black text-amber-900 bg-amber-100/90 px-4 py-2 rounded-2xl border border-amber-300">
        Corações descobertos: {tappedHearts.length} de 4 ❤️
      </div>

      {/* Feedback Banner */}
      {allCompleted && (
        <FeedbackBanner
          status="correct"
          message="Muito bem! Jeová é Humilde, Misericordioso, Justo e Leal. Que Pai amoroso nós temos!"
          onNext={onNext}
        />
      )}
    </div>
  );
};
