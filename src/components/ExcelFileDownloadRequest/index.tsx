import * as XLSX from "xlsx";
import API from "@api/index";
import ControlButton from "@components/ControlButton";
import { type ReactElement } from "react";
import { getWorkbook, EXCEL_FILE_NAME } from "./meta";
import { setIsLoading } from "@store/slices/application";
import { useDispatch } from "react-redux";
import "./style.css";

const DOWNLOAD_ICON_SIZE: number = 20;

const ExcelFileDownloadRequest = (): ReactElement => {
    const dispatch = useDispatch();

    const loadControllersStatesList = async () => {
        try {
            dispatch(setIsLoading(true));

            const data = await API.getModelsControllerParametersLists();

            const workbook = getWorkbook(data);

            XLSX.writeFile(workbook, EXCEL_FILE_NAME, { compression: true });
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
                title={
                    <img
                        src="assets/images/icons/download.svg"
                        alt="download"
                        width={DOWNLOAD_ICON_SIZE}
                        height={DOWNLOAD_ICON_SIZE}
                    />
                }
                isActive={true}
            />
        </div>
    );
};

export default ExcelFileDownloadRequest;
