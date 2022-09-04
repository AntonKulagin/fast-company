import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен некорректно" }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log({
            ...data,
            profession: getProfessionById(data.profession),
            qualities: getQualities(data.qualities)
        });
    };

    const getClassButton = () => {
        return "login-button " + (isValid && "login-button__active");
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
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
                options={professions}
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
                options={qualities}
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
