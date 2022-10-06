import './App.css';
import React from 'react';
import UserList from './components/User.js';
import axios from 'axios'
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Project';
import TodoList from './components/Todo';
import ProjectNoteList from './components/Project_notes';
import ProjectInfo from './components/Project_info';
import LoginForm from './components/Login';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todo': [],
      'token': '',
      'username': '',
    }
  }
  auth_user_info() {
    let auth_user = this.state.users.filter((user) => user.username == this.state.username)
    return auth_user[0].first_name
  }


  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }
  is_authenticated() {
    return this.state.token != ''
  }
  logout() {
    this.set_token('')
  }
  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }
  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/',
      {
        username: username, password: password
      }).then(response => {
        this.setState({ 'username': username })
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }
  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }
  load_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users/', { headers })
      .then(response => {
        this.setState(
          {
            'users': response.data.results
          })
      }).catch(error => console.log(error.response));

    axios.get('http://127.0.0.1:8000/api/projects/', { headers })
      .then(response => {
        this.setState(
          {
            'projects': response.data.results
          })
      }).catch(error => console.log(error.response));

    axios.get('http://127.0.0.1:8000/api/todo/', { headers }).then(response => {
      this.setState(
        {
          'todo': response.data.results
        })
    }).catch(error => {
      console.log(error.response)
      this.setState({ 'todo': [] })
    })
  }
  componentDidMount() {
    this.get_token_from_storage()

  }
  render() {
    return (
      <div className="App" >
        <BrowserRouter>
          <Menu />
          <div class='login'>
            {this.is_authenticated() ?

              <div> Hello, {this.auth_user_info()}  <button onClick={() => this.logout()}>  Logout</button></div>
              :
              <Link to='/login'>Login</Link>}
          </div >
          <Routes>
            <Route exact path='/' element={<ProjectList projects={this.state.projects} />} />
            <Route exact path='/users' element={<UserList users={this.state.users} />} />
            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
            <Route exact path='/todo' element={<TodoList notes={this.state.todo} />} />
            <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            <Route path='/projects/:id/notes' element={<ProjectNoteList notes={this.state.todo} />} />
            <Route path='/projects/project/:id' element={<ProjectInfo projects={this.state.projects} notes={this.state.todo} users={this.state.users} />} />
            <Route path='*' element={<h1>Page not found</h1>} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div >
    )
  }
}
/*  render() {
   return (
     <div className='App'>
       <HashRouter>
         <Routes>
           <Route exact path='/' element={() => <Menu />} />
           <Route exact path='/users' element={() => <UserList users={this.state.users} />} />
           <Route exact path='/projects' element={() => <ProjectList projects={this.state.projects} />} />
         </Routes>

       </HashRouter>

     </div >
   )
 }
}
*/

export default App;
