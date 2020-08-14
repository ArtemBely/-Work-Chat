import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './fetchRoutes';
import '../../public/styles/style.css';
import '../../public/styles/style2.css';

class App extends React.Component {

  render() {
    return(
      <div className='app2'>
         <Switch>
           {routes.map((route, i) => (
             <Route
             key={i}
             path={route.path}
             exact={route.exact}
             component={route.component}
             />
           ))}
         </Switch>
      </div>
    )
  }
}

export default App;
