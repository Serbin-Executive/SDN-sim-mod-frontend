import ModelInfo from "../ModelInfo";
import LineCharts from "../LineCharts";
import BoardWorkContext from "@context/BoardWorkContext";
import { type ReactElement, useContext } from "react";
import "./style.css";

const ModelsInfoList = (): ReactElement => {
    const { sendedModelsStatesList , queueCapacitiesList} = useContext(BoardWorkContext);

    return (
        <div className="models-info-list main-info-container">
            {sendedModelsStatesList.map((sendedModelsInfoList, index) => {
                const currentModelAdditionalInfoList = sendedModelsStatesList[index].sendedModelsAdditionalInfoList;
                const lastModelAdditionalInfo = currentModelAdditionalInfoList[currentModelAdditionalInfoList.length - 1];

                return (
                    <div key={index} className="model-info info-container">
                        <LineCharts
                            modelID={index}
                            queueCapacity={queueCapacitiesList[index]}
                            chartsDataList={sendedModelsInfoList.sendedChartsDataList}
                        />
                        <ModelInfo
                            info={lastModelAdditionalInfo}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ModelsInfoList;
