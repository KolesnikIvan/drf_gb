import React from 'react';

const TodoItem = ({todo}) => {
    return(
        <tr>
            <td>{todo.uid}</td>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.author}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>todo_ID</th>
            <th>todo_PRJ</th>
            <th>todo_description</th>
            <th>todo_author</th>
            {todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}

export default TodoList;