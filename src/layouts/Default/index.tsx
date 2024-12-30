import { ReactElement, useState } from "react";
import AsideHeader from "@/components/AsideHeader";
import "./style.css";

export interface IDefaultLayoutProps {
    asideComponent: ReactElement;
    children: ReactElement;
}

const DefaultLayout = ({
    asideComponent,
    children,
}: IDefaultLayoutProps): ReactElement => {
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
        <div className="default-layout">
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

export default DefaultLayout;
