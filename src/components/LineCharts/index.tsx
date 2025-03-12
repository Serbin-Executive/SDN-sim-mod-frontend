import { ReactElement, useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {  ChartColors, ChartLabelsNames, IChartData } from "./meta";
import { ChartService } from "@/services/ChartService";
import {  TSendedChartsDataList } from "@/hooks/useServerMessageHandler/meta";
import "./style.css";

ChartJS.register();

export const enum ChartDataTypes {
    LOAD_FACTOR = "loadFactor",
    QUEUE_LOAD = "queueLoad",
}

export interface IChartsListProps {
    modelID: number;
    chartsDataList: TSendedChartsDataList;
}

const LineCharts = ( {modelID, chartsDataList} : IChartsListProps): ReactElement => {
    const loadFactorChartData: IChartData =  ChartService.getChartData(ChartLabelsNames.LOAD_FACTOR_FROM_TIME, chartsDataList, ChartDataTypes.LOAD_FACTOR, ChartColors.BLUE);
    const queueLoadChartData: IChartData = ChartService.getChartData(ChartLabelsNames.QUEUE_LOAD_FROM_TIME, chartsDataList, ChartDataTypes.QUEUE_LOAD, ChartColors.GREEN);

    return (
        <div className="charts-container">
            <div className="model-id">Model {modelID + 1}</div>
            <Line data={loadFactorChartData} />
            <Line data={queueLoadChartData} />
        </div>
    );
};

export default LineCharts;
