import React from 'react';
import { NavLink } from 'react-router-dom';

class Form1 extends React.Component {

  constructor() {

    super()

    let user;
    let data;
    if(__isBrowser__) {
      user = window.__INITIAL_USER__;
      data = window.__INITIAL_DATA__;
    }

    this.state = {
      user,
      data
    }

    this.inp = React.createRef();
    this.inp1 = React.createRef();
  }

  componentDidMount() {
    setInterval(() => {
      if(this.inp1.current && this.inp1.current.files.length > 0) {
        this.inp.current.classList.add('color');
      }
      else if(this.inp1.current) {
          this.inp.current.classList.remove('color');
      }
    }, 1000);
  }

  render() {
    return (
      <form action='/communication' method='POST' encType="multipart/form-data" id='test2' style={{
        display: (this.state.data ? 'grid' : 'none')
      }}>
          <p className='wrap_inp' ref={this.inp}>Порадуй коллегу картинкой<input type='file' name='cover' id='im' ref={this.inp1}/></p>
          <textarea name='test2' id='area' placeholder='Оставьте сообщение коллегам' required></textarea>
          <button type='submit' id='sent'>отправить</button>
      </form>
    )
  }
}

export default Form1;
