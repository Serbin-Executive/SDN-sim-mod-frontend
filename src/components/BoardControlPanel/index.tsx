import ModelWorkingCommandsMenu from "../ModelWorkingCommandsMenu";
import { ReactElement } from "react";
import "./style.css";
import BoardSettings from "../BoardSettings";

const BoardControlPanel = (): ReactElement => {
    return (
        <div className="board-control-panel">
            <ModelWorkingCommandsMenu />
            <BoardSettings />
        </div>
    );
};

export default BoardControlPanel;
