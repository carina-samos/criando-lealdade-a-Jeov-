import React, { useState } from 'react';
import { Sparkles, Check, Flame } from 'lucide-react';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase6HumbleWorkProps {
  onNext: () => void;
  onCorrect: () => void;
}

export const Phase6HumbleWork: React.FC<Phase6HumbleWorkProps> = ({ onNext, onCorrect }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  const items = [
    { id: 'wood', name: 'Lenha', emoji: '🪵', isCorrect: true, desc: 'Cortar lenha' },
    { id: 'water', name: 'Água', emoji: '💧', isCorrect: true, desc: 'Tirar água' },
    { id: 'crown', name: 'Coroa', emoji: '👑', isCorrect: false, desc: 'Governador' },
    { id: 'sword', name: 'Espada', emoji: '⚔️', isCorrect: false, desc: 'Guerreiro' },
  ];

  const handleToggle = (id: string, isCorrect: boolean) => {
    playSound('tap');
    let next: string[];

    if (selectedItems.includes(id)) {
      next = selectedItems.filter((i) => i !== id);
    } else {
      next = [...selectedItems, id];
    }

    setSelectedItems(next);

    // If child tapped a wrong item (crown or sword)
    if (!isCorrect && !selectedItems.includes(id)) {
      playSound('tryAgain');
      setStatus('tryAgain');
      return;
    }

    // Check if both correct items are picked
    const hasWood = next.includes('wood');
    const hasWater = next.includes('water');
    const hasWrong = next.some((i) => i === 'crown' || i === 'sword');

    if (hasWood && hasWater && !hasWrong) {
      playSound('correct');
      setStatus('correct');
      onCorrect();
    } else {
      setStatus('idle');
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <span>🪵</span>
          <span>Fase 6 — Um trabalho humilde</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          Quais eram alguns dos trabalhos dos gibeonitas?
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Toque nos 2 objetos que mostram o trabalho humilde que eles faziam:
        </p>
      </div>

      {/* Grid of 4 objects */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          const isSuccess = isSelected && item.isCorrect && status === 'correct';

          return (
            <button
              key={item.id}
              id={`item-work-${item.id}`}
              type="button"
              onClick={() => handleToggle(item.id, item.isCorrect)}
              disabled={status === 'correct'}
              className={`p-5 rounded-3xl border-3 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                isSelected
                  ? item.isCorrect
                    ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300 scale-105'
                    : 'bg-rose-100 border-rose-400 ring-4 ring-rose-200'
                  : 'bg-white hover:bg-amber-50 border-amber-200'
              }`}
            >
              <span className="text-5xl sm:text-6xl mb-2">{item.emoji}</span>
              <span className="font-black text-lg text-slate-800 font-heading">
                {item.name}
              </span>
              <span className="text-xs text-slate-500 font-bold mt-0.5">
                {item.desc}
              </span>

              {isSelected && item.isCorrect && (
                <div className="mt-2 bg-emerald-500 text-white rounded-full p-1 shadow">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Status indicator hint */}
      {status !== 'correct' && status !== 'tryAgain' && (
        <div className="text-sm font-black text-amber-800 bg-amber-100/90 px-4 py-2 rounded-2xl border border-amber-300">
          Itens escolhidos: {selectedItems.filter(i => i === 'wood' || i === 'water').length} de 2 🪵💧
        </div>
      )}

      {/* Feedback Banner */}
      {status === 'correct' && (
        <FeedbackBanner
          status="correct"
          message="Muito bem! Ser humilde significa estar disposto a fazer o que for necessário para apoiar a adoração a Jeová."
          onNext={onNext}
        />
      )}

      {status === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Eles não eram reis nem soldados de Israel! O trabalho humilde deles era cortar lenha 🪵 e tirar água 💧 para o tabernáculo."
          onRetry={() => {
            setSelectedItems([]);
            setStatus('idle');
          }}
        />
      )}
    </div>
  );
};
