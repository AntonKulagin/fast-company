/* eslint multiline-ternary: "off" */
import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
    const getClassSelect = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray = !Array.isArray(options) && typeof options === "object" ? Object.values(options) : options;

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="login-form__label">
                {label}
            </label>
            <select className={getClassSelect()} id={name} name={name} value={value} onChange={handleChange}>
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
};

export default SelectField;
