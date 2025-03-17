import { type ChangeEvent, type ReactElement, useState } from "react";
import "./style.css";

export interface IControlToggleSliderProps {
    initialValue: boolean;
    label: string;
    onChange: any;
}

const ControlToggleSlider = ({
    initialValue,
    label,
    onChange,
}: IControlToggleSliderProps): ReactElement => {
    const [isChecked, setIsChecked] = useState<boolean>(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
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
