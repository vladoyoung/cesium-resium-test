import { Button } from "reshaped";
import useActiveStates from "@/contexts/useActiveStates.tsx";
import useActiveModes from "@/contexts/useActiveModes.tsx";
import useViewer from "@/contexts/useViewer.tsx";
import useTileset from "@contexts/useTileset.tsx";

const Reset = () => {
    const { deactivateAllStates } = useActiveStates();
    const { deactivateAllModes } = useActiveModes();
    const {viewer} = useViewer();
    const { tileset } = useTileset()

    const handleClick = () => {
        deactivateAllModes();
        deactivateAllStates();
        viewer.camera.flyToBoundingSphere(tileset.boundingSphere, { duration: 1 });
    };

    return (
        <Button
            variant="solid"
            color="primary"
            onClick={handleClick}
        >
            R
        </Button>
    );
};

export default Reset;
