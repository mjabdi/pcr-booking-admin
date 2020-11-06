import './App.css';
import GlobalState from './GlobalState'; 
import React from 'react';
import Navigator from './Navigator';
import Dashboard from './Dashboard';


function App() {
  const [state, setState] = React.useState({foundRecords: [], currentMenuIndex: 0});
  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">
        <Navigator/>
        {/* <Dashboard/> */}
      </div>
    </GlobalState.Provider>
  );
}

export default App;
