import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

export default function NewQuote() {
	const { sendRequest, status } = useHttp(addQuote);
	const history = useHistory();

	useEffect(() => {
		if (status === "completed") {
			history.push("/quotes");
		}
	}, [status, history]);

	function addQuoteHandler(quoteData) {
		sendRequest(quoteData);
		/**
		 * push navigates the user to a new page allowing them to go back
		 * replace navigates the user to a new page but going back will not take them to the replaced page
		 */
	}

	return <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />;
}
