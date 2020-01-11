import { connect } from "react-redux";
import makeChart from "../utils/makeChart.js";

/*

https://developers.google.com/chart/interactive/docs/gallery/calendar#data-format

Each square in a calendar chart represents a day. Currently, the color of the data cells can't be customized, although that will change in the next release of Google Charts.

If the data values are all positive, the colors will range from white to blue, with the deepest blues indicating the highest values. If there are negative data values, they will appear orange, as shown below.

*/

const Calendar = makeChart({
	width: 1000, 
	height: 350, 
	chartType: "Calendar"
});

function mapStateToProps(state) {
	return {
		videos:	state.channel.items
	};
}

export default connect(mapStateToProps)(Calendar);
