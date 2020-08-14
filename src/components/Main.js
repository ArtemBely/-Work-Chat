import React from 'react';
import { NavLink } from 'react-router-dom';

class Main extends React.Component {
  render() {
    return (
      <p className='wrap_reg'>
          <NavLink to='/registration' className='reg but'>Регистрация</NavLink>
          <NavLink to='/signin' className='sign but'>Вход</NavLink>
      </p>
    )
  }
}

export default Main;
