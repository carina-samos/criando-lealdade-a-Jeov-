import React, { useState } from 'react';
import { Lightbulb, ShieldCheck, HeartHandshake } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase5PromiseProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase5Promise: React.FC<Phase5PromiseProps> = ({ onNext, onCorrect }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const cards = [
    {
      id: 'keep',
      title: 'PROMESSA',
      emoji: '🤝',
      desc: 'Cumprir a palavra dada',
      color: 'bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white',
      isCorrect: true,
    },
    {
      id: 'break',
      title: 'QUEBRAR A PROMESSA',
      emoji: '❌',
      desc: 'Desobedecer o juramento',
      color: 'bg-slate-200 hover:bg-slate-300 border-slate-400 text-slate-700',
      isCorrect: false,
    },
  ];

  const handleSelectCard = (card: typeof cards[0]) => {
    setSelectedCard(card.id);
    playSound('flip');
    if (card.isCorrect) {
      playSound('correct');
      setStatus('correct');
      onCorrect();
    } else {
      playSound('tryAgain');
      setStatus('tryAgain');
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <HeartHandshake className="w-3.5 h-3.5" />
          Fase 5 — Uma promessa é uma promessa
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          O que Josué e Israel decidiram fazer?
        </h3>
      </div>

      {/* Discovery scene with glowing bulb */}
      <div className="w-full bg-amber-100/60 border-2 border-amber-300 rounded-3xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 animate-bounce">
          💡
        </div>
        <div className="text-left">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800">
            A verdade foi revelada!
          </span>
          <p className="text-sm sm:text-base font-bold text-slate-800">
            Mesmo descobrindo o disfarce, eles tinham feito um juramento solene em nome de Jeová e honraram sua promessa!
          </p>
        </div>
      </div>

      {/* Memory / Decision cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => {
          const isThisCorrect = card.isCorrect && status === 'correct';

          return (
            <button
              key={card.id}
              id={`promise-card-${card.id}`}
              type="button"
              onClick={() => handleSelectCard(card)}
              disabled={status === 'correct'}
              className={`p-6 rounded-3xl border-b-6 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
                card.color
              } ${isThisCorrect ? 'ring-4 ring-emerald-300 scale-105' : ''}`}
            >
              <span className="text-6xl mb-3">{card.emoji}</span>
              <span className="text-2xl font-black font-heading tracking-wide">
                {card.title}
              </span>
              <span className="text-xs font-bold mt-1 opacity-90">
                {card.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {status === 'correct' && (
        <FeedbackBanner
          status="correct"
          message="Muito bem! Jeová espera que cumpramos nossas promessas, mesmo quando for difícil."
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Quebrar a promessa deixaria Jeová triste. Eles escolheram cumprir o juramento de paz!"
          onRetry={() => {
            setSelectedCard(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
