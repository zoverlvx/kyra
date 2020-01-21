import React from "react";
import Thumbnail from "../Thumbnail/Thumbnail.js"

export default function (item) {
	return <Thumbnail video={item} key={item.id.videoId} />;
}
