import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//import "./index.css";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Routes from "./components/Routes.js";
import reducer from "./reducers";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
	reducer,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<Router>
			<Routes />
		</Router>
	</Provider>, 
	document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
