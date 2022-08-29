import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
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
        <form className="login" onSubmit={handleSubmit}>
            <TextField label="Электронная почта" name="email" value={data.email} onChange={handleChange} error={errors.email} />
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
            <button disabled={!isValid} className={getClassButton()}>
                Отправить
            </button>
        </form>
    );
};

export default LoginForm;
