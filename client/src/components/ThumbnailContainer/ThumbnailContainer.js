import React from "react";
import Thumbnail from "../Thumbnail/Thumbnail.js";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden"
	}
}));

export default function(props) {
	const classes = useStyles();

	function makeThumbnail(item) {
		return <Thumbnail video={item} />;
	}

	return (
		<div className={classes.root}>
			{props.videos.map(makeThumbnail)}
		</div>
	);
}
