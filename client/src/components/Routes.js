import React from "react";
import { NavLink, Route} from "react-router-dom";
import App from "./App.js"
import Calendar from "./Calendar/Calendar.js";
import Navigation from "./Navigation/Navigation.js";

export default function () {
		return (
			<>
				<Route 
					exact path="/"
					render={(rrprops) => <App {...rrprops} />}
				/>
				<Route 
					path="/calendar" 
					render={(rrprops) => <Calendar {...rrprops} />}
				/>
			</>
		);
}

/*
function App(props) {
	const {location: {pathname} } = props;
	console.log("Here are the props: ", props);
	console.log("Here is the pathname: ", pathname);

	if (pathname === "/") {
		return (
			<>
				<NavLink
					to="/calendar"
				>
					Go to Calendar
				</NavLink>
				<div>Thumbnails</div>
			</>
		);			
	}

	if (pathname === "/calendar") {
		return (
			<>
				<NavLink
					to="/"
				>
					Go to Home
				</NavLink>
				<div>Here is the Calendar</div>
			</>
		);
	}
}

export default function() {
	return (
		<>
			<Route 
				exact path="/"
				render={props => <App {...props} />}
			/>			
		</>
	)
}
*/

