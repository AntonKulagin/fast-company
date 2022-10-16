import React, { useEffect } from "react";
import Loading from "../components/loading";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return (
        <div>
            <Loading />
        </div>
    );
};

export default LogOut;
