import { Button } from "reshaped";
import {useEffect, useRef, useCallback} from "react";
import useActiveStates from "@/contexts/useActiveStates.tsx";
import useViewer from "@/contexts/useViewer.tsx";
import tileset from "@/utils/tileset.tsx";
import useCesiumContainerBottomCenterAlert from "@contexts/useCesiumContainerBottomCenterAlert.tsx";
import {
    Cartesian2 as Vec2,
    Cartesian3 as Vec3,
    Cartographic, Color,
    Ellipsoid,
    Entity,
    GridMaterialProperty,
    Matrix4 as Mat4, Rectangle,
    Transforms
} from "cesium";

const LowRes = () => {
    const { activeStates, toggleState } = useActiveStates();
    const viewer = useViewer();
    const { setAlertText } = useCesiumContainerBottomCenterAlert();
    const gridEntity = useRef<Entity | null>(null);


    const createGrid = useCallback(() => {
        const M = Transforms.eastNorthUpToFixedFrame(
            tileset.boundingSphere.center,
            Ellipsoid.WGS84,
            new Mat4()
        );
        const r = Math.ceil(tileset.boundingSphere.radius);
        const upperRight = Mat4.multiplyByPoint(
            M,
            new Vec3(r, r, 0),
            new Vec3()
        );
        const northEast = Cartographic.fromCartesian(upperRight);
        const center = Cartographic.fromCartesian(tileset.boundingSphere.center);
        const lat = northEast.latitude - center.latitude; //TODO: fix at equator and greenwich meridian
        const lon = northEast.longitude - center.longitude;

        const material = new GridMaterialProperty({
            lineCount: new Vec2(2*r, 2*r),
            color: new Color(239 / 255, 124 / 255, 18 / 255, 1),
        });

        const entity = viewer.entities.add({
            rectangle: {
                coordinates: new Rectangle(
                    center.longitude - lon, //west
                    center.latitude  - lat, //south
                    center.longitude + lon, //east
                    center.latitude  + lat, //north
                ),
                material: material,
                fill: true,
                //!!! outline is not supported when clamped to ground
            },
            show: true
        });

        return entity;
    }, [viewer.entities]);

    const updateCompassBearings = useCallback(() => {
        const headingDeg = (viewer.camera.heading * (180 / Math.PI)) % 360;
        setAlertText(`${Math.round(headingDeg)}°`);
    }, [setAlertText, viewer.camera.heading]);

    if (activeStates.compass && gridEntity.current === null) {
        gridEntity.current = createGrid();
    }

    useEffect(() => {
        if (activeStates.compass) {
            viewer.scene.camera.changed.addEventListener(updateCompassBearings);
            updateCompassBearings();
        } else {
            viewer.scene.camera.changed.removeEventListener(updateCompassBearings);
            if (gridEntity.current instanceof Entity) {
                viewer.entities.remove(gridEntity.current);
            }
            gridEntity.current = null;
            setAlertText('');
        }
        viewer.scene.requestRender();
        return () => {
                viewer.scene.camera.changed.removeEventListener(updateCompassBearings);
        }
    }, [activeStates.compass, setAlertText, updateCompassBearings, viewer.entities, viewer.scene]);

    return (
        <Button
            variant="solid"
            color={activeStates.compass ? 'positive' : 'primary'}
            onClick={() => toggleState('compass')}
        >
            CP
        </Button>
    );
};

export default LowRes;
