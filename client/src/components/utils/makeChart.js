import React from "react";
import { Chart } from "react-google-charts";
import { ButtonGroup } from "@material-ui/core";
import makeButtons from "../utils/makeButtons.js";

export default function(options) {

	return function(props) {

		// gets published dates of videos
		const publishedDates = [...props.videos].map(item => item.snippet.publishedAt);
		// sorts dates chronologically
		const chronological = [...publishedDates].sort();

		const getNext = () => props.getChannel({
			token: props.nextPageToken
		});

		const getPrevious = () => props.getChannel({
			token: props.prevPageToken
		});

		const conditions = {
			forNext: props.nextPageToken,
			forPrevious: props.prevPageToken
		};


		return (
			<>
				<Chart
					width={options.width}
					height={options.height}
					chartType={options.chartType}
					loader={<div>Loading</div>}
					data={[
						[
							{
								type: "date", 
								id: "Date"
							}, 
							{
								type: "number", 
								id:"Produced"
							}
						],
						//map through and spread everything else below
						...chronological.map(function(date, i) {
							return [
								new Date(date), 
								1
							]
						})
					]}
					options={{
						title: "YouTube Videos Produced",
						colorAxis: {
							maxValue: 1,
							minValue: 0
						}
					}}
				/>
				<ButtonGroup
					color="primary"
					aria-label="outlined primary button group"
				>
					{
						makeButtons(
							{getPrevious, getNext},
							conditions
						)
					}
				</ButtonGroup>
			</>
		);	

	}
}
