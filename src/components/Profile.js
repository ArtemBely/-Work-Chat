import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import mac from '../../public/images/mac.svg';

class Profile extends React.Component {

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

 user = () => {
   if(this.state.user) {
     return (
       <i id='name1'>
         {this.state.user.name.toUpperCase()}
       </i>
     )
   }
 }

  render() {
    return (
      <p className='profile' style={{
        display: (this.state.user ? 'block' : 'none')
      }}>
          <Header />
          <i id='wait'>{this.user()} Тебя ждут в чате! :)</i>
          <img src={mac} id='mac' />
      </p>
    )
  }
}

export default Profile;
