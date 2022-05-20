import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import TodoList from './components/Todo.js'
import ProjectList from './components/Project.js'
import ProjectTodoList from './components/ProjectTodo.js'
import HMenu from './components/Menu.js'
import Footer from './components/Footer.js'
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from 'react-router-dom'

import axios from 'axios'

const NotFound404 = ({location})=>{
  return (
    <div>
      <h2>The page {location.pathname} was not found</h2>
    </div>
  )
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {'users': [],
                  'todos':[],
                  'projects':[]
                }
  }
  
  // componentDidMount - метод, выполняемый при отображении
  // и содержащий логику этого процесса
  componentDidMount() {
    // https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
    // const requestUsers = axios.get('http://127.0.0.1:8000/api/users/')
    // const requestProjects = axios.get('http://127.0.0.1:8000/api/projects_les4/')
    // const requestTodos = axios.get('http://127.0.0.1:8000/api/todos_les4/')

    // console.log('type of users '+typeof(requestUsers))

    // axios.all([requestUsers, requestProjects, requestTodos])
    //     .then(function(results){
    //       console.log(results[0].data.results)
    //       console.log(Object.entries(results[0].data.results))
    //       const uss = Object.entries(results[0].data.results)
    //       this.setState({'users':uss})
    //     })
      
    //   axios.all([requestUsers, requestProjects, requestTodos])
    //   .then(axios.spread((...responses) =>{
    //       const respUsers = Array.from(responses[0].data)
    //       const respProjects = Array.from(responses[1])
    //       const respTodos = Array.from(responses[2])
    //       this.setState = ({
    //         'users':respUsers.data,
    //         'projects':respProjects.data,
    //         'todos':respTodos.data,
    //       })
    //     }))
    //   .catch(errors => {console.log(errors)})
    
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users =  Object.entries(response.data['results'])
        console.log(users)  
        console.log('type of users is '+typeof(users))
        this.setState(
            {
              'users': users
            }
          )
      })
      .catch(error => console.log(error))
      
      axios.get('http://127.0.0.1:8000/api/projects_les1')
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
          )
        })
        .catch(error => console.log(error))
        
        axios.get('http://127.0.0.1:8000/api/todos_les1')
        .then(response => {
          const todos = response.data.results
          this.setState(
            {
              'todos': todos
            }
            )
          })
          .catch(error => console.log(error))
          
          console.log(this.state)
  }
  
  // метод render класса App отвечает за рисование;
  // вызывает UserList, рисующий users,
  // которые хранятся в состоянии и инициализируются предыдующим методом
  render () {
    return(
      <div>
        <HMenu/>  {/* по п.3 задания добавлено меню а потом footer*/}  {/* Main App React.js */}  {/* похоже, this.state определен в componentDidMount */}
        <UserList items={this.state.users} />
        <ProjectList projects={this.state.projects} />
        <TodoList todos={this.state.todos} />
        {/* <HashRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projeccts</Link>
              </li>
              <li>
                <Link to='/todos'>Toddos</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={()=> <UserList users={this.state.useres} /> } />
            <Route exact path='/projects' componenet={()=> <ProjectList projects={this.state.projects} /> } />
            <Route exact path='/todos' component={()=> <TodoList todos={this.state.todos} /> } />  
            <Route exact path='/project/:id' component={()=> <ProjectTodoList todos={this.state.todos}}
            <Redirect fromt='/users' to '/' />
            <Route component={NotFound404} />
          </Switch>
        {/* </HashRouter> */} 
        <Footer/>
      </div>
    )
  }
}

export default App;