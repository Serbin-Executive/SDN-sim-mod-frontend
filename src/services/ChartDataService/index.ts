import { TModelCurrentStates } from "../../components/WebSocketModelInteract/meta";

export class ChartDataService {
    public static getChartLabels(data: TModelCurrentStates): number[] {
        return data.map((dataItem) => Number(dataItem.time));
    }

    public static getChartDatasetModelEfficiency(data: TModelCurrentStates): number[] {
        const modelEfficiencyList: number[] = [];

        data.forEach((currentState) => {
            let currentAgentsCameModel: number = 0;
            let currentAgentsLeftModel: number = 0;

            currentState.networkElementsStatesList.forEach((elementState) => {
                if (elementState.type !== "SourceElement") {
                    return;
                }

                const agentsLeftCount = elementState.statisticFields.find((field) => field.fieldName === "agentsLeftCount"
                );

                if (!agentsLeftCount) {
                    console.error("Error on get models current states");

                    return;
                }

                currentAgentsCameModel += Number(agentsLeftCount.fieldValue);
            })

            currentState.networkElementsStatesList.forEach((elementState) => {
                if (elementState.type !== "SinkElement") {
                    return;
                }

                const agentsCameCount = elementState.statisticFields.find((field) => field.fieldName === "agentsCameCount"
                );

                if (!agentsCameCount) {
                    console.error("Error on get models current states");

                    return;
                }

                currentAgentsLeftModel += Number(agentsCameCount.fieldValue);

            })

            modelEfficiencyList.push(currentAgentsLeftModel / currentAgentsCameModel)
        })

        return modelEfficiencyList;
    }
}