import React, {useEffect} from "react";
import { connect } from "react-redux";
import { getChannel } from "../actions";

function App(props) {
	const { getChannel } = props;
	useEffect(() => {
		getChannel();
	}, [getChannel]); 
	
	//if (state.length === 0) return <div>Loading...</div>;
	console.log("Here is props: ", props);
	return (
		<div>
			App runs
		</div>
	);
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, {getChannel})(App);
