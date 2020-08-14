import React from 'react';
import { NavLink } from 'react-router-dom';
import arrow from '../../public/images/arrow.svg';

class Registration extends React.Component {

  constructor() {
    super()

    let errors;
    let success;
    let msg;
    if(__isBrowser__) {
      errors = window.__INITIAL_ERRORS__;
      success = window.__INITIAL_SUCCESS__;
      msg = window.__INITIAL_INDICATE__;
    }
    this.state = {
      errors,
      success,
      msg
    }
    if(this.state.errors) {
      console.log(this.state.errors);
    }
  }

  componentDidMount() {
    if(this.state.success) {
      setTimeout(() => {
      window.location.replace('/signin');
      }, 1500);
    }
  }

  errors = () => {
    if(this.state.errors) {
      return(
        <p className='wrap_err'>
          {this.state.errors.map(error => (
            <p className='each_err'>{error.msg}</p>
          ))}
        </p>
      )
    }
  }

  success = () => {
    if(this.state.success) {
      return(
        <p className='success'>
          {this.state.msg}
        </p>
      )
    }
  }

  check = () => {
    if(!this.state.success) {
      return(
        <p>
         <NavLink to='/' className='back'><img src={arrow} id='arrow'/>назад</NavLink>
          <form action='/signup' method='POST' className='form_check'>
            <input type='text' name='name' placeholder='введите имя' required/>
             <input type='text' name='lastname' placeholder='введите фамилию' required/>
               <input type='text' name='email' placeholder='email' required/>
             <input type='text' name='password' placeholder='придумайте пароль' required/>
            <input type='text' name='confirm' placeholder='повторите пароль' required/>
           <button type='submit' className='but1'>Принять</button>
         </form>
       </p>
      )
    }
  }
  render() {
    return (
      <p className='form'>
       {this.errors()}
         {this.success()}
       {this.check()}
      </p>
    )
  }
}

export default Registration;
