import {
	ERROR,
	GET_CHANNEL_INIT,
	GET_CHANNEL_COMPLETE
} from "../actions";

const initialState = {
	channel: null,
	gettingChannel: false,
	error: null
};

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_CHANNEL_INIT:
			return {
				...state,
				gettingChannel: true
			};
		case GET_CHANNEL_COMPLETE:
			return {
				...state,
				channel: action.payload,
				gettingChannel: false
			};
		case ERROR:
			return {
				...state,
				gettingChannel: false,
				error: action.payload
			};
		default:
			return state;
	}
}
