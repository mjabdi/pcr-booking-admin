import './App.css';
import GlobalState from './GlobalState'; 
import React from 'react';
import Navigator from './Navigator';
import NavigatorUser from './users/navigator-user';


const getPathId = (path) =>
{
  let urlElements = window.location.pathname.split('/');
  if (urlElements.length === 4)
  {
    return urlElements[urlElements.length - 1];
  }
  return null;  
}


function App() {
  const [state, setState] = React.useState({foundRecords: [], currentMenuIndex: 0});



  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">

      {getPathId() && (

          <NavigatorUser pathId={`${getPathId()}`}/>

          )          
    }

      {!getPathId() &&  (
            <Navigator/>
          )
      }
      
    
      </div>
    </GlobalState.Provider>
  );
}

export default App;
