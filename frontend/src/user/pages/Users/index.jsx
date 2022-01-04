import React from "react";

import UsersList from "../../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Lucas Peixoto",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14Gj37hwEKTk89_dqJj5ysJeo3PeQtRsf9t3FPyjdRQ=s96-c",
      places: 1,
    },
    {
      id: "u2",
      name: "Arnold",
      image:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 1,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
