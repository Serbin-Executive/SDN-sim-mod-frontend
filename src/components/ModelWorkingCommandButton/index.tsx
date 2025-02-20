import { ReactElement } from "react";
import { TSendCommand } from "../ModelsContext/meta";
import "./style.css";

export interface IModelWorkingCommandButtonProps {
    actionState: boolean;
    modelWorkingCommand: string;
    onClickAction: TSendCommand;
}

export const enum WorkingCommandButtonClasses {
    ACTIVE = "active",
    INACTIVE = "inactive",
};

const ModelWorkingCommandButton = ({
    actionState,
    modelWorkingCommand,
    onClickAction,
}: IModelWorkingCommandButtonProps): ReactElement => {
    const buttonClass = actionState ? WorkingCommandButtonClasses.INACTIVE : WorkingCommandButtonClasses.ACTIVE;
    
    const handleClick = (): void => {
        if (actionState || !onClickAction) {
            return;
        }

        onClickAction(modelWorkingCommand);
    }

    return (
        <button className={`common ${buttonClass}`} onClick={handleClick}>
            {modelWorkingCommand}
        </button>
    );
};

export default ModelWorkingCommandButton;
