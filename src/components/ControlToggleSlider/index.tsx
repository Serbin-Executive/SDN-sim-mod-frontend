import { ChangeEvent, ReactElement, useState } from "react";
import "./style.css";

export interface IControlToggleSliderProps {
    initialValue: boolean;
    valueKey: string;
    label: string;
    onChange: any;
}

const ControlToggleSlider = ({
    initialValue,
    valueKey,
    label,
    onChange,
}: IControlToggleSliderProps): ReactElement => {
    const [isChecked, setIsChecked] = useState<boolean>(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(valueKey, event.target.checked);
        setIsChecked(event.target.checked);
    };

    return (
        <div className="control-toggle-slider-container">
            {label}
            <input
                className="toggle-slider"
                type={"checkbox"}
                checked={isChecked}
                onChange={handleChange}
            />
        </div>
    );
};

export default ControlToggleSlider;
