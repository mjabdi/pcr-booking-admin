import './App.css';
import GlobalState from './GlobalState'; 
import React from 'react';

function App() {
  const [state, setState] = React.useState({bookingDate: new Date(), persons: []});
  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">
       
      </div>
    </GlobalState.Provider>
  );
}

export default App;
