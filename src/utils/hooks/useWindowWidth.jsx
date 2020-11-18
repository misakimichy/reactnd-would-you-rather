import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // detect viewport width
  const [windowWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
