import { Dispatch, SetStateAction } from "react";

export interface ISendableSettingsConfigField {
    label: string;
    value: number;
}

export interface ISendableBoardSettingsConfigBlock {
    isActive?: boolean;
    activeChangerLabel?: string;
    fields: { [key: string]: ISendableSettingsConfigField };
}

export interface ISendableBoardSettingsConfig {
    modelsSettings: ISendableBoardSettingsConfigBlock;
    qualityOfServiceSettings: ISendableBoardSettingsConfigBlock;
}

export interface IRangeSettingData {
    minValue: number;
    maxValue: number;
    step: number;
    initialValue: number;
};

export type TBoardSettingsConfigRanges = Record<string, IRangeSettingData> | null;

export interface IBoardSettingsContext {
    settingsConfigRanges: TBoardSettingsConfigRanges;
    setSettingsConfigRanges: Dispatch<SetStateAction<TBoardSettingsConfigRanges | null>>;
    settingsConfig: ISendableBoardSettingsConfig | null;
    setSettingsConfig: Dispatch<
    SetStateAction<ISendableBoardSettingsConfig | null>>;
}
