import { type ChangeEvent, type ReactElement, useState } from "react";
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
            <div className="range-input-header">{label} - {value}</div>
            <div className="range-input-container">
                <div className="input-bounds min-value">{minValue}</div>
                <div className="input-container">
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
                <div className="input-bounds max-value">{maxValue}</div>
            </div>
        </div>
    );
};

export default ControlRangeSlider;
