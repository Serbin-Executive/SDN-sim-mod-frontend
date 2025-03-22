import ModelInfo from "../ModelInfo";
import LineCharts from "../LineCharts";
import BoardWorkContext from "@context/BoardWorkContext";
import ModelRatingBlock from "@components/ModelRatingBlock";
import { type ReactElement, useContext } from "react";
import { type IModelRatingInfo } from "@hooks/useServerMessageHandler/meta";
import "./style.css";

const ModelsInfoList = (): ReactElement => {
    const {
        sendedBoardChartsDataList,
        modelsAdditionalInfoList,
        modelsRatings,
    } = useContext(BoardWorkContext);

    return (
        <div className="models-info-list main-info-container">
            {sendedBoardChartsDataList.map((modelChartsData, index) => {
                const currentModelAdditionalInfo =
                    modelsAdditionalInfoList[index];
                const modelRating: IModelRatingInfo = modelsRatings[index];

                return (
                    <div key={index} className="model-info info-container">
                        <div className="info-container-header">
                            <div className="model-id">Model {index + 1}</div>
                            <ModelRatingBlock ratingInfo={modelRating} />
                        </div>
                        <div className="statistics">
                            <LineCharts
                                chartsDataList={modelChartsData}
                                queueCapacity={modelRating.queue.currentValue}
                            />
                            {currentModelAdditionalInfo && (
                                <ModelInfo info={currentModelAdditionalInfo} />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ModelsInfoList;
