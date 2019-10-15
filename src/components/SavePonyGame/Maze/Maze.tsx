import React, { useEffect } from 'react';

const Maze: React.FC<MazeProps> = ({ mazePrint, moveKeyHandler }) => {

  useEffect(() => {
    window.addEventListener('keyup', moveKeyHandler);

    return () => {
      window.removeEventListener('keyup', moveKeyHandler);
    };
  }, [moveKeyHandler]);

  return (
    <React.Fragment>
      <h3>Maze Layout</h3>
      <pre style={{ fontFamily: 'Menlo,Monaco,Consolas,"Courier New",monospace' }}>
        {mazePrint}</pre>
    </React.Fragment>
  )
}

interface MazeProps {
  mazePrint: string;
  moveKeyHandler: (event: any) => void;
}

export default Maze;