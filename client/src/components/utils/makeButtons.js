import React from "react";
import PageButton from "../PageButton/PageButton.js";

export default function(
	buttonBehaviors,
	buttonConditions
) {
	// container for number of button elements to be rendered
	const buttons = [];
	const {forPrevious, forNext} = buttonConditions;

	if (forPrevious) {
		buttons.push(
			<PageButton 
				toPrevious={buttonBehaviors.getPrevious}
				key="prev"
			/>
		);
	}
	
	if (forNext) {
		buttons.push(
			<PageButton 
				toNext={buttonBehaviors.getNext} 
				key="next"
			/>
		);
	}

	return buttons;
	
}
