import { IBoardSettingsConfig, IServerBoardSettingsConfig } from "../BoardSettingsContext/meta";

export const getServerSettingsConfigByClientConfig = (
    clientConfig: IBoardSettingsConfig
): IServerBoardSettingsConfig => {
    return {
        modelsCountValue: clientConfig.numberSettingsList.modelsCountValue,
        minSpawnAgentsValue:
            clientConfig.numberSettingsList.minSpawnAgentsValue,
        maxSpawnAgentsValue:
            clientConfig.numberSettingsList.maxSpawnAgentsValue,
        workIntervalValue: clientConfig.numberSettingsList.workIntervalValue,
        statisticIntervalValue:
            clientConfig.numberSettingsList.statisticIntervalValue,
        modelSourceElementsCountValue:
            clientConfig.numberSettingsList.modelSourceElementsCountValue,
        minQueueCapacity: clientConfig.numberSettingsList.minQueueCapacity,
        maxQueueCapacity: clientConfig.numberSettingsList.maxQueueCapacity,
        minDelayCapacity: clientConfig.numberSettingsList.minDelayCapacity,
        maxDelayCapacity: clientConfig.numberSettingsList.maxDelayCapacity,
        delayValue: clientConfig.numberSettingsList.delayValue,
        loadFactorDangerValue:
            clientConfig.numberSettingsList.loadFactorDangerValue,
        pingDangerValue: clientConfig.numberSettingsList.pingDangerValue,
        jitterDangerValue: clientConfig.numberSettingsList.jitterDangerValue,
        isPartialInitialBoot:
            clientConfig.booleanSettingsList.isPartialInitialBoot,
        isQualityOfServiceActive:
            clientConfig.booleanSettingsList.isQualityOfServiceActive,
    } as IServerBoardSettingsConfig;
};