
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.1] mix-blend-screen" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
    </div>
  );
};

export default Background;
