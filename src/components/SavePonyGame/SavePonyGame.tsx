import React, { useState } from 'react';
import axios from 'axios';
import Maze from './Maze/Maze';
import Navigation from './Navigation/Navigation';
import Form from './Form/Form';

const API_URL = 'https://ponychallenge.trustpilot.com/pony-challenge/maze'

const SavePonyGame: React.FC = () => {
  const [maze, setMazeState] = useState({
    width: '15',
    height: '15',
    playerName: 'Twilight Sparkle',
    difficulty: '0',
    print: ''
  });

  const [mazeId, setMazeId] = useState('N/A');
  const [moveMessage, setMoveMessage] = useState('');
  const [createMazeState, setCreateMazeState] = useState(false);
  const [game, setGameState] = useState({ state: false, message: '', hiddenUrl: '' });

  const createMaze = () => {
    if (mazeId !== 'N/A') {
      console.error('Game already in play');
      return;
    }

    const body = {
      'maze-width': parseInt(maze.width),
      'maze-height': parseInt(maze.height),
      'maze-player-name': maze.playerName,
      'difficulty': parseInt(maze.difficulty)
    };

    axios.post(`${API_URL}`, body)
      .then((res) => {
        setMazeId(res.data.maze_id);
        printMaze(res.data.maze_id);
        setCreateMazeState(false);
        setGameState({ ...game, state: true });
      }).catch((error) => {
        console.error(error);
      });
  }

  // const resetMaze = () => {
  //   setMazeState({
  //     width: '15',
  //     height: '15',
  //     playerName: 'Twilight Sparkle',
  //     difficulty: '0',
  //     print: ''
  //   });

  //   setGameState({ state: false, message: '', hiddenUrl: '' });
  //   setMazeId('N/A');
  //   setMoveMessage('');
  //   setCreateMazeState(true);
  // }

  const printMaze = (id: string) => {
    axios.get(`${API_URL}/${id}/print`)
      .then((res) => {
        setMazeState({ ...maze, print: res.data });
      }).catch((error) => {
        console.error(error);
      });
  }

  const move = (direction: 'south' | 'north' | 'east' | 'west') => {
    axios.post(`${API_URL}/${mazeId}`, { direction })
      .then((res) => {
        printMaze(mazeId);

        if (res.data.state === 'over' || res.data.state === 'won') {
          const updatedGameState = {
            state: false,
            message: res.data['state-result'],
            hiddenUrl: res.data['hidden-url']
          };

          setGameState(updatedGameState);
          return;
        };

        const message =
          res.data['state-result'] === `Can't walk in there` ?
            `Your pony ran into a wall - ouch!` :
            `Your pony moved ${direction}`;

        setMoveMessage(message);
      })
      .catch((error) => console.error(error));
  }

  const moveKeyHandler = (event: any) => {
    if (!game.state) {
      return;
    }

    switch (event.code) {
      case 'ArrowUp':
        return move('north');
      case 'ArrowDown':
        return move('south');
      case 'ArrowLeft':
        return move('west');
      case 'ArrowRight':
        return move('east');
    };
  }

  return (
    <React.Fragment>
      <h1>Help Save the Pony</h1>
      <p>
        Welcome to "Help Save the Pony", a game where you navigate a pony through a maze with the help of REST APIs.
      </p>
      <p>Create your maze to get started.</p>
      <p>For more information/documentation regarding the game, click <a href="https://ponychallenge.trustpilot.com/index.html" title="Visit the pony challenge">here</a>.</p>

      {!createMazeState && mazeId === 'N/A' ? <button className="btn" onClick={() => setCreateMazeState(true)}>Create Maze</button> : ''}

      {mazeId !== 'N/A' ?
        <React.Fragment>
          <h3>Maze Information</h3>
          <p>
            ID: <b>{mazeId}</b>
            <br />Width: <b>{maze.width}</b>
            <br />Height: <b>{maze.height}</b>
            <br />Player Name: <b>{maze.playerName}</b>
          </p>
        </React.Fragment> : ''}

      {createMazeState ?
        <Form
          maze={maze}
          setMazeState={setMazeState}
          createMaze={createMaze}
        /> :
        ''}

      {mazeId !== 'N/A' && !game.message ?
        <React.Fragment>
          <Navigation move={move} moveMessage={moveMessage} />
          <Maze moveKeyHandler={(event: any) => moveKeyHandler(event)} mazePrint={maze.print} />
        </React.Fragment> : ''}

      {!game.state && game.message ?
        <React.Fragment>
          <h5>{game.message}</h5>
          <p>Click <a href={`https://ponychallenge.trustpilot.com/${game.hiddenUrl}`} title="Claim your prize">here</a> to proceed (you won't regret it).</p>
        </React.Fragment> : ''}

    </React.Fragment>
  )
}

export default SavePonyGame;