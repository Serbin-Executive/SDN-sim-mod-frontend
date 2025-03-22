import { type ReactNode, type ReactElement } from "react";
import "./style.css";

export const TOOLTIP_DIRECTION: string = "right";
export const TOOLTIP_LABEL_TEXT: string = "i";

export interface ITooltipBlockProps {
    children?: ReactNode;
    info: string;
}

const TooltipBlock = ({ children, info }: ITooltipBlockProps): ReactElement => (
    <div className="tooltip-block">
        <div className="title">{children}</div>
        <div
            data-tooltip={info}
            data-flow={TOOLTIP_DIRECTION}
            className="label"
        >
            {TOOLTIP_LABEL_TEXT}
        </div>
    </div>
);

export default TooltipBlock;
