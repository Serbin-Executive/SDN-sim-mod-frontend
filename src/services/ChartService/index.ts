import { IChartData, TChartLabels } from "@/components/LineCharts/meta";
import { ISendedChartsData, TSendedChartsDataList } from "@/hooks/useServerMessageHandler/meta";
import { CHART_VISIBLE_DOTS_COUNT } from "./meta";

export class ChartService {
    public static getVisibleData(data: any[]): any[] {
        const firstIndex: number = Math.max(0, data.length - CHART_VISIBLE_DOTS_COUNT);

        return data.slice(firstIndex, data.length);
    }

    public static getChartLabels(chartsDataList: TSendedChartsDataList): TChartLabels {
        const chartLabels = chartsDataList.map((chartsData) => Number(chartsData.time));

        return this.getVisibleData(chartLabels);
    }

    public static getChartValues(chartsDataList: TSendedChartsDataList, chartDataType: keyof ISendedChartsData): number[] {
        const chartValues = chartsDataList.map((chartsData) => Number(chartsData[chartDataType]));

        return this.getVisibleData(chartValues);
    }

    public static getChartData(labelName: string, chartsDataList: TSendedChartsDataList, chartDataType: keyof ISendedChartsData, color: string): IChartData {
        const chartLabels = this.getChartLabels(chartsDataList);
        const chartValues = this.getChartValues(chartsDataList, chartDataType);

        return {
            labels: chartLabels,
            datasets: [
                {
                    label: labelName,
                    data: chartValues,
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointBorderColor: color,
                },
            ],
        }
    }
}