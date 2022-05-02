import React from 'react';

const UserItem = ({user}) => {
    return(
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                Usser name
            </th>
            <th>
                1st_name
            </th>
            <th>
                Last name
            </th>
            <th>
                electronic mail
            </th>
            {/* выше формируется шапка таблицы, 
            а далее строки последовательно из списка пользователей */}
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList