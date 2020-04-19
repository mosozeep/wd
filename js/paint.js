let savedImageData;
let dragging = false;
let polygonSides = 6;
let triangleSides = 3;
let currentTool = 'js-line';


const canvas = document.getElementById('js-canvas');
const colors = document.getElementsByClassName("js-Colors");
const range = document.getElementById("js-Range");
const ctx = canvas.getContext('2d');

const INITIAL_COLOR = "#000";
const CANVAS_SIZE = canvas.clientWidth;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillstyle = INITIAL_COLOR;
ctx.lineWidth = 2;
if(canvas){
  canvas.width= CANVAS_SIZE;
  canvas.height= CANVAS_SIZE;
}
ctx.lineWidth = 2.5;

let usingBrush = false;
let brushXPoints = new Array();
let brushYPoints = new Array();
let brushDownPos = new Array();

class ShapeBoundingBox{
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}

class MouseDownPos{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

class Location{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

class PolygonPoint{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
let shapeBoundingBox = new ShapeBoundingBox(0,0,0,0);
let mousedown = new MouseDownPos(0,0);
let loc = new Location(0,0);

document.addEventListener('DOMContentLoaded', setupCanvas);

function preventCM(event) {
  event.preventDefault();
}

function ReactToMouseLeave(){
  dragging = false;
}

function setupCanvas(){
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
    canvas.addEventListener("mouseleave",ReactToMouseLeave);
    canvas.addEventListener("contextmenu",preventCM);
    canvas.addEventListener("touchstart", ReactToMouseDown);
    canvas.addEventListener("touchmove", ReactToMouseMove);
    canvas.addEventListener("touchend", ReactToMouseUp);
}


function ChangeTool(toolClicked){
  const tools_btn = document.getElementsByClassName('tools__btn');
  let value = border__btn.value;

  if(value === "purple"){
    Array.from(tools_btn).forEach(i=>{
      const classList = i.classList[1];
      if(classList == "border--reverse"){
        i.classList.remove('border--reverse','js-purple--reverse');
        i.classList.add('border','js-purple');
      }
    });
    document.getElementById(toolClicked).classList.remove('border','js-purple');
    document.getElementById(toolClicked).classList.add('border--reverse','js-purple--reverse');
  }else if (value === "gray") {
    Array.from(tools_btn).forEach(i=>{
      const classList = i.classList[1];
      if(classList == "border--reverse"){
        i.classList.remove('border--reverse','js-purple--reverse','purple--reverse');
        i.classList.add('border','js-purple','purple');
      }
      document.getElementById(toolClicked).classList.remove('border','js-purple','purple');
      document.getElementById(toolClicked).classList.add('border--reverse','js-purple--reverse','purple--reverse');
    });
    }
  currentTool = toolClicked;
}
function GetMousePosition(x,y){
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}

function SaveCanvasImage(){
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function RedrawCanvasImage(){
    ctx.putImageData(savedImageData,0,0);
}

function UpdateRubberbandSizeData(loc){
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);

    if(loc.x > mousedown.x){

        shapeBoundingBox.left = mousedown.x;
    } else {

        shapeBoundingBox.left = loc.x;
    }

    if(loc.y > mousedown.y){

        shapeBoundingBox.top = mousedown.y;
    } else {

        shapeBoundingBox.top = loc.y;
    }
}

function getAngleUsingXAndY(mouselocX, mouselocY){
    let adjacent = mousedown.x - mouselocX;
    let opposite = mousedown.y - mouselocY;

    return radiansToDegrees(Math.atan2(opposite, adjacent));
}

function radiansToDegrees(rad){
    if(rad < 0){
        return (360.0 + (rad * (180 / Math.PI))).toFixed(2);
    } else {
        return (rad * (180 / Math.PI)).toFixed(2);
    }
}

function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}
function getTrianglePoints(){
    let angle =  degreesToRadians(getAngleUsingXAndY(loc.x, loc.y));
    let radiusX = shapeBoundingBox.width;
    let radiusY = shapeBoundingBox.height;
    let trianglePoints = [];
    for(let i = 0; i < triangleSides; i++){
        trianglePoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / triangleSides;
    }
    return trianglePoints;
}

function getTriangle(){
    let trianglePoints = getTrianglePoints();
    ctx.beginPath();
    ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
    for(let i = 1; i < triangleSides; i++){
        ctx.lineTo(trianglePoints[i].x, trianglePoints[i].y);
    }
    ctx.closePath();
}

function getPolygonPoints(){
    let angle =  degreesToRadians(getAngleUsingXAndY(loc.x, loc.y));
    let radiusX = shapeBoundingBox.width;
    let radiusY = shapeBoundingBox.height;
    let polygonPoints = [];
    for(let i = 0; i < polygonSides; i++){
        polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / polygonSides;
    }
    return polygonPoints;
}

function getPolygon(){
    let polygonPoints = getPolygonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for(let i = 1; i < polygonSides; i++){
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
}

function drawRubberbandShape(loc){
     if(currentTool === "js-line"){
        ctx.beginPath();
        ctx.moveTo(mousedown.x, mousedown.y);
        ctx.lineTo(loc.x, loc.y);
        ctx.stroke();
    } else if(currentTool === "js-rectangle"){
        ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
    } else if(currentTool === "js-circle"){
        let radius = shapeBoundingBox.width;
        ctx.beginPath();
        ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else if(currentTool === "js-ellipse"){
        let radiusX = shapeBoundingBox.width / 2;
        let radiusY = shapeBoundingBox.height / 2;
        ctx.beginPath();
        ctx.ellipse(mousedown.x, mousedown.y, radiusX, radiusY, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
    }else if (currentTool === "js-triangle") {
      getTriangle();
      ctx.stroke();
    } else if(currentTool === "js-polygon"){
        getPolygon();
        ctx.stroke();
    }
}

function UpdateRubberbandOnMove(loc){
    UpdateRubberbandSizeData(loc);
    drawRubberbandShape(loc);
}

function AddBrushPoint(x, y, mouseDown){
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPos.push(mouseDown);
}

function DrawBrush(){
    for(let i = 1; i < brushXPoints.length; i++){
        ctx.beginPath();
        if(brushDownPos[i]){
            ctx.moveTo(brushXPoints[i-1], brushYPoints[i-1]);
        } else {
            ctx.moveTo(brushXPoints[i]-1, brushYPoints[i]);
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

function ReactToMouseDown(e){
  if (currentTool === 'js-pen') {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!dragging){
      ctx.beginPath();
      ctx.moveTo(x,y);
    }else{
      ctx.lineTo(x,y);
      ctx.stroke();
    }
    SaveCanvasImage();
  }else {
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
    SaveCanvasImage();
    mousedown.x = loc.x;
    mousedown.y = loc.y;

  }
    dragging = true;
};

function ReactToMouseMove(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
    if(dragging){
        RedrawCanvasImage();
        UpdateRubberbandOnMove(loc);
    }
};

function ReactToMouseUp(e){
    canvas.style.cursor = "default";
    loc = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    UpdateRubberbandOnMove(loc);
    dragging = false;
    usingBrush = false;
}

function SaveImage(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paint";
  link.click();
}

function NewImage(){
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  const frontColor = document.getElementById('js-frontColor');
  frontColor.style.background = color;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handlefill(){
  if (currentTool==="js-fill") {
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input",handleRangeChange);
}

  canvas.addEventListener("click", handlefill);
