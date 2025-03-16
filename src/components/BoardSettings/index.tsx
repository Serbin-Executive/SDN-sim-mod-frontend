import BoardSettingsContext from "../BoardSettingsContext";
import ControlRangeSlider from "../ControlRangeSlider";
import ControlToggleSlider from "../ControlToggleSlider";
import { ReactElement, useContext } from "react";
import {
    rangeSlidersLabels,
    rangeSettingsConfig,
    toggleSlidersLabels,
} from "@/utils/constants";
import "./style.css";
import {
    IBooleanSettingsList,
    INumberSettingsList,
} from "../BoardSettingsContext/meta";

const BoardSettings = (): ReactElement => {
    const { settingsConfig, setSettingsConfig } =
        useContext(BoardSettingsContext);

    const numberSettingsKeysList = Object.keys(
        settingsConfig.numberSettingsList
    );
    const booleanSettingsKeysList = Object.keys(
        settingsConfig.booleanSettingsList
    );
    const settingsRangeList = Object.values(rangeSettingsConfig);

    const updateSettingsConfig = (
        valueKey: string,
        value: number | boolean
    ): void => {
        const currentConfig = { ...settingsConfig };

        if (typeof value === "number") {
            currentConfig.numberSettingsList[
                valueKey as keyof INumberSettingsList
            ] = value;

            setSettingsConfig(currentConfig);

            return;
        }

        currentConfig.booleanSettingsList[
            valueKey as keyof IBooleanSettingsList
        ] = value;

        setSettingsConfig(currentConfig);
    };

    return (
        <div className="board-settings">
            <h3>
                Board Settings
            </h3>
            <div className="range-sliders-list">
                {numberSettingsKeysList.map((key, index) => (
                    <ControlRangeSlider
                        key={key}
                        initialValue={settingsRangeList[index].initialValue}
                        valueKey={key}
                        label={rangeSlidersLabels[key as keyof INumberSettingsList]}
                        minValue={settingsRangeList[index].minValue}
                        maxValue={settingsRangeList[index].maxValue}
                        step={settingsRangeList[index].step}
                        onChange={updateSettingsConfig}
                    />
                ))}
            </div>
            <div className="toggle-sliders-list">
                {booleanSettingsKeysList.map((key) => (
                    <ControlToggleSlider
                        key={key}
                        initialValue={false}
                        valueKey={key}
                        label={toggleSlidersLabels[key as keyof IBooleanSettingsList]}
                        onChange={updateSettingsConfig}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardSettings;
