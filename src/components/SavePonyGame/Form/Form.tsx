import React from 'react';
import { ponies } from '../../../ponies';

const Form: React.FC<FormProps> = ({
  createMaze,
  maze,
  setMazeState
}) => {

  const ponyNamesOptions = ponies.map(name => {
    return <option key={name} value={name}>{name}</option>;
  });

  return (
    <React.Fragment>
      <div className="row">
        <div className="col col-md-6">
          <div className="form-group">
            <label htmlFor="mazewidth"><b> Maze Width</b></label>
            <input id="mazewidth" type="number" min="15" max="25" value={maze.width} onChange={(event) => setMazeState({...maze, width: event.target.value})} />
          </div>
        </div>
        <div className="col col-md-6">
          <div className="form-group">
            <label htmlFor="mazeheight"><b>Maze Height</b></label>
            <input id="mazeheight" type="number" min="15" max="25" value={maze.height} onChange={(event) => setMazeState({...maze, height: event.target.value})} />
          </div>
        </div>
        <div className="col col-md-12">
          <div className="form-group">
            <label htmlFor="playername"><b>Player Name</b></label>
            <select id="playername" value={maze.playerName} onChange={(event) => setMazeState({...maze, playerName: event.target.value})}>
              {ponyNamesOptions}
            </select>
          </div>
        </div>
      </div>

      <button className="btn" onClick={() => createMaze()}>Start Game</button>
    </React.Fragment>
  )
}

interface FormProps {
  maze: {
    width: string;
    height: string;
    playerName: string;
  };
  createMaze: () => void;
  setMazeState: (event: any) => void;
}

export default Form;