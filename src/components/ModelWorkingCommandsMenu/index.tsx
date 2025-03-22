import * as XLSX from "xlsx";
import API from "@api/index";
import ModelWorkingCommandButton from "@components/ModelWorkingCommandButton";
import ControlButton from "@components/ControlButton";
import BoardWorkContext from "@context/BoardWorkContext";
import BoardSettingsContext from "@context/BoardSettingsContext";
import { type IClientMessage } from "@hooks/useWebSocket/meta";
import { type ReactElement, useContext } from "react";
import { setIsLoading } from "@store/slices/application";
import {
    EXCEL_FILE_NAME,
    getWorkbook,
} from "@components/ExcelFileDownloadRequest/meta";
import { useDispatch } from "react-redux";
import "./style.css";
import useNotifications from "@hooks/useNotifications";
import { AlertTypes } from "@domains/Alert";

const DOWNLOAD_ICON_SIZE: number = 20;

const ModelWorkingCommandsMenu = (): ReactElement => {
    const dispatch = useDispatch();

    const { createAlert } = useNotifications();
    const {
        boardWorkCommandsConfig,
        modelsActionsStatesList,
        sendCommandFunction,
        setIsBoardControlPanelOpen,
    } = useContext(BoardWorkContext);
    const { setIsAccessGetResults, settingsConfig, isAccessGetResults } =
        useContext(BoardSettingsContext);

    const closeBoardControlPanel = (): void => {
        setIsBoardControlPanelOpen(false);
    };

    const handleSendCommandToServer = (
        commandKey: string,
        isSendBoardSettingsConfig: boolean,
        isCloseBoardControlPanel: boolean,
        isAccessGetResults: boolean
    ): void => {
        sendCommandFunction({
            commandID: commandKey,
            commandInfo: isSendBoardSettingsConfig ? settingsConfig : "",
        } as IClientMessage);

        setIsAccessGetResults(isAccessGetResults);

        if (!isCloseBoardControlPanel) {
            return;
        }

        closeBoardControlPanel();
    };

    const loadControllersStatesList = async () => {
        try {
            dispatch(setIsLoading(true));

            const data = await API.getModelsControllerParametersLists();

            const workbook = getWorkbook(data);

            XLSX.writeFile(workbook, EXCEL_FILE_NAME, { compression: true });
        } catch (error) {
            createAlert({
                title: "Download status",
                message: "Error on download result of experiment",
                type: AlertTypes.ERROR,
            });
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const download = (): void => {
        loadControllersStatesList();
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
            <ControlButton
                onClick={download}
                title={
                    <img
                        src="assets/images/icons/download.svg"
                        alt="download"
                        width={DOWNLOAD_ICON_SIZE}
                        height={DOWNLOAD_ICON_SIZE}
                    />
                }
                isActive={isAccessGetResults}
            />
        </div>
    );
};

export default ModelWorkingCommandsMenu;
