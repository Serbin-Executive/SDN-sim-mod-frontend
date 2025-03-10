import { ReactElement, useContext } from "react";
import LineCharts from "../LineCharts";
import ModelsContext from "../BoardWorkContext";
import ModelInfo from "../ModelInfo";
import "./style.css";

const ModelsInfoList = (): ReactElement => {
    const { sendedModelsStatesList } = useContext(ModelsContext);

    return (
        <div className="models-info-list main-info-container">
            {sendedModelsStatesList.map((sendedModelsInfoList, index) => {
                const currentModelAdditionalInfoList = sendedModelsStatesList[index].sendedModelsAdditionalInfoList;
                const lastModelAdditionalInfo = currentModelAdditionalInfoList[currentModelAdditionalInfoList.length - 1];

                return (
                    <div key={index} className="model-info info-container">
                        <LineCharts
                            modelID={index}
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
