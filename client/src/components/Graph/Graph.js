import React from "react";
import { Chart } from "react-google-charts";

export default function() {
	return (
		<div style={{ display: "flex", maxWidth: 900 }}>
			<Chart 
				width={400}
				height={300}
				chartType="ColumnChart"
				loader={<div>Loading Chart</div>}
				data={[
					["City", "2010 Population", "2000 Population"],
					["NYC", 8175000, 8008000],
					["Los Angeles", 3792000, 3694000],
					["Chicago", 2695000, 2896000],
					["Houston", 2099000, 1953000],
					["Philly", 1526000, 1517000]
				]}
				options={{
					title: "Population of Largest US Cities",
					chartArea: {width: "30%"},
					hAxis: {
						title: "Total Population",
						minValue: 0,
					},
					vAxis: {
						title: "City"
					}
				}}
				legendToggle
			/>
		</div>
	);
}
