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
    BOARD_CAPACITIES_LIST = "board capacities list",
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

export interface IModelRating {
    currentValue: number;
    maximumValue: number;
    info: string;
}

export interface IModelRatingInfo {
    queue: IModelRating;
    delay: IModelRating;
    general: IModelRating;
}

export type TModelsRatings = IModelRatingInfo[];

export const enum ModelRatingInfoList {
    QUEUE = "This model queue efficiency rating relatively to maximum efficiency in this experiment",
    DELAY = "This model delay efficiency rating relatively to maximum efficiency in this experiment",
    GENERAL = "This model general efficiency rating relatively to maximum efficiency in this experiment",
}
