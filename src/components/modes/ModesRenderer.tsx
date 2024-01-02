import {useEffect, useState} from "react";
import useActiveModes from "@contexts/useActiveModes.tsx";
import EditDimensions from "@components/modes/EditDimensions.tsx";
import Location from "@components/modes/Location.tsx";
import Measurements from "@components/modes/Measurements.tsx";

const modesComponents = Object.entries({
    editDimensions: <EditDimensions/>,
    location: <Location/>,
    measurements: <Measurements/>
})

const ModesRenderer = () => {
    const { activeModes } = useActiveModes();
    const nameOfActiveMode = Object.keys(activeModes).find((mode) => activeModes[mode as keyof typeof activeModes]);
    const activeModeComponent = modesComponents.find(([modeName]) => modeName === nameOfActiveMode)?.[1];
    const [activeMode, setActiveMode] = useState({name: nameOfActiveMode, component: activeModeComponent})

    useEffect(() => {
        // delay hiding the mode content until the transition is complete
        if(!nameOfActiveMode) {
            setTimeout(() => {
                setActiveMode({name: undefined, component: undefined})
            }, 300) // same as the modes panel transition duration
        } else {
            setActiveMode({name: nameOfActiveMode, component: activeModeComponent})
        }
    }, [activeModeComponent, nameOfActiveMode]);

    return activeMode.component && (
        <div className={`mode`} id={activeMode.name}>
            {activeMode.component}
        </div>
    )
}

export default ModesRenderer;