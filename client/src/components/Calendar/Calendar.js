//import { connect } from "react-redux";
//import makeChart from "../utils/makeChart.js";
import React from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";

/*

https://developers.google.com/chart/interactive/docs/gallery/calendar#data-format

Each square in a calendar chart represents a day. Currently, the color of the data cells can't be customized, although that will change in the next release of Google Charts.

If the data values are all positive, the colors will range from white to blue, with the deepest blues indicating the highest values. If there are negative data values, they will appear orange, as shown below.

*/


export default function() {
	// maps state to props
	const videos = useSelector(state => state.channel.items);

	const getPublishedDates = item => item.snippet.publishedAt;
	
	// gets published dates of videos
	const publishedDates = [...videos].map(getPublishedDates);

	// sorts dates chronologically
	// TODO: this might be negatively affecting load time
	// might not even need this in between how the db content is already set up and how the calendar component displays the data
	// const chronological = [...publishedDates].sort();

	return (
			<Chart 
				width={1000}
				height={350}
				chartType={"Calendar"}
				loader={<div>Loading</div>}
				data={[
					[
						{
							type: "date",
							id: "Date"
						},
						{
							type: "number",
							id: "Produced"
						}
					],

					//map through and spread everything else below
					...publishedDates.map(function(
						date
					) {
						return [
							new Date(date),
							1 // sets it to blue
						];
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
	);
}
