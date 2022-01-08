import React from "react";

import UserItem from "../UserItem";
import { UsersItemsList } from "./styles";

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <UsersItemsList>
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </UsersItemsList>
  );
};

export default UsersList;
