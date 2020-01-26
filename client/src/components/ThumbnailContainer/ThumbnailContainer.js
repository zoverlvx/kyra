import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "@material-ui/core";
import {getChannel} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import makeThumbnail from "../utils/makeThumbnail.js";
import makeButtons from "../utils/makeButtons.js";
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

// using react-redux hooks
export default function() {
	const nextPageToken = useSelector(state => state.channel.nextPageToken);
	const prevPageToken = useSelector(state => state.channel.prevPageToken);
	const videos = useSelector(state => state.channel.items);
	const error = useSelector(state => state.error);
	const gettingChannel = useSelector(state => state.gettingChannel);

	const dispatch = useDispatch();

	// sections out the range of thumbnails from redux state
	// which will be made available to the view
	const [thumbnails, setThumbnails] = useState([]);
	const [thumbnailPages, setThumbnailPages] = useState({from: 0, to: 12})

	// uses styles
	const classes = useStyles();

	useEffect(() => {
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
		
		const { from, to } = thumbnailPages;

		const getNext = to === 48
			? function () {
				dispatch(getChannel({token: nextPageToken}));
				setThumbnailPages({from: 0, to: 12});
			}
			: () => setThumbnailPages({
				from: from + 12,
				to: to + 12
			});

		const getPrevious = from === 0
			? function () {
				dispatch(getChannel({token: prevPageToken}));
				setThumbnailPages({from: 36, to: 48});
			}
			: () => setThumbnailPages({
				from: from - 12,
				to: to - 12
			});
		
		const conditions = {
			forPrevious: from > 0 || prevPageToken,
			forNext: nextPageToken
		};

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
								{getPrevious, getNext},
								conditions
							)
						}
					</ButtonGroup>
			</div>
		);
	}
}


/*
// using react-redux connect
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
		
		const { from, to } = thumbnailPages;

		const getNext = to === 48
			? function () {
				props.getChannel({token: props.nextPageToken});
				setThumbnailPages({from: 0, to: 12});
			}
			: () => setThumbnailPages({
				from: from + 12,
				to: to + 12
			});

		const getPrevious = from === 0
			? function () {
				props.getChannel({token: props.prevPageToken});
				setThumbnailPages({from: 36, to: 48});
			}
			: () => setThumbnailPages({
				from: from - 12,
				to: to - 12
			});
		
		const conditions = {
			forPrevious: from > 0 || props.prevPageToken,
			forNext: props.nextPageToken
		};

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
								{getPrevious, getNext},
								conditions
							)
						}
					</ButtonGroup>
			</div>
		);
	}
});
*/
