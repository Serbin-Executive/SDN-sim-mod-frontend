import { ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {  ChartColors, ChartLabelsNames, IChartData } from "./meta";
import { StatisticService } from "@/services/StatisticService";
import { ChartService } from "@/services/ChartService";
import "./style.css";
import { TModelCurrentStates } from "@/hooks/useServerMessageHandler/meta";

ChartJS.register();

export interface IChartsListProps {
    modelID: number;
    modelStatesList: TModelCurrentStates;
}

const LineCharts = ( {modelID, modelStatesList} : IChartsListProps): ReactElement => {

    const loadFactorChartData: IChartData =  ChartService.getChartData(ChartLabelsNames.LOAD_FACTOR_FROM_TIME, modelStatesList, StatisticService.getLoadFactorsList(modelStatesList), ChartColors.BLUE);
    const queueLoadChartData: IChartData = ChartService.getChartData(ChartLabelsNames.QUEUE_LOAD_FROM_TIME, modelStatesList, StatisticService.getQueueLoadList(modelStatesList), ChartColors.GREEN);

    return (
        <div className="charts-container">
            <div className="model-id">Model {modelID + 1}</div>
            <Line data={loadFactorChartData} />
            <Line data={queueLoadChartData} />
        </div>
    );
};

export default LineCharts;
