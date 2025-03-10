import { IChartData, TChartLabels } from "@/components/LineCharts/meta";
import { ISendedChartsData, TSendedChartsDataList } from "@/hooks/useServerMessageHandler/meta";

export class ChartService {
    public static getVisibleData(data: any[], chartsDotsCount: number): any[] {
        const firstIndex: number = Math.max(0, data.length - chartsDotsCount);

        return data.slice(firstIndex, data.length);
    }

    public static getChartLabels(chartsDataList: TSendedChartsDataList, isChartsCurrentDotsViewType: boolean, chartsDotsCount: number): TChartLabels {
        const chartLabels = chartsDataList.map((chartsData) => Number(chartsData.time));

        if (!isChartsCurrentDotsViewType) {
            return chartLabels;
        }

        return this.getVisibleData(chartLabels, chartsDotsCount);
    }

    public static getChartValues(chartsDataList: TSendedChartsDataList, chartDataType: keyof ISendedChartsData, isChartsCurrentDotsViewType: boolean, chartsDotsCount: number): number[] {
        const chartValues = chartsDataList.map((chartsData) => Number(chartsData[chartDataType]));

        if (!isChartsCurrentDotsViewType) {
            return chartValues;
        }

        return this.getVisibleData(chartValues, chartsDotsCount);
    }

    public static getChartData(labelName: string, chartsDataList: TSendedChartsDataList, chartDataType: keyof ISendedChartsData, color: string, isChartsCurrentDotsViewType: boolean, chartsDotsCount: number): IChartData {
        const chartLabels = this.getChartLabels(chartsDataList, isChartsCurrentDotsViewType, chartsDotsCount);
        const chartValues = this.getChartValues(chartsDataList, chartDataType, isChartsCurrentDotsViewType, chartsDotsCount);

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