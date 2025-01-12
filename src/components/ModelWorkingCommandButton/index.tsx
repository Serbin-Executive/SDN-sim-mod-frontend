import { ReactElement } from "react";
import "./style.css";

export interface IModelWorkingCommandButtonProps {
    modelWorkingCommand: string;
    onClickAction: (command: string) => void;
}

const ModelWorkingCommandButton = ({
    modelWorkingCommand,
    onClickAction,
}: IModelWorkingCommandButtonProps): ReactElement => {

    return (
        <div className="model-working-command-button" onClick={() => {onClickAction(modelWorkingCommand)}}>
            {modelWorkingCommand}
        </div>
    );
};

export default ModelWorkingCommandButton;
