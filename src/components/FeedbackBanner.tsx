import React from 'react';
import { Star, ArrowRight, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { playSound } from '../utils/audio';

interface FeedbackBannerProps {
  status: 'correct' | 'tryAgain';
  message: string;
  onNext?: () => void;
  onRetry?: () => void;
  nextButtonLabel?: string;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  status,
  message,
  onNext,
  onRetry,
  nextButtonLabel = 'Continuar a Aventura! 🚀',
}) => {
  const isCorrect = status === 'correct';

  return (
    <div
      className={`w-full p-4 sm:p-5 rounded-3xl border-3 shadow-xl transition-all animate-float-slow ${
        isCorrect
          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
          : 'bg-amber-50 border-amber-400 text-amber-950'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md ${
              isCorrect ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-7 h-7" /> : <RotateCcw className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-sm font-black uppercase tracking-wider mb-0.5">
              {isCorrect ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">MUITO BEM! VOCÊ ACERTOU! ⭐</span>
                </>
              ) : (
                <span className="text-amber-700">VAMOS TENTAR DE NOVO? 💡</span>
              )}
            </div>
            <p className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug">
              {message}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto">
          {isCorrect && onNext && (
            <button
              onClick={() => {
                playSound('tap');
                onNext();
              }}
              id="feedback-next-btn"
              type="button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-base sm:text-lg px-6 py-3 rounded-2xl shadow-lg border-b-4 border-emerald-800 transition-all cursor-pointer"
            >
              <span>{nextButtonLabel}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {!isCorrect && onRetry && (
            <button
              onClick={() => {
                playSound('tap');
                onRetry();
              }}
              id="feedback-retry-btn"
              type="button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-base px-5 py-3 rounded-2xl shadow-md border-b-4 border-amber-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tentar de novo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
