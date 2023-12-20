import {Cesium3DTileset} from "cesium";
import {useCesium} from "resium";

const tilesetLoad = async () => {
    return await Cesium3DTileset.fromUrl(
    "/tilesets/example/tileset.json", {
        maximumScreenSpaceError: 16,
        // Sadly, CC sometimes makes bad models with incorrect face winding. See twin 29442 "Pernik Highway".
        backFaceCulling: false,
        projectTo2D: true,
    })
};

export const tileset = await tilesetLoad().then((tileset) => {
    return tileset
});

const InitTileset = () => {
    const {viewer} = useCesium();
    if (!viewer) return
    viewer?.scene.primitives.add(tileset);
    viewer?.camera.flyToBoundingSphere(tileset.boundingSphere, {duration: 2})
    return null;
}

export default InitTileset;