import React from 'react';
import { SONG_STYLES } from '../constants';
import type { LyricGenerationParams } from '../types';

interface InputFormProps {
  isLoading: boolean;
  onSubmit: (params: LyricGenerationParams) => void;
}

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3.5zM5.134 6.134a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM14.866 6.134a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.061-1.06l1.06-1.06a.75.75 0 011.061 0zM3.5 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013.5 10zm12.25.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM6.195 14.805a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.061zM12.672 13.745a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zM10 16.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
    </svg>
);


const InputForm: React.FC<InputFormProps> = ({ isLoading, onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params: LyricGenerationParams = {
      keywords: formData.get('keywords') as string,
      style: formData.get('style') as string,
      inspiration: formData.get('inspiration') as string,
    };
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <label htmlFor="keywords" className="block text-sm font-medium text-neutral-300">
          Keywords / Theme
        </label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          required
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          placeholder="e.g., barish, yaadein, dosti"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="style" className="block text-sm font-medium text-neutral-300">
          Style
        </label>
        <select
          id="style"
          name="style"
          defaultValue="Poetic Bollywood"
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        >
          {SONG_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="inspiration" className="block text-sm font-medium text-neutral-300">
          Inspiration (Optional)
        </label>
        <textarea
          id="inspiration"
          name="inspiration"
          rows={3}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          placeholder="Paste a song link, lyric snippet, or poetry..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          'Generating...'
        ) : (
          <>
            <SparkleIcon className="w-5 h-5" />
            Generate Lyrics
          </>
        )}
      </button>
    </form>
  );
};

export default InputForm;
