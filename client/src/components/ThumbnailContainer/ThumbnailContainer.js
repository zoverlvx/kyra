import React from "react";
import { connect } from "react-redux";
import Thumbnail from "../Thumbnail/Thumbnail.js";
import { 
	makeStyles, 
	GridList
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
		videos: state.channel.items,
		error: state.error,
		gettingChannel: state.gettingChannel
	};
}

export default connect(mapStateToProps)(function(props) {
	const classes = useStyles();

	function makeThumbnail(item) {
		return <Thumbnail video={item} />;
	}
	
	if (props.error) return <div>There's been an error</div>;
	if (!props.videos.length) return <div>Loading...</div>;
	if (props.videos.length) {
		return (
			<div 
				className={classes.root}
			>
					{props.videos.map(makeThumbnail)}
			</div>
		);
	}
});
