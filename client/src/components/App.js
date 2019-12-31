import React, {useEffect} from "react";
import { connect } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { getChannel } from "../actions";
import ThumbnailContainer from "./ThumbnailContainer/ThumbnailContainer.js";
import PageButton from "./PageButton/PageButton.js";

function App(props) {
	const { getChannel } = props;
	useEffect(() => {
		getChannel();
	}, [getChannel]); 
	
	if (!props.videos.length) return <div>Loading...</div>;
	if (props.videos.length) {
		return (
			<>
				<NavLink to="/graph">Go to Graph</NavLink>
				<Route 
					exact path="/"
					render={function() {
							return (
								<>
									<ThumbnailContainer 
										videos={props.videos} 
									/>
									<PageButton 
										prevPage={props.prevPageToken} 
										getChannel={getChannel}
									/>
									<PageButton 
										nextPage={props.nextPageToken} 
										getChannel={getChannel}
									/>
								</>
							);
						}
					}
				/>
				<Route 
					path="/graph" 
					render={() => <div>Spot for the graph</div>}
				/>
			</>
		);
	}
}

function mapStateToProps(state) {
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
