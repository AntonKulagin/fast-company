import React, { useState } from "react";
import PropTypes from "prop-types";
import btnIcon from "../../../../img/button-icon.svg";

const TextField = ({ label, type, name, value, placeholder, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const getClassInputButton = () => {
        return "input-button " + (showPassword ? "input-button__hidden" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="login-form">
            <label className="login-form__label" htmlFor={name}>
                {label}
            </label>
            <div className="login-input-block">
                <input
                    className="login-form__input"
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
                {type === "password" && (
                    <button type="button" className={getClassInputButton()} onClick={toggleShowPassword}>
                        <img src={btnIcon} alt="eye" />
                    </button>
                )}
            </div>
            {error && <div className="login-form__error">{error}</div>}
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
