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
import LoginForm from './components/AuthorizationForm.js'
import Cookies from 'universal-cookie'

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
    'projects':[],
    'token':'',
    }
  }

  set_token(token){
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data_fr_Met())
  }

  get_token_from_storage(){
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data_fr_Met())
  }

  is_authenticated(){
    console.log(this.state.token)
    return this.state.token != ''
  }

  logout(){
    this.set_token('')
  }


  get_token(username, password){
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response=>{
      console.log(response.data)
      this.set_token(response.data['token'])
    }).catch(error=>alert('Wrong login or pass'))
  }
  
  get_headers(){
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()){
      headers['Authorization'] = 'Token' + this.state.token
    }
    console.log(headers)
    return headers
  }
  load_data_fr_Net() {    
    // https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
    const requestUsers = axios.get('http://127.0.0.1:8000/api/users/')
    const requestProjects = axios.get('http://127.0.0.1:8000/api/projects_les4/')
    const requestTodos = axios.get('http://127.0.0.1:8000/api/todos_les4/')

    console.log('type of users '+typeof(requestUsers))

    axios.all([requestUsers, requestProjects, requestTodos])
        .then(function(results){
          console.log(results[0].data.results)
          console.log(Object.entries(results[0].data.results))
          const uss = Object.entries(results[0].data.results)
          this.setState({'users':uss})
        })
      
      axios.all([requestUsers, requestProjects, requestTodos])
      .then(axios.spread((...responses) =>{
          const respUsers = Array.from(responses[0].data)
          const respProjects = Array.from(responses[1])
          const respTodos = Array.from(responses[2])
          this.setState = ({
            'users':respUsers.data,
            'projects':respProjects.data,
            'todos':respTodos.data,
          })
        }))
      .catch(errors => {console.log(errors)})
  }

  load_data_fr_Met(){
    // реализация процедуры по методичке
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users', {headers})
      .then(response => {
        this.setState({users: response.data})
      })
      .catch(error => console.log(error))
      
    axios.get('http://127.0.0.1:8000/api/projects_les4', {headers})
      .then(response => {
        this.setState({projects: response.data})
      })
      .catch(error => console.log(error))
      
    axios.get('http://127.0.0.1:8000/api/todos_les4', {headers})
      .then(response => {
        this.setState({todos: response.data})
      })
      .catch(error => console.log(error))
          
    console.log(this.state) //здесь ничего не вижу
  }
  
  // componentDidMount - метод, выполняется при отображении, содержит логику этого процесса
  componentDidMount() {
    this.get_token_from_storage()
    // this.load_data_fr_Met()
  }
  
  
  // render вызывает UserList, рисующий users, которые хранятся в состоянии и инициализируются предыдующим методом
  render () {
    return(
      <div>
        {/* <HMenu/> */}
        {/* <UserList items={this.state.users} /> */}
        {/* <ProjectList projects={this.state.projects} /> */}
        {/* <TodoList todos={this.state.todos} /> */}
        <HashRouter>
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
              {/* <li>
                <Link to='/login'>Login</Link>
              </li> */}
              <li>
                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Log_OUT</button> : <Link to='/login'>Log_IN</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={()=> <UserList users={this.state.users} /> } />
            <Route exact path='/projects' componenet={()=> <ProjectList projects={this.state.projects} /> } />
            <Route exact path='/todos' component={()=> <TodoList todos={this.state.todos} /> } />  
            <Route exat path='/login' component={()=> <LoginForm get_token={(username, password)=>this.get_token(username, password)}/>} />
            <Route exact path='/project/:id' component={()=> <ProjectTodoList todos={this.state.todos} /> } />
            <Redirect from='/users' to='/' />
            <Route component={NotFound404} />
          </Switch>
        </HashRouter> 
        <Footer/>
      </div>
    )
  }
}

export default App;