let file = require('../inputs/log.json')

let selection = [0, 1, 4, 5]
let data = file[0].data
    .map(row => selection.map(index => row[index]))
    .filter(row => row.reduce((prev, curr) => prev && curr), true)
let curves = selection.map(index => file[0].curves[index])
    
let min = data.reduce((prev, curr) => prev.map((value, index) => Math.min(value, curr[index])), [99999999, 99999999, 99999999, 99999999])
let max = data.reduce((prev, curr) => prev.map((value, index) => Math.max(value, curr[index])), [-99999999, -99999999, -99999999, -99999999])

data = data.map(row => row.map((v, i) => (v - min[i]) / (max[i] - min[i])))

const size = 1
export default function readLogData() {  
    return new Float32Array(
        data.flat()
    )  
    return new Float32Array([
        -size, -size, .5, .8,
        size, -size, .2, .9,
        -size, size, .9, .1,
        -size, size, .66, .66,
        size, -size, .98, .12,
        size, size, .23, 24
    ])
}

export function readLogCurveHeaders() {
    return curves
}