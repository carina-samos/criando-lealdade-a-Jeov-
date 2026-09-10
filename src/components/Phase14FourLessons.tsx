import React, { useState } from 'react';
import { Route, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { playSound, speakText } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase14FourLessonsProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase14FourLessons: React.FC<Phase14FourLessonsProps> = ({ onNext, onCorrect }) => {
  const [visitedSigns, setVisitedSigns] = useState<number[]>([]);

  const signs = [
    {
      id: 1,
      emoji: '🙏',
      title: 'TER FÉ',
      subtitle: 'Confiar em Jeová.',
      detail: 'Reconhecer que Jeová tem o poder de cumprir tudo o que promete.',
      color: 'bg-emerald-500 text-white border-emerald-700',
    },
    {
      id: 2,
      emoji: '🪵',
      title: 'SER HUMILDE',
      subtitle: 'Estar disposto a fazer o que for necessário.',
      detail: 'Não buscar posições de destaque, mas servir de coração com simplicidade.',
      color: 'bg-amber-600 text-white border-amber-800',
    },
    {
      id: 3,
      emoji: '⏳',
      title: 'ESPERAR EM JEOVÁ',
      subtitle: 'Confiar que ele vai corrigir as injustiças no tempo certo.',
      detail: 'Ter paciência amorosa e nunca pagar o mal com o mal.',
      color: 'bg-sky-600 text-white border-sky-800',
    },
    {
      id: 4,
      emoji: '🏛️',
      title: 'SER LEAL',
      subtitle: 'Apoiar a adoração verdadeira.',
      detail: 'Permaneça firme com o povo de Deus em qualquer tempo ou situação.',
      color: 'bg-purple-600 text-white border-purple-800',
    },
  ];

  const handleSignTap = (sign: typeof signs[0]) => {
    playSound('tap');
    speakText(`${sign.title}. ${sign.subtitle}`);

    if (!visitedSigns.includes(sign.id)) {
      const next = [...visitedSigns, sign.id];
      setVisitedSigns(next);
      if (next.length === signs.length) {
        playSound('correct');
        onCorrect();
      }
    }
  };

  const allUnlocked = visitedSigns.length === signs.length;

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <Route className="w-3.5 h-3.5 text-amber-800" />
          Fase 14 — O caminho das 4 lições
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          As quatro placas da nossa jornada
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Toque em cada placa do caminho para ouvir seu lindo significado:
        </p>
      </div>

      {/* Path visual with 4 road signposts */}
      <div className="w-full space-y-3">
        {signs.map((sign) => {
          const isUnlocked = visitedSigns.includes(sign.id);

          return (
            <button
              key={sign.id}
              id={`lesson-sign-${sign.id}`}
              type="button"
              onClick={() => handleSignTap(sign)}
              className={`w-full text-left p-4 sm:p-5 rounded-3xl border-3 flex items-start sm:items-center gap-4 transition-all duration-300 cursor-pointer shadow-md active:scale-98 ${
                isUnlocked
                  ? `${sign.color} scale-102 ring-4 ring-amber-300/80`
                  : 'bg-white hover:bg-amber-50 border-amber-200 text-slate-800'
              }`}
            >
              <div className="text-4xl sm:text-5xl shrink-0 p-2 bg-white/20 rounded-2xl">
                {sign.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider opacity-90">
                    Placa {sign.id}
                  </span>
                  {isUnlocked && (
                    <span className="bg-white/30 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Ouvido
                    </span>
                  )}
                </div>
                <h4 className="text-lg sm:text-2xl font-black font-heading tracking-wide">
                  {sign.title}
                </h4>
                <p className="text-sm sm:text-base font-bold opacity-95 mt-0.5">
                  “{sign.subtitle}”
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="text-sm font-black text-amber-900 bg-amber-100/90 px-4 py-2 rounded-2xl border border-amber-300">
        Placas exploradas: {visitedSigns.length} de 4 🛤️
      </div>

      {/* Feedback Banner */}
      {allUnlocked && (
        <FeedbackBanner
          status="correct"
          message="Excelente! Agora você já conhece o segredo dos gibeonitas. Vamos para o Desafio Final!"
          nextButtonLabel="Ir para o Desafio Final! 🎯"
          onNext={onNext}
        />
      )}
    </div>
  );
};
