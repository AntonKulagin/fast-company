import { orderBy } from "lodash";
import React from "react";
import { useComments } from "../../hooks/useComments";
import CommentForm from "../common/comment/commentForm";
import CommentsList from "../common/comment/commentsList";

const Comments = () => {
    const { comments, createComment } = useComments();
    const { removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
        //   api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        removeComment(id);
        //   api.comments.remove(id).then((id) => {
        //       setComments(comments.filter((x) => x._id !== id));
        //   });
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <CommentForm onSubmit={handleSubmit} />
                </div>
            </div>

            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
