import { Button } from "reshaped";
import useActiveStates from "@/contexts/useActiveStates.tsx";
import { useEffect } from "react";
import useViewer from "@/contexts/useViewer.tsx";
import useTileset from "@contexts/useTileset.tsx";

const LowRes = () => {
    const { activeStates, toggleState, setState } = useActiveStates();
    const {viewer} = useViewer();
    const lowResFromStorage = localStorage.getItem('lowRes') === 'true';
    const { tileset } = useTileset()

    const handleClick = () => {
        toggleState('lowRes');
        localStorage.setItem('lowRes', JSON.stringify(!lowResFromStorage));
    };

    useEffect(() => {
        setState('lowRes', lowResFromStorage);
        viewer.scene.globe.maximumScreenSpaceError = activeStates.lowRes ? 16 : 1;
        tileset.maximumScreenSpaceError = activeStates.lowRes ? 8 : 1;
        viewer.scene.requestRender();
    }, [activeStates.lowRes, lowResFromStorage, setState, tileset, viewer.scene]);

    return (
        <Button
            variant="solid"
            color={activeStates.lowRes ? 'positive' : 'primary'}
            onClick={handleClick}
        >
            LR
        </Button>
    );
};

export default LowRes;
