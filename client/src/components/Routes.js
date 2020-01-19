import React, {useEffect} from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getChannel } from "../actions";
import ThumbnailContainer from "./ThumbnailContainer/ThumbnailContainer";
import Calendar from "./Calendar/Calendar.js";
import Navigation from "./Navigation/Navigation.js";

		

export default connect(
	null, 
	{getChannel}
)(function (props) {
	const { getChannel } = props;
	
	useEffect(() => {
		// Get channel contents on first mount
		getChannel(); 
		const refresh = setInterval(() => {
			/* renew at 12:01am every day */
			const today = new Date();
			const currentTime = `${today.getHours()}:${today.getMinutes()}`;
			if (currentTime === "00:01") {
				getChannel();
			}
		}, 20000)
		return () => clearInterval(refresh)
	}, [getChannel])

	return (
		<>
			<Route 
				exact path="/"
			>
				<Navigation to="/calendar" text="Go to Calendar" />
				<ThumbnailContainer />
				
			</Route>
			<Route 
				path="/calendar" 
			>
				<Navigation to="/" text="Go to Thumbnails" />
				<Calendar />
			</Route>
		</>
	);
});
