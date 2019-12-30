import React from "react";
import {Image} from "semantic-ui-react";

export default function({video}) {
	return <Image src={video.snippet.thumbnails.medium.url} />
}
