import React, { useState } from 'react';
import { HelpCircle, Compass } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase4ConsultProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase4Consult: React.FC<Phase4ConsultProps> = ({ onNext, onCorrect }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const options = [
    {
      id: 'alone',
      text: 'Decidir sozinhos',
      emoji: '🟥',
      bg: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-950',
      isCorrect: false,
    },
    {
      id: 'consult',
      text: 'Consultar Jeová',
      emoji: '🟩',
      bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-950',
      isCorrect: true,
    },
  ];

  const handleSelect = (option: typeof options[0]) => {
    setSelected(option.id);
    if (option.isCorrect) {
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
          <Compass className="w-3.5 h-3.5" />
          Fase 4 — Precisamos consultar Jeová
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          O que eles deveriam ter feito antes de decidir?
        </h3>
      </div>

      {/* Visual illustration of Joshua thinking */}
      <div className="w-full bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 rounded-3xl p-6 border-2 border-amber-300 flex flex-col items-center justify-center text-center shadow-md">
        <div className="text-6xl sm:text-7xl mb-2 animate-bounce">
          🤔
        </div>
        <div className="bg-white/90 border border-amber-300 rounded-2xl px-4 py-2 font-black text-amber-900 text-sm sm:text-base">
          Josué e os líderes se esqueceram de orar e perguntar a Jeová!
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt) => {
          const isThisCorrect = opt.isCorrect && status === 'correct';

          return (
            <button
              key={opt.id}
              id={`consult-btn-${opt.id}`}
              type="button"
              onClick={() => handleSelect(opt)}
              disabled={status === 'correct'}
              className={`p-5 rounded-3xl border-3 flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                opt.bg
              } ${isThisCorrect ? 'ring-4 ring-emerald-400 scale-102 font-black' : ''}`}
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span className="text-xl font-black font-heading tracking-wide">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {status === 'correct' && (
        <FeedbackBanner
          status="correct"
          message="Quando precisamos tomar decisões, queremos sempre confiar em Jeová e buscar sua orientação em oração!"
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Decidir sozinhos pode nos levar a cometer erros. Devemos sempre orar e consultar a Jeová!"
          onRetry={() => {
            setSelected(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
