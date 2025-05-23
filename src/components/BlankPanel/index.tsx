import "./style.css";

const BlankPanel = () => {
    return (
        <div className="blank-panel">
            <div className="blank-panel-content">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 512 512"
                >
                    <path d="M224 64v-8c0-13.2-10.8-24-24-24h-80c-13.2 0-24 10.8-24 24v8h-96v64h96v8c0 13.2 10.8 24 24 24h80c13.2 0 24-10.8 24-24v-8h288v-64h-288zM128 128v-64h64v64h-64zM416 216c0-13.2-10.8-24-24-24h-80c-13.2 0-24 10.8-24 24v8h-288v64h288v8c0 13.2 10.8 24 24 24h80c13.2 0 24-10.8 24-24v-8h96v-64h-96v-8zM320 288v-64h64v64h-64zM224 376c0-13.2-10.8-24-24-24h-80c-13.2 0-24 10.8-24 24v8h-96v64h96v8c0 13.2 10.8 24 24 24h80c13.2 0 24-10.8 24-24v-8h288v-64h-288v-8zM128 448v-64h64v64h-64z"></path>
                </svg>
            </div>
        </div>
    );
};

export default BlankPanel;
