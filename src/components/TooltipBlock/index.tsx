import { type ReactNode, type ReactElement } from "react";
import "./style.css";

export type TTooltipDirection = string;

export const TOOLTIP_DIRECTION: string = "top";
export const TOOLTIP_LABEL_TEXT: string = "ⓘ";

export interface ITooltipBlockProps {
    children?: ReactNode;
    flow?: TTooltipDirection;
    info: string;
}

const TooltipBlock = ({ children, info, flow = TOOLTIP_DIRECTION }: ITooltipBlockProps): ReactElement => (
    <div className="tooltip-block">
        <div className="title">{children}</div>
        <div
            data-tooltip={info}
            data-flow={flow}
            className="label"
        >
            {TOOLTIP_LABEL_TEXT}
        </div>
    </div>
);

export default TooltipBlock;
