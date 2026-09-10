import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Heart, RotateCcw, Sparkles, Star, CheckCircle, Volume2 } from 'lucide-react';
import { playSound, speakText } from '../utils/audio';

interface Phase16VictoryProps {
  totalStars: number;
  onRestart: () => void;
}

export const Phase16Victory: React.FC<Phase16VictoryProps> = ({ totalStars, onRestart }) => {
  useEffect(() => {
    // Triumphant sound
    playSound('victory');

    // Confetti celebration bursts
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Voice announcement of the final gold motto
    const finalSpeechTimer = setTimeout(() => {
      speakText('Parabéns! Você completou a jornada dos gibeonitas! Eu posso confiar em Jeová!');
    }, 1200);

    return () => clearTimeout(finalSpeechTimer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-6 max-w-2xl mx-auto text-center">
      {/* Golden Medal Card */}
      <div className="w-full bg-gradient-to-b from-amber-200 via-yellow-100 to-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-2xl relative overflow-hidden">
        <div className="absolute top-2 right-2 text-3xl animate-spin" style={{ animationDuration: '6s' }}>
          ✨
        </div>
        <div className="absolute top-2 left-2 text-3xl animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
          ✨
        </div>

        {/* Big Medal Icon */}
        <div className="relative inline-block my-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-4 border-amber-600 flex items-center justify-center text-5xl sm:text-6xl shadow-xl transform hover:rotate-6 transition-transform">
            🏅
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <span className="inline-block mt-3 bg-amber-400/90 text-amber-950 font-black text-xs sm:text-sm px-4 py-1 rounded-full uppercase tracking-wider border border-amber-500">
          🏆 PARABÉNS! VOCÊ É UM VENCEDOR!
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-amber-950 mt-2 font-heading tracking-tight">
          MEDALHA DE HONRA
        </h2>
        <div className="text-xl sm:text-2xl font-black text-amber-800 font-heading">
          “APRENDI COM OS GIBEONITAS!”
        </div>

        {/* The Golden Life Resolution */}
        <div className="mt-5 p-5 bg-white/95 rounded-3xl border-3 border-amber-300 shadow-md">
          <p className="text-base sm:text-lg font-black text-slate-800 leading-relaxed">
            “Eu quero ter fé em Jeová, ser humilde, esperar nele e apoiar a adoração verdadeira!”
          </p>

          <div className="mt-4 pt-4 border-t-2 border-amber-200 flex flex-col items-center">
            <div className="flex items-center gap-2 text-rose-600">
              <Heart className="w-7 h-7 fill-rose-500 animate-bounce" />
              <span className="text-xl sm:text-2xl font-black font-heading tracking-wide">
                “EU POSSO CONFIAR EM JEOVÁ.”
              </span>
              <Heart className="w-7 h-7 fill-rose-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* 4 Pillars Summary Chain */}
        <div className="mt-6">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 block mb-2">
            Nossos 4 Guardiões no Coração:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white/90 border-2 border-emerald-300 rounded-2xl p-2.5 flex flex-col items-center">
              <span className="text-2xl">🙏</span>
              <span className="font-black text-xs text-emerald-900 mt-1">FÉ</span>
              <span className="text-[10px] font-bold text-slate-600">Confiar em Jeová</span>
            </div>
            <div className="bg-white/90 border-2 border-amber-300 rounded-2xl p-2.5 flex flex-col items-center">
              <span className="text-2xl">🪵</span>
              <span className="font-black text-xs text-amber-900 mt-1">HUMILDADE</span>
              <span className="text-[10px] font-bold text-slate-600">Ajudar de coração</span>
            </div>
            <div className="bg-white/90 border-2 border-sky-300 rounded-2xl p-2.5 flex flex-col items-center">
              <span className="text-2xl">⏳</span>
              <span className="font-black text-xs text-sky-900 mt-1">PACIÊNCIA</span>
              <span className="text-[10px] font-bold text-slate-600">Esperar nele</span>
            </div>
            <div className="bg-white/90 border-2 border-purple-300 rounded-2xl p-2.5 flex flex-col items-center">
              <span className="text-2xl">🏛️</span>
              <span className="font-black text-xs text-purple-900 mt-1">LEALDADE</span>
              <span className="text-[10px] font-bold text-slate-600">Adoração pura</span>
            </div>
          </div>
        </div>

        {/* Stars count */}
        <div className="mt-5 inline-flex items-center gap-2 bg-yellow-300 text-yellow-950 font-black px-4 py-1.5 rounded-full border border-yellow-500 shadow-sm text-sm">
          <Star className="w-5 h-5 fill-yellow-500 text-yellow-600" />
          <span>Você conquistou todas as estrelas da aventura! ⭐</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button
          onClick={() => {
            playSound('tap');
            onRestart();
          }}
          id="play-again-btn"
          type="button"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-lg px-8 py-4 rounded-3xl shadow-xl border-b-6 border-emerald-800 transition-all cursor-pointer"
        >
          <RotateCcw className="w-6 h-6" />
          <span>Jogar Novamente! 🎮</span>
        </button>
      </div>
    </div>
  );
};
