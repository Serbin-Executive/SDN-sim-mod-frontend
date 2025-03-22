import ModelWorkingCommandButton from "../ModelWorkingCommandButton";
import BoardWorkContext from "@context/BoardWorkContext";
import BoardSettingsContext from "@context/BoardSettingsContext";
import { type IClientMessage } from "@hooks/useWebSocket/meta";
import { type ReactElement, useContext } from "react";
import "./style.css";

const ModelWorkingCommandsMenu = (): ReactElement => {
    const {
        boardWorkCommandsConfig,
        modelsActionsStatesList,
        sendCommandFunction,
        setIsBoardControlPanelOpen,
    } = useContext(BoardWorkContext);

    const { settingsConfig } = useContext(BoardSettingsContext);

    const closeBoardControlPanel = (): void => {
        setIsBoardControlPanelOpen(false);
    };

    const handleSendCommandToServer = (
        commandKey: string,
        isSendBoardSettingsConfig: boolean,
        isCloseBoardControlPanel: boolean
    ): void => {
        sendCommandFunction({
            commandID: commandKey,
            commandInfo: isSendBoardSettingsConfig ? settingsConfig : "",
        } as IClientMessage);

        if (!isCloseBoardControlPanel) {
            return;
        }

        closeBoardControlPanel();
    };

    return (
        <div className="model-working-commands menu-container">
            {boardWorkCommandsConfig.map((boardWorkCommandData, index) => (
                <ModelWorkingCommandButton
                    key={boardWorkCommandData.commandKey}
                    actionState={modelsActionsStatesList[index]}
                    commandData={boardWorkCommandData}
                    onClickAction={handleSendCommandToServer}
                />
            ))}
        </div>
    );
};

export default ModelWorkingCommandsMenu;
