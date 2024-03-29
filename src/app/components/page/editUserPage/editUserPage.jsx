import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfessions";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = () => {
    const history = useHistory();
    const { currentUser, updateUser } = useAuth();
    const { professions, isLoading: professionsIsLoading } = useProfessions();
    const { qualities, getQuality, isLoading: qualitiesIsLoading } = useQualities();
    const [isLoading, setIsLoading] = useState(true);

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const userQualities = currentUser.qualities.map((qualId) => getQuality(qualId));

    const userQualitiesList = userQualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const transformUser = {
        ...currentUser,
        qualities: userQualitiesList
    };

    const [data, setData] = useState(transformUser);
    const [errors, setErrors] = useState({});

    const getQualities = (elements) => {
        const qualitiesArray = elements.map((elem) => elem.value);
        return qualitiesArray;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        const updatedUser = {
            ...data,
            qualities: getQualities(data.qualities)
        };

        try {
            await updateUser(updatedUser);
            history.push(`/users/${data._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!professionsIsLoading && !qualitiesIsLoading && currentUser && data && isLoading) {
            setData(transformUser);
        }
    }, [professionsIsLoading, qualitiesIsLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
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
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
