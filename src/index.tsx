import ReactDOM, { Root } from "react-dom/client";
import Application from "@components/Application";
import store from "./store";
import { Provider } from "react-redux";

const RootHTMLElement: HTMLElement | null = document.getElementById("root");

if (!RootHTMLElement) {
    throw new Error("Cannot acquire div#root to start the Application");
}

const ReactRoot: Root = ReactDOM.createRoot(RootHTMLElement);

ReactRoot.render(
    <Provider store={store}>
        <Application />
    </Provider>
);
