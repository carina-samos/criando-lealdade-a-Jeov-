import React, { useState } from 'react';
import { Hourglass, HeartHandshake } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase11WaitInJehovahProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase11WaitInJehovah: React.FC<Phase11WaitInJehovahProps> = ({ onNext, onCorrect }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const options = [
    {
      id: 'anger',
      text: 'Ficar com raiva e abandonar o que é certo.',
      emoji: '🟥',
      bg: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-950',
      isCorrect: false,
    },
    {
      id: 'wait',
      text: 'Esperar pacientemente em Jeová e continuar fazendo o que é certo.',
      emoji: '🟩',
      bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-950',
      isCorrect: true,
    },
  ];

  const handleSelect = (opt: typeof options[0]) => {
    setSelected(opt.id);
    if (opt.isCorrect) {
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
          <Hourglass className="w-3.5 h-3.5 text-amber-700" />
          Fase 11 — Esperar em Jeová
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          Quando sofremos uma injustiça, o que podemos fazer?
        </h3>
      </div>

      {/* Hourglass and King David scene */}
      <div className="w-full bg-amber-100/70 border-2 border-amber-300 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
        <div className="text-6xl sm:text-7xl shrink-0 animate-pulse">
          ⏳
        </div>
        <div>
          <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
            Jeová não se esquece de nada!
          </span>
          <p className="text-sm sm:text-base font-bold text-slate-800 mt-1">
            Muitos anos depois, no tempo do rei Davi, Jeová fez com que a justiça fosse feita para com os gibeonitas. Ele sempre cuida de seus servos no tempo certo!
          </p>
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="w-full space-y-3">
        {options.map((opt) => {
          const isThisCorrect = opt.isCorrect && status === 'correct';

          return (
            <button
              key={opt.id}
              id={`wait-btn-${opt.id}`}
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
          message="Muito bem! Podemos sempre confiar que Jeová sabe de tudo e vai corrigir as coisas no tempo certo. Devemos continuar fazendo o bem!"
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Ficar com raiva machuca o nosso coração. O melhor caminho é esperar com paciência em Jeová e fazer o que é correto."
          onRetry={() => {
            setSelected(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
