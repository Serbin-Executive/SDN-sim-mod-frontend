// import { Dispatch, SetStateAction } from "react";
import { TSendedModelsStatesList } from "@/hooks/useServerMessageHandler/meta";

export type TModelWorkingCommands = string[];
export type TModelsActionsStatesList = boolean[];
export type TSendCommand = any;

export interface ISettingsConfig {
    modelsCountValue: number;
    minSpawnAgentsValue: number;
    maxSpawnAgentsValue: number;
    workIntervalValue: number;
    statisticIntervalValue: number;
    modelSourceElementsCountValue: number;
    queueCapacity: number;
    delayCapacity: number;
    delayValue: number;
    isPartialInitialBoot: boolean;
    isQualityOfServiceActive: boolean;
}

export interface IModelsContext {
    sendedModelsStatesList: TSendedModelsStatesList;
    modelWorkingCommandsList: TModelWorkingCommands;
    modelsActionsStatesList: TModelsActionsStatesList;
    settingsConfig: ISettingsConfig;
    sendCommandFunction: TSendCommand;
};


