import React, { useState } from 'react';
import { PackageOpen, Check, X } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase3OldThingsProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase3OldThings: React.FC<Phase3OldThingsProps> = ({ onNext, onCorrect }) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const handleChoice = (choice: boolean) => {
    setSelected(choice);
    // Question: "Os gibeonitas disseram a verdade sobre sua terra." Correct answer is FALSE.
    if (!choice) {
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
          <PackageOpen className="w-3.5 h-3.5" />
          Fase 3 — As coisas velhas
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          O disfarce dos gibeonitas
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Eles fingiram que vinham de uma terra muito, muito distante...
        </p>
      </div>

      {/* Interactive Items showcase */}
      <div className="w-full grid grid-cols-3 gap-3">
        <div className="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm">
          <span className="text-4xl sm:text-5xl mb-1">👞</span>
          <span className="font-black text-sm text-amber-950">Sandálias velhas</span>
          <span className="text-xs text-amber-800 font-semibold">remendadas</span>
        </div>
        <div className="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm">
          <span className="text-4xl sm:text-5xl mb-1">👕</span>
          <span className="font-black text-sm text-amber-950">Roupas gastas</span>
          <span className="text-xs text-amber-800 font-semibold">rasgadas da viagem</span>
        </div>
        <div className="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm">
          <span className="text-4xl sm:text-5xl mb-1">🍞</span>
          <span className="font-black text-sm text-amber-950">Comida seca</span>
          <span className="text-xs text-amber-800 font-semibold">pão esmigalhado</span>
        </div>
      </div>

      {/* Question Box */}
      <div className="w-full bg-white p-5 rounded-3xl border-3 border-amber-200 shadow-md text-center">
        <span className="text-xs font-black uppercase text-amber-800 tracking-wider bg-amber-100 px-3 py-1 rounded-full">
          Jogo: Verdadeiro ou Falso?
        </span>
        <h4 className="text-xl sm:text-2xl font-black text-slate-800 mt-3 mb-4 font-heading">
          “Os gibeonitas disseram a verdade sobre sua terra?”
        </h4>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            id="btn-choice-true"
            type="button"
            onClick={() => handleChoice(true)}
            disabled={status === 'correct'}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border-3 border-slate-300 text-slate-700 font-black text-lg sm:text-xl active:scale-95 shadow cursor-pointer transition-all"
          >
            <Check className="w-6 h-6 text-emerald-600" />
            <span>VERDADEIRO</span>
          </button>

          <button
            id="btn-choice-false"
            type="button"
            onClick={() => handleChoice(false)}
            disabled={status === 'correct'}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-rose-500 hover:bg-rose-600 border-3 border-rose-700 text-white font-black text-lg sm:text-xl active:scale-95 shadow-md cursor-pointer transition-all ring-2 ring-rose-300"
          >
            <X className="w-6 h-6 text-white" />
            <span>❌ FALSO</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {status === 'correct' && (
        <FeedbackBanner
          status="correct"
          message="Isso mesmo! Eles enganaram Josué para conseguir um acordo de paz."
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Na verdade, eles moravam bem pertinho! Eles não disseram a verdade sobre de onde vieram."
          onRetry={() => {
            setSelected(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
