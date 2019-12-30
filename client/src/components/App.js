import React, {useEffect} from "react";
import { connect } from "react-redux";
import { getChannel } from "../actions";
import ThumbnailContainer from "./ThumbnailContainer/ThumbnailContainer.js";

function App(props) {
	const { getChannel } = props;
	useEffect(() => {
		getChannel();
	}, [getChannel]); 
	
	console.log("Here is props: ", props);
	
	if (!props.videos.length) return <div>Loading...</div>;
	if (props.videos.length) {
		return (
			<ThumbnailContainer videos={props.videos} />
		);
	}
}

function mapStateToProps(state) {
	console.log("Here is initial state: ", state);
	return  {
		videos: state.channel.items,
		nextPageToken: state.channel.nextPageToken 
			? state.channel.nextPageToken: null,
		prevPageToken: state.channel.prevPageToken
			? state.channel.prevPageToken : null,
		error: state.error,
		gettingChannel: state.gettingChannel
	};
}

export default connect(mapStateToProps, {getChannel})(App);
