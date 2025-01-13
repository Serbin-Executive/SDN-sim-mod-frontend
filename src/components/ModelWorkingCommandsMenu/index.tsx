import { ReactElement, useContext } from "react";
import ModelWorkingCommandButton from "../ModelWorkingCommandButton";
import ModelsContext from "../ModelsContext";
import "./style.css";

const ModelWorkingCommandsMenu = (): ReactElement => {
    const {modelsActionsStatesList, modelsWorkingCommands, sendCommandFunction} = useContext(ModelsContext);
    
    return (
        <div className="model-working-commands menu-container">
            {modelsWorkingCommands.map((modelWorkingCommand, index) => (
                <ModelWorkingCommandButton
                    key={modelWorkingCommand}
                    actionState={modelsActionsStatesList[index]}
                    modelWorkingCommand={modelWorkingCommand}
                    onClickAction={sendCommandFunction}
                />
            ))}
        </div>
    );
};

export default ModelWorkingCommandsMenu;
