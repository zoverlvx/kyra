import React, {useEffect, useState} from "react";
import { Route } from "react-router-dom";
import { getChannel } from "../actions";
import ThumbnailContainer from "./ThumbnailContainer/ThumbnailContainer";
import Calendar from "./Calendar/Calendar.js";
import Navigation from "./Navigation/Navigation.js";
import { useSelector, useDispatch } from "react-redux";

export default function() {

	const nextPageToken = useSelector(
		state => state.channel.nextPageToken
	);
	const prevPageToken = useSelector(
		state => state.channel.prevPageToken
	);
	const dispatch = useDispatch();

	useEffect(() => {
		// get channel contents on first mount
		dispatch(getChannel());
		const refresh = setInterval(() => {
			// renew at 12:01am every day
			const today = new Date();
			const currentTime = `${today.getHours()}:${today.getMinutes()}`;
			if (currentTime === "00:01") {
				dispatch(getChannel());
			}
		// check the time every 20 seconds
		}, 20000)
		return () => clearInterval(refresh)
	}, [dispatch]);
	
	// by default we receive 48 thumbnails back from the YT API
	// section of thumbnails to be displayed
	const [thumbnailPages, setThumbnailPages] = useState({
		from: 0,
		to: 12
	});
	
	const {from, to} = thumbnailPages;

		
	return (
		<>
			<Route 
				exact path="/"
			>
				<Navigation 
					to="/calendar" 
					text="Go to Calendar"
					conditions={{
						forNext: nextPageToken, 
						forPrevious: from > 0 || prevPageToken
					}}
					actionHandler={{
						getNext: to === 48
							? function () {
								dispatch(
									getChannel({
										token: nextPageToken
									})
								);
								setThumbnailPages({
									from: 0, to: 12
								});
							}
							: () => setThumbnailPages({
								from: from + 12,
								to: to + 12
							}), 
						getPrevious: from === 0
							? function () {
								dispatch(
									getChannel({
										token: prevPageToken
									})
								);
								setThumbnailPages({
									from: 36,
									to: 48
								});
							}
							: () => setThumbnailPages({
								from: from - 12,
								to: to - 12
							})
					}} 
				/>
				<ThumbnailContainer 
					thumbnailPages={thumbnailPages}
				/>
			</Route>
			<Route 
				path="/calendar" 
			>
				<Navigation 
					to="/" 
					text="Go to Thumbnails" 
					conditions={{
						forNext: nextPageToken, 
						forPrevious: prevPageToken
					}}
					actionHandler={{
						getNext: () => dispatch(getChannel({
							token: nextPageToken
						})), 
						getPrevious: () => dispatch(getChannel({
							token: prevPageToken
						}))
					}}
				/>
				<Calendar />
			</Route>
		</>
	);
}
