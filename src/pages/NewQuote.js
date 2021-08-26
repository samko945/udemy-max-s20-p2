import React from "react";
import QuoteForm from "../components/quotes/QuoteForm";

export default function NewQuote() {
	function addQuoteHandler(quoteData) {
		console.log(quoteData);
	}
	return <QuoteForm onAddQuote={addQuoteHandler} />;
}
