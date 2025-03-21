import { memo, type ReactElement } from "react";
import "./style.css";

export interface IModelRatingBlockProps {
    queueCapacity: number;
    delayCapacity: number;
    maxQueueCapacity: number;
    maxDelayCapacity: number;
}

const ModelRatingBlock = memo(({
    queueCapacity,
    delayCapacity,
    maxQueueCapacity,
    maxDelayCapacity,
}: IModelRatingBlockProps): ReactElement => {
    return (
        <div className="model-rating-block">
            <div className="rating-line queue">
                {`${queueCapacity}/${maxQueueCapacity}`}
            </div>
            <div className="rating-line delay">
                {`${delayCapacity}/${maxDelayCapacity}`}
            </div>
            <div className="rating-line total-rating">
                {`${queueCapacity + delayCapacity}/${
                    maxQueueCapacity + maxDelayCapacity
                }`}
            </div>
        </div>
    );
});

export default ModelRatingBlock;
