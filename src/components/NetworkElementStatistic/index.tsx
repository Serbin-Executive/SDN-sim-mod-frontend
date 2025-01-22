import { ReactElement } from "react";
import { INetworElementState } from "../Application/meta";
import "./style.css";

export interface INetworkElementStatisticProps {
    networkElementStateInfo: INetworElementState;
}

const NetworkElementStatistic = ({
    networkElementStateInfo,
}: INetworkElementStatisticProps): ReactElement => (
    <div className="network-element-statistic">
        <div className="network-element-type">{networkElementStateInfo.type}</div>
        <div className="network-element-statistic-fields-container">
            {networkElementStateInfo.statisticFields.map((field) => (
                <div key={field.fieldName} className="statistic-field">
                    {`${field.fieldName}: ${field.fieldValue}`}
                </div>
            ))}
        </div>
    </div>
);

export default NetworkElementStatistic;
