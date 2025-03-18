import Dialog from "@components/Dialog";
import IDialogData from "@domains/Dialog";
import ModalWindow, { ModalTypes } from "@components/ModalWindow";
import { type TRootState } from "@store/index";
import { type ReactNode } from "react";
import { useSelector } from "react-redux";

const DialogHolder = (): ReactNode => {
    const dialogs: IDialogData[] = useSelector(
        (state: TRootState) => state.notifications.dialogs
    );

    if (!dialogs?.length) {
        return null;
    }

    const currentDialog: IDialogData = dialogs[0];

    return (
        <ModalWindow type={ModalTypes.SCREEN_LOCKER}>
            <Dialog dialogData={currentDialog} />
        </ModalWindow>
    );
};

export default DialogHolder;
