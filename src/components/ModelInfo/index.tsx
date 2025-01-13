import { ReactElement } from "react";
import { ModelInfoFieldsNames } from "./meta";
import { IModelCurrentState } from "../Application/meta";
import { ModelDataService } from "@/services/ModelDataService";
import "./style.css";

export interface IModelInfoProps {
    modelLastState: IModelCurrentState;
}

const ModelInfo = ({
    modelLastState
}: IModelInfoProps): ReactElement => {
    const agentsCameInModelCount = ModelDataService.getAgentsCameInModelCount(modelLastState);
    const agentsLeftThroughModelCount = ModelDataService.getAgentsLeftThroughModelCount(modelLastState);
    const agentsInModelCount = ModelDataService.getAgentsInModelCount(modelLastState);
    const agentsLostCount = ModelDataService.getAgentsLostCount(modelLastState);

    return(
        <div className="model-info-container">
        <div className="came-in-model model-info-field">
            {`${ModelInfoFieldsNames.AGENTS_CAME_IN_MODEL_COUNT} = ${agentsCameInModelCount}`}
        </div>
        <div className="left-through-model model-info-field">
            {`${ModelInfoFieldsNames.AGENTS_LEFT_THROUGH_MODEL_COUNT} = ${agentsLeftThroughModelCount}`}
        </div>
        <div className="in-model model-info-field">
            {`${ModelInfoFieldsNames.AGENTS_IN_MODEL_COUNT} = ${agentsInModelCount}`}
        </div>
        <div className="lost model-info-field">
            {`${ModelInfoFieldsNames.AGENTS_LOST_COUNT} = ${agentsLostCount}`}
        </div>
    </div>
    )
}

export default ModelInfo;
