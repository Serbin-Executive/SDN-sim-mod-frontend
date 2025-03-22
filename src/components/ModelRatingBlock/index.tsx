import TooltipBlock from "@components/TooltipBlock";
import { memo, type ReactElement } from "react";
import { type IModelRatingInfo } from "@hooks/useServerMessageHandler/meta";
import "./style.css";

export interface IModelRatingBlockProps {
    ratingInfo: IModelRatingInfo;
}

const ModelRatingBlock = memo(
    ({ ratingInfo }: IModelRatingBlockProps): ReactElement => {
        return (
            <div className="model-rating-block">
                <div className="rating-line queue">
                    {`${ratingInfo.queue.currentValue}/${ratingInfo.queue.maximumValue}`}
                    <div className="info">
                        <TooltipBlock info={ratingInfo.queue.info} />
                    </div>
                </div>
                <div className="rating-line delay">
                    {`${ratingInfo.delay.currentValue}/${ratingInfo.delay.maximumValue}`}
                    <div className="info">
                        <TooltipBlock info={ratingInfo.delay.info} />
                    </div>
                </div>
                <div className="rating-line total-rating">
                    {`${ratingInfo.general.currentValue}/${ratingInfo.general.maximumValue}`}
                    <div className="info">
                        <TooltipBlock info={ratingInfo.general.info} />
                    </div>
                </div>
            </div>
        );
    }
);

export default ModelRatingBlock;
