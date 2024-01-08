import { useEffect } from 'react';
import {Viewer as CesiumViewer, Terrain, CesiumTerrainProvider, ImageryLayer, IonImageryProvider} from 'cesium';
import ViewerOverlayElements from "@components/ViewerOverlayElements.tsx";
import ModesPanel from "@components/modes/ModesPanel.tsx";
import InitTileset from "@components/InitTileset.tsx";
import Header from "@components/Header.tsx";
import useTileset from "@contexts/useTileset.tsx";
import useViewer from "@contexts/useViewer.tsx";

const Viewer = () => {
    const {tileset} = useTileset();
    const {viewer, setViewer} = useViewer();
    const viewerAndTilesetReady = viewer && tileset;

    useEffect(() => {
        const viewer = new CesiumViewer('cesiumContainer', {
            terrain:  new Terrain(CesiumTerrainProvider.fromIonAssetId(1)),
            // The Ion asset id 3 is bing maps with city and street names.
            baseLayer: ImageryLayer.fromProviderAsync(IonImageryProvider.fromAssetId(3, {}), {}),
            selectionIndicator: false,
            animation: false,
            requestRenderMode: true,
            vrButton: true,
            fullscreenButton: false,
            infoBox: false,
        })

        setViewer(viewer)
        viewer.cesiumWidget.creditContainer.remove(); // This is to hide the Cesium Ion logo.
        viewer.scene.globe.depthTestAgainstTerrain = false;

        return () => {
            viewer.destroy()
        }
    }, [setViewer]);

    InitTileset();

    return (
        <main>
            {viewerAndTilesetReady &&
                <Header/>
            }
            <div id="cesiumOuterContainer">
                <div id="cesiumContainer">
                    {viewerAndTilesetReady &&
                        <ViewerOverlayElements/>
                    }
                </div>
                <ModesPanel/>
            </div>
        </main>
    );
};

export default Viewer;