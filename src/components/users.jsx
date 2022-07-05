import React, { useState } from "react";
import api from "../api";

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());

	const handleDelete = (userId) => {
		setUsers((prevState) => prevState.filter((user) => user._id !== userId));
	};

	const renderPhrase = (number) => {
		let human = "человек";
		let action = "тусанёт";

		if (2 <= number && number <= 4) {
			human = "человека";
			action = "тусанут";
		}

		return number ? (
			<span className="badge bg-primary">
				{number} {human} {action} с тобой сегодня
			</span>
		) : (
			<span className="badge bg-danger">Никто с тобой не тусанёт</span>
		);
	};

	const createTable = () => {
		return (
			users.length !== 0 && (
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Имя</th>
							<th scope="col">Качества</th>
							<th scope="col">Профессия</th>
							<th scope="col">Встретился, раз</th>
							<th scope="col">Оценка</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>{createUser()}</tbody>
				</table>
			)
		);
	};

	const createUser = () => {
		return users.map((user) => (
			<tr key={user._id}>
				<td>{user.name}</td>
				<td>{createQualities(user.qualities)}</td>
				<td>{createProfession(user.profession)}</td>
				<td>{user.completedMeetings}</td>
				<td>
					{user.rate}
					<span>/5</span>
				</td>
				<td>{createButton(user._id)}</td>
			</tr>
		));
	};

	const createQualities = (qualities) => {
		const classPrefix = "badge m-2 bg-";
		return qualities.map((qualitie) => (
			<span key={qualitie._id} className={classPrefix + qualitie.color}>
				{qualitie.name}
			</span>
		));
	};

	const createProfession = (profession) => {
		return <span key={profession._id}>{profession.name}</span>;
	};

	const createButton = (id) => {
		return (
			<button className="btn btn-danger" onClick={() => handleDelete(id)}>
				delete
			</button>
		);
	};

	return (
		<>
			<h2>{renderPhrase(users.length)}</h2>
			{createTable()}
		</>
	);
};

export default Users;
