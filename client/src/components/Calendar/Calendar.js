import React from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { Box } from "@material-ui/core";
import Media from "react-media";

/*

https://developers.google.com/chart/interactive/docs/gallery/calendar#data-format

Each square in a calendar chart represents a day. Currently, the color of the data cells can't be customized, although that will change in the next release of Google Charts.

If the data values are all positive, the colors will range from white to blue, with the deepest blues indicating the highest values. If there are negative data values, they will appear orange, as shown below.

*/


export default function() {
	// maps state to props
	const videos = useSelector(state => state.channel.items);
	// gets published dates and titles of videos
	const getPublishedVideos = item => ({title: item.snippet.title, publishedAt: item.snippet.publishedAt});
	// array of objects with (title: string) and (date: string)	
	const publishedVideos = [...videos].map(getPublishedVideos);

	return (
			<Media queries={{
				mobile: "(min-width: 375px) and (max-width: 667px)"
			}}>
				{
					matches => {
						if (matches.mobile) {
							return (
								<ul style={{listStyleType: "none"}}>
									{
										publishedVideos.map(function (video, i) {
											const date = new Date(video.publishedAt).toString();
											return (
												<Box mt={2} key={video.title}>
													<li>{`${i+1}. ${video.title}`}</li>
													<li>{`Published on: ${date.substring(0, 15)}`}</li>
												</Box>
											);
										})
									}
								</ul>
							);
						} else {
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
										...publishedVideos.map(function(
											video
										) {
											return [
												new Date(video.publishedAt),
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
							)
						}
					}
				}
			</Media>
	);
}
