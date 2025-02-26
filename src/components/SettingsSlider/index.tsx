// import { ReactElement, useContext, useState } from "react";
// import ModelsContext from "../ModelsContext";
// import { ISettingsConfig } from "../ModelsContext/meta";
// import "./style.css";

// export interface ISettingsSliderProps {
//     initialValue: number;
//     settingKey: string;
//     minValue: number;
//     maxValue: number;
// }

// const SettingsSlider = ({initialValue, settingKey, minValue, maxValue}: ISettingsSliderProps): ReactElement => {
//     const {settingsConfig} = useContext(ModelsContext);

//     const [value, setValue] = useState<number>(initialValue);

//     // const handleChange = (event) => {
//     //     setValue(event.target.value);
//     //     settingsConfig[settingKey as keyof ISettingsConfig] = event.target.value;
//     // }

//     return(
//         <input type={"range"} min={0} max={10} step={1} value={value} onChange={handleChange} />
//     )
// }

// export default SettingsSlider;