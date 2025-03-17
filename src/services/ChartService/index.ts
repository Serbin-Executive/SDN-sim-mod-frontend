import { IChartData, TChartLabels } from "@components/LineCharts/meta";
import { ISendedChartsData, TSendedChartsDataList } from "@hooks/useServerMessageHandler/meta";

export const MILLISECONDS_TO_SECONDS_MULTIPLIER: number = 1000;

export class ChartService {
    public static getChartLabels(chartsDataList: TSendedChartsDataList): TChartLabels {
        const chartLabels = chartsDataList.map((chartsData) => Number(chartsData.time));

        return chartLabels;
    }

    public static getChartValues(
        chartsDataList: TSendedChartsDataList,
        chartDataType: keyof ISendedChartsData
    ): number[] {
        const chartValues = chartsDataList.map((chartsData) =>
            Number(chartsData[chartDataType])
        );

        return chartValues;
    }

    public static getChartData(
        labelName: string,
        chartsDataList: TSendedChartsDataList,
        chartDataType: keyof ISendedChartsData,
        color: string
    ): IChartData {
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
        };
    }
}
