/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameAgeMode } from './types';
import { Header } from './components/Header';
import { NarratorBox } from './components/NarratorBox';
import { PhaseIntro } from './components/PhaseIntro';
import { Phase1Paths } from './components/Phase1Paths';
import { Phase2Decision } from './components/Phase2Decision';
import { Phase3OldThings } from './components/Phase3OldThings';
import { Phase4Consult } from './components/Phase4Consult';
import { Phase5Promise } from './components/Phase5Promise';
import { Phase6HumbleWork } from './components/Phase6HumbleWork';
import { Phase7AskHelp } from './components/Phase7AskHelp';
import { Phase8JehovahHelps } from './components/Phase8JehovahHelps';
import { Phase9Attributes } from './components/Phase9Attributes';
import { Phase10Injustice } from './components/Phase10Injustice';
import { Phase11WaitInJehovah } from './components/Phase11WaitInJehovah';
import { Phase12Faithful } from './components/Phase12Faithful';
import { Phase13BuildWall } from './components/Phase13BuildWall';
import { Phase14FourLessons } from './components/Phase14FourLessons';
import { Phase15FinalChallenge } from './components/Phase15FinalChallenge';
import { Phase16Victory } from './components/Phase16Victory';
import { speakText, stopSpeech, playSound } from './utils/audio';
import { Map, X, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

const PHASE_NARRATIONS: Record<number, string> = {
  0: 'Há muito tempo, os israelitas estavam entrando na Terra Prometida. Eles tinham visto Jeová ajudá-los a vencer grandes inimigos. Um dia, alguns homens chegaram até Josué. Eles eram os gibeonitas. Vamos descobrir o que podemos aprender com eles?',
  1: 'De onde eram os homens que chegaram até Josué? Escolha o caminho certo!',
  2: 'Os gibeonitas sabiam que Jeová estava ajudando Israel. Eles perceberam que não seria bom lutar contra Israel. Então foram até Josué para fazer um acordo de paz.',
  3: 'Os gibeonitas disseram que tinham vindo de uma terra muito distante. Eles mostraram roupas e sandálias velhas e comida seca. Mas eles não estavam dizendo a verdade sobre de onde tinham vindo.',
  4: 'Josué e os israelitas acreditaram no que os gibeonitas disseram. Mas eles não consultaram Jeová antes de fazer o acordo.',
  5: 'Poucos dias depois, os israelitas descobriram que os gibeonitas não tinham contado a verdade. Mas eles tinham feito um juramento. Então mantiveram o acordo de paz.',
  6: 'Os gibeonitas receberam um trabalho humilde: cortar lenha e tirar água para a assembleia e para o altar de Jeová.',
  7: 'Cinco reis amorreus se juntaram para atacar Gibeão. Os gibeonitas foram até Josué e pediram ajuda.',
  8: 'Josué liderou o exército para ajudar os gibeonitas. Jeová abençoou os esforços deles! Ele lançou grandes pedras de granizo sobre os inimigos e fez a luz do dia durar mais tempo!',
  9: 'Os relatos sobre os gibeonitas nos ajudam a conhecer melhor a personalidade de Jeová. Jeová é humilde, misericordioso, justo e leal!',
  10: 'Muito tempo depois, o rei Saul fez algo muito errado contra os gibeonitas. Ele tentou eliminá-los totalmente. Muitos gibeonitas foram mortos.',
  11: 'A injustiça não foi resolvida imediatamente. Muitos anos depois, no tempo do rei Davi, o assunto foi resolvido. Jeová mostrou que não havia esquecido o que tinha acontecido.',
  12: 'Passaram-se muitos anos. Os judeus ficaram exilados em Babilônia. Depois, alguns voltaram para Jerusalém. Entre os que voltaram estavam descendentes dos gibeonitas, chamados de servos do templo.',
  13: 'Ajude a reconstruir a muralha de Jerusalém! Os gibeonitas apoiaram lealmente a adoração verdadeira.',
  14: 'Veja as quatro placas do nosso caminho: Ter fé, ser humilde, esperar em Jeová e ser leal.',
  15: 'O que podemos aprender com os gibeonitas? Complete as frases para mostrar o que guardou no seu coração!',
  16: 'Parabéns! Você completou toda a jornada dos gibeonitas! Eu posso confiar em Jeová!',
};

const PHASE_TITLES: { id: number; title: string; emoji: string }[] = [
  { id: 0, title: 'Início: Vamos conhecer?', emoji: '🏠' },
  { id: 1, title: 'Fase 1: Quem são eles?', emoji: '🗺️' },
  { id: 2, title: 'Fase 2: Uma decisão importante', emoji: '👣' },
  { id: 3, title: 'Fase 3: As coisas velhas', emoji: '🎒' },
  { id: 4, title: 'Fase 4: Consultar a Jeová', emoji: '🤔' },
  { id: 5, title: 'Fase 5: Uma promessa é promessa', emoji: '🤝' },
  { id: 6, title: 'Fase 6: Trabalho humilde', emoji: '🪵' },
  { id: 7, title: 'Fase 7: O pedido de socorro', emoji: '🛡️' },
  { id: 8, title: 'Fase 8: Jeová faz milagres', emoji: '🌨️' },
  { id: 9, title: 'Fase 9: Qualidades de Jeová', emoji: '💛' },
  { id: 10, title: 'Fase 10: Uma injustiça', emoji: '⚖️' },
  { id: 11, title: 'Fase 11: Esperar em Jeová', emoji: '⏳' },
  { id: 12, title: 'Fase 12: Servos fiéis no templo', emoji: '🏛️' },
  { id: 13, title: 'Fase 13: Construa a muralha!', emoji: '🧱' },
  { id: 14, title: 'Fase 14: As 4 lições', emoji: '🌟' },
  { id: 15, title: 'Fase 15: Desafio Final', emoji: '🎯' },
  { id: 16, title: 'Fim: Medalha de Honra', emoji: '🏅' },
];

export default function App() {
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [starsCount, setStarsCount] = useState<number>(0);
  const [ageMode, setAgeMode] = useState<GameAgeMode>('toddler');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  // Auto-speak narration on phase change when sound is enabled
  useEffect(() => {
    if (soundEnabled && PHASE_NARRATIONS[currentPhase]) {
      // Small pause for smoother UX
      const timer = setTimeout(() => {
        speakText(PHASE_NARRATIONS[currentPhase]);
      }, 400);
      return () => {
        clearTimeout(timer);
        stopSpeech();
      };
    }
  }, [currentPhase, soundEnabled]);

  const handleNextPhase = () => {
    stopSpeech();
    setCurrentPhase((prev) => Math.min(16, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddStar = () => {
    setStarsCount((prev) => prev + 1);
  };

  const handleRestart = () => {
    stopSpeech();
    setCurrentPhase(0);
    setStarsCount(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToPhase = (phaseId: number) => {
    stopSpeech();
    playSound('tap');
    setCurrentPhase(phaseId);
    setIsMapModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col selection:bg-amber-200">
      {/* App Header */}
      <Header
        currentPhase={currentPhase}
        totalPhases={17}
        starsCount={starsCount}
        ageMode={ageMode}
        onSelectAgeMode={(mode) => {
          setAgeMode(mode);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          if (soundEnabled) {
            stopSpeech();
            setSoundEnabled(false);
          } else {
            setSoundEnabled(true);
          }
        }}
        onRestart={handleRestart}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-start space-y-6">
        
        {/* Story Narrator Speech Box (on all active story phases) */}
        {currentPhase > 0 && currentPhase < 16 && (
          <NarratorBox
            text={PHASE_NARRATIONS[currentPhase] || ''}
            voiceEnabled={soundEnabled}
          />
        )}

        {/* Dynamic Phase Render */}
        <div className="w-full">
          {currentPhase === 0 && (
            <PhaseIntro
              ageMode={ageMode}
              onSelectAgeMode={setAgeMode}
              onStart={() => {
                handleAddStar();
                handleNextPhase();
              }}
            />
          )}

          {currentPhase === 1 && (
            <Phase1Paths
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 2 && (
            <Phase2Decision
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 3 && (
            <Phase3OldThings
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 4 && (
            <Phase4Consult
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 5 && (
            <Phase5Promise
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 6 && (
            <Phase6HumbleWork
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 7 && (
            <Phase7AskHelp
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 8 && (
            <Phase8JehovahHelps
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 9 && (
            <Phase9Attributes
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 10 && (
            <Phase10Injustice
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 11 && (
            <Phase11WaitInJehovah
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 12 && (
            <Phase12Faithful
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 13 && (
            <Phase13BuildWall
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 14 && (
            <Phase14FourLessons
              onCorrect={handleAddStar}
              onNext={handleNextPhase}
            />
          )}

          {currentPhase === 15 && (
            <Phase15FinalChallenge
              ageMode={ageMode}
              onComplete={() => {
                handleAddStar();
                handleNextPhase();
              }}
            />
          )}

          {currentPhase === 16 && (
            <Phase16Victory
              totalStars={starsCount}
              onRestart={handleRestart}
            />
          )}
        </div>

        {/* Map & Phases Quick Navigation Floating Pill */}
        {currentPhase > 0 && currentPhase < 16 && (
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                playSound('tap');
                setIsMapModalOpen(true);
              }}
              id="open-map-modal-btn"
              type="button"
              className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-900 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-2xl border-2 border-amber-300 shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <Map className="w-4 h-4 text-amber-700" />
              <span>Mapa da Aventura</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer message */}
      <footer className="w-full py-4 text-center border-t border-amber-200 bg-amber-50/60 mt-auto">
        <p className="text-xs sm:text-sm font-bold text-amber-900/80">
          “Confiar em Jeová, ser humilde, esperar nele e apoiar a adoração verdadeira.” ❤️
        </p>
      </footer>

      {/* Modal for jumping directly to any phase (Great for parents and family worship) */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-amber-300 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-amber-100 border-b border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                <h3 className="font-black text-lg text-amber-950 font-heading">
                  Mapa das Fases
                </h3>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-amber-200 text-amber-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {PHASE_TITLES.map((pt) => {
                const isCurrent = currentPhase === pt.id;

                return (
                  <button
                    key={pt.id}
                    onClick={() => handleJumpToPhase(pt.id)}
                    className={`w-full text-left p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-amber-400 text-amber-950 border-amber-600 font-black shadow-sm'
                        : 'bg-amber-50/70 hover:bg-amber-100/90 text-slate-800 border-amber-200 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pt.emoji}</span>
                      <span className="text-sm sm:text-base">{pt.title}</span>
                    </div>
                    {isCurrent ? (
                      <span className="text-xs bg-amber-950 text-white px-2.5 py-0.5 rounded-full font-black">
                        Atual
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
