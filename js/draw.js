//get canvas id 
var container = $('#canvas')

//judge draw
var isDrawing = false
//mouse point
var drawingPoints
//svg path
var drawingPath
//svg path style
var defaultPathStyle = {
    strokeWidth: "3px",
    stroke: "#000",
    fill: "none",
}

//mouse click
container.mousedown((e) => {
    //judge true
    isDrawing = true
    //point array definition
    drawingPoints = []
})
//mouse move
container.mousemove((e) => {
    //draw true
    if (isDrawing) {
        //add mouse point
        drawingPoints.push({
            x: e.clientX,
            y: e.clientY
        })
        //drawingPath check existence
        if (drawingPath) {
            drawingPath.remove()
        }
        //create path
        drawingPath = createPath(drawingPoints, parseFloat(1.5), true)
        //path style setting
        Object.assign(drawingPath.style, defaultPathStyle)
        //add svg path to canvas
        container.append(drawingPath)
    }
})
//mouse up
container.mouseup((e) => {
    //judge false
    isDrawing = false
    //drawingPath null or undefined
    if (!drawingPath) {
        return
    }
    drawingPath = null
    //svg data
    $('#data').empty()
    var svg_data = $('#canvas').html().length
    $('#data').append(svg_data*3 + "Byte")
})

//create path
function createPath(points, tolerance, highestQuality) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var attribute = SVGCatmullRomSpline.toPath(points.map(point => [point.x, point.y]), tolerance, highestQuality);
    path.setAttributeNS(null, 'd', attribute);
    return path;
}
