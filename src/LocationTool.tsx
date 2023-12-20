import {useEffect, useState} from "react";
import {useCesium} from "resium";
import {
    Math,
    ScreenSpaceEventType,
    Cartographic,
    Cartesian3 as Vec3,
    HeightReference,
    Entity,
    Color,
    HorizontalOrigin,
    VerticalOrigin,
    Cartesian2 as Vec2,
    ScreenSpaceEventHandler, PositionProperty, Property
} from "cesium";

const TestComponent = () => {
    const { viewer } = useCesium();

    const [active, setActive] = useState(false);
    // console.log(tileset?.boundingSphere)
    let currIcon    : Entity | null = null
    let cursorLabel : Entity | null = null;
    let currRect    : Entity | null = null;

    useEffect(() => {
        if (!viewer) return;
        if (active) {
            viewer.screenSpaceEventHandler.setInputAction((ev: ScreenSpaceEventHandler.PositionedEvent) => onLeftClick(ev), ScreenSpaceEventType.LEFT_CLICK);
            viewer.screenSpaceEventHandler.setInputAction((ev: ScreenSpaceEventHandler.MotionEvent) => onMouseMove(ev), ScreenSpaceEventType.MOUSE_MOVE);
        } else {
            viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
            viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
            viewer.entities.removeAll();
        }
        viewer.scene.requestRender();
    }, [active]);

    if (!viewer) return

    // console.log(viewer)

    viewer?.cesiumWidget.creditContainer.remove()

    const cartographicMeasureFormatter = (p: Vec3) => {
        const cartographic = Cartographic.fromCartesian(p);

        const latitude = cartographic.latitude * 180 / Math.PI;
        const longitude = cartographic.longitude * 180 / Math.PI;
        const altitude = cartographic.height;

        return `\
			Latitude: ${latitude.toFixed(6)}°
			Longitude: ${longitude.toFixed(6)}°
			Altitude: ${altitude.toFixed(2)}m\
		`;
    }


    const removeEntities = () => {
        if(cursorLabel) {
            viewer.entities.remove(cursorLabel);
            cursorLabel = null;
        }

        if(currIcon) {
            viewer.entities.remove(currIcon);
            currIcon = null;
        }

        if(currRect) {
            viewer.entities.remove(currRect);
            currRect = null;
        }
    }

    const createIcon = (position: Vec3) => {
        removeEntities();
        // viewer?.entities.removeAll();

        currIcon = viewer?.entities.add({
            position: position,
            billboard: {
                image: `/vite.svg`, // default: undefined
                width: 32,
                height: 32,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.CLAMP_TO_GROUND
            }
        });

        viewer?.scene.requestRender();
    }

    const onLeftClick = (event : ScreenSpaceEventHandler.PositionedEvent) => {
        console.log('loc tool click')
        const cartesian = viewer?.scene.pickPosition(event.position);
        // const clickingOnTileset = defined(viewer?.scene.pick(event.position, 1, 1)) && viewer?.scene.pickPositionSupported;
        // console.log('clickingontileset:',clickingOnTileset)
        if(cartesian == null) {
            return;
        }

        const cartographic = Cartographic.fromCartesian(cartesian);
        const latitude = cartographic.latitude / Math.PI * 180;
        const longitude = cartographic.longitude  / Math.PI * 180;
        const altitude = cartographic.height;
        // $('#lat-input').value = latitude.toFixed(6);
        // $('#lon-input').value = longitude.toFixed(6);
        // $('#address-input').value = '';
        createIcon(cartesian);
        // console.log(latitude.toFixed(6), longitude.toFixed(6), altitude.toFixed(2))

        const text = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}, ${altitude.toFixed(2)}m`;
        navigator.clipboard.writeText(text);
    }

    const showCursorLabel = (cartesian: Vec3) => {
        const text = cartographicMeasureFormatter(cartesian);

        if(cursorLabel == null) {
            cursorLabel = viewer.entities.add({
                position: cartesian,
                label: {
                    text: text,
                    fillColor: Color.WHITE,
                    font: '16px Lato',
                    disableDepthTestDistance : Number.POSITIVE_INFINITY,
                    showBackground: true,
                    horizontalOrigin: HorizontalOrigin.CENTER,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    pixelOffset: new Vec2(0, -30),
                    eyeOffset: new Vec3(0, 0, -1),
                    distanceDisplayCondition: 0 as unknown as Property,
                    backgroundColor: new Color(239 / 255, 124 / 255, 18 / 255, 0.8),
                    translucencyByDistance: undefined,
                },
            });
        } else {
            cursorLabel.position = cartesian as unknown as PositionProperty;
            if (cursorLabel.label) {
                cursorLabel.label.text = text as unknown as Property;
            }
        }
    }

    const onMouseMove = (event : ScreenSpaceEventHandler.MotionEvent) => {
        const cartesian = viewer.scene.pickPosition(event.endPosition);
        // const hoveringOnTileset = defined(viewer.scene.pick(event.endPosition, 1, 1)) && viewer.scene.pickPositionSupported;
        if(cartesian == null) return;

        showCursorLabel(cartesian);
        viewer.scene.requestRender();
    }

    const handleLocationToolButtonClick = () => {
        setActive(!active);
    }

    return (
        <>
            <div
                id="location-tool-button"
                tabIndex={0}
                onClick={handleLocationToolButtonClick}
            >
                Location tool
                {active && ' active'}
            </div>
            {active &&
                <div>the location tool panel that should be destroyed if the tool is not active</div>
            }
        </>
    );
};

export default TestComponent;