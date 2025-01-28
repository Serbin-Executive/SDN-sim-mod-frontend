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
                <img
                    onClick={onToggle}
                    src="assets/images/icons/asideButton.png"
                    alt="aside header icon image"
                />
            </div>
        </div>
    );
};

export default AsideHeader;
