import React from "react";

import QuoteList from "../components/quotes/QuoteList";

const QUOTES = [
	{ id: "q1", author: "Samko", text: "Learning React is fun!" },
	{
		id: "q2",
		author: "Max",
		text: "I'll copy that and create another quote with a different id.",
	},
];

export default function AllQuotes() {
	return <QuoteList quotes={QUOTES} />;
}
