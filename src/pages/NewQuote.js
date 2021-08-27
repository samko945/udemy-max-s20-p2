import React from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

export default function NewQuote() {
	const history = useHistory();
	function addQuoteHandler(quoteData) {
		console.log(quoteData);
		/**
		 * push navigates the user to a new page allowing them to go back
		 * replace navigates the user to a new page but going back will not take them to the replaced page
		 */
		history.push("/quotes");
	}
	return <QuoteForm onAddQuote={addQuoteHandler} />;
}
