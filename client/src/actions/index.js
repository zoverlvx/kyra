import axios from "axios";
import config from "../config.js";

export const ERROR = "ERROR";
export const GET_CHANNEL_INIT = "GET_CHANNEL_INIT";
export const GET_CHANNEL_COMPLETE = "GET_CHANNEL_COMPLETE";

const KEY = config.YT_KEY;
const CHANNEL_ID="UCvO6uJUVJQ6SrATfsWR5_aA";

export function getChannel(options) {
	
	let URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date`;
	
	// if options are provided
	if (options) {
		// if there is a page token, append it to the end.
		if (options.token) {
			URL += `&pageToken=${options.token}`;
		}
		// if there isn't a maxResults option, default to 12.
		if (!options.maxResults) {
			URL += "&maxResults=12";
		}
		// if there is a maxResults option, append it to the end.
		if (options.maxResults && typeof options.maxResults === "number") {
			URL += `&maxResults=${options.maxResults}`;
		}
	}	
	
	// if no options provided
	if (!options) {
		// default maxResults to 12 and append to the end.
		URL += "&maxResults=12";
	}
	
	const channel = axios(URL);

	return function(dispatch) {
		dispatch({type: GET_CHANNEL_INIT});
		channel
			.then(function({data}) {
				dispatch({
					type: GET_CHANNEL_COMPLETE,
					payload: data
				});
			})
			.catch(function(error) {
				dispatch({
					type: ERROR,
					payload: error
				});
			})
	}
}
