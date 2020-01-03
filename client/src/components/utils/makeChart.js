import React, { useEffect } from "react";
import { Chart } from "react-google-charts";

export default function(options) {

	return function(props) {

	const { getChannel } = props;

	useEffect(() => {
		getChannel({maxResults: 50});
	}, [getChannel])

	// gets published dates of videos
	const publishedDates = [...props.videos].map(item => item.snippet.publishedAt);
	// sorts dates chronologically
	const chronological = [...publishedDates].sort();


	return (
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
						i
					]
				})
			]}
			options={{
				title: "YouTube Videos Produced"
			}}
		/>
	);	

	}
}
