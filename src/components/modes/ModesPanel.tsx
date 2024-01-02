import {useRef} from "react";
import useActiveModes from "@contexts/useActiveModes.tsx";
import ModePanelResizer from "@components/modes/ModesPanelResizer.tsx";
import ModesRenderer from "@components/modes/ModesRenderer.tsx";

const ModesPanel = () => {
    const { activeModes } = useActiveModes();
    const anyModeActive = Object.values(activeModes).some((mode) => mode);
    const modesPanelRef = useRef<HTMLDivElement>(null);

    return (
        <div id={`modes-container`} className={`modes-panel ${anyModeActive ? 'active' : ''}`} ref={modesPanelRef}>
            <ModePanelResizer modesPanelRef={modesPanelRef} anyModeActive={anyModeActive}/>
            <div className="modes-panel-content">
                <ModesRenderer/>
            </div>
        </div>
    )
}

export default ModesPanel;