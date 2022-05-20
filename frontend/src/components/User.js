import React from 'react';

const UserItem = ({item}) => {
    return(
        <tr>
            <td>{item.username}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
        </tr>
    )
}

const UserList = ({items}) => {
    return (
        <table>
            <tr>
                <th>Usser name</th>
                <th>1st_name</th>
                <th>Last name</th>
                <th>electronic mail</th>
            </tr>
            {items.map((item) => <UserItem item={item}/>)}
        </table>
    )
}

export default UserList