import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function({to, text}) {
	const navLinkStyle = {
		color: "white",
		textDecoration: "none"
	};
	return (
		<AppBar color="primary" position="static">
			<Toolbar>
				<Typography
					color="inherit"
				>
					<NavLink 
						style={navLinkStyle}
						to={to}
					>
						{text}
					</NavLink>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
