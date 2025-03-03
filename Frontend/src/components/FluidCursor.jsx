import { useEffect } from 'react';
import useFluidCursor from '../cursor/cursor';

const FluidCursor = () => {
  useEffect(() => {
    useFluidCursor();
  }, []);

  return <canvas id="fluid" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }} />;
};

export default FluidCursor;
