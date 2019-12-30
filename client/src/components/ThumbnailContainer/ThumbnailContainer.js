import React from "react";

export default function(props) {
	function makeThumbnail(item) {
		return <span>{item.kind}</span>
	}
	return (
		<div>
			{props.videos.map(makeThumbnail)}
		</div>
	);
}
