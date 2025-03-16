import { createContext } from "react";
import { IBoardSettingsContext } from "./meta";

const BoardSettingsContext = createContext({} as IBoardSettingsContext);

export default BoardSettingsContext;