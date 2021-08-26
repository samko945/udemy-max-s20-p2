import React from "react";

import { useParams, Route } from "react-router-dom";

import Comments from "../components/comments/Comments";

export default function QuoteDetail() {
	const params = useParams();
	return (
		<React.Fragment>
			<h1>Quote Detail Page</h1>
			<p>{params.quoteId}</p>
			<Route path="/quotes/:quoteId/comments">
				<Comments />
			</Route>
		</React.Fragment>
	);
}
