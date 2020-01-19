import React from "react";
import { makeStyles, GridListTile } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridList: {
		width: 300,
		height: 225,
		paddingTop: "10px",
		listStyleType: "none"
	}
}));

export default function({video}) {
	const classes = useStyles();
	return (
		<GridListTile className={classes.gridList}>
			<img
				src={video.snippet.thumbnails.medium.url} 
				alt=""
			/>	
		</GridListTile>
	);
}
