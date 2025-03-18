import * as XLSX from "xlsx";
import API from "@api/index";
import { type ReactElement, useEffect, useState } from "react";
import { DOWNLOAD_BUTTON_TEXT, TControllersStatesList } from "./meta";
import { getWorkbook, EXCEL_FILE_NAME } from "./meta";
import ControlButton from "@components/ControlButton";
import "./style.css";

export const enum downloadButtonStatusList {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

const ExcelFileDownloadRequest = (): ReactElement => {
    // const { modelsActionsStatesList } = useContext(BoardWorkContext);

    // const isDownloadActive: boolean =
    //     modelsActionsStatesList[modelsActionsStatesList.length - 1];

    // const downloadButtonClass: string = isDownloadActive
    //     ? downloadButtonStatusList.ACTIVE
    //     : downloadButtonStatusList.INACTIVE;

    const [controllersStatesList, setControllersStatesList] =
        useState<TControllersStatesList>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();

    useEffect(() => {
        if (controllersStatesList.length !== 0) {
            const workbook = getWorkbook(controllersStatesList);

            XLSX.writeFile(workbook, EXCEL_FILE_NAME, { compression: true });
        }
    }, [controllersStatesList]);

    const loadControllersStatesList = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await API.getModelsControllerParametersLists();

            setControllersStatesList(data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <h2>LOADING POSTS...</h2>;
    }

    if (error) {
        return <h2>Unable to load posts {error?.message}</h2>;
    }

    const download = (): void => {
        loadControllersStatesList();
    };

    return (
        <div className="parameters-excel-request main-container">
            <ControlButton onClick={download} title={DOWNLOAD_BUTTON_TEXT} isActive={true} />
        </div>
    );
};

export default ExcelFileDownloadRequest;
