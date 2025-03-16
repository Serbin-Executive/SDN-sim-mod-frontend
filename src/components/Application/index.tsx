import API from "@api/index";
import useWebSocket from "@hooks/useWebSocket";
import ChartContext from "@components/ChartsContext";
import useBoardSettings from "@hooks/useBoardSettings";
import useChartsContext from "@hooks/useChartsContext";
import ModelsInfoList from "@components/ModelsInfoList";
import BoardWorkContext from "@components/BoardWorkContext";
import BoardControlPanel from "@components/BoardControlPanel";
import BoardSettingsContext from "@components/BoardSettingsContext";
import useServerMessageHandler from "@hooks/useServerMessageHandler";
import WebSocketConnectByUrl from "@components/WebSocketConnectByUrl";
import ExcelFileDownloadRequest from "@components/ExcelFileDownloadRequest";
import { LayoutsByUserType, UserStatuses } from "./meta";
import { type TUserStatus } from "./meta";
import { Fragment, ReactElement, useEffect, useState } from "react";
import "./style.css";

const Application = (): ReactElement => {
    const [userStatus, setUserStatus] = useState<TUserStatus>(
        UserStatuses.USER
    );
    const [webSocketUrl, setWebSocketUrl] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [areUrlChecking, setAreUrlChecking] = useState<boolean>(false);
    const [checkingError, setCheckingError] = useState<any>(null);

    const [statLength, setStatLength] = useState<number>(0);

    const {
        isChartsCurrentDotsViewType,
        chartsDotsCount,
        setIsChartsCurrentDotsViewType,
        setChartsDotsCount,
    } = useChartsContext();
    const {
        boardWorkCommandsConfig,
        setBoardWorkCommandsConfig,
        modelsActionsStatesList,
        setModelsActionsStatesList,
        sendedModelsStatesList,
        setSendedModelsStatesList,
        handleMessageFromServer,
        deleteFirstModelsStates,
        queueCapacitiesList,
    } = useServerMessageHandler(setUserStatus, setStatLength);
    const { configure, sendMessage } = useWebSocket(
        webSocketUrl,
        handleMessageFromServer
    );

    useEffect(() => {
        if (!statLength) {
            return;
        }

        if (!isChartsCurrentDotsViewType) {
            return;
        }

        if (statLength <= chartsDotsCount) {
            return;
        }

        deleteFirstModelsStates();

        setStatLength(statLength - 1);
    }, [sendedModelsStatesList]);

    const { settingsConfig, setSettingsConfig } = useBoardSettings();

    const createConfigure = async () => {
        if (webSocketUrl === "") {
            console.info("CANNOT CONNECT WITH EMPTY URL");

            return;
        }

        try {
            setCheckingError(null);
            setAreUrlChecking(true);

            const connectionAccess: boolean =
                await API.getAccessWsConnectionByUrl(webSocketUrl);

            if (!connectionAccess) {
                console.info("FAIL CONNECTION URL");

                return;
            }

            configure();

            setIsConnected(true);
        } catch (error) {
            console.info("FAIL HTTP REQUEST");

            setCheckingError(error);
        } finally {
            setAreUrlChecking(false);
        }
    };

    if (areUrlChecking) {
        return <h2>CHECKING URL...</h2>;
    }

    if (checkingError) {
        return <h2>Unable to check url {checkingError?.message}</h2>;
    }

    const Render = LayoutsByUserType[userStatus];

    return (
        <BoardWorkContext.Provider
            value={{
                sendedModelsStatesList: sendedModelsStatesList,
                setSendedModelsStatesList: setSendedModelsStatesList,
                boardWorkCommandsConfig: boardWorkCommandsConfig,
                setBoardWorkCommandsConfig: setBoardWorkCommandsConfig,
                modelsActionsStatesList: modelsActionsStatesList,
                setModelsActionsStatesList: setModelsActionsStatesList,
                sendCommandFunction: sendMessage,
                queueCapacitiesList: queueCapacitiesList,
            }}
        >
            <BoardSettingsContext.Provider
                value={{
                    settingsConfig: settingsConfig,
                    setSettingsConfig: setSettingsConfig,
                }}
            >
                <ChartContext.Provider
                    value={{
                        isChartsCurrentDotsViewType:
                            isChartsCurrentDotsViewType,
                        chartsDotsCount: chartsDotsCount,
                        setIsChartsCurrentDotsViewType:
                            setIsChartsCurrentDotsViewType,
                        setChartsDotsCount: setChartsDotsCount,
                    }}
                >
                    <Render asideComponent={<BoardControlPanel />}>
                        <Fragment>
                            <WebSocketConnectByUrl
                                webSocketUrl={webSocketUrl}
                                setWebSocketUrl={setWebSocketUrl}
                                isConnected={isConnected}
                                connectFunction={createConfigure}
                            />
                            <ModelsInfoList />
                            <ExcelFileDownloadRequest />
                        </Fragment>
                    </Render>
                </ChartContext.Provider>
            </BoardSettingsContext.Provider>
        </BoardWorkContext.Provider>
    );
};

export default Application;
