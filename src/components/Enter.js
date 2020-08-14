import React from 'react';
import { NavLink } from 'react-router-dom';
import arrow from '../../public/images/arrow.svg';

class Enter extends React.Component {

  constructor() {

    super()

    let message;
    let errors;
    let data;
    if(__isBrowser__) {
      message = window.__INITIAL_MESSAGE__;
      data = window.__INITIAL_DATA__;
      errors = window.__INITIAL_ERRORS__;
    }
    this.state = {
      message,
      data,
      errors
    }
  }

  check2 = () => {
    if(this.state.message && this.state.message.length > 0) {
      return(
        <p className='mess'>
          {this.state.message[0]}
        </p>
      )
    }
  }
  render() {
    return (
      <p className='form2' style={{
        display: (this.state.data && this.state.data.user || this.state.errors && this.state.errors.length > 0 ? 'grid' : 'none')
      }}>
        {this.check2()}
          <NavLink to='/' className='back'><img src={arrow} id='arrow'/>назад</NavLink>
            <form action='/signin' method='POST' className='form_check' style={{
              display: (this.state.data && this.state.data.user || this.state.errors && this.state.errors.length > 0 ? 'grid' : 'none')
              }}>
             <input type='text' name='email' placeholder='введите email'/>
              <input type='text' name='password' placeholder='введите пароль'/>
            <button type='submit' className='but1'>Принять</button>
          </form>
      </p>
    )
  }
}

export default Enter;
