import {
    type Dispatch,
    type ReactElement,
    type SetStateAction,
    type ChangeEvent,
    useState,
} from "react";
import "./style.css";
import ControlButton from "@components/ControlButton";

export const WEB_SOCKET_CONNECT_INPUT_NAME: string = "Url";

export const enum InputNameClasses {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export const BUTTON_TEXT: string = "connect";

export interface IWebSocketConnectByUrl {
    webSocketUrl: string;
    setWebSocketUrl: Dispatch<SetStateAction<string>>;
    isConnected: boolean;
    connectFunction: () => void;
}

const WebSocketConnectByUrl = ({
    webSocketUrl,
    setWebSocketUrl,
    isConnected,
    connectFunction,
}: IWebSocketConnectByUrl): ReactElement => {
    const [query, setQuery] = useState<string>(webSocketUrl);
    const [inputNameClass, setInputNameClass] = useState<string>(
        InputNameClasses.INACTIVE
    );

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
        setWebSocketUrl(event.target.value);
    };

    const handleInputFocus = () => {
        setInputNameClass(InputNameClasses.ACTIVE);
    };

    const handleInputBlur = () => {
        setInputNameClass(InputNameClasses.INACTIVE);
    };

    const handleClick = () => {
        if (isConnected) {
            return;
        }

        connectFunction();
    };

    return (
        <div className="web-socket-model-interact main-container">
            <div className="web-socket-url-form">
                <div className={`url-input-name ${inputNameClass}`}>
                    {WEB_SOCKET_CONNECT_INPUT_NAME}
                </div>

                <input
                    className="url-input-field"
                    type="text"
                    id="url"
                    value={query}
                    onChange={handleUrlChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder={"Input url"}
                    required
                />
            </div>
            <ControlButton
                onClick={handleClick}
                title={BUTTON_TEXT}
                isActive={!isConnected}
            />
            {/* <button
                className={`common${buttonActiveClass}`}
                onClick={handleClick}
            >
                {BUTTON_TEXT}
            </button> */}
        </div>
    );
};

export default WebSocketConnectByUrl;
