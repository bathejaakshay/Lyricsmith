import React, { useState, useEffect } from 'react';

interface LyricDisplayProps {
  lyrics: string;
}

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);


const LyricDisplay: React.FC<LyricDisplayProps> = ({ lyrics }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(lyrics);
    setIsCopied(true);
  };

  const formatLyrics = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.toLowerCase().startsWith('mukhda:') || line.toLowerCase().startsWith('antara') || line.toLowerCase().startsWith('bridge:')) {
        return <p key={index} className="text-pink-400 font-semibold mt-4 mb-2">{line}</p>;
      }
      return <p key={index} className="text-neutral-300">{line}</p>;
    });
  };

  return (
    <div className="w-full max-w-2xl bg-neutral-900/70 border border-neutral-700 rounded-xl shadow-lg backdrop-blur-sm p-6 relative animate-fade-in">
      <button 
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="Copy lyrics"
      >
        {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
      </button>
      <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
        {formatLyrics(lyrics)}
      </div>
    </div>
  );
};

export default LyricDisplay;
