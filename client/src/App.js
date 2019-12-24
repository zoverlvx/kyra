import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
	const [state, setState] = useState([]);
	
	useEffect(() => {
		axios.get("http://localhost:5000", {withCredentials: false})
			.then(res => console.log(res.data))
			.catch(error => console.log(error))
	})
	
	if (state.length === 0) return <div>Loading...</div>;

	return (
		<div>
			App runs
		</div>
	);
}

export default App;
