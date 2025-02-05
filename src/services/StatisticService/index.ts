import { IModelCurrentState, INetworElementState, TModelCurrentStates, TStateInfo } from "@/hooks/useServerMessageHandler/meta";
import { DELAY_VALUE_TO_INTERVAL_VALUE_MULTIPLIER, MILLISECONDS_MULTIPLIER, NetworkElementsTypes, StatisticFieldsNames } from "./meta";

export class StatisticService {
    public static getStatisticFieldValueByFieldName(statisticFields: TStateInfo ,fieldName: string): number {
        const statisticField = statisticFields.find((field) => field.fieldName === fieldName);

        if (!statisticField) {
            return 0;
        }

        return Number(statisticField.fieldValue);
    };

    public static getNetworkElementsListByName(networkElements: INetworElementState[], elementName: string): INetworElementState[] {
        const currentElementsList: INetworElementState[] = networkElements.filter((element) => element.type === elementName);

        return currentElementsList;
    }

    public static getAgentsCameInModelCount(modelCurrentState: IModelCurrentState): number {
        const networkElementList = modelCurrentState.networkElementsStatesList;

        const sourceElements: INetworElementState[] = this.getNetworkElementsListByName(networkElementList, NetworkElementsTypes.SOURCE);

        const agentsCameInModelCount = sourceElements.reduce((agentsCameInModelCount, element) => {
            const agentsCameCount = this.getStatisticFieldValueByFieldName(element.statisticFields, StatisticFieldsNames.AGENTS_LEFT_COUNT);

            return agentsCameInModelCount + agentsCameCount;
        }, 0);

        return agentsCameInModelCount;
    }

    public static getAgentsLeftThroughModelCount(modelCurrentState: IModelCurrentState): number {
        const networkElementList = modelCurrentState.networkElementsStatesList;

        const sinkElements: INetworElementState[] = this.getNetworkElementsListByName(networkElementList, NetworkElementsTypes.SINK);

        const agentsLeftThroughModelCount = sinkElements.reduce((agentsLeftThroughModelCount, element) => {
            const agentsLeftCount = this.getStatisticFieldValueByFieldName(element.statisticFields, StatisticFieldsNames.AGENTS_CAME_COUNT);

            return agentsLeftThroughModelCount + agentsLeftCount;
        }, 0);

        return agentsLeftThroughModelCount;
    }

    public static getAgentsLostInModelCount(modelCurrentState: IModelCurrentState): number {
        const networkElementList = modelCurrentState.networkElementsStatesList;

        const queueElements: INetworElementState[] = this.getNetworkElementsListByName(networkElementList, NetworkElementsTypes.QUEUE);

        const agentsLostInModelCount = queueElements.reduce((agentsLostInModelCount, element) => {
            const agentsLostCount = this.getStatisticFieldValueByFieldName(element.statisticFields, StatisticFieldsNames.AGENTS_LOST_COUNT);

            return agentsLostInModelCount + agentsLostCount;
        }, 0);

        return agentsLostInModelCount;
    }

    public static getAgentsInModelCount(modelCurrentState: IModelCurrentState): number {
        const agentsCameInModelCount = this.getAgentsCameInModelCount(modelCurrentState);
        const agentsLeftThroughModelCount = this.getAgentsLeftThroughModelCount(modelCurrentState);
        const agentsLostInModelCount = this.getAgentsLostInModelCount(modelCurrentState);

        return agentsCameInModelCount - agentsLeftThroughModelCount - agentsLostInModelCount;
    }

    public static getReceiptIntensity(modelLastState: IModelCurrentState): number {
        let receiptIntensity: number = 0;

        const networkElements = modelLastState.networkElementsStatesList;

        const sourceElments = this.getNetworkElementsListByName(networkElements, NetworkElementsTypes.SOURCE);

        sourceElments.forEach((sourceElement) => {
            receiptIntensity+=this.getStatisticFieldValueByFieldName(sourceElement.statisticFields, StatisticFieldsNames.AGENTS_COUNT_IN_LAST_INTERVAL);
        });

        return receiptIntensity;
    }

    public static getServiceIntensity(modelPreviousState: IModelCurrentState, modelLastState: IModelCurrentState): number {
        const agentsLeftThroughModelPreviousTiming: number = this.getAgentsLeftThroughModelCount(modelPreviousState);
        const agentsLeftThroughModelLastTiming: number = this.getAgentsLeftThroughModelCount(modelLastState);

        return agentsLeftThroughModelLastTiming - agentsLeftThroughModelPreviousTiming;
    }

    public static getDelayCapacity(modelLastState: IModelCurrentState) {
        const networkElementsList = modelLastState.networkElementsStatesList;

        const delayElements = this.getNetworkElementsListByName(networkElementsList, NetworkElementsTypes.DELAY);

        const delayCapacity: number = this.getStatisticFieldValueByFieldName(delayElements[0].statisticFields, StatisticFieldsNames.DELAY_CAPACITY);

        return delayCapacity;
    }

    public static getDelayValue(modelLastState: IModelCurrentState) {
        const networkElementsList = modelLastState.networkElementsStatesList;

        const delayElements = this.getNetworkElementsListByName(networkElementsList, NetworkElementsTypes.DELAY);

        const delayValue: number = this.getStatisticFieldValueByFieldName(delayElements[0].statisticFields, StatisticFieldsNames.DELAY_VALUE);

        return delayValue;
    }

    public static getLoadFactor(modelPreviousState: IModelCurrentState, modelLastState: IModelCurrentState): number {
        const receiptIntensity: number = this.getReceiptIntensity(modelLastState);
        const delayValue: number = this.getDelayValue(modelLastState);
        const delayCapacity: number = this.getDelayCapacity(modelLastState);

        return (receiptIntensity / DELAY_VALUE_TO_INTERVAL_VALUE_MULTIPLIER) * (delayValue / MILLISECONDS_MULTIPLIER) / delayCapacity;
    }

    public static getLoadFactorsList(modelStatesList: TModelCurrentStates): number[] {
        const loadFactorList: number[] = [];

        modelStatesList.forEach((modelCurrentState: IModelCurrentState, index) => {
            const loadFactor: number = this.getLoadFactor(modelStatesList[index - 1], modelCurrentState);

            loadFactorList.push(loadFactor);
        });

        return loadFactorList;
    }

    public static getReceiptIntensityList(modelStatesList: TModelCurrentStates): number[] {
        const receiptIntensityList: number[] = [];

        modelStatesList.forEach((modelCurrentState: IModelCurrentState, index) => {
            const receiptIntensity: number = this.getReceiptIntensity(modelCurrentState);

            receiptIntensityList.push(receiptIntensity);
        });

        return receiptIntensityList;
    }

    public static getServiceIntensityList(modelStatesList: TModelCurrentStates): number[] {
        const serviceIntensityList: number[] = [];

        modelStatesList.forEach((modelCurrentState: IModelCurrentState, index) => {
            if (!index) {
                serviceIntensityList.push(0);

                return;
            }

            const receiptIntensity: number = this.getServiceIntensity(modelStatesList[index - 1], modelCurrentState);

            serviceIntensityList.push(receiptIntensity);
        });

        return serviceIntensityList;
    };

    public static getQueueLoadList(modelStatesList: TModelCurrentStates): number[] {
        const queueLoadList: number[] = [];

        modelStatesList.forEach((modelCurrentState) => {
            const networkElements = modelCurrentState.networkElementsStatesList;

            const queueElements = networkElements.filter((element) => element.type === NetworkElementsTypes.QUEUE);

            queueElements.forEach((element) => {
                const agentsCount = this.getStatisticFieldValueByFieldName(element.statisticFields, StatisticFieldsNames.AGENTS_COUNT);

                queueLoadList.push(agentsCount)
            });
        });

        return queueLoadList;
    }
}