import React, { useState } from 'react';
import { ShieldAlert, Users, Swords } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase7AskHelpProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase7AskHelp: React.FC<Phase7AskHelpProps> = ({ onNext, onCorrect }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const options = [
    {
      id: 'fled',
      text: 'Fugiram e esqueceram de Jeová.',
      emoji: '🟥',
      bg: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-950',
      isCorrect: false,
    },
    {
      id: 'ask',
      text: 'Pediram ajuda a Josué.',
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
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          Fase 7 — Os gibeonitas pedem ajuda
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          O que os gibeonitas fizeram quando foram ameaçados?
        </h3>
      </div>

      {/* 5 Amorite Kings Danger Scene */}
      <div className="w-full bg-gradient-to-r from-rose-100 via-orange-100 to-amber-100 p-5 rounded-3xl border-3 border-rose-300 shadow-md flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase tracking-wider mb-2">
          <span className="text-lg">⚠️</span>
          <span>5 Reis Amorreus cercaram Gibeão!</span>
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl my-1">
          <span>👑</span>
          <span>👑</span>
          <span>👑</span>
          <span>👑</span>
          <span>👑</span>
          <span className="text-2xl text-rose-700 font-black">⚔️</span>
          <span className="text-3xl">🏰</span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-slate-700 mt-2">
          Os 5 reis ficaram bravos porque Gibeão fez paz com Israel!
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="w-full space-y-3">
        {options.map((opt) => {
          const isThisCorrect = opt.isCorrect && status === 'correct';

          return (
            <button
              key={opt.id}
              id={`ask-help-btn-${opt.id}`}
              type="button"
              onClick={() => handleSelect(opt)}
              disabled={status === 'correct'}
              className={`w-full text-left p-4 sm:p-5 rounded-3xl border-3 flex items-center gap-4 transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                opt.bg
              } ${isThisCorrect ? 'ring-4 ring-emerald-400 scale-102 font-black' : ''}`}
            >
              <span className="text-3xl shrink-0">{opt.emoji}</span>
              <span className="text-base sm:text-xl font-bold leading-snug">
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
          message="Muito bem! Eles confiaram na aliança com o povo de Deus e pediram ajuda com fé em Jeová!"
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Eles não fugiram! Eles enviaram mensageiros correndo até Josué pedindo ajuda."
          onRetry={() => {
            setSelected(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
