import { ReactElement, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {  IChartData } from "./meta";
import { TModelCurrentStates } from "../Application/meta";
import { ChartDataService } from "../../services/ChartDataService";
import "./style.css";

ChartJS.register();

export interface IChartsListProps {
    modelID: number;
    data: TModelCurrentStates;
}

const LineChart = ( {modelID, data} : IChartsListProps): ReactElement => {    
    const [chartData, setChartData] = useState<IChartData>({
        labels: [],
        datasets: [
            {
                label: "Model efficiency from time",
                data: [],
            },
        ],
    });

    useEffect(() => {
        setChartData({
            labels: ChartDataService.getChartLabels(data),
            datasets: [
                {
                    label: "Model efficiency from time",
                    data: ChartDataService.getChartDatasetModelEfficiency(data),
                },
            ],
        })
    }, [data])

    return (
        <div className="charts-container">
            <div className="model-id">Model {modelID + 1}</div>
            <Line data={chartData} />
        </div>
    );
};

export default LineChart;
