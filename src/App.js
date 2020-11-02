import './App.css';
import GlobalState from './GlobalState'; 
import React from 'react';
import SignIn from './SignIn';


function App() {
  const [state, setState] = React.useState({});
  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">
        <SignIn></SignIn>
      </div>
    </GlobalState.Provider>
  );
}

export default App;
