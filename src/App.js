import './App.css';
import GlobalState from './GlobalState'; 
import React from 'react';
import Navigator from './Navigator';


function App() {
  const [state, setState] = React.useState({});
  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">
        <Navigator/>
      </div>
    </GlobalState.Provider>
  );
}

export default App;
