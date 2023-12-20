import {Viewer} from "resium";
import LocationTool from "./LocationTool.tsx";
import {CesiumTerrainProvider, ImageryLayer, IonImageryProvider, Terrain} from "cesium";
import InitTileset from "./InitTileset.tsx";

const InitViewer = () => {
    return (
            <Viewer
                terrain={new Terrain(CesiumTerrainProvider.fromIonAssetId(1))}
                baseLayer={ImageryLayer.fromProviderAsync(IonImageryProvider.fromAssetId(3, {}), {})}
                selectionIndicator={false}
                animation={false}
                requestRenderMode={true}
                vrButton={true}
                fullscreenButton={false}
                infoBox={false}
                timeline={false}
                full
            >
                <InitTileset/>
                <LocationTool/>
            </Viewer>
    );
};

export default InitViewer;