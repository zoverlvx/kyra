import React from "react";
import { Chart } from "react-google-charts";
import getWeek from "date-fns/getWeekOfMonth";

/*

https://developers.google.com/chart/interactive/docs/gallery/calendar#data-format

Each square in a calendar chart represents a day. Currently, the color of the data cells can't be customized, although that will change in the next release of Google Charts.

If the data values are all positive, the colors will range from white to blue, with the deepest blues indicating the highest values. If there are negative data values, they will appear orange, as shown below.

*/

export default function({videos}) {

	console.log("videos in the Calendar chart: ", videos);
	return (
		<Chart
			width={1000}
			height={350}
			chartType="Calendar"
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
				//map through everything else below
				...videos.map(function(video, i) {
					return [
						new Date(video.snippet.publishedAt), 
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
