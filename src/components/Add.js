import React from 'react';
import { NavLink } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops.cjs';

class Add extends React.Component {
  render() {
    return (
      <p className='add'>
        <Spring
          from={{top: -10, opacity: 0}}
          to={{top: 10, opacity: 1}}
          config={{duration: 400}}
          >
          {props =>
          <form action='/work' method='POST' className='thema' style={props}>
             <input type='text' name='title' placeholder='название темы'/>
              <input type='hidden' name='scope' />
              <button type='submit' id='but3'>Создать тему</button>
             <NavLink to='/work' className='cancel'>Отменить</NavLink>
          </form>
        }
        </Spring>
      </p>
    )
  }
}

export default Add;
