import React, { useState } from 'react';
import { Scale, AlertTriangle, Check, X } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase10InjusticeProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase10Injustice: React.FC<Phase10InjusticeProps> = ({ onNext, onCorrect }) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const handleChoice = (isJust: boolean) => {
    setSelected(isJust);
    // Question: "Isso foi justo?" -> Correct answer is NO (false)
    if (!isJust) {
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
          <Scale className="w-3.5 h-3.5 text-amber-700" />
          Fase 10 — Uma injustiça
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          O rei Saul quebrou o acordo
        </h3>
      </div>

      {/* Unbalanced scale visual */}
      <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-6 flex flex-col items-center text-center shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">👑</span>
          <span className="font-black text-lg text-slate-800">Rei Saul</span>
        </div>

        {/* Big Scale */}
        <div className="relative my-3">
          <span className="text-7xl sm:text-8xl inline-block transform -rotate-12 transition-transform duration-500">
            ⚖️
          </span>
        </div>

        <div className="bg-white/90 border border-amber-200 rounded-2xl p-3 max-w-md shadow-xs">
          <p className="text-xs sm:text-sm font-bold text-slate-700">
            Muito tempo depois, o rei Saul atacou injustamente os gibeonitas, quebrando o juramento feito a Jeová.
          </p>
        </div>
      </div>

      {/* Question Box */}
      <div className="w-full bg-white p-5 rounded-3xl border-3 border-amber-200 shadow-md text-center">
        <h4 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 font-heading">
          “O que Saul fez com os gibeonitas foi justo?”
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <button
            id="btn-just-yes"
            type="button"
            onClick={() => handleChoice(true)}
            disabled={status === 'correct'}
            className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border-3 border-slate-300 text-slate-700 font-black text-xl active:scale-95 shadow cursor-pointer transition-all"
          >
            SIM
          </button>

          <button
            id="btn-just-no"
            type="button"
            onClick={() => handleChoice(false)}
            disabled={status === 'correct'}
            className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 border-3 border-emerald-800 text-white font-black text-xl active:scale-95 shadow-lg cursor-pointer transition-all ring-2 ring-emerald-300 flex items-center justify-center gap-2"
          >
            <Check className="w-6 h-6" />
            <span>NÃO</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {status === 'correct' && (
        <FeedbackBanner
          status="correct"
          message="Não. Foi uma grande injustiça. Mas Jeová não se esqueceu dos gibeonitas!"
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Saul quebrou o juramento de paz feito em nome de Jeová! Foi algo totalmente injusto e errado."
          onRetry={() => {
            setSelected(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
