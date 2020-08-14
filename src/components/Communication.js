import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import Form1 from './Form1';

class Communication extends React.Component {

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

  cond1 = () => {
    if(this.state.info) {
      return(
        <p className='qty'>
          Всего участников чата: {this.state.info.user.length}
        </p>
      )
    }
  }
  arr = () => {
    if(this.state.info){
      return(
        <p className='wrap_msg'>
          {this.state.info.message.map(mess => (
            <p className='each_msg'>
            <a href={'/communication/' + mess._id} id='link2' style={{
              display: (this.state.user && this.state.user.email === mess.mail ? 'flex' : 'none')
            }}>Удалить</a>
              <p>{mess.message}</p>
                <p className='each_name' style={{
                  fontSize: (this.state.user && this.state.user.name === mess.name ? 20 : 18),
                  fontWeight: (this.state.user && this.state.user.name === mess.name ? 900 : null),
                  fontFamily: (this.state.user && this.state.user.name === mess.name ? 'Circe Regular' : 'Circe Light')
                }}>{this.state.user && this.state.user.name === mess.name ? 'Вы' : mess.name}</p>
                <p style={{
                  gridRow: 1 / 2
                }} className='wrap_img2'><img src={mess.coverImageName ? mess.coverImageName : null} id='pers_photo'/></p>
              <p className='each_date'>{mess.date}</p>
            </p>
          ))}
        </p>
      )
    }
  }

  render() {
    return (
      <p className='communicate'>
        <p className='wrap_head'><Header /></p>
        {this.cond1()}
        <p className='wrap_form1'><Form1 /></p>
        {this.arr()}
      </p>
    )
  }
}

export default Communication;
