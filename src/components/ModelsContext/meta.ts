// import { Dispatch, SetStateAction } from "react";
import { TModelsCurrentStates, TObjectsStatesInfo } from "@/hooks/useServerMessageHandler/meta";

export type TModelWorkingCommands = string[];
export type TModelsActionsStatesList = boolean[];
export type TSendCommand = any;

export interface IModelsContext {
    modelsStatesList: TModelsCurrentStates;
    modelWorkingCommandsList: TModelWorkingCommands;
    modelsActionsStatesList: TModelsActionsStatesList;
    sendCommandFunction: TSendCommand;
}
