
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import App from "./App";
import "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
