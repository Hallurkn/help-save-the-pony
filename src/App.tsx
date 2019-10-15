import React from 'react';
import './App.scss';
import SavePonyGame from './components/SavePonyGame/SavePonyGame';

const App: React.FC = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col col-md-8 col-md-push-2">
          <SavePonyGame />
        </div>
      </div>
    </main>
  );
}

export default App;
