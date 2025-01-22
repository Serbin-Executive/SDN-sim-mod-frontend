import { Dispatch, SetStateAction } from "react";
import { TModelsCurrentStates } from "@/hooks/useServerMessageHandler/meta";

export type TModelWorkingCommands = string[];
export type TModelsActionsStatesList = boolean[];
export type TSendCommand = any;

export interface IModelsContext {
    modelsWorkingCommands: TModelWorkingCommands;
    setModelsWorkingCommands: Dispatch<SetStateAction<TModelWorkingCommands>>;
    modelsActionsStatesList: TModelsActionsStatesList;
    setModelsActionsStatesList: Dispatch<SetStateAction<TModelsActionsStatesList>>;
    modelsStatesList: TModelsCurrentStates;
    setModelsStatesList: Dispatch<SetStateAction<TModelsCurrentStates>>;
    sendCommandFunction: TSendCommand;
}
