import React from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import TextAreaField from "../../common/form/textAreaField";

const NewComment = ({ users, onChange, data }) => {
    const handleChange = (target) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>

                    <SelectField
                        defaultOption="Выберете пользователя"
                        name="userId"
                        value={data.userId}
                        options={users}
                        onChange={handleChange}
                    />

                    {/* <div className="mb-4">
                        <select className="form-select" name="userId" value={data.userId} onChange={handleChange}>
                            <option disabled value="">
                                Выберите пользователя
                            </option>
                            {users &&
                                users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                        </select>
                    </div> */}
                    <TextAreaField label="Сообщение" />
                    <div className="d-grid justify-content-md-end">
                        <button className="btn btn-primary ">Опубликовать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
NewComment.propTypes = {
    users: PropTypes.array,
    onChange: PropTypes.func,
    data: PropTypes.object
};

export default NewComment;
