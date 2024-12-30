import { ReactElement } from "react";
import "./style.css";

export interface AsideHeaderProps {
    onToggle: () => void;
}

const AsideHeader = ({ onToggle }: AsideHeaderProps): ReactElement => {
    return (
        <div className="aside-header">
            <div className="aside-header-title">
                <h3>Aside</h3>
            </div>
            <div className="aside-header-toggle">
                <button onClick={onToggle}>S</button>
            </div>
        </div>
    );
};

export default AsideHeader;
