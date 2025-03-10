import { ReactElement } from "react";
import { IBoardWorkCommandData, TSendCommand } from "../BoardWorkContext/meta";
import { IClientMessage } from "@/hooks/useWebSocket/meta";
import "./style.css";

export interface IModelWorkingCommandButtonProps {
    actionState: boolean;
    commandData: IBoardWorkCommandData;
    onClickAction: TSendCommand;
}

export const enum WorkingCommandButtonClasses {
    ACTIVE = "active",
    INACTIVE = "inactive",
};

const ModelWorkingCommandButton = ({
    actionState,
    commandData,
    onClickAction,
}: IModelWorkingCommandButtonProps): ReactElement => {
    const buttonClass = actionState ? WorkingCommandButtonClasses.INACTIVE : WorkingCommandButtonClasses.ACTIVE;
    
    const handleClick = (): void => {
        if (actionState || !onClickAction) {
            return;
        }

        onClickAction(commandData.commandKey, commandData.isSendSettingsConfig);
    }

    return (
        <button className={`common ${buttonClass}`} onClick={handleClick}>
            {commandData.commandKey}
        </button>
    );
};

export default ModelWorkingCommandButton;
