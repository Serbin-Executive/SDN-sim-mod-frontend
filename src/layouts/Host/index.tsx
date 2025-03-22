import AsideHeader from "@components/AsideHeader";
import { type ReactElement, useState } from "react";
import "./style.css";

export interface IHostLayoutProps {
    asideComponent: ReactElement;
    children: ReactElement[];
}

const HostLayout = ({
    asideComponent,
    children,
}: IHostLayoutProps): ReactElement => {
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

    const asideClassNames: string = !isAsideOpen ? "default" : "in-focus";
    const mainClassNames: string = !isAsideOpen ? "default" : "out-of-focus";

    const closeAside = () => {
        setIsAsideOpen(false);
    };

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen);
    };

    return (
        <div className="host-layout">
            <aside className={asideClassNames}>
                <AsideHeader onToggle={toggleAside} />
                <div className="aside-content-container">{asideComponent}</div>
            </aside>
            <main className={mainClassNames} onClick={closeAside}>
                <div className="main-content-container">{children}</div>
            </main>
        </div>
    );
};

export default HostLayout;
