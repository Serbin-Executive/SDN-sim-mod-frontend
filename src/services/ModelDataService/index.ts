import { IModelCurrentState } from "@/components/Application/meta";

export class ModelDataService {
    public static getAgentsCameInModelCount(lastModelCurrentState: IModelCurrentState): number {
        const networkElementList  = lastModelCurrentState.networkElementsStatesList;

        const agentsCameInModelCount = Number(networkElementList[0].statisticFields.find((field) => field.fieldName === "agentsLeftCount")?.fieldValue) ?? 0;

        return agentsCameInModelCount;
    }

    public static getAgentsLeftThroughModelCount(lastModelCurrentState: IModelCurrentState): number {
        const networkElementList = lastModelCurrentState.networkElementsStatesList;

        const agentsLeftThroughModelCount = Number(networkElementList[networkElementList.length - 1].statisticFields.find((field) => field.fieldName === "agentsCameCount")?.fieldValue) ?? 0;

        return agentsLeftThroughModelCount;
    }

    public static getAgentsInModelCount(lastModelCurrentState: IModelCurrentState): number {
        const agentsCame = this.getAgentsCameInModelCount(lastModelCurrentState);
        const agentsLeft = this.getAgentsLeftThroughModelCount(lastModelCurrentState);

        return agentsCame - agentsLeft;
    }

    public static getAgentsLostCount(lastModelCurrentState: IModelCurrentState): number {
        const networkElementList = lastModelCurrentState.networkElementsStatesList;
        
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


}