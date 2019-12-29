import axios from "axios";

export const ERROR = "ERROR";
export const GET_CHANNEL_INIT = "GET_CHANNEL_INIT";
export const GET_CHANNEL_COMPLETE = "GET_CHANNEL_COMPLETE";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID="UCvO6uJUVJQ6SrATfsWR5_aA";
const MAX_RESULTS=12;
const URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;


export function getChannel() {
	const channel = axios.get(URL);
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
