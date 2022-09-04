import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <div className="login-block">
            {formType === "register" ? (
                <div className="register-area">
                    <motion.h1
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Register
                    </motion.h1>
                    <RegisterForm />
                    <p>
                        Do you have an account?
                        <a role="button" onClick={toggleFormType}>
                            Sign In
                        </a>
                    </p>
                </div>
            ) : (
                <div className="login-area">
                    <motion.h1
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Login
                    </motion.h1>
                    <LoginForm />
                    <p>
                        Do not you have an account?
                        <a role="button" onClick={toggleFormType}>
                            Sign Up
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Login;
