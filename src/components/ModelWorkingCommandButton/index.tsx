import { ReactElement, useState } from "react";
import "./style.css";

export interface IModelWorkingCommandButtonProps {
    actionState: boolean;
    modelWorkingCommand: string;
    onClickAction: (command: string) => void;
}

const ModelWorkingCommandButton = ({
    actionState,
    modelWorkingCommand,
    onClickAction,
}: IModelWorkingCommandButtonProps): ReactElement => {
    const buttonClass = actionState ? "model-working-command-button-inactive" : "model-working-command-button-active";
    
    const handleClick = (): void => {
        if (actionState) {
            return;
        }

        onClickAction(modelWorkingCommand);
    }

    return (
        <div className={buttonClass} onClick={handleClick}>
            {modelWorkingCommand}
        </div>
    );
};

export default ModelWorkingCommandButton;
