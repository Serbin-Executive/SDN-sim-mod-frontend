import ToggleSlider from "../ToggleSlider";
import RangeSlider from "../RangeSlider";
import ChartsContext from "../ChartsContext";
import { ReactElement, useContext } from "react";
import {
    DEFAULT_CHARTS_DOTS_COUNT,
    DEFAULT_IS_CHARTS_CURRENT_DOTS_VIEW_TYPE,
} from "@/hooks/useChartsContext";
import "./style.css";

const MIN_CHARTS_DOTS_COUNT: number = 5;
const MAX_CHARTS_DOTS_COUNT: number = 50;
const DOTS_COUNT_SLIDER_STEP: number = 5;

export const enum DotsCountSliderTypes {
    SHOW = "show",
    HIDDEN = "hidden",
}

const ChartsSettings = (): ReactElement => {
    const {
        isChartsCurrentDotsViewType,
        setChartsDotsCount,
        setIsChartsCurrentDotsViewType,
    } = useContext(ChartsContext);

    const currentsDotsCountSliderClass = !isChartsCurrentDotsViewType
        ? DotsCountSliderTypes.HIDDEN
        : DotsCountSliderTypes.SHOW;

    return (
        <div className="charts-settings">
            <h3>Charts Settings</h3>
            <ToggleSlider
                initialValue={DEFAULT_IS_CHARTS_CURRENT_DOTS_VIEW_TYPE}
                label="Charts view type"
                onChange={setIsChartsCurrentDotsViewType}
            />

            <div
                className={`dots-count-slider-container ${currentsDotsCountSliderClass}`}
            >
                <RangeSlider
                    initialValue={DEFAULT_CHARTS_DOTS_COUNT}
                    label="Dots count in chart"
                    minValue={MIN_CHARTS_DOTS_COUNT}
                    maxValue={MAX_CHARTS_DOTS_COUNT}
                    step={DOTS_COUNT_SLIDER_STEP}
                    onChange={setChartsDotsCount}
                />
            </div>
        </div>
    );
};

export default ChartsSettings;
