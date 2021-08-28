import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./NewCommentForm.module.css";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
	const params = useParams();
	const commentTextRef = useRef();
	const { sendRequest, status, error } = useHttp(addComment);

	const submitFormHandler = (event) => {
		event.preventDefault();

		// optional: Could validate here
		if (commentTextRef.current.value === "") return;

		const newComment = { text: commentTextRef.current.value };
		const { quoteId } = params;
		// send comment to server
		sendRequest({ commentData: newComment, quoteId });
	};

	const { onAddedComment } = props;

	useEffect(() => {
		if (status === "completed" && !error) {
			onAddedComment();
		}
	}, [status, error, onAddedComment]);

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered">{error}</p>;
	}

	return (
		<form className={classes.form} onSubmit={submitFormHandler}>
			<div className={classes.control} onSubmit={submitFormHandler}>
				<label htmlFor="comment">Your Comment</label>
				<textarea id="comment" rows="5" ref={commentTextRef}></textarea>
			</div>
			<div className={classes.actions}>
				<button className="btn">Add Comment</button>
			</div>
		</form>
	);
};

export default NewCommentForm;
