export const INTERVAL_VALUE: number = 2000;

export const enum NetworkElementsTypes {
    SOURCE = "SourceElement",
    QUEUE = "QueueElement",
    DELAY = "DelayElement",
    SINK = "SinkElement",
}

export const enum StatisticFieldsNames {
    AGENTS_CAME_COUNT = "agentsCameCount",
    AGENTS_COUNT = "agentsCount",
    AGENTS_LEFT_COUNT = "agentsLeftCount",
    AGENTS_LOST_COUNT = "agentsLostCount",
    DELAY_VALUE = "delayValue",
    DELAY_CAPACITY = "delayCapacity",
}