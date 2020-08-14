import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Header from './Header';
import Add from './Add';

class Work extends React.Component {

  constructor() {

    super()

    let data;
    if(__isBrowser__) {
      data = window.__INITIAL_DATA__;
    }

    this.state = {
      data
    }
  }

  theme = () => {
    if(this.state.data) {
      return(
        <p className='wrap_title2'>
          {this.state.data.theme.map(the => (
              <NavLink to={'/work/' + the.title} className='each_title'>{the.title}</NavLink>
          ))}
        </p>
      )
    }
  }

  render() {
    return (
      <p className='work'>
        <p className='wrap_head'><Header /></p>
        <NavLink to='/create' className='create_thema' style ={{
          display: (this.state.data ? 'flex' : 'none')
        }}>Создать тему</NavLink>
        <Route exact path='/create'>
            <Add />
        </Route>
        {this.theme()}
      </p>
    )
  }
}

export default Work;
