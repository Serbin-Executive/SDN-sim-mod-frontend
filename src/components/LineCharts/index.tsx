import { type TSendedChartsDataList } from "@hooks/useServerMessageHandler/meta";
import {
    ChartColors,
    ChartLabelsNames,
    LOAD_FACTOR_AXIS_TITLE,
    QUEUE_LOAD_AXIS_TITLE,
    TIME_AXIS_TITLE,
    type IChartData,
} from "./meta";
import { ChartService } from "@services/ChartService";
import { Chart as ChartJS } from "chart.js/auto";
import { type ReactElement } from "react";
import { Line } from "react-chartjs-2";
import "./style.css";

ChartJS.register();

export const enum ChartDataTypes {
    LOAD_FACTOR = "loadFactor",
    QUEUE_LOAD = "queueLoad",
}

export interface IChartsListProps {
    modelID: number;
    chartsDataList: TSendedChartsDataList;
    queueCapacity: number;
}

const LineCharts = ({
    modelID,
    chartsDataList,
    queueCapacity,
}: IChartsListProps): ReactElement => {
    const loadFactorChartData: IChartData = ChartService.getChartData(
        ChartLabelsNames.LOAD_FACTOR_FROM_TIME,
        chartsDataList,
        ChartDataTypes.LOAD_FACTOR,
        ChartColors.BLUE
    );

    const queueLoadChartData: IChartData = ChartService.getChartData(
        ChartLabelsNames.QUEUE_LOAD_FROM_TIME,
        chartsDataList,
        ChartDataTypes.QUEUE_LOAD,
        ChartColors.GREEN
    );

    return (
        <div className="charts-container">
            <div className="model-id">Model {modelID + 1}</div>
            <Line
                data={loadFactorChartData}
                options={{
                    animation: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: TIME_AXIS_TITLE,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: LOAD_FACTOR_AXIS_TITLE,
                            },
                        },
                    },
                }}
            />
            <Line
                data={queueLoadChartData}
                options={{
                    animation: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: TIME_AXIS_TITLE,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: QUEUE_LOAD_AXIS_TITLE,
                            },
                            beginAtZero: true,
                            max: queueCapacity,
                        },
                    },
                }}
            />
        </div>
    );
};

export default LineCharts;
