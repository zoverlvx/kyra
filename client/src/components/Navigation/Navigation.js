import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function(props) {
	console.log("props in navigation: ", props);

	const navLinkStyle = {
		color: "white",
		textDecoration: "none"
	};

	return (
		<AppBar color="primary" position="static">
			<Toolbar>
				<Typography
					variant="title"
					color="inherit"
				>
					<NavLink 
						style={navLinkStyle}
						to="/calendar"
					>
						Go to Calendar
					</NavLink>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
