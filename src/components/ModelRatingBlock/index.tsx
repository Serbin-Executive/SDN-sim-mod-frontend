import { type ReactElement } from "react";
import "./style.css";

export interface IModelRatingBlockProps {
    queueCapacity: number;
    delayCapacity: number;
    maxQueueCapacity: number;
    maxDelayCapacity: number;
}

const ModelRatingBlock = ({
    queueCapacity,
    delayCapacity,
    maxQueueCapacity,
    maxDelayCapacity,
}: IModelRatingBlockProps): ReactElement => {
    return (
        <div className="model-rating-block">
            Rating
            <div className="queue">
                {`${queueCapacity}/${maxQueueCapacity}`}
            </div>
            <div className="delay">
                {`${delayCapacity}/${maxDelayCapacity}`}
            </div>
            <div className="total-rating">
                {`${queueCapacity + delayCapacity}/${
                    maxQueueCapacity + maxDelayCapacity
                }`}
            </div>
        </div>
    );
};

export default ModelRatingBlock;
