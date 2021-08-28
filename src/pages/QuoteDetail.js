import React, { useEffect } from "react";

import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

export default function QuoteDetail() {
	const params = useParams();
	const { sendRequest, status, data: loadedData, error } = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(params.quoteId);
	}, [params.quoteId, sendRequest]);

	/**
	 * useRouteMatch returns an object with info of the route that it's called in.
	 * params => same as useParams
	 * path => route path but with params as placeholder keys e.g /quotes/:quotesId
	 * url => the url but with params as values e.g /quotes/q1
	 */
	const match = useRouteMatch();

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedData) {
		return <p className="centered">No quote found!</p>;
	}

	if (error) {
		return <p className="centered">{error}</p>;
	}

	return (
		<React.Fragment>
			<HighlightedQuote text={loadedData.text} author={loadedData.author} />
			<Route path={match.path} exact>
				<div className="centered">
					<Link className="btn--flat" to={`${match.url}/comments`}>
						View Comments
					</Link>
				</div>
			</Route>
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
		</React.Fragment>
	);
}
