import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {

  constructor() {
    super()

    let info;
    let user;

    if(__isBrowser__) {
      info = window.__INITIAL_DATA__;
      user = window.__INITIAL_USER__;
    }

    this.state = {
      user,
      info
    }
  }

  render() {
    return (
      <p className='header' style={{
        display: (this.state.info ? 'grid' : 'none')
      }}>
        <NavLink to='/work' className='com_link'>Работа</NavLink>
        <NavLink to='/communication' className='com_link'>Общение</NavLink>
        <a href='/profile/logout' className='com_link'>Выйти</a>
      </p>
    )
  }
}

export default Header;
