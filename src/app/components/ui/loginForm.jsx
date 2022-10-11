import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";

const LoginForm = () => {
    const history = useHistory();
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const { logIn } = useAuth();

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
        setEnterError(null);
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await logIn(data);
            history.push("/");
        } catch (error) {
            setEnterError(error.message);
        }
    };

    const getClassButton = () => {
        return "login-button " + (!enterError && isValid ? "login-button__active" : "");
    };
    return (
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
            <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
                Остаться в системе
            </CheckBoxField>
            {enterError && <p style={{ color: "red" }}>{enterError}</p>}
            <button disabled={!isValid || enterError} className={getClassButton()}>
                Отправить
            </button>
        </form>
    );
};

export default LoginForm;
