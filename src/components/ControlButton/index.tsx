import { type ReactElement } from "react";
import "./style.css";

export interface IControlButtonProps {
    onClick: any;
    title: string;
    isActive: boolean;
}

const ControlButton = ({
    onClick,
    title,
    isActive,
}: IControlButtonProps): ReactElement => {
    const buttonActiveClassSuffix = !isActive ? " inactive" : "";

    return (
        <button
            className={`control${buttonActiveClassSuffix}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default ControlButton;
