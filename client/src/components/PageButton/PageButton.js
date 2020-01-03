import React from "react";

export default function(props) {
	const { prevPage, nextPage, getChannel} = props;
	if (prevPage) { 
		return (
			<button
				onClick={() => getChannel({ token: prevPage })}	
			>
				Previous Page
			</button>
		);
	}
	if (nextPage) { 
		return (
			<button
				onClick={() => getChannel({ token: nextPage })}
			>
				Next Page
			</button>
		);
	}
	return null;
}
