import { IBoardSettingsConfig, IBooleanSettingsList, INumberSettingsList } from "@components/BoardSettingsContext/meta";

export const DEFAULT_MODELS_COUNT_VALUE: number = 10;

export const DEFAULT_MIN_SPAWN_AGENTS_VALUE: number = 10;
export const DEFAULT_MAX_SPAWN_AGENTS_VALUE: number = 20;
export const DEFAULT_WORK_INTERVAL_VALUE: number = 2000;
export const DEFAULT_STATISTIC_INTERVAL_VALUE: number = 2000;
export const DEFAULT_MODEL_SOURCE_ELEMENTS_COUNT_VALUE: number = 1;
export const DEFAULT_MIN_QUEUE_CAPACITY: number = 5;
export const DEFAULT_MAX_QUEUE_CAPACITY: number = 10;
export const DEFAULT_MIN_DELAY_CAPACITY: number = 2;
export const DEFAULT_MAX_DELAY_CAPACITY: number = 40;

export const DEFAULT_DELAY_VALUE: number = 1000;
export const DEFAULT_IS_QUALITY_OF_SERVICE_ACTIVE: boolean = false;

export const DEFAULT_LOAD_FACTOR_DANGER_VALUE: number = 1;
export const DEFAULT_PACKET_LOST_DANGER_VALUE: number = 0.9;
export const DEFAULT_PING_DANGER_VALUE: number = 2000;
export const DEFAULT_JITTER_DANGER_VALUE: number = 250;

export const defaultBoardSettingsConfig: IBoardSettingsConfig = {
    numberSettingsList: {
        modelsCountValue: DEFAULT_MODELS_COUNT_VALUE,
        minSpawnAgentsValue: DEFAULT_MIN_SPAWN_AGENTS_VALUE,
        maxSpawnAgentsValue: DEFAULT_MAX_SPAWN_AGENTS_VALUE,
        workIntervalValue: DEFAULT_WORK_INTERVAL_VALUE,
        statisticIntervalValue: DEFAULT_STATISTIC_INTERVAL_VALUE,
        modelSourceElementsCountValue: DEFAULT_MODEL_SOURCE_ELEMENTS_COUNT_VALUE,
        minQueueCapacity: DEFAULT_MIN_QUEUE_CAPACITY,
        maxQueueCapacity: DEFAULT_MAX_QUEUE_CAPACITY,
        minDelayCapacity: DEFAULT_MIN_DELAY_CAPACITY,
        maxDelayCapacity: DEFAULT_MAX_DELAY_CAPACITY,
        delayValue: DEFAULT_DELAY_VALUE,
        loadFactorDangerValue: DEFAULT_LOAD_FACTOR_DANGER_VALUE,
        packetLostDangerValue: DEFAULT_PACKET_LOST_DANGER_VALUE,
        pingDangerValue: DEFAULT_PING_DANGER_VALUE,
        jitterDangerValue: DEFAULT_JITTER_DANGER_VALUE,
    },
    booleanSettingsList: {
        isQualityOfServiceActive: DEFAULT_IS_QUALITY_OF_SERVICE_ACTIVE,
    }
}

export interface IRangeSettingData {
    minValue: number;
    maxValue: number;
    step: number;
    initialValue: number;
};

export const rangeSlidersLabels: Record<keyof INumberSettingsList, string> = {
    modelsCountValue: "Models count value",
    minSpawnAgentsValue: "Minimum spawn agents value",
    maxSpawnAgentsValue: "Maximum spawn agents value",
    workIntervalValue: "Work Interval value",
    statisticIntervalValue: "Statistic interval value",
    modelSourceElementsCountValue: "Model SourceElements count value",
    minQueueCapacity: "Minimum QueueElement capacity",
    maxQueueCapacity: "Maximum QueueElement capacity",
    minDelayCapacity: "Minimum DelayElement capacity",
    maxDelayCapacity: "Maximum DelayElement capacity",
    delayValue: "Delay value",
    loadFactorDangerValue: "Load factor danger value",
    packetLostDangerValue: "Packet lost danger value",
    pingDangerValue: "Ping danger value",
    jitterDangerValue: "Jitter danger value",
}

export const toggleSlidersLabels: Record<keyof IBooleanSettingsList, string> = {
    isQualityOfServiceActive: "Quality of service status",
}

export const rangeSettingsConfig: Record<keyof INumberSettingsList, IRangeSettingData> = {
    modelsCountValue: {
        minValue: 1,
        maxValue: 10,
        step: 1,
        initialValue: DEFAULT_MODELS_COUNT_VALUE,
    },
    minSpawnAgentsValue: {
        minValue: 1,
        maxValue: 20,
        step: 1,
        initialValue: DEFAULT_MIN_SPAWN_AGENTS_VALUE,
    },
    maxSpawnAgentsValue: {
        minValue: 5,
        maxValue: 100,
        step: 1,
        initialValue: DEFAULT_MAX_SPAWN_AGENTS_VALUE,
    },
    workIntervalValue: {
        minValue: 100,
        maxValue: 10000,
        step: 100,
        initialValue: DEFAULT_WORK_INTERVAL_VALUE,
    },
    statisticIntervalValue: {
        minValue: 100,
        maxValue: 10000,
        step: 100,
        initialValue: DEFAULT_STATISTIC_INTERVAL_VALUE,
    },
    modelSourceElementsCountValue: {
        minValue: 1,
        maxValue: 10,
        step: 1,
        initialValue: DEFAULT_MODEL_SOURCE_ELEMENTS_COUNT_VALUE,
    },
    minQueueCapacity: {
        minValue: 1,
        maxValue: 25,
        step: 1,
        initialValue: DEFAULT_MIN_QUEUE_CAPACITY,
    },
    maxQueueCapacity: {
        minValue: 5,
        maxValue: 100,
        step: 1,
        initialValue: DEFAULT_MAX_QUEUE_CAPACITY,
    },
    minDelayCapacity: {
        minValue: 1,
        maxValue: 25,
        step: 1,
        initialValue: DEFAULT_MIN_DELAY_CAPACITY,
    },
    maxDelayCapacity: {
        minValue: 5,
        maxValue: 100,
        step: 1,
        initialValue: DEFAULT_MAX_DELAY_CAPACITY,
    },
    delayValue: {
        minValue: 100,
        maxValue: 10000,
        step: 100,
        initialValue: DEFAULT_DELAY_VALUE,
    },
    loadFactorDangerValue: {
        minValue: 0.5,
        maxValue: 1.5,
        step: 0.1,
        initialValue: DEFAULT_LOAD_FACTOR_DANGER_VALUE,
    },
    packetLostDangerValue: {
        minValue: 0.1,
        maxValue: 1,
        step: 0.01,
        initialValue: DEFAULT_PACKET_LOST_DANGER_VALUE,
    },
    pingDangerValue: {
        minValue: 100,
        maxValue: 10000,
        step: 100,
        initialValue: DEFAULT_PING_DANGER_VALUE,
    },
    jitterDangerValue: {
        minValue: 10,
        maxValue: 200,
        step: 10,
        initialValue: DEFAULT_JITTER_DANGER_VALUE,
    }
};