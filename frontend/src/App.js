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
import CreateTodoForm from './components/Create_todo';
import CreateProjectForm from './components/Create_project';
import ChangeProjectForm from './components/Change_project';
import { useParams } from 'react-router-dom';

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

  delete_todo(id) {
    const headers = this.get_headers()

    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers, headers })
      .then(response => {
        alert(response.statusText)
        this.load_data()

      }).catch(error => console.log(error.response));
  }
  create_todo(text, project) {
    const headers = this.get_headers()
    let user = this.state.users.filter((item) => item.username === this.state.username)[0]
    const data = { text: text, project: project, user: user.id }
    axios.post('http://127.0.0.1:8000/api/todo/', data, { headers, headers })
      .then(response => {
        alert(response.statusText)
        this.setState(
          {
            'todo': response.data
          }, () => this.load_data())

      }).catch(error => console.log(error.response));
  }
  create_project(name, link, users) {
    const headers = this.get_headers()
    const data = { name: name, link: link, users: users }
    axios.post('http://127.0.0.1:8000/api/projects/', data, { headers, headers })
      .then(response => {
        alert(response.statusText)
        this.setState(
          {
            'projects': response.data
          }, () => this.load_data())

      }).catch(error => console.log(error.response));
  }
  delete_project(id) {
    const headers = this.get_headers()

    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers, headers })
      .then(response => {
        this.setState(
          {
            projects: this.state.projects.filter((item) => item.id !== id)

          })
      }).catch(error => console.log(error.response));
  }
  change_project(id, name, link, users) {
    const headers = this.get_headers()
    const data = { id: Number(id), name: name, link: link, users: users }
    axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, data, { headers, headers })
      .then(response => {
        alert(response.statusText)
        this.load_data()
      }).catch(error => console.log(error.response));
  }

  set_token(token, username) {
    const cookies = new Cookies()
    cookies.set('token', token)
    cookies.set('username', username)
    this.setState({ 'username': username })
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
    const username = cookies.get('username')
    this.setState({ 'token': token, 'username': username }, () => this.load_data())
  }
  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/',
      {
        username: username, password: password
      }).then(response => {

        this.set_token(response.data['token'], username)
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
            'users': response.data
          })
      }).catch(error => console.log(error.response));

    axios.get('http://127.0.0.1:8000/api/projects/', { headers })
      .then(response => {
        this.setState(
          {
            'projects': response.data
          })
      }).catch(error => console.log(error.response));

    axios.get('http://127.0.0.1:8000/api/todo/', { headers }).then(response => {
      this.setState(
        {
          'todo': response.data
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
            {this.is_authenticated() ? <div> Hello, {this.state.username} <button onClick={() => this.logout()}>  Logout</button></div> : <Link to='/login'>Login</Link>}
          </div >
          <Routes>
            <Route exact path='/' element={<UserList users={this.state.users} />} />
            <Route exact path='/users' element={<UserList users={this.state.users} />} />
            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} delete_project={(id) => this.delete_project(id)} is_authenticated={() => this.is_authenticated()} />} />
            <Route exact path='/projects/create' element={<CreateProjectForm users={this.state.users} create_project={(name, link, users) => this.create_project(name, link, users)} />} />
            <Route exact path='/projects/change/:id' element={<ChangeProjectForm projects={this.state.projects} users={this.state.users} change_project={(id, name, link, users) => this.change_project(id, name, link, users)} />} />
            <Route exact path='/todo' element={<TodoList notes={this.state.todo} delete_todo={(id) => this.delete_todo(id)} is_authenticated={() => this.is_authenticated()} />} />
            <Route exact path='/todo/create' element={<CreateTodoForm projects={this.state.projects} create_todo={(text, project) => this.create_todo(text, project)} />} />
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

export default App;
