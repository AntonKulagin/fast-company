/* eslint multiline-ternary: "off" */

import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import api from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const EditUserPage = ({ userId }) => {
    const history = useHistory();

    const [data, setData] = useState();
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
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

    const getDefaultUserQualities = (userQualities) => {
        return userQualities.map((qualitie) => ({
            value: qualitie._id,
            label: qualitie.name
        }));
    };

    const handleChange = (target) => {
        let value;
        switch (target.name) {
            case "profession":
                value = getProfessionById(target.value);
                break;
            case "qualities":
                value = getQualities(target.value);
                break;
            default:
                value = target.value;
                break;
        }

        setData((prevState) => ({
            ...prevState,
            [target.name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(userId, data);
        history.replace(`/users/${userId}`);
    };

    if (data) {
        return (
            <div className="edit-page">
                <form onSubmit={handleSubmit}>
                    <TextField label="Имя" name="name" value={data.name} onChange={handleChange} />

                    <TextField label="Электронная почта" name="email" value={data.email} onChange={handleChange} />

                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption="Choose..."
                        options={professions}
                        name="profession"
                        onChange={handleChange}
                        value={data.profession._id}
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
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={getDefaultUserQualities(data.qualities)}
                        name="qualities"
                        label="Выберите ваши качества"
                    />

                    <button className="btn btn-primary w-100 mx-auto" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    } else return <>Loading...</>;
};
EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
