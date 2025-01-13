import { ReactElement, useContext } from "react";
import LineChart from "../LineChart";
import ModelsContext from "../ModelsContext";
import ModelInfo from "../ModelInfo";
import "./style.css";

const ChartsList = (): ReactElement => {
    const { modelsStatesList } = useContext(ModelsContext);

    return (
        <div className="models-info-list main-info-container">
            {modelsStatesList.map((modelStatesList, index) => {
                const modelLastState =
                    modelStatesList[modelStatesList.length - 1];

                return (
                    <div key={index} className="model-info info-container">
                        <LineChart
                            modelID={index}
                            data={modelStatesList}
                        />
                        <ModelInfo
                            modelLastState={modelLastState}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ChartsList;
