import React, {useState, useEffect} from "react";
import { ButtonGroup } from "@material-ui/core";
import {getChannel} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import makeThumbnail from "../utils/makeThumbnail.js";
import { 
	makeStyles 
} from "@material-ui/core";

// defines styles used
const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden"
	}
}));

export default function({thumbnailPages}) {
	
	const videos = useSelector(state => state.channel.items);
	const error = useSelector(state => state.error);
	const gettingChannel = useSelector(state => state.gettingChannel);

	const dispatch = useDispatch();

	// sections out the range of thumbnails from redux state
	// which will be made available to the view
	const [thumbnails, setThumbnails] = useState([]);

	// uses styles
	const classes = useStyles();

	useEffect(() => {

		// specifies range of thumbnails to clip
		const { from, to } = thumbnailPages;

		// once mounted, section off these videos for the view
		setThumbnails(videos.slice(from, to));

	}, [videos, thumbnailPages]);

	// if there's an error, display error view
	if (error) return <div>There's been an error</div>;
	// if there are no thumbnails ready, display loading view
	if (!thumbnails.length) return <div>Loading...</div>;
	// if there are thumbnails available
	if (thumbnails.length) {
		
		return (
			<div 
				className={classes.root}
			>
					{thumbnails.map(makeThumbnail)}
			</div>
		);
	}
}
