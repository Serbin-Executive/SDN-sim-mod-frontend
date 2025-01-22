import {
    ChangeEvent,
    Dispatch,
    ReactElement,
    SetStateAction,
    useState,
} from "react";
import "./style.css";

export interface IWebSocketUrlFormProps {
    url: string;
    setUrl: Dispatch<SetStateAction<string>>;
}

const WebSocketUrlForm = ({
    url,
    setUrl,
}: IWebSocketUrlFormProps): ReactElement => {
    const [query, setQuery] = useState<string>(url);

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
        setUrl(event.target.value);
    };

    return (
        <div className="web-socket-url-form">
            <input
                className="url-input-field"
                type="text"
                id="url"
                value={query}
                onChange={handleUrlChange}
                placeholder={"Input url"}
                required
            />
        </div>
    );
};

export default WebSocketUrlForm;
