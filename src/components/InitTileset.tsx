import useViewer from "@contexts/useViewer.tsx";
import tileset from "@utils/tileset.tsx"

const InitTileset = () => {
    const viewer = useViewer();
    viewer.cesiumWidget.creditContainer.remove(); // This is to hide the Cesium Ion logo.
    viewer.scene.primitives.add(tileset);
    viewer.camera.flyToBoundingSphere(tileset.boundingSphere, {duration: 0})
    return null;
}

export default InitTileset;