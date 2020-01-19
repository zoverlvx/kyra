import React from "react";
import PageButton from "../PageButton/PageButton.js";

export default function (
	thumbnailPages, 
	setThumbnailPages, 
	props
) {
	const buttons = [];
	const { from, to } = thumbnailPages;
	
	const getNext = to === 48 
		? function() {
			props.getChannel({token: props.nextPageToken})
			setThumbnailPages({from: 0, to: 12});
		} 
		: () => setThumbnailPages({
				from: from + 12,
				to: to + 12
			})
	
	const getPrevious = from === 0
		? function() {
			props.getChannel({token: props.prevPageToken})
			setThumbnailPages({from: 36, to: 48})
		}
		: () => setThumbnailPages({
			from: from - 12,
			to: to - 12
		})

	if (from > 0 || props.prevPageToken) {
		buttons.push(
			<PageButton 
				toPrevious={getPrevious}
			/>
		);
	}

	if (props.nextPageToken) {
		buttons.push(
			<PageButton 
				toNext={getNext} 
			/>
		);
	}

	return buttons;
}
