import React from "react";
import Thumbnail from "../Thumbnail/Thumbnail.js";

export default function(props) {
	
	function makeThumbnail(item) {
		return <Thumbnail video={item} />;
	}

	return (
		<div>
			{props.videos.map(makeThumbnail)}
		</div>
	);
}
