import ModelsContext from "../ModelsContext";
import { ReactElement, useContext } from "react";
import "./style.css";
import { settingsRangeListRecord } from "@/utils/constants";

const BoardSettings = (): ReactElement => {
    const {settingsConfig} = useContext(ModelsContext);

    const settingsValuesList = Object.values(settingsConfig);
    const settingsRangeList = Object.values(settingsRangeListRecord);
    
    return(
        <div>
            {
              settingsValuesList.map((settingValue, index) => (

              ))  
            }
        </div>
    )
}

export default BoardSettings;