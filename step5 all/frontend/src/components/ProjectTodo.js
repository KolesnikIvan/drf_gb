import React from 'react'
import {useParams} from 'react-router-dom'

const TodoItem = ({todo}) =>{
    return (
        <tr>
            <td>{todo.uid}</td>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.author}</td>
        </tr>
    )
}

const ProjectTodoList = ({todos})=>{
    let {id} = useParams();
    let filtered_todos = todos.filter((todo)=>todo.autor.id === id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>PRJ</th>
                <th>DESCRIPTION</th>
                <th>AUTHOR</th>
            </tr>
            {filtered_todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default ProjectTodoList