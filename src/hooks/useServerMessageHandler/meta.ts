import { ReactElement, ReactNode } from "react";

export interface IStateInfoField {
    fieldName: string;
    fieldValue: string;
}

export type TStateInfo = IStateInfoField[];
export type TStatesInfo = TStateInfo[];
export type TObjectsStatesInfo = TStatesInfo[];

export interface INetworElementState {
    id: string;
    type: string;
    statisticFields: TStateInfo;
}

export interface IModelCurrentState {
    time: string;
    networkElementsStatesList: INetworElementState[];
}

export type TModelCurrentStates = IModelCurrentState[];
export type TModelsLastStates = IModelCurrentState[];
export type TModelsCurrentStates = TModelCurrentStates[];

export type TMessageType = string;
export type TModelWorkingCommands = string[];
export type TMessage = string;


export interface IServerMessage {
    messageType: TMessageType;
    message: TMessage | TModelWorkingCommands | IModelCurrentState;
}

export const enum ServerMessageTypes {
    MESSAGE = "message",
    MODELS_WORKING_COMMANDS = "models working commands",
    MODELS_STATES = "models states",
    MODELS_ACTIONS_STATES = "models actions states",
    CLEAR_CHARTS = "clear charts",
}

export type TServerMessageType = string;
export type TClientAction = any;

export type TModelsActionsStatesList = boolean[];

export type TLayout = ReactElement;

