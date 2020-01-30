import React from "react";
import { Button } from "@material-ui/core";

export default function (props) {
	// if component is given a prop called toPrevious
	if (props.toPrevious) {
		// return button with default previous button style and functionality
		return (
			<Button
				color="inherit"
				variant="outlined"
				onClick={() => props.toPrevious()}
			>
				Previous Page
			</Button>
		)
	}
	
	// if component is given a prop called toNext
	if (props.toNext) {
		// return button with default next button style and functionality
		return (
			<Button
				color="inherit"
				variant="outlined"
				onClick={() => props.toNext()}
			>
				Next Page
			</Button>
		)
	}

	// otherwise zilch
	return null;
}
