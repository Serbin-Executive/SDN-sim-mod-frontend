import { TBoardCapacities, TSendedModelsStatesList } from "@hooks/useServerMessageHandler/meta";
import { type Dispatch, type SetStateAction } from "react";

export interface IBoardWorkCommandData {
    commandKey: string;
    isSendSettingsConfig: boolean;
}

export type TBoardWorkCommandsConfig = IBoardWorkCommandData[];

export type TModelsActionsStatesList = boolean[];
export type TSendCommand = any;

export interface IBoardWorkContext {
    sendedModelsStatesList: TSendedModelsStatesList;
    setSendedModelsStatesList: Dispatch<SetStateAction<TSendedModelsStatesList>>;
    boardWorkCommandsConfig: TBoardWorkCommandsConfig;
    setBoardWorkCommandsConfig: Dispatch<SetStateAction<TBoardWorkCommandsConfig>>;
    modelsActionsStatesList: TModelsActionsStatesList;
    setModelsActionsStatesList: Dispatch<SetStateAction<TModelsActionsStatesList>>;
    boardCapacitiesList: TBoardCapacities;
    setBoardCapacitiesList: Dispatch<SetStateAction<TBoardCapacities>>;
    sendCommandFunction: TSendCommand;
};


