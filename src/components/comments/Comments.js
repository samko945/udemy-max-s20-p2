import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
	const params = useParams();
	const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments, true);
	const [isAddingComment, setIsAddingComment] = useState(false);

	useEffect(() => {
		sendRequest(params.quoteId);
	}, [sendRequest, params.quoteId]);

	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};

	const addedCommentHandler = useCallback(() => {
		setIsAddingComment(false);
		sendRequest(params.quoteId);
	}, [params.quoteId, sendRequest]);

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <div className="centered">{error}</div>;
	}

	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler} />}
			{loadedComments.length < 1 && <p className="centered">There are no comments yet.</p>}
			<CommentsList comments={loadedComments} />
		</section>
	);
};

export default Comments;
