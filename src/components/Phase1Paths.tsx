import React, { useState } from 'react';
import { MapPin, Sparkles, Navigation } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase1PathsProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase1Paths: React.FC<Phase1PathsProps> = ({ onNext, onCorrect }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const paths = [
    {
      id: 'gibeao',
      name: 'Gibeão',
      color: 'bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      emoji: '🟢',
      desc: 'Cidade dos heveus',
      isCorrect: true,
    },
    {
      id: 'jerico',
      name: 'Jericó',
      color: 'bg-sky-500 hover:bg-sky-600 border-sky-700 text-white',
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
      emoji: '🔵',
      desc: 'Muralhas que caíram',
      isCorrect: false,
    },
    {
      id: 'ai',
      name: 'Ai',
      color: 'bg-amber-500 hover:bg-amber-600 border-amber-700 text-white',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      emoji: '🟡',
      desc: 'Perto de Betel',
      isCorrect: false,
    },
  ];

  const handleSelect = (path: typeof paths[0]) => {
    setSelectedPath(path.id);
    if (path.isCorrect) {
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
      {/* Title Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <Navigation className="w-3.5 h-3.5" />
          Fase 1 — Quem são eles?
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          De onde eram os homens que chegaram até Josué?
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Toque no caminho correto para descobrir:
        </p>
      </div>

      {/* Visual illustration of the 3 paths */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paths.map((path) => {
          const isChosen = selectedPath === path.id;
          const isThisCorrect = path.isCorrect && status === 'correct';

          return (
            <button
              key={path.id}
              id={`path-btn-${path.id}`}
              type="button"
              onClick={() => handleSelect(path)}
              disabled={status === 'correct'}
              className={`flex flex-col items-center justify-center p-5 rounded-3xl border-b-6 transition-all duration-200 cursor-pointer active:scale-95 shadow-md ${
                path.color
              } ${isThisCorrect ? 'ring-4 ring-emerald-300 scale-105 animate-pulse-gentle' : ''}`}
            >
              <div className="text-4xl sm:text-5xl mb-2">{path.emoji}</div>
              <span className="text-xl sm:text-2xl font-black tracking-wide font-heading">
                {path.name}
              </span>
              <span className="text-xs font-bold opacity-90 mt-1">
                {path.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {status === 'correct' && (
        <FeedbackBanner
          status="correct"
          message="Muito bem! Eles eram gibeonitas e faziam parte dos heveus."
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Vamos tentar de novo. Os homens eram de Gibeão."
          onRetry={() => {
            setSelectedPath(null);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
