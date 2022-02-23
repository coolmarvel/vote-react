import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import DApp from "./DApp";
// import BrowserRouter from "react-dom";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(
//   <BrowserRouter>
//       <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.render(<App /> , root)
}

serviceWorker.unregister();
