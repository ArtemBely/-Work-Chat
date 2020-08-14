import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <p className='header'>
        <NavLink to='/work' className='com_link'>Работа</NavLink>
        <NavLink to='/communication' className='com_link'>Общение</NavLink>
        <a href='/profile/logout' className='com_link'>Выйти</a>
      </p>
    )
  }
}

export default Header;
