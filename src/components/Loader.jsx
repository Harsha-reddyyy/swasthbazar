import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 2000); // Adjust time (ms) as needed

    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-1000">
      <div className="text-3xl sm:text-5xl font-bold animate-pulse tracking-wide">
        Swasth<span className="text-green-400">Bazar</span>
      </div>
    </div>
  );
};

export default Loader;
