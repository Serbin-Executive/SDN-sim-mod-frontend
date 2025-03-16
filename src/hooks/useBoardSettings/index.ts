import { useState } from "react";
import { IBoardSettingsConfig } from "@/components/BoardSettingsContext/meta";
import { defaultBoardSettingsConfig } from "@/utils/constants";

const useBoardSettings = () => {
    const [settingsConfig, setSettingsConfig] = useState<IBoardSettingsConfig>(defaultBoardSettingsConfig);

    return {
        settingsConfig: settingsConfig,
        setSettingsConfig: setSettingsConfig,
    }
}

export default useBoardSettings;
