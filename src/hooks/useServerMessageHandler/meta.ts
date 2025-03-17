import { type ReactElement } from "react";

export type TMessageType = string;
export type TMessage = string;

export interface IServerMessage {
    messageType: TMessageType;
    message: TMessage | ISendedModelsStateList | ISendedModelsStateList;
}

export const enum ServerMessageTypes {
    MESSAGE = "message",
    BOARD_WORKING_COMMANDS = "board working commands",
    MODELS_STATES = "models states",
    BOARD_ACTIONS_STATES = "board actions states",
    CLEAR_CHARTS = "clear charts",
    MODELS_QUEUE_CAPACITIES = "models queue capacities",
    BOARD_SETTINGS_CONFIG = "board settings config",
    BOARD_SETTINGS_CONFIG_RANGES = "board settings config ranges",
}

export type TServerMessageType = string;
export type TClientAction = any;

export type TModelsActionsStatesList = boolean[];

export type TLayout = ReactElement;

export interface ISendedChartsData {
    time: string;
    loadFactor: string;
    queueLoad: string;
}

export type TSendedChartsDataList = ISendedChartsData[];

export interface ISendedModelAdditionalInfo {
    agentsCameInModelCount: string;
    agentsLeftThroughModelCount: string;
    agentsInModelCount: string;
    agentsLostCount: string;
}

export type TSendedModelsAdditionalInfoList = ISendedModelAdditionalInfo[];

export interface ISendedModelsStateList {
    sendedChartsDataList: TSendedChartsDataList;
    sendedModelsAdditionalInfoList: TSendedModelsAdditionalInfoList;
}

export type TSendedModelsStatesList = ISendedModelsStateList[];
