import { ReactElement } from "react";
import ModelWorkingCommandButton from "../ModelWorkingCommandButton";
import { TModelWorkingCommands } from "../WebSocketModelInteract/meta";
import { TSendMessage } from "../../hooks/useWebSocket/meta";
import "./style.css";

export interface IModelWorkingCommandsMenuProps {
    data: TModelWorkingCommands;
    completeCommandFunction: TSendMessage;
}

const ModelWorkingCommandsMenu = ({data, completeCommandFunction}: IModelWorkingCommandsMenuProps): ReactElement => (
    <div className="model-working-commands menu-container">
        {data.map((modelWorkingCommand) => (
                    <ModelWorkingCommandButton
                        key={modelWorkingCommand}
                        modelWorkingCommand={modelWorkingCommand}
                        onClickAction={completeCommandFunction}
                    />
                ))}
    </div>
)

export default ModelWorkingCommandsMenu;