import React, {useEffect} from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getChannel } from "../actions";
import ThumbnailContainer from "./ThumbnailContainer/ThumbnailContainer";
import Calendar from "./Calendar/Calendar.js";
import Navigation from "./Navigation/Navigation.js";
import PageButton from "./PageButton/PageButton.js";
import { ButtonGroup } from "@material-ui/core";

function mapStateToProps(state) {
	return {
		nextPageToken: state.channel.nextPageToken 
			? state.channel.nextPageToken : null,
		prevPageToken: state.channel.prevPageToken
			? state.channel.prevPageToken : null
	};
}

export default connect(
	mapStateToProps, 
	{getChannel}
)(function (props) {
	const { getChannel } = props;
	useEffect(() => {
		getChannel();
	}, [getChannel]);
	return (
		<>
			<Route 
				exact path="/"
			>
				<Navigation to="/calendar" text="Go to Calendar" />
				<ThumbnailContainer />
				<ButtonGroup
					color="primary"
					aria-label="outlined primary button group"
				>
					<PageButton prevPage={props.prevPageToken} />
					<PageButton nextPage={props.nextPageToken} />
				</ButtonGroup>
			</Route>
			<Route 
				path="/calendar" 
			>
				<Navigation to="/" text="Go to Thumbnails" />
				<Calendar />
			</Route>
		</>
	);
});