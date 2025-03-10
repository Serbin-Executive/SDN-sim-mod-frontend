import { TSendedModelsStatesList } from "@/hooks/useServerMessageHandler/meta";

export interface IBoardWorkCommandData {
    commandKey: string;
    isSendSettingsConfig: boolean;
}

export type TBoardWorkCommandsConfig = IBoardWorkCommandData[];

export type TModelsActionsStatesList = boolean[];
export type TSendCommand = any;

export interface IBoardWorkContext {
    sendedModelsStatesList: TSendedModelsStatesList;
    boardWorkCommandsConfig: TBoardWorkCommandsConfig;
    modelsActionsStatesList: TModelsActionsStatesList;
    sendCommandFunction: TSendCommand;
};


