import React from "react";

import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const QUOTES = [
	{ id: "q1", author: "Samko", text: "Learning React is fun!" },
	{
		id: "q2",
		author: "Max",
		text: "I'll copy that and create another quote with a different id.",
	},
];

export default function QuoteDetail() {
	const params = useParams();
	/**
	 * useRouteMatch returns an object with info of the route that it's called in.
	 * params => same as useParams
	 * path => route path but with params as placeholder keys e.g /quotes/:quotesId
	 * url => the url but with params as values e.g /quotes/q1
	 */
	const match = useRouteMatch();
	console.log(match);
	const quote = QUOTES.find((quote) => quote.id === params.quoteId);

	if (!quote) {
		return <p>No quote found!</p>;
	}

	return (
		<React.Fragment>
			<HighlightedQuote text={quote.text} author={quote.author} />
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
