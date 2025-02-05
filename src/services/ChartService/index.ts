import { IChartData, TChartLabels } from "@/components/LineCharts/meta";
import { TModelCurrentStates, TObjectsStatesInfo } from "@/hooks/useServerMessageHandler/meta";

export class ChartService {
    public static getChartLabels(data: TModelCurrentStates): number[] {
        return data.map((dataItem) => Number(dataItem.time));
    }

    public static getChartData(labelName: string, modelCurrentStates: TModelCurrentStates, data: number[], color: string): IChartData {
        return {
            labels: this.getChartLabels(modelCurrentStates),
            datasets: [
                {
                    label: labelName,
                    data: data,
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointBorderColor: color,
                },
            ],
        }
    }
}