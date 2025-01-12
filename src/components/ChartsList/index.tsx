import { ReactElement } from "react";
import { TModelsCurrentStates } from "../WebSocketModelInteract/meta";
import LineChart from "../LineChart";
import "./style.css";

export interface IChartsListProps {
    data: TModelsCurrentStates;
}

const ChartsList = ({ data }: IChartsListProps): ReactElement => (
    <div className="charts-list info-container">
        {data.map((modelStatesList, index) => (
            <LineChart key={index} modelID={index} data={modelStatesList} />
        ))}
    </div>
);

export default ChartsList;
