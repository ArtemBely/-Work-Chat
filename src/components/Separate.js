import React from 'react';
import Header from './Header';
import Form2 from './Form2';
import { NavLink, Route } from 'react-router-dom';

class Separate extends React.Component {

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
      let newer = this.state.info.theme.filter(theme => theme.title == this.props.match.params.id);
      return(
        <p>
          <p id='title1'>{newer[0].title}</p>
            <p className='wrap_form2'>
              <form action={'/work/' + newer[0].title} method='POST' id='test2'>
                  <textarea name='test2' id='area' placeholder='Оставьте сообщение коллегам' required></textarea>
                  <button type='submit' id='sent'>отправить</button>
              </form>
            </p>
        </p>
      )
    }
  }

  scope = () => {
    if(this.state.info) {
      let newer2 = this.state.info.theme.filter(theme => theme.title == this.props.match.params.id);
      console.log(newer2);
      return (
        <p className='wrap_scope'>
          {newer2[0].scope.map(scope => (
            <p className='each_scope' style={{
              height: (newer2[0].scope.length === 1 ? 'fit-content' : null)
            }}>
            <a href={'/work/' + newer2[0].title + '/' + scope._id} style={{
              display: (this.state.user && this.state.user.email === scope.mail ? 'flex' : 'none')
            }} id='delete2'>Удалить</a>
              <p className='each_scope1' style={{
                fontFamily: (this.state.user && this.state.user.email === scope.mail ? 'Circe Regular' : 'Circe Light')
              }}>{this.state.user && this.state.user.email === scope.mail ? 'Вы' : scope.name}</p>
                <p className='each_scope2'>{scope.msg}</p>
              <p className='each_scope3'>{scope.date}</p>
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
        {this.arr()}
        {this.scope()}
      </p>
    )
  }
}

export default Separate;
