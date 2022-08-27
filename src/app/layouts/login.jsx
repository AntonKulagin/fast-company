import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const validatorConfig = {
        email: {
            isRequired: { messege: "Электронная почта обязательна для заполнения" },
            isEmail: { messege: "Email введен некорректно" }
        },
        password: {
            isRequired: { messege: "Пароль обязателен для заполнения" },
            isCapitalSymbol: { messege: "Пароль должен содержать хотя бы одну заглавную букву" },
            isContainDigit: { messege: "Пароль должен содержать хотябы одну цифру" },
            min: { messege: "Пароль должен состоять минимум из 8 символов", value: 8 }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    const getClassButton = () => {
        return "login-button " + (isValid && "login-button__active");
    };
    return (
        <div className="login-block">
            <motion.h1 initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }}>
                Login
            </motion.h1>
            <form className="login" onSubmit={handleSubmit}>
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <button disabled={!isValid} className={getClassButton()}>
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default Login;
