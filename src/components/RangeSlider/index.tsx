import { ChangeEvent, ReactElement, useState } from "react";
import "./style.css";

export interface IRangeSliderProps {
    initialValue: number;
    label: string;
    minValue: number;
    maxValue: number;
    step: number;
    onChange: any;
}

const RangeSlider = ({
    initialValue,
    label,
    minValue,
    maxValue,
    step,
    onChange,
}: IRangeSliderProps): ReactElement => {
    const [value, setValue] = useState<string>(String(initialValue));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
        setValue(event.target.value);
    };

    return (
        <div className="range-slider-container">
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

export default RangeSlider;
