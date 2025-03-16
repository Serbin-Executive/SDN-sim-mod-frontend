import { Dispatch, SetStateAction } from "react";

export interface IServerBoardSettingsConfig {
    modelsCountValue: number;
    minSpawnAgentsValue: number;
    maxSpawnAgentsValue: number;
    workIntervalValue: number;
    statisticIntervalValue: number;
    modelSourceElementsCountValue: number;
    minQueueCapacity: number;
    maxQueueCapacity: number;
    minDelayCapacity: number;
    maxDelayCapacity: number;
    delayValue: number;
    loadFactorDangerValue: number;
    packetLostDangerValue: number;
    pingDangerValue: number;
    jitterDangerValue: number;
    isPartialInitialBoot: boolean;
    isQualityOfServiceActive: boolean;
}

export interface IBoardSettingsConfig {
    numberSettingsList: {
        modelsCountValue: number;
        minSpawnAgentsValue: number;
        maxSpawnAgentsValue: number;
        workIntervalValue: number;
        statisticIntervalValue: number;
        modelSourceElementsCountValue: number;
        minQueueCapacity: number;
        maxQueueCapacity: number;
        minDelayCapacity: number;
        maxDelayCapacity: number;
        delayValue: number;
        loadFactorDangerValue: number;
        packetLostDangerValue: number;
        pingDangerValue: number;
        jitterDangerValue: number;
    };
    booleanSettingsList: {
        isPartialInitialBoot: boolean;
        isQualityOfServiceActive: boolean;
    };
}

export interface INumberSettingsList {
    modelsCountValue: number;
    minSpawnAgentsValue: number;
    maxSpawnAgentsValue: number;
    workIntervalValue: number;
    statisticIntervalValue: number;
    modelSourceElementsCountValue: number;
    minQueueCapacity: number;
    maxQueueCapacity: number;
    minDelayCapacity: number;
    maxDelayCapacity: number;
    delayValue: number;
    loadFactorDangerValue: number;
    packetLostDangerValue: number;
    pingDangerValue: number;
    jitterDangerValue: number;
}

export interface IBooleanSettingsList {
    isPartialInitialBoot: boolean;
    isQualityOfServiceActive: boolean;
}

export type TSetBoardSettingConfig = Dispatch<
    SetStateAction<IBoardSettingsConfig>
>;

export interface IBoardSettingsContext {
    settingsConfig: IBoardSettingsConfig;
    setSettingsConfig: TSetBoardSettingConfig;
}
