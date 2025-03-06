export const DEFAULT_MODELS_COUNT_VALUE: number = 1;

export const DEFAULT_MIN_SPAWN_AGENTS_VALUE: number = 8;
export const DEFAULT_MAX_SPAWN_AGENTS_VALUE: number = 14;
export const DEFAULT_WORK_INTERVAL_VALUE: number = 2000;
export const DEFAULT_STATISTIC_INTERVAL_VALUE: number = 5000;
export const DEFAULT_MODEL_SOURCE_ELEMENTS_COUNT_VALUE: number = 1;
export const DEFAULT_QUEUE_CAPACITY: number = 10;
export const DEFAULT_DELAY_CAPACITY: number = 5;
export const DEFAULT_DELAY_VALUE: number = 1000;
export const DEFAULT_IS_PARTIAL_INITIAL_BOOT: boolean = false;
export const DEFAULT_IS_QUALITY_OF_SERVICE_ACTIVE: boolean = false;

export interface ISettingRange {
    minValue: number;
    maxValue: number;
};

export const settingsRangeListRecord: Record<string, ISettingRange> = {
    modelsCountValue: {
        minValue: 1,
        maxValue: 10,
    },
    minSpawnAgentsValue: {
        minValue: 1,
        maxValue: 20,
    },
    maxSpawnAgentsValue: {
        minValue: 30,
        maxValue: 100,
    },
    workIntervalValue: {
        minValue: 100,
        maxValue: 10000,
    },
    statisticIntervalValue: {
        minValue: 100,
        maxValue: 10000,
    },
    modelSourceElementsCountValue: {
        minValue: 1,
        maxValue: 10,
    },
    queueCapacity: {
        minValue: 1,
        maxValue: 50,
    },
    delayCapacity: {
        minValue: 1,
        maxValue: 50,
    },
};