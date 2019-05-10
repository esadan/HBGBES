let file = require('../inputs/tiles_latent.json')

let ids = file.id
let lxs = file.latent_x
let lys = file.latent_y

let tilesPerRow = 50;

export default function readTileData() {
    let data = ids.map((v, i) => [
        v % tilesPerRow, 
        Math.floor(v / tilesPerRow),
        lxs[i],
        lys[i]
    ])
    let min = data.reduce((prev, curr) => prev.map((value, index) => Math.min(value, curr[index])), [99999999, 99999999, 99999999, 99999999])
    let max = data.reduce((prev, curr) => prev.map((value, index) => Math.max(value, curr[index])), [-99999999, -99999999, -99999999, -99999999])

    data = data.map(row => row.map((v, i) => (v - min[i]) / (max[i] - min[i])))

    return new Float32Array(data.flat());
}