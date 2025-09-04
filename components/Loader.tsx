import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-neutral-800/50 rounded-lg">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
      <p className="text-neutral-300 text-lg">Composing your masterpiece...</p>
    </div>
  );
};

export default Loader;
