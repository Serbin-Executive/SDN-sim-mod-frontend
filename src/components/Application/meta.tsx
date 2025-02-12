import { ReactElement } from "react";
import DefaultLayout from "@/layouts/Default";
import HostLayout from "@/layouts/Host";

export const enum UserStatuses {
    USER = "user",
    HOST = "host",
}

export const LayoutsByUserType: Record<string, (props: any) => ReactElement> = {
    [UserStatuses.USER]: (props) => <DefaultLayout {...props}/>,
    [UserStatuses.HOST]: (props) =>  <HostLayout {...props}/>,
}

export interface IConnectionAccess {
    status: boolean;
}

export type TUserStatus = string;

