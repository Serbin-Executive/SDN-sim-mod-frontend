import { createContext, Dispatch, SetStateAction } from "react";
import { IModelsContext } from "./meta";

const ModelsContext = createContext({} as IModelsContext);

export default ModelsContext;