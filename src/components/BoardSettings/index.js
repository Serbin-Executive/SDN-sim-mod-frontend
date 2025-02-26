const { useState } = require("react");

const Slider = ({initialValue, onChange}) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    }

    return <input type={"range"} min={0} max={10} step={1} value={value} onChange={handleChange} />
}

const Config = () => {
    // const { config, setConfig } = useContext(ctx)
    const [config, setConfig] = useState(defaultCfg);

    const onConfigFieldChange = () => {

    }

    return (
        <div>
            {/* {map of inputs here} */}
        </div>
    )
}