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
                        <div className="statistic">
                            <LineCharts
                                modelID={index}
                                queueCapacity={modelRating.queue.currentValue}
                                chartsDataList={modelChartsData}
                            />
                            {currentModelAdditionalInfo && (
                                <ModelInfo info={currentModelAdditionalInfo} />
                            )}
                        </div>
                        <div className="rating">
                            <ModelRatingBlock ratingInfo={modelRating} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ModelsInfoList;
