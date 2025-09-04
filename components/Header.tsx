import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Lyricsmith
      </h1>
      <p className="text-neutral-400 mt-2 text-md md:text-lg">Your AI partner for crafting beautiful Hindi lyrics</p>
    </header>
  );
};

export default Header;
