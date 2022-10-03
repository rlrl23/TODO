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
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todo': [],
    }
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users').then(response => {
      this.setState(
        {
          'users': response.data.results,
        });
      return axios.get('http://127.0.0.1:8000/api/projects')
    }).then(response => {
      this.setState(
        {
          'projects': response.data.results
        });
      return axios.get('http://127.0.0.1:8000/api/todo')
    }).then(response => {
      this.setState(
        {
          'todo': response.data.results
        });
    }).catch(error => console.log(error.response))
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Menu />
          <Routes>

            <Route exact path='/users' element={<UserList users={this.state.users} />} />
            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
            <Route exact path='/todo' element={<TodoList notes={this.state.todo} />} />
            <Route path='/projects/:id/notes' element={<ProjectNoteList notes={this.state.todo} />} />
            <Route path='/projects/project/:id' element={<ProjectInfo projects={this.state.projects} notes={this.state.todo} users={this.state.users} />} />
            <Route path='*' element={<h1>Page not found</h1>} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
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
