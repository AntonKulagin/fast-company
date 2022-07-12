import React from "react";

const Bookmark = ({ user, ...rest }) => {
	return (
		<button onClick={() => rest.onToggleBookmark(user._id)}>
			{user.bookmark === false ? (
				<i className="bi bi-bookmark"></i>
			) : (
				<i className="bi bi-bookmark-fill"></i>
			)}
		</button>
	);
};

export default Bookmark;
