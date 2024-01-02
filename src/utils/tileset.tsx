import {Cesium3DTileset} from "cesium";

const loadTileset = async () => {
    return await Cesium3DTileset.fromUrl(
        "/tilesets/example/tileset.json", {
            maximumScreenSpaceError: 16,
            // Sadly, CC sometimes makes bad models with incorrect face winding. See twin 29442 "Pernik Highway".
            backFaceCulling: false,
            projectTo2D: true,
        })
};

const tileset = await loadTileset().then((tileset) => {
    return tileset
});

export default tileset;