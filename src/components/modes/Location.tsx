import {useCallback, useEffect} from "react";
import useViewer from "@contexts/useViewer.tsx";
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
import {Text, View} from 'reshaped'

const Location = () => {
    const {viewer} = useViewer();

    let currIcon    : Entity | null = null;
    let cursorLabel : Entity | null = null;
    const currRect    : Entity | null = null;

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


    const removeEntities = useCallback((onlyIcon: boolean = false) => {
        const allModeEntities = onlyIcon ? [currIcon] : [currIcon, currRect, cursorLabel]
        allModeEntities.forEach((entity) => {
            if (entity) {
                viewer.entities.remove(entity);
                entity = null;
            }
        })
    }, [currIcon, currRect, cursorLabel, viewer])

    const createIcon = useCallback((position: Vec3) => {
        removeEntities(true);
        // viewer?.entities.removeAll();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [viewer]);

    const onLeftClick = useCallback((event : ScreenSpaceEventHandler.PositionedEvent) => {
        // console.log('loc tool click')
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
    }, [createIcon, viewer]);

    const showCursorLabel = useCallback((cartesian: Vec3) => {
        const text = cartographicMeasureFormatter(cartesian);
        if(cursorLabel == null) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [viewer, cursorLabel]);

    const onMouseMove = useCallback((event : ScreenSpaceEventHandler.MotionEvent) => {
        const cartesian = viewer.scene.pickPosition(event.endPosition);
        // const hoveringOnTileset = defined(viewer.scene.pick(event.endPosition, 1, 1)) && viewer.scene.pickPositionSupported;
        if(cartesian == null) return;

        showCursorLabel(cartesian);
        viewer.scene.requestRender();
    }, [showCursorLabel, viewer]);

    useEffect(() => {
        viewer.screenSpaceEventHandler.setInputAction((ev: ScreenSpaceEventHandler.PositionedEvent) => onLeftClick(ev), ScreenSpaceEventType.LEFT_CLICK);
        viewer.screenSpaceEventHandler.setInputAction((ev: ScreenSpaceEventHandler.MotionEvent) => onMouseMove(ev), ScreenSpaceEventType.MOUSE_MOVE);
        viewer.scene.requestRender();
        return () => {
            viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
            viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
            removeEntities();
            viewer.scene.requestRender();
        }
    }, [currIcon, currRect, cursorLabel, onLeftClick, onMouseMove, removeEntities, viewer]);

    return (
        <View padding={4}>
            <Text variant="title-6" align="center" as="h4">Location tool</Text>
            <p>content here</p>
        </View>
    );
};

export default Location;