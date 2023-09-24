import React from 'react';
import UserItem from './UserItem';

const UserList = props => {
    return (
        <ul className="users-list">
            {props.items.map(user => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places.length}
                />
            ))}
        </ul>
    )
}

export default UserList