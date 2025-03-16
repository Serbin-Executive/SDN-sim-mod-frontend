import { ChangeEvent, ReactElement, useState } from "react";
import "./style.css";

export interface IControlRangeSliderProps {
    initialValue: number;
    valueKey: string;
    label: string;
    minValue: number;
    maxValue: number;
    step: number;
    onChange: any;
}

const ControlRangeSlider = ({
    initialValue,
    valueKey,
    label,
    minValue,
    maxValue,
    step,
    onChange,
}: IControlRangeSliderProps): ReactElement => {
    const [value, setValue] = useState<string>(String(initialValue));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(valueKey, Number(event.target.value));
        setValue(event.target.value);
    };

    return (
        <div className="control-range-slider-container">
            {`${label} - ${value}`}
            <input
                className="range-slider"
                type={"range"}
                min={minValue}
                max={maxValue}
                step={step}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default ControlRangeSlider;
