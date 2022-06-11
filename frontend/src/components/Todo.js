import React from 'react';
import {Link} from 'react-router-dom'

const TodoItem = ({todo, deleteTodo}) => {
    return(
        <tr>
            <td>{todo.uid}</td>
            <td>{todo.project.uid}</td>
            <td>{todo.text}</td>
            <td>{todo.author.name}</td>
            <td><button onClick={()=>deleteTodo(todo.uid)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        
        <div>
            <table>
                <th>todo_ID</th>
                <th>todo_PRJ</th>
                <th>todo_description</th>
                <th>todo_author</th>
                <th>Del_button</th>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todos/create'>CreateT</Link>
        </div>
    )
}

export default TodoList;