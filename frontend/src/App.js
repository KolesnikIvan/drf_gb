// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import HMenu from './components/Menu.js'
import Footer from './components/Footer.js'

import axios from 'axios'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {'users': []}
  }
  
  // componentDidMount - это метод выполняемый при отображении
  // и содержащий логику этого процесса
  componentDidMount() {
    // const users = [
    //   {
    //     'username': 'thrillerist',
    //     'firstname': 'Fyodor',
    //     'lastname': 'Dostoevskiy',
    //     'email': 'fdostoev@itcompany.com'
    //   },
    //   {
    //     'username': 'romantic',
    //     'firstname': 'Alexander',
    //     'lastname': 'Green',
    //     'email': 'alex_green@itcompany.com'
    //   },
    // ]
    // this.setState(
    //   {
    //     'users': users
    //   }
    // )
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users =  response.data
          this.setState(
            {
              'users': users
            }
          )
      }).catch(error => console.log(error))
  }
  
  // метод render класса App отвечает за рисование;
  // вызывает UserList, рисующий users,
  // которые хранятся в состоянии и инициализируются предыдующим методом
  render () {
    return(
      <div>
        {/* по п.3 задания добавлено меню а потом footer*/}
        <HMenu/>
        {/* Main App React.js */}
        {/* похоже, this.state определен в componentDidMount */}
        <UserList users={this.state.users} />
        {/* вызов стрелочной функции */}
        <Footer/>
      </div>
    )
  }
}

export default App;