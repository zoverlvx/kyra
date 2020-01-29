import React from "react";
import { 
	AppBar, 
	Toolbar, 
	Typography, 
	ButtonGroup,
	Box
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { NavLink } from "react-router-dom";
import makeButtons from "../utils/makeButtons.js";

export default function({to, text, conditions, actionHandler}) {

	const navLinkStyle = {
		color: "white",
		textDecoration: "none"
	};
	return (
		<>
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
					<Box ml={2}>
						<ButtonGroup
							color="inherit"
							aria-label="outlined primary button group"
						>
							{
								makeButtons(actionHandler, conditions)
							}
						</ButtonGroup>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
}
