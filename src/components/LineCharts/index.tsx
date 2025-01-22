import { ReactElement, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {  IChartData } from "./meta";
import { TModelCurrentStates } from "@/hooks/useServerMessageHandler/meta";
import { ModelDataService } from "@/services/ModelDataService";
import "./style.css";

ChartJS.register();

export interface IChartsListProps {
    modelID: number;
    data: TModelCurrentStates;
}

const LineCharts = ( {modelID, data} : IChartsListProps): ReactElement => {    
    const [loadFactorChartData, setLoadFactorChartData] = useState<IChartData>({
        labels: [],
        datasets: [
            {
                label: "Model efficiency from time",
                data: [],
            },
        ],
    });

    const [queueLoadChartData, setQueueLoadChartData] = useState<IChartData>({
        labels: [],
        datasets: [
            {
                label: "Queue load in time",
                data: [],
            },
        ],
    });

    useEffect(() => {
        setLoadFactorChartData({
            labels: ModelDataService.getChartLabels(data),
            datasets: [
                {
                    label: "Model load factor in time",
                    data: ModelDataService.getLoadFactorsList(data),
                },
            ],
        });

        setQueueLoadChartData({
            labels: ModelDataService.getChartLabels(data),
            datasets: [
                {
                    label: "Queue load in time",
                    data: ModelDataService.getQueueLoadList(data),
                    borderColor: "green",
                    pointBackgroundColor: "green",
                    pointBorderColor: "green",
                },
            ],
        });
    }, [data])

    return (
        <div className="charts-container">
            <div className="model-id">Model {modelID + 1}</div>
            <Line data={loadFactorChartData} />
            <Line data={queueLoadChartData} />
        </div>
    );
};

export default LineCharts;
