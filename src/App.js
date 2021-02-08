import "./App.css";
import GlobalState from "./GlobalState";
import React from "react";
import Navigator from "./Navigator";
import NavigatorUser from "./users/navigator-user";
import GyaneNavigatorUser from "./users/gynae/navigator-user";
import GyaneFormNavigatorUser from "./users/gynaeform/navigator-user";

import GPNavigatorUser from "./users/gp/navigator-user";
import GPFormNavigatorUser from "./users/gpform/navigator-user";


function App() {
  const [state, setState] = React.useState({
    foundRecords: [],
    currentMenuIndex: 0,
  });

  const getPathId = () => {
    let urlElements = window.location.pathname.split("/");
    if (urlElements.length === 4) {
      return {id: urlElements[urlElements.length - 1] , type: 'pcr'};
    }

    if (urlElements.length === 6) {
      if (urlElements[urlElements.length - 2] === "pcr") {
        return  {id: urlElements[urlElements.length - 1] , type: 'pcr'};
      } else if (urlElements[urlElements.length - 2] === "gynae") {
        if (urlElements[urlElements.length - 3] === "edit")
        {
          return  {id: urlElements[urlElements.length - 1] , type: 'gynae', page: "edit"};
        }else if  (urlElements[urlElements.length - 3] === "form")
        {
          return  {id: urlElements[urlElements.length - 1] , type: 'gynae', page: "form"};
        }
        
      }else if (urlElements[urlElements.length - 2] === "gp") {
        if (urlElements[urlElements.length - 3] === "edit")
        {
          return  {id: urlElements[urlElements.length - 1] , type: 'gp', page: "edit"};
        }else if  (urlElements[urlElements.length - 3] === "form")
        {
          return  {id: urlElements[urlElements.length - 1] , type: 'gp', page: "form"};
        }
        
      }
    }

    return null;
  };

  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">
        {getPathId() && getPathId().type === 'pcr' && <NavigatorUser pathId={`${getPathId().id}`} />}
        {getPathId() && getPathId().type === 'gynae' && getPathId().page === 'edit' && <GyaneNavigatorUser pathId={`${getPathId().id}`} />}
        {getPathId() && getPathId().type === 'gynae' && getPathId().page === 'form' && <GyaneFormNavigatorUser pathId={`${getPathId().id}`} />}
        {getPathId() && getPathId().type === 'gp' && getPathId().page === 'edit' && <GPNavigatorUser pathId={`${getPathId().id}`} />}
        {getPathId() && getPathId().type === 'gp' && getPathId().page === 'form' && <GPFormNavigatorUser pathId={`${getPathId().id}`} />}


        {!getPathId() && <Navigator />}
      </div>
    </GlobalState.Provider>
  );
}

export default App;
