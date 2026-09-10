import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Smile } from 'lucide-react';
import { speakText, stopSpeech, playSound } from '../utils/audio';

interface NarratorBoxProps {
  text: string;
  autoSpeak?: boolean;
  voiceEnabled?: boolean;
  highlightWords?: string[];
}

export const NarratorBox: React.FC<NarratorBoxProps> = ({
  text,
  voiceEnabled = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleVoice = () => {
    playSound('tap');
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="w-full bg-amber-50/95 border-3 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Narrator avatar */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-md transform hover:rotate-3 transition-transform">
            <span role="img" aria-label="Narrador">📖</span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full text-xs shadow">
            <Smile className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Narrative text bubble */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5 gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              História Bíblica
            </span>

            {/* Listen button */}
            <button
              onClick={handleToggleVoice}
              id="narrator-speak-btn"
              type="button"
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-sm ${
                isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
              title="Ouvir a história"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Ouvir Voz</span>
                </>
              )}
            </button>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed tracking-normal">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
