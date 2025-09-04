import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Loader from './components/Loader';
import LyricDisplay from './components/LyricDisplay';
import { generateLyrics } from './services/geminiService';
import type { LyricGenerationParams } from './types';

const App: React.FC = () => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLyrics = async (params: LyricGenerationParams) => {
    setIsLoading(true);
    setError(null);
    setLyrics(null);
    
    const result = await generateLyrics(params);

    if (result.startsWith('An error occurred')) {
        setError(result);
    } else {
        setLyrics(result);
    }
    
    setIsLoading(false);
  };

  const handleReset = () => {
    setLyrics(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10" 
        style={{backgroundImage: 'url("https://picsum.photos/seed/musicbg/1920/1080")'}}
      ></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-neutral-900"></div>
      
      <main className="relative z-20 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-screen">
        <Header />

        <div className="w-full max-w-2xl mt-8">
          {!lyrics && !isLoading && (
            <InputForm onSubmit={handleGenerateLyrics} isLoading={isLoading} />
          )}

          {isLoading && <Loader />}
          
          {error && (
            <div className="text-center p-4 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="text-red-300">{error}</p>
            </div>
          )}

          {lyrics && (
            <div className="flex flex-col items-center gap-6">
                <LyricDisplay lyrics={lyrics} />
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-neutral-700 text-neutral-300 font-semibold rounded-lg hover:bg-neutral-600 transition-colors duration-200"
                >
                    Create Another
                </button>
            </div>
          )}
        </div>

        <footer className="relative z-20 text-center text-neutral-500 mt-12">
            <p>Powered by Google Gemini</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
