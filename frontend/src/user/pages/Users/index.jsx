import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHttp } from "../../../core/hooks/useHttp";

import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

import UsersList from "../../components/UsersList";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { sendRequest, isLoading } = useHttp();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setUsers(responseData.users);
      } catch (err) {
        toast.error(err.message, {
          style: { background: "#2b2b2b", color: "#fff" },
          duration: 2000,
        });
      }
    };

    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <Toaster position="top-right" reverseOrder={false} />
      {isLoading && users ? <LoadingSpinner /> : <UsersList items={users} />}
    </React.Fragment>
  );
};

export default Users;
