import React from "react";
import { makeStyles, GridListTile } from "@material-ui/core";
/*
import { Image } from "semantic-ui-react";

export default function({video}) {
	return <Image src={video.snippet.thumbnails.medium.url} />
}
*/

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
			/>	
		</GridListTile>
	);
}
