import React from "react";
import { useParams } from "react-router-dom";
import User from "../components/user";
import UsersList from "../components/usersList";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <User userId={userId} /> : <UsersList />}</>;
};

export default Users;
