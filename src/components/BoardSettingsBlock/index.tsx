import ControlRangeSlider from "@components/ControlRangeSlider";
import ControlToggleSlider from "@components/ControlToggleSlider";
import { type ReactElement } from "react";
import {
    IRangeSettingData,
    ISendableBoardSettingsConfigBlock,
    ISendableSettingsConfigField,
} from "@components/BoardSettingsContext/meta";
import "./style.css";

export interface IBoardSettingsBlockProps {
    id: string;
    data: ISendableBoardSettingsConfigBlock;
    getRangeData: (fieldId: string) => IRangeSettingData;
    updateField: any;
    updateActiveStatus: any;
}

const BoardSettingsBlock = ({
    id,
    data,
    getRangeData,
    updateField,
    updateActiveStatus,
}: IBoardSettingsBlockProps): ReactElement => {
    const isNeedActiveCheckbox: boolean = !(data.isActive === undefined);

    const isFieldsActive: boolean = !isNeedActiveCheckbox
        ? true
        : data.isActive!;

    const fieldsKeysList: string[] = Object.keys(data.fields);
    const fieldsValuesList: ISendableSettingsConfigField[] = Object.values(
        data.fields
    );

    const onActiveStatusChange = (value: boolean): void => {
        updateActiveStatus(id, value);
    };

    const onFieldValueChange = (fieldId: string, value: number): void => {
        updateField(id, fieldId, value);
    };

    return (
        <div className="board-settings-block">
            {isNeedActiveCheckbox && (
                <ControlToggleSlider
                    initialValue={data.isActive!}
                    label={data.activeChangerLabel!}
                    onChange={onActiveStatusChange}
                />
            )}
            {isFieldsActive &&
                fieldsKeysList.map((key, index) => (
                    <ControlRangeSlider
                        key={key}
                        initialValue={fieldsValuesList[index].value}
                        valueKey={key}
                        label={fieldsValuesList[index].label}
                        minValue={getRangeData(key).minValue}
                        maxValue={getRangeData(key).maxValue}
                        step={getRangeData(key).step}
                        onChange={onFieldValueChange}
                    />
                ))}
        </div>
    );
};

export default BoardSettingsBlock;
