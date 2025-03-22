import ModelInfo from "../ModelInfo";
import LineCharts from "../LineCharts";
import BoardWorkContext from "@context/BoardWorkContext";
import ModelRatingBlock from "@components/ModelRatingBlock";
import { type ReactElement, useContext } from "react";
import { type IModelRatingInfo } from "@hooks/useServerMessageHandler/meta";
import "./style.css";

const ModelsInfoList = (): ReactElement => {
    const { sendedModelsStatesList, modelsRatings } =
        useContext(BoardWorkContext);

    return (
        <div className="models-info-list main-info-container">
            {sendedModelsStatesList.map((sendedModelsInfoList, index) => {
                const currentModelAdditionalInfoList =
                    sendedModelsStatesList[index]
                        .sendedModelsAdditionalInfoList;
                const lastModelAdditionalInfo =
                    currentModelAdditionalInfoList[
                        currentModelAdditionalInfoList.length - 1
                    ];
                const modelRating: IModelRatingInfo =
                    modelsRatings[index];

                return (
                    <div key={index} className="model-info info-container">
                        <div className="statistic">
                            <LineCharts
                                modelID={index}
                                queueCapacity={modelRating.queue.currentValue}
                                chartsDataList={
                                    sendedModelsInfoList.sendedChartsDataList
                                }
                            />
                            <ModelInfo info={lastModelAdditionalInfo} />
                        </div>
                        <div className="rating">
                            <ModelRatingBlock
                                ratingInfo={modelRating}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ModelsInfoList;
