import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким Email уже существует" };
                    throw errorObject;
                }
            }
            errorCatcher(error);
        }
    }
    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function logIn({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorPassword = { password: "Пароль введен неверно" };
                    throw errorPassword;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errorEmail = { email: "Email введен неверно" };
                    throw errorEmail;
                }
            }
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.responce.data;
        setError(message);
    }
    return <AuthContext.Provider value={{ signUp, logIn, currentUser }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;