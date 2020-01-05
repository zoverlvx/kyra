import React from "react";
import Thumbnail from "../Thumbnail/Thumbnail.js";

export default {title: "Thumbnail"}

const thumbnail = {
	snippet: {
		thumbnails: {
			medium: {
				url: "https://i.ytimg.com/vi/FnmlrU9ORNs/mqdefault.jpg"
			} 
		}
	}
};

export const visual = () => <Thumbnail video={thumbnail} />

