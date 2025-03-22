import TooltipBlock from "@components/TooltipBlock";
import { ISendedModelAdditionalInfo } from "@hooks/useServerMessageHandler/meta";
import { ModelInfoFieldsNames } from "./meta";
import { ReactElement } from "react";
import "./style.css";

export interface IModelInfoProps {
    info: ISendedModelAdditionalInfo;
}

const ModelInfo = ({ info }: IModelInfoProps): ReactElement => {
    const {
        agentsCameInModelCount,
        agentsLeftThroughModelCount,
        agentsInModelCount,
        agentsLostCount,
    } = info;

    return (
        <div className="model-info-container">
            <div className="came-in-model model-info-field">
                {`${ModelInfoFieldsNames.AGENTS_CAME_IN_MODEL_COUNT} = ${agentsCameInModelCount.value}`}
                <div className="info">
                    <TooltipBlock info={agentsCameInModelCount.info} />
                </div>
            </div>
            <div className="left-through-model model-info-field">
                {`${ModelInfoFieldsNames.AGENTS_LEFT_THROUGH_MODEL_COUNT} = ${agentsLeftThroughModelCount.value}`}
                <div className="info">
                    <TooltipBlock info={agentsLeftThroughModelCount.info} />
                </div>
            </div>
            <div className="in-model model-info-field">
                {`${ModelInfoFieldsNames.AGENTS_IN_MODEL_COUNT} = ${agentsInModelCount.value}`}
                <div className="info">
                    <TooltipBlock info={agentsInModelCount.info} />
                </div>
            </div>
            <div className="lost model-info-field">
                {`${ModelInfoFieldsNames.AGENTS_LOST_COUNT} = ${agentsLostCount.value}`}
                <div className="info">
                    <TooltipBlock info={agentsLostCount.info} />
                </div>
            </div>
        </div>
    );
};

export default ModelInfo;
