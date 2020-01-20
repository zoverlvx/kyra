import React from "react";
import PageButton from "../PageButton/PageButton.js";

export default function (
	thumbnailPages, 
	setThumbnailPages, 
	props
) {
	// container for number of button elements to be built
	const buttons = [];
	// indeces of thumbnails currently displayed from redux state
	const { from, to } = thumbnailPages;
	
	// if at the last index of the 48th thumbnail from the most recent GET request
	const getNext = to === 48 
		// use this function
		? function() {
			// to get the next page of 48 thumbnails from youtube with the next page token
			props.getChannel({token: props.nextPageToken})
			// display indeces 0 through 12 of those 48 requested
			setThumbnailPages({from: 0, to: 12});
		} 
		// otherwise use this function
		: () => setThumbnailPages({
				// to move to the next set of 12 thumbnails of the 48 currently available
				from: from + 12,
				to: to + 12
			})
	
	// if you've reached the last thumbnail of the 48 available from the most recent request
	const getPrevious = from === 0
		// use this function
		? function() {
			// to get the last page of 48 thumbnails from youtube
			props.getChannel({token: props.prevPageToken})
			// display indeces 36 through 48 of those previous 48 requested
			setThumbnailPages({from: 36, to: 48})
		}
		// otherwise use this function
		: () => setThumbnailPages({
			// to move back to the last set of 12 thumbnails of the 48 currently available
			from: from - 12,
			to: to - 12
		})
	
	// if you are looking at thumbnails that are beyond the first 12 of 48 available
	// or if a previous page exists 
	if (from > 0 || props.prevPageToken) {
		// then a back button should exist
		buttons.push(
			<PageButton 
				toPrevious={getPrevious}
			/>
		);
	}
	
	// if another page of 48 thumbnails is available from youtube
	if (props.nextPageToken) {
		// then a next button should exist
		buttons.push(
			<PageButton 
				toNext={getNext} 
			/>
		);
	}

	return buttons;
}
