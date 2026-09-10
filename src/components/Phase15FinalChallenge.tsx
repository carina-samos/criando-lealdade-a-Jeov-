import React, { useState } from 'react';
import { Target, CheckCircle2, ArrowRight, Sparkles, Star } from 'lucide-react';
import { GameAgeMode } from '../types';
import { playSound } from '../utils/audio';
import { FeedbackBanner } from './FeedbackBanner';

interface Phase15FinalChallengeProps {
  ageMode: GameAgeMode;
  onComplete: () => void;
}

export const Phase15FinalChallenge: React.FC<Phase15FinalChallengeProps> = ({
  ageMode,
  onComplete,
}) => {
  // 4 Core fill-in-the-blank sentences
  const baseSentences = [
    {
      id: 1,
      lead: '1. Quando temos medo, podemos',
      end: 'em Jeová.',
      emoji: '🙏',
      correctWord: 'CONFIAR',
      options: ['CONFIAR', 'FUGIR'],
    },
    {
      id: 2,
      lead: '2. Podemos ser',
      end: 'e ajudar no que for necessário.',
      emoji: '🪵',
      correctWord: 'HUMILDES',
      options: ['HUMILDES', 'ORGULHOSOS'],
    },
    {
      id: 3,
      lead: '3. Quando sofremos uma injustiça, podemos',
      end: 'em Jeová.',
      emoji: '⏳',
      correctWord: 'ESPERAR',
      options: ['ESPERAR', 'DESISTIR'],
    },
    {
      id: 4,
      lead: '4. Podemos apoiar lealmente a',
      end: 'verdadeira.',
      emoji: '🏛️',
      correctWord: 'ADORAÇÃO',
      options: ['ADORAÇÃO', 'DISCUSSÃO'],
    },
  ];

  // Bonus questions for 5 to 7 years mode
  const olderBonusQuestions = [
    {
      id: 5,
      question: 'Quem ajudou os gibeonitas quando os 5 reis atacaram?',
      options: ['Josué e o exército de Israel', 'Ninguém ajudou'],
      correctWord: 'Josué e o exército de Israel',
    },
    {
      id: 6,
      question: 'Quem ajudou Josué e Israel com grandes milagres?',
      options: ['Jeová', 'Os próprios soldados'],
      correctWord: 'Jeová',
    },
    {
      id: 7,
      question: 'Os gibeonitas foram humildes ao cortar lenha e tirar água?',
      options: ['Sim, com alegria', 'Não, reclamaram'],
      correctWord: 'Sim, com alegria',
    },
    {
      id: 8,
      question: 'O que fazemos quando alguém é injusto conosco?',
      options: ['Esperamos em Jeová e fazemos o bem', 'Brigamos com todos'],
      correctWord: 'Esperamos em Jeová e fazemos o bem',
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [stepStatus, setStepStatus] = useState<'idle' | 'correct' | 'tryAgain'>('idle');

  // Total questions depending on age mode
  const questionsToUse = ageMode === 'older' 
    ? [...baseSentences.map(s => ({ ...s, isSentence: true })), ...olderBonusQuestions.map(q => ({ ...q, isSentence: false }))]
    : baseSentences.map(s => ({ ...s, isSentence: true }));

  const currentQ = questionsToUse[currentStepIndex];
  const isFinished = currentStepIndex >= questionsToUse.length;

  const handleChoose = (word: string) => {
    setSelectedWord(word);
    if (word === currentQ.correctWord) {
      playSound('correct');
      setStepStatus('correct');
    } else {
      playSound('tryAgain');
      setStepStatus('tryAgain');
    }
  };

  const handleNextStep = () => {
    const nextIdx = currentStepIndex + 1;
    if (nextIdx >= questionsToUse.length) {
      onComplete();
    } else {
      setCurrentStepIndex(nextIdx);
      setSelectedWord(null);
      setStepStatus('idle');
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full uppercase mb-2 border border-amber-300">
          <Target className="w-3.5 h-3.5 text-amber-800" />
          Fase 15 — Desafio Final!
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
          O que aprendemos com os gibeonitas?
        </h3>
        <p className="text-base text-slate-600 font-bold mt-1">
          Pergunta {currentStepIndex + 1} de {questionsToUse.length}
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-2 justify-center">
        {questionsToUse.map((_, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full transition-all ${
              i < currentStepIndex
                ? 'bg-emerald-500 scale-110'
                : i === currentStepIndex
                ? 'bg-amber-500 ring-4 ring-amber-200 scale-125'
                : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Card for current question */}
      <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border-3 border-amber-300 shadow-xl text-center">
        {currentQ.isSentence ? (
          <div>
            <div className="text-5xl mb-3">{'emoji' in currentQ ? currentQ.emoji : '⭐'}</div>
            <div className="text-xl sm:text-2xl font-black text-slate-800 font-heading leading-relaxed">
              <span>{'lead' in currentQ && currentQ.lead} </span>
              <span className="inline-block px-3 py-1 bg-amber-100 border-2 border-dashed border-amber-400 rounded-xl text-amber-900 mx-1">
                {stepStatus === 'correct' ? currentQ.correctWord : '______'}
              </span>
              <span> {'end' in currentQ && currentQ.end}</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-3">👧💡</div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-800 font-heading leading-snug">
              {'question' in currentQ && currentQ.question}
            </h4>
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {currentQ.options.map((opt) => {
            const isPicked = selectedWord === opt;
            const isCorrectAnswer = opt === currentQ.correctWord;

            return (
              <button
                key={opt}
                id={`final-opt-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                type="button"
                onClick={() => handleChoose(opt)}
                disabled={stepStatus === 'correct'}
                className={`p-4 sm:p-5 rounded-2xl border-3 font-black text-lg sm:text-xl transition-all duration-200 cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                  isPicked
                    ? isCorrectAnswer
                      ? 'bg-emerald-600 text-white border-emerald-800 ring-4 ring-emerald-300'
                      : 'bg-rose-500 text-white border-rose-700 ring-4 ring-rose-200'
                    : 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-slate-800'
                }`}
              >
                {stepStatus === 'correct' && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {stepStatus === 'correct' && (
        <FeedbackBanner
          status="correct"
          message={`Muito bem! Resposta certinha: “${currentQ.correctWord}”!`}
          nextButtonLabel={
            currentStepIndex + 1 === questionsToUse.length
              ? 'Receber Minha Medalha! 🏅'
              : 'Próxima Frase! ➡️'
          }
          onNext={handleNextStep}
        />
      )}

      {stepStatus === 'tryAgain' && (
        <FeedbackBanner
          status="tryAgain"
          message="Essa não é a melhor resposta. Lembre-se do que os gibeonitas nos ensinaram e tente novamente!"
          onRetry={() => {
            setSelectedWord(null);
            setStepStatus('idle');
          }}
        />
      )}
    </div>
  );
};
