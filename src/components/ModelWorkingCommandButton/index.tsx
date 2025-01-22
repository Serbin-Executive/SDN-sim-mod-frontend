import { ReactElement, useContext, useState } from "react";
import { TSendCommand } from "../ModelsContext/meta";
import "./style.css";

export interface IModelWorkingCommandButtonProps {
    actionState: boolean;
    modelWorkingCommand: string;
    onClickAction: TSendCommand;
}

const ModelWorkingCommandButton = ({
    actionState,
    modelWorkingCommand,
    onClickAction,
}: IModelWorkingCommandButtonProps): ReactElement => {
    const buttonClass = actionState ? "model-working-command-button-inactive" : "model-working-command-button-active";
    
    const handleClick = (): void => {
        if (actionState || !onClickAction) {
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
