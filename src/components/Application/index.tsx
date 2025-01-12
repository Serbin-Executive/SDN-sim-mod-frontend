import { ReactElement } from "react";
import DefaultLayout from "@/layouts/Default";
import WebSocketModelInteract from "../WebSocketModelInteract";
import "./style.css";

const DummyAsideContent = (): ReactElement => {
    return <h2>Aside content</h2>;
};

const Application = (): ReactElement => {
    return (
        <DefaultLayout asideComponent={<DummyAsideContent />}>
            <WebSocketModelInteract />
        </DefaultLayout>
    );
};

export default Application;
