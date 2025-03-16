import { ChangeEvent, ReactElement, useState } from "react";
import "./style.css";

export interface IToggleSliderProps {
    initialValue: boolean;
    label: string;
    onChange: any;
}

const ToggleSlider = ({
    initialValue,
    label,
    onChange,
}: IToggleSliderProps): ReactElement => {
    const [isChecked, setIsChecked] = useState<boolean>(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
        setIsChecked(event.target.checked);
    };

    return (
        <div className="toggle-slider-container">
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

export default ToggleSlider;
