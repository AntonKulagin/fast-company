import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfessions";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    });

    const { signUp } = useAuth();

    const [errors, setErrors] = useState({});

    const { qualities } = useQualities();
    const { professions } = useProfessions();

    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));
    const qualitiesList = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id
    }));

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен некорректно" }
        },
        name: {
            isRequired: { message: "Имя обязательно для заполнения" },
            min: { message: "Имя должно состоять минимум из 3 символов", value: 3 }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: { message: "Пароль должен содержать хотя бы одну заглавную букву" },
            isContainDigit: { message: "Пароль должен содержать хотябы одну цифру" },
            min: { message: "Пароль должен состоять минимум из 8 символов", value: 8 }
        },
        profession: {
            isRequired: { message: "Обязательно выберете Вашу профессию" }
        },
        licence: {
            isRequired: { message: "Подтвердите ваше согласие лицензионного соглашения" }
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
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        console.log(newData);
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    const getClassButton = () => {
        return "login-button " + (isValid && "login-button__active");
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
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
            <TextField label="Имя" name="name" value={data.name} onChange={handleChange} error={errors.name} />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <SelectField
                label="Выберете Вашу профессию"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Choose ..."
                name="profession"
                options={professionsList}
                error={errors.profession}
            />

            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выбери свой пол"
            />

            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Выбери свои качества"
                defaultValue={data.qualities}
            />

            <CheckBoxField value={data.licence} onChange={handleChange} name="licence" error={errors.licence}>
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>

            <button disabled={!isValid} className={getClassButton()}>
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
