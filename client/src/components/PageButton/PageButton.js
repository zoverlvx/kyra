import React from "react";
import { connect } from "react-redux";
import { getChannel } from "../../actions";
import { Button } from "@material-ui/core";

export default connect(null, {getChannel})(function(props) {
	const { prevPage, nextPage, getChannel} = props;
	if (prevPage) { 
		return (
			<Button
				color="primary"
				variant="outlined"
				onClick={() => getChannel({ token: prevPage })}	
			>
				Previous Page
			</Button>
		);
	}
	if (nextPage) { 
		return (
			<Button
				color="primary"
				variant="outlined"
				onClick={() => getChannel({ token: nextPage })}	
			>
				Next Page
			</Button>
		);
	}
	return null;
});
