import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "@material-ui/core";
import {getChannel} from "../../actions";
import makeThumbnail from "../utils/makeThumbnail.js";
import makeButtons from "../utils/makeButtons.js";

import { 
	makeStyles, 
} from "@material-ui/core";

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
	const [thumbnails, setThumbnails] = useState([]);
	const [thumbnailPages, setThumbnailPages] = useState({from: 0, to: 12})
	const classes = useStyles();
	
	

	const {videos} = props;
	
	useEffect(() => {
		const { from, to } = thumbnailPages;
		setThumbnails(videos.slice(from, to))
	}, [videos, thumbnailPages])
	
	if (props.error) return <div>There's been an error</div>;
	if (!thumbnails.length) return <div>Loading...</div>;
	if (thumbnails.length) {
		//const {from, to} = thumbnailPages;
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
								thumbnailPages,
								setThumbnailPages,
								props
							)
						}
						{/*
						<PageButton 
							toPrevious={() => setThumbnailPages({
									from: from - 12,
									to: to - 12
								})
							}
						/>
						<PageButton 
							toNext={() => setThumbnailPages({
									from: from + 12,
									to: to + 12
								})
							} 
						/>
						*/}
					</ButtonGroup>
			</div>
		);
	}
});
