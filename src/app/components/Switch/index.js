import "./index.css"
import { useState } from "react"
export default () => {
    const [enabled, setSwitch] = useState(false)
    const handleSwitch = () => {
        setSwitch(!enabled)
    }
    return (
        <div>
            <label className="switch">
                <input type="checkbox" checked={enabled} onChange={handleSwitch}></input>
                <span className="slider round"></span>
            </label>
            
        </div>
    )
}