import { ReactElement } from "react";
import DefaultLayout from "@/layouts/Default";
import "./style.css";

const DummyAsideContent = (): ReactElement => {
    return <h2>Aside content</h2>;
};

const Application = (): ReactElement => {
    return (
        <DefaultLayout asideComponent={<DummyAsideContent />}>
            <h1>Application</h1>
        </DefaultLayout>
    );
};

export default Application;
