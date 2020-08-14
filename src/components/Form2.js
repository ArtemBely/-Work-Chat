import React from 'react';
import { NavLink } from 'react-router-dom';

class Form2 extends React.Component {

  constructor() {

    super()

    let user;
    if(__isBrowser__) {
      user = window.__INITIAL_USER__;
    }

    this.state = {
      user
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
      <form action={'/work/' + this.props.match.params.id ? this.props.match.params.id : null} method='POST' encType="multipart/form-data" id='test2'>
          <textarea name='test2' id='area' placeholder='Оставьте сообщение коллегам' required></textarea>
          <button type='submit' id='sent'>отправить</button>
      </form>
    )
  }
}

export default Form2;
