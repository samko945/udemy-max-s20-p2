import React from "react";

import { useParams, Route, Link } from "react-router-dom";

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

	const quote = QUOTES.find((quote) => quote.id === params.quoteId);

	if (!quote) {
		return <p>No quote found!</p>;
	}

	return (
		<React.Fragment>
			<HighlightedQuote text={quote.text} author={quote.author} />
			<Route path="/quotes/:quoteId" exact>
				<div className="centered">
					<Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
						View Comments
					</Link>
				</div>
			</Route>
			<Route path="/quotes/:quoteId/comments">
				<Comments />
			</Route>
		</React.Fragment>
	);
}
