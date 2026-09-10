import React, { useState } from 'react';
import { HelpCircle, HeartHandshake } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase2DecisionProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase2Decision: React.FC<Phase2DecisionProps> = ({ onNext, onCorrect }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const options = [
    {
      id: 'fight',
      text: 'Porque queriam lutar contra Israel.',
      emoji: '🟥',
      bg: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900',
      isCorrect: false,
    },
    {
      id: 'jehovah',
      text: 'Porque sabiam que Jeová estava ajudando Israel.',
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
          <HeartHandshake className="w-3.5 h-3.5" />
          Fase 2 — Uma decisão importante
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          Por que os gibeonitas quiseram fazer paz?
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Eles viram as grandes coisas que Jeová fez por seu povo!
        </p>
      </div>

      {/* Visual Scene */}
      <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-3xl border-2 border-amber-200 flex items-center justify-center gap-6 text-4xl sm:text-5xl shadow-inner">
        <div className="flex flex-col items-center">
          <span>👥</span>
          <span className="text-xs font-black text-amber-900 mt-1">Gibeonitas</span>
        </div>
        <span className="text-amber-400 font-black text-2xl">➡️</span>
        <div className="flex flex-col items-center">
          <span>📜🕊️</span>
          <span className="text-xs font-black text-amber-900 mt-1">Paz</span>
        </div>
        <span className="text-amber-400 font-black text-2xl">➡️</span>
        <div className="flex flex-col items-center">
          <span>⛺🧔🏻‍♂️</span>
          <span className="text-xs font-black text-amber-900 mt-1">Josué</span>
        </div>
      </div>

      {/* Choices */}
      <div className="w-full space-y-3">
        {options.map((option) => {
          const isChosen = selected === option.id;
          const isThisCorrect = option.isCorrect && status === 'correct';

          return (
            <button
              key={option.id}
              id={`decision-btn-${option.id}`}
              type="button"
              onClick={() => handleSelect(option)}
              disabled={status === 'correct'}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-3 transition-all duration-200 cursor-pointer flex items-center gap-4 shadow-md active:scale-98 ${
                option.bg
              } ${isThisCorrect ? 'ring-4 ring-emerald-400 font-black scale-102' : ''}`}
            >
              <span className="text-3xl shrink-0">{option.emoji}</span>
              <span className="text-base sm:text-xl font-bold leading-snug">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {status === 'correct' && (
        <FeedbackBanner
          status="correct"
          message="Isso mesmo! Eles reconheceram que Jeová tinha poder para cumprir suas promessas."
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Os gibeonitas não queriam lutar. Eles sabiam que Jeová estava ajudando Israel! Tente novamente."
          onRetry={() => {
            setSelected(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
