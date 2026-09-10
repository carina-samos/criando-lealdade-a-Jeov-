import React, { useState } from 'react';
import { Landmark, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase12FaithfulProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase12Faithful: React.FC<Phase12FaithfulProps> = ({ onNext, onCorrect }) => {
  const [tapped, setTapped] = useState<string[]>([]);

  const pillars = [
    {
      id: 'temple',
      emoji: '🏛️',
      title: 'O Templo',
      desc: 'Serviram fielmente na casa de Jeová como servos do templo.',
    },
    {
      id: 'walls',
      emoji: '🧱',
      title: 'As Muralhas',
      desc: 'Trabalharam ombro a ombro para reconstruir os muros de Jerusalém.',
    },
    {
      id: 'work',
      emoji: '🪵',
      title: 'Trabalho Fiel',
      desc: 'Mesmo depois de séculos no exílio, continuaram apoiando a adoração pura!',
    },
  ];

  const handleTap = (id: string) => {
    playSound('tap');
    if (!tapped.includes(id)) {
      const next = [...tapped, id];
      setTapped(next);
      if (next.length === pillars.length) {
        playSound('correct');
        onCorrect();
      }
    }
  };

  const allCompleted = tapped.length === pillars.length;

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <Landmark className="w-3.5 h-3.5 text-amber-800" />
          Fase 12 — Os gibeonitas continuam fiéis
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          A volta de Babilônia para Jerusalém
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Toque em cada uma das 3 figuras para ver a lealdade deles:
        </p>
      </div>

      {/* 3 cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        {pillars.map((p) => {
          const isDone = tapped.includes(p.id);

          return (
            <button
              key={p.id}
              id={`faithful-card-${p.id}`}
              type="button"
              onClick={() => handleTap(p.id)}
              className={`p-5 rounded-3xl border-3 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
                isDone
                  ? 'bg-emerald-50 border-emerald-500 scale-102 ring-4 ring-emerald-200'
                  : 'bg-white hover:bg-amber-50 border-amber-200'
              }`}
            >
              <span className="text-5xl sm:text-6xl mb-2">{p.emoji}</span>
              <span className="text-xl font-black font-heading text-slate-800">
                {p.title}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-2">
                {p.desc}
              </p>

              {isDone && (
                <div className="mt-3 flex items-center gap-1 bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Leais a Jeová!</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div className="text-sm font-black text-amber-900 bg-amber-100/90 px-4 py-2 rounded-2xl border border-amber-300">
        Itens explorados: {tapped.length} de 3 🏛️🧱🪵
      </div>

      {/* Feedback Banner */}
      {allCompleted && (
        <FeedbackBanner
          status="correct"
          message="Muito bem! Os gibeonitas não desistiram. Eles apoiaram com alegria e lealdade a adoração verdadeira!"
          nextButtonLabel="Construir a Muralha! 🧱"
          onNext={onNext}
        />
      )}
    </div>
  );
};
