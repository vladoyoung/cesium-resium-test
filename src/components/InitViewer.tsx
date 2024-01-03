import React, { useState, useEffect } from 'react';
import {ViewerProvider} from '@contexts/ViewerContext.tsx';
import {Viewer, Terrain, CesiumTerrainProvider, ImageryLayer, IonImageryProvider} from 'cesium';
import ViewerOverlayElements from "@components/ViewerOverlayElements.tsx";
import ModesPanel from "@components/modes/ModesPanel.tsx";

type Props = {
    children: React.ReactNode
}

const InitViewer = ({ children } : Props) => {
    const [viewerElement, setViewerElement] = useState<Viewer|undefined>(undefined);

    useEffect(() => {
        const viewer = new Viewer('cesiumContainer', {
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

        setViewerElement(viewer);

        return () => {
            viewer.destroy()
        }
    }, []);

    return (
        <ViewerProvider viewerElement={viewerElement}>
            <main>
                {viewerElement &&
                    children
                }
                <div id="cesiumOuterContainer">
                    <div id="cesiumContainer">
                        {viewerElement &&
                            <ViewerOverlayElements/>
                        }
                    </div>
                    <ModesPanel/>
                </div>
            </main>
        </ViewerProvider>
    );
};

export default InitViewer;