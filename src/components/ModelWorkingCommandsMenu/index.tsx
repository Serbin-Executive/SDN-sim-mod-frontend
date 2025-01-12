import { ReactElement } from "react";
import ModelWorkingCommandButton from "../ModelWorkingCommandButton";
import { TModelsActionsStatesList, TModelWorkingCommands } from "../WebSocketModelInteract/meta";
import { TSendMessage } from "../../hooks/useWebSocket/meta";
import "./style.css";

export interface IModelWorkingCommandsMenuProps {
    actionsStatesList: TModelsActionsStatesList;
    data: TModelWorkingCommands;
    completeCommandFunction: TSendMessage;
}

const ModelWorkingCommandsMenu = ({actionsStatesList, data, completeCommandFunction}: IModelWorkingCommandsMenuProps): ReactElement => (
    <div className="model-working-commands menu-container">
        {data.map((modelWorkingCommand, index) => (
                    <ModelWorkingCommandButton
                        key={modelWorkingCommand}
                        actionState={actionsStatesList[index]}
                        modelWorkingCommand={modelWorkingCommand}
                        onClickAction={completeCommandFunction}
                    />
                ))}
    </div>
)

export default ModelWorkingCommandsMenu;