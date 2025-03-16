import ModelWorkingCommandButton from "../ModelWorkingCommandButton";
import BoardWorkContext from "../BoardWorkContext";
import BoardSettingsContext from "../BoardSettingsContext";
import { IClientMessage } from "@/hooks/useWebSocket/meta";
import { ReactElement, useContext } from "react";
import { getServerSettingsConfigByClientConfig } from "./meta";
import "./style.css";

const ModelWorkingCommandsMenu = (): ReactElement => {
    const {
        boardWorkCommandsConfig,
        modelsActionsStatesList,
        sendCommandFunction,
    } = useContext(BoardWorkContext);

    const { settingsConfig } = useContext(BoardSettingsContext);

    const sendCommandToServer = (
        commandKey: string,
        isSendBoardSettingsConfig: boolean
    ): void => {
        sendCommandFunction({
            commandID: commandKey,
            commandInfo: isSendBoardSettingsConfig ? getServerSettingsConfigByClientConfig(settingsConfig) : "",
        } as IClientMessage);
    };

    return (
        <div className="model-working-commands menu-container">
            {boardWorkCommandsConfig.map((boardWorkCommandData, index) => (
                <ModelWorkingCommandButton
                    key={boardWorkCommandData.commandKey}
                    actionState={modelsActionsStatesList[index]}
                    commandData={boardWorkCommandData}
                    onClickAction={sendCommandToServer}
                />
            ))}
        </div>
    );
};

export default ModelWorkingCommandsMenu;
