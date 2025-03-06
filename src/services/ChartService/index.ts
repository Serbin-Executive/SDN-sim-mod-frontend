import { IChartData, TChartLabels } from "@/components/LineCharts/meta";
import { TModelCurrentStates, TObjectsStatesInfo } from "@/hooks/useServerMessageHandler/meta";
import { CHART_VISIBLE_DOTS_COUNT } from "./meta";

export class ChartService {
    public static getChartLabels(data: TModelCurrentStates): TChartLabels {
        return data.map((dataItem) => Number(dataItem.time));
    }

    public static getVisibleData(data: any[]): any[] {
        const firstIndex: number = Math.max(0, data.length - CHART_VISIBLE_DOTS_COUNT);

        return data.slice(firstIndex, data.length);
    }

    public static getChartData(labelName: string, modelCurrentStates: TModelCurrentStates, data: number[], color: string): IChartData {
        const visibleChartLabels = this.getVisibleData(this.getChartLabels(modelCurrentStates));
        const visibleData = this.getVisibleData(data);


        return {
            labels: visibleChartLabels,
            datasets: [
                {
                    label: labelName,
                    data: visibleData,
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointBorderColor: color,
                },
            ],
        }
    }
}