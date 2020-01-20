import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "@material-ui/core";
import {getChannel} from "../../actions";
import makeThumbnail from "../utils/makeThumbnail.js";
import makeButtons from "../utils/makeButtons.js";

import { 
	makeStyles, 
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

function mapStateToProps(state) {
	return  {
		nextPageToken: state.channel.nextPageToken 
			? state.channel.nextPageToken : null,
		prevPageToken: state.channel.prevPageToken
			? state.channel.prevPageToken : null,
		videos: state.channel.items,
		error: state.error,
		gettingChannel: state.gettingChannel
	};
}

export default connect(mapStateToProps, {getChannel})(function(props) {
	
	// sections out the range of thumbnails from redux state
	// which will be made available to the view
	const [thumbnails, setThumbnails] = useState([]);
	const [thumbnailPages, setThumbnailPages] = useState({from: 0, to: 12})
	
	// uses styles
	const classes = useStyles();
	
	
	// use videos from redux state
	const {videos} = props;
	
	useEffect(() => {
		const { from, to } = thumbnailPages;

		// once mounted, section off these videos for the view
		setThumbnails(videos.slice(from, to))

	}, [videos, thumbnailPages])
	
	// if there's an error, display error view
	if (props.error) return <div>There's been an error</div>;
	// if there are no thumbnails ready, display loading view
	if (!thumbnails.length) return <div>Loading...</div>;
	// if there are thumbnails available
	if (thumbnails.length) {
		return (
			<div 
				className={classes.root}
			>
					{thumbnails.map(makeThumbnail)}
					<ButtonGroup
						color="primary"
						aria-label="outlined primary button group"
					>
						{
							makeButtons(
								thumbnailPages, // displays 12 thumbnails at a time
								setThumbnailPages, // moves indeces to show 12 new thumbnails from what's available
								props // requests 48 new thumbnails from Youtube when the 48th of the last request has been reached,
									// or when the very last of the current request has been reached
							)
						}
					</ButtonGroup>
			</div>
		);
	}
});
