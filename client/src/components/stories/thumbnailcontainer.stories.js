import React from "react";
import ThumbnailContainer from "../ThumbnailContainer/ThumbnailContainer.js";

export default {title: "ThumbnailContainer"}

const props = {
	videos: [
		{
			snippet: {
				thumbnails: {
					medium: {
						url: "https://i.ytimg.com/vi/QmR024SPhl0/mqdefault.jpg"
					}
				}
			}
		},
		{
			snippet: {
				thumbnails: {
					medium: {
						url: "https://i.ytimg.com/vi/RxtR3MAH3ag/mqdefault.jpg"
					}
				}
			}
		},
		{
			snippet: {
				thumbnails: {
					medium: {
						url: "https://i.ytimg.com/vi/MmOMwndhA_s/mqdefault.jpg"
					}
				}
			}
		}
	]
};

export const visual = () => <ThumbnailContainer videos={props.videos} />
