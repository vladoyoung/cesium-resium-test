import useViewer from "@contexts/useViewer.tsx";
import {useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import {Cesium3DTileset, TrustedServers} from "cesium";
import useTileset from "@contexts/useTileset.tsx";

const loadTileset = async (twinId: unknown) => {
    return await Cesium3DTileset.fromUrl(
        `http://localhost:4213/twins/${twinId}/data/Scene/Production.json`,
        {
            maximumScreenSpaceError: 16,
            backFaceCulling: false,
            projectTo2D: true,
        }
    );
};


const InitTileset = () => {
    const {viewer} = useViewer();
    const { setTileset} = useTileset();
    const twinId = useLoaderData();

    useEffect(() => {
        // This allows loading tilesets from localhost. Otherwise, the session id cookie is not sent.
        TrustedServers.add('localhost', 4213);

        const initializeTileset = async () => {
            if (twinId) {
                const tileset = await loadTileset(twinId);
                if (tileset && viewer) {
                    viewer.scene.primitives.add(tileset);
                    viewer.camera.flyToBoundingSphere(tileset.boundingSphere, { duration: 0 });
                    setTileset(tileset)
                }
            }
        };

        initializeTileset();
    }, [setTileset, twinId, viewer]);

    return null;
};

export default InitTileset;
