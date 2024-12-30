import { StrictMode } from "react";
import ReactDOM, { Root } from "react-dom/client";
import Application from "@/components/Application";

const RootHTMLElement: HTMLElement | null = document.getElementById("root");

if (!RootHTMLElement) {
    throw new Error("Cannot acquire div#root to start the Application");
}

const ReactRoot: Root = ReactDOM.createRoot(RootHTMLElement);

ReactRoot.render(
    <StrictMode>
        <Application />
    </StrictMode>
);
