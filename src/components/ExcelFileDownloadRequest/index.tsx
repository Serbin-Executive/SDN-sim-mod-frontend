import * as XLSX from "xlsx";
import API from "@api/index";
import ControlButton from "@components/ControlButton";
import { type ReactElement, useEffect, useState } from "react";
import { DOWNLOAD_BUTTON_TEXT, type TControllersStatesList } from "./meta";
import { getWorkbook, EXCEL_FILE_NAME } from "./meta";
import { setIsLoading } from "@store/slices/application";
import { useDispatch } from "react-redux";
import "./style.css";

const ExcelFileDownloadRequest = (): ReactElement => {
    const dispatch = useDispatch();

    const [controllersStatesList, setControllersStatesList] =
        useState<TControllersStatesList>([]);

    useEffect(() => {
        if (controllersStatesList.length !== 0) {
            const workbook = getWorkbook(controllersStatesList);

            XLSX.writeFile(workbook, EXCEL_FILE_NAME, { compression: true });
        }
    }, [controllersStatesList]);

    const loadControllersStatesList = async () => {
        try {
            dispatch(setIsLoading(true));

            const data = await API.getModelsControllerParametersLists();

            setControllersStatesList(data);
        } catch (error) {
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const download = (): void => {
        loadControllersStatesList();
    };

    return (
        <div className="parameters-excel-request main-container">
            <ControlButton
                onClick={download}
                title={DOWNLOAD_BUTTON_TEXT}
                isActive={true}
            />
        </div>
    );
};

export default ExcelFileDownloadRequest;
