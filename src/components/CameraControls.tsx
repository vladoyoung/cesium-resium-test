import {Button, View} from "reshaped";
import {BoundingSphere, HeadingPitchRange} from "cesium";
import useViewer from "@/contexts/useViewer.tsx";
import tileset from "@utils/tileset.tsx";

const CameraControls = () => {
    const viewer = useViewer();
    const boundingSphere = new BoundingSphere(tileset.boundingSphere.center, 20), lookingAngle = -Math.PI / 8;
    const cameraPresets = {
        'north': 180,
        'east': 270,
        'south': 0,
        'west': 90,
        'south-west': 45,
        'north-west': 135,
        'north-east': 225,
        'south-east': 315,
    } as { [key: string]: number };

    const handleClick = (direction: string) => {
        if (direction === 'home') {
            viewer.camera.flyToBoundingSphere(tileset.boundingSphere, {duration: 1});
            return;
        }

        viewer.camera.flyToBoundingSphere(boundingSphere, {
            duration: 1,
            offset: new HeadingPitchRange(cameraPresets[direction] * Math.PI / 180, lookingAngle, 100),
        });
    }

    return (
        <View direction="column" position="absolute" justify="center" align="center" zIndex={1} insetTop={2} insetEnd={2} gap={1}>
            <View gap={1} direction="row" align="end">
                <Button variant="faded" color="primary" onClick={() => handleClick('north-west')} size="small" className="integral">NW</Button>
                <Button variant="solid" color="primary" onClick={() => handleClick('north')}>N</Button>
                <Button variant="faded" color="primary" onClick={() => handleClick('north-east')}size="small" className="integral">NE</Button>
            </View>
            <View gap={1} direction="row" align="center">
                <Button variant="solid" color="primary" onClick={() => handleClick('west')}>W</Button>
                <Button variant="solid" color="primary" onClick={() => handleClick('home')}>H</Button>
                <Button variant="solid" color="primary" onClick={() => handleClick('east')}>E</Button>
            </View>
            <View gap={1} direction="row" align="start">
                <Button variant="faded" color="primary" onClick={() => handleClick('south-west')} size="small" className="integral">SW</Button>
                <Button variant="solid" color="primary" onClick={() => handleClick('south')}>S</Button>
                <Button variant="faded" color="primary" onClick={() => handleClick('south-east')} size="small" className="integral">SE</Button>
            </View>
        </View>
    )
}

export default CameraControls;