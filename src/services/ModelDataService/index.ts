import { IModelCurrentState, TModelCurrentStates } from "@/components/Application/meta";
import { DELAY_CAPACITY, DELAY_VALUE } from "./meta";

export class ModelDataService {
    public static getChartLabels(data: TModelCurrentStates): number[] {
        return data.map((dataItem) => Number(dataItem.time));
    }

    public static getAgentsCameInModelCount(modelCurrentState: IModelCurrentState): number {
        const networkElementList = modelCurrentState.networkElementsStatesList;

        const agentsCameInModelCount = Number(networkElementList[0].statisticFields.find((field) => field.fieldName === "agentsLeftCount")?.fieldValue) ?? 0;

        return agentsCameInModelCount;
    }

    public static getAgentsLeftThroughModelCount(modelCurrentState: IModelCurrentState): number {
        const networkElementList = modelCurrentState.networkElementsStatesList;

        const agentsLeftThroughModelCount = Number(networkElementList[networkElementList.length - 1].statisticFields.find((field) => field.fieldName === "agentsCameCount")?.fieldValue) ?? 0;

        return agentsLeftThroughModelCount;
    }

    public static getAgentsLostCount(modelCurrentState: IModelCurrentState): number {
        const networkElementList = modelCurrentState.networkElementsStatesList;

        let agentsLostCount = 0;

        networkElementList.forEach((elementInfo) => {
            if (elementInfo.type !== "QueueElement") {
                return;
            }

            elementInfo.statisticFields.forEach((field) => {
                if (field.fieldName === "agentsLostCount") {
                    agentsLostCount += Number(field.fieldValue);
                }
            })
        });

        return agentsLostCount;
    }

    public static getAgentsInModelCount(modelCurrentState: IModelCurrentState): number {
        const agentsCame = this.getAgentsCameInModelCount(modelCurrentState);
        const agentsLeft = this.getAgentsLeftThroughModelCount(modelCurrentState);
        const agentsLost = this.getAgentsLostCount(modelCurrentState);

        return agentsCame - agentsLeft - agentsLost;
    }

    public static getReceiptIntensity(modelPreviousState: IModelCurrentState, modelLastState: IModelCurrentState): number {
        const agentsCameInModelPreviousTiming: number = this.getAgentsCameInModelCount(modelPreviousState);
        const agentsCameInModelLastTiming: number = this.getAgentsCameInModelCount(modelLastState);

        return agentsCameInModelLastTiming - agentsCameInModelPreviousTiming;
    }

    public static getServiceIntensity(modelPreviousState: IModelCurrentState, modelLastState: IModelCurrentState): number {
        const agentsLeftThroughModelPreviousTiming: number = this.getAgentsLeftThroughModelCount(modelPreviousState);
        const agentsLeftThroughModelLastTiming: number = this.getAgentsLeftThroughModelCount(modelLastState);

        return agentsLeftThroughModelLastTiming - agentsLeftThroughModelPreviousTiming;
    }

    public static getLoadFactor(modelPreviousState: IModelCurrentState, modelLastState: IModelCurrentState): number {
        const receiptIntensity: number = this.getReceiptIntensity(modelPreviousState, modelLastState);

        return receiptIntensity * DELAY_VALUE / (DELAY_CAPACITY);
    }

    public static getLoadFactorsList(modelStatesList: TModelCurrentStates): number[] {
        const loadFactorList: number[] = [];

        modelStatesList.forEach((modelCurrentState: IModelCurrentState, index) => {
            if (!index) {
                loadFactorList.push(0);

                return;
            }

            const loadFactor: number = this.getLoadFactor(modelStatesList[index - 1], modelCurrentState);

            loadFactorList.push(loadFactor);
        });

        return loadFactorList;
    }

    public static getReceiptIntensityList(modelStatesList: TModelCurrentStates): number[] {
        const receiptIntensityList: number[] = [];

        modelStatesList.forEach((modelCurrentState: IModelCurrentState, index) => {
            if (!index) {
                receiptIntensityList.push(0);

                return;
            }

            const receiptIntensity: number = this.getReceiptIntensity(modelStatesList[index - 1], modelCurrentState);

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
    }
}