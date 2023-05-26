"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiledMap = void 0;
class TiledMap {
    constructor(mapPath) {
        this.mapPath = mapPath;
        this.loader = new PIXI.Loader();
        this.loader.registerPlugin(TiledMapLoader);
        this.mapData = null;
        this.mapContainer = new PIXI.Container();
    }
    loadMap(callback) {
        this.loader.add('map', this.mapPath).load((loader, resources) => {
            this.mapData = resources.map.data;
            this.parseMapData();
            callback();
        });
    }
    parseMapData() {
        const mapWidth = this.mapData.width;
        const mapHeight = this.mapData.height;
        const tileWidth = this.mapData.tilewidth;
        const tileHeight = this.mapData.tileheight;
        // Create layers
        this.mapData.layers.forEach((layerData) => {
            if (layerData.type === 'tilelayer') {
                const layerContainer = new PIXI.Container();
                for (let i = 0; i < layerData.data.length; i++) {
                    const tileIndex = layerData.data[i] - 1;
                    if (tileIndex >= 0) {
                        const tileSprite = new PIXI.Sprite(PIXI.Texture.from(this.mapData.tilesets[0].image));
                        tileSprite.width = tileWidth;
                        tileSprite.height = tileHeight;
                        tileSprite.position.x = (i % mapWidth) * tileWidth;
                        tileSprite.position.y = Math.floor(i / mapWidth) * tileHeight;
                        const tilesetColumns = this.mapData.tilesets[0].columns;
                        const tilesetX = (tileIndex % tilesetColumns) * tileWidth;
                        const tilesetY = Math.floor(tileIndex / tilesetColumns) * tileHeight;
                        tileSprite.texture.frame = new PIXI.Rectangle(tilesetX, tilesetY, tileWidth, tileHeight);
                        layerContainer.addChild(tileSprite);
                    }
                }
                this.mapContainer.addChild(layerContainer);
            }
        });
    }
}
exports.TiledMap = TiledMap;
/*

// Usage example:
const tiledMap = new TiledMap('path/to/map.json');
tiledMap.loadMap(() => {
  app.stage.addChild(tiledMap.mapContainer);
});

Make sure you have the Pixi.js library and the Tiled Map Loader plugin included in your project. You can find the Tiled Map Loader plugin here.

Remember to replace 'path/to/map.json' with the actual path to your Tiled map JSON file. Once the map is loaded, you can access the mapContainer property of the TiledMap instance and add it to your Pixi.js stage.
*/
