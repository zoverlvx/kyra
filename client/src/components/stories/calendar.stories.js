import React from "react";
import makeChart from "../utils/makeChart.js";
import { action } from "@storybook/addon-actions";

export default {title: "Calendar"}

const videos = [
	{
		snippet: {
			publishedAt: "2019-12-25T00:00:03.000Z" 
		}
	},
	{
		snippet: {
			publishedAt: "2019-11-26T20:00:04.000Z"
		}
	},
	{
		snippet: {
			publishedAt: "2019-10-29T20:00:07.000Z"
		}
	},
	{
		snippet: {
			publishedAt: "2019-09-24T19:00:06.000Z"
		}
	},
	{
		snippet: {
			publishedAt: "2019-08-27T19:00:02.000Z"
		}
	}
];

/*
function getChannel(obj) {
	console.log(obj);
}
*/

const actions = {
	getChannel: action("getChannel")
};

const Calendar = makeChart({
	width: 1000,
	height: 350,
	chartType: "Calendar"
});

export const calendar = () => <Calendar videos={videos} {...actions} />;
