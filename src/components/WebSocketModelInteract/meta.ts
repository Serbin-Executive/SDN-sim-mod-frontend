export const WS_API_URL: string = "ws://localhost:3001";

export interface INetworElementState {
    id: string;
    type: string;
    statisticFields: TStatisticFields;
}

export interface IModelCurrentState {
    time: string;
    networkElementsStatesList: INetworElementState[];
}

export type TModelCurrentStates = IModelCurrentState[];
export type TModelsLastStates = IModelCurrentState[];

export type TMessageType = string;
export type TModelWorkingCommands = string[];
export type TModelsCurrentStates = IModelCurrentState[][];
export type TMessage = string;


export interface IServerMessage {
    messageType: TMessageType;
    message: TMessage | TModelWorkingCommands | IModelCurrentState;
}

export enum ServerMessageTypes {
    DEFAULT = "message",
    MODEL_COMMANDS = "model working commands",
    MODEL_STATE = "model current state",
}

export type TServerMessageType = string;
export type TClientAction = any;

export interface IStatisticField {
    fieldName: string;
    fieldValue: string;
}

export type TStatisticFields = IStatisticField[]