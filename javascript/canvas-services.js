var gCanvas;
var gCtx;
var gKeywords = { happy: 12, "funny puk": 1 };
var gId = 101;
const KEY = "memes";
var gPageIdx = 1;
var gImgs = [
  { id: 1, url: "images/meme-imgs(square)/1.jpg", keywords: ["happy"] },
];
var gMemes = [];
var gFilter;
var gCurrentMeme;

function creatMemes() {
  for (var i = 0; i < 18; i++) {
    gMemes.push(creatMeme());
  }
  gId = 101;
  console.log(12);
}

function creatMeme(category) {
  if (!category) category = "random";
  return {
    text: "Enter Text Here",
    selectedLineIdx: 0,
    id: gId++,
    category,
    lines: [
      {
        text: "Enter Text Here",
        align: "left",
        color: "red",
        fillStyle: "white",
        strokeStyle: "black",
        fontSize: "50",
        fontFamily: "impact",
        textWidth:0,
        xPosition:0,
        yPosition:0,
      },
      {
        text: "Hello",
        align: "left",
        color: "red",
        fillStyle: "white",
        strokeStyle: "black",
        fontSize: "50",
        fontFamily: "impact",
        textWidth:0,
        xPosition:0,
        yPosition:0,
      }
    ],
  };
}

function loadImages() {
  var images = [];
  gMemes.forEach((meme) => {
    var image = {
      id: gId++,
      url: `images/meme-imgs(square)/${meme.id}.jpg`,
    };
    images.push(image);
  });

  gImgs = images;
}

function setInitialTextPosition() {
  gCurrentMeme.lines[0].yPosition = percentage(gCanvas.height, 97);
  gCurrentMeme.lines[0].xPosition = gCanvas.width / 2;
  gCurrentMeme.lines[1].yPosition = percentage(gCanvas.height, 5);
  gCurrentMeme.lines[1].xPosition = gCanvas.width / 2;

}

function addNewLinesPosition(){
    for(var i=2;i<gCurrentMeme.lines.length;i++){
      var line=gCurrentMeme.lines[i]
      line.yPosition=gCurrentMeme.lines[i-1].yPosition+100
      line.xPosition=gCanvas.width / 2;
    }
  }

function generateMeme() {}

function addNewLine() {
  gCurrentMeme.lines.push({
    text: "Enter Text Here",
    size: 40,
    align: "left",
    color: "red",
    fillStyle: "white",
    strokeStyle: "black",
    fontSize: "50",
    fontFamily: "impact",
    textWidth:0,
    xPosition:0,
    yPosition:0,
    drag:false
   
  });
  gCurrentMeme.selectedLineIdx++;
   addNewLinesPosition()
}



function removeLine() {
  --gCurrentMeme.selectedLineIdx;
  if (gCurrentMeme.lines.length === 2) {
    document.querySelector(".remove-line").classList.add("hidden");
    gCurrentMeme.lines.pop();
    redrawCanvas();
    return;
  }
  gCurrentMeme.lines.pop();
}

function updateOuterShape(text,xPosition,yPosition,idx){
gCurrentMeme.lines[idx].textWidth=gCtx.measureText(text).width
gCurrentMeme.lines[idx].xPosition=xPosition
gCurrentMeme.lines[idx].yPosition=yPosition
}



function increaseFontSize() {
  var size = gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].fontSize;
  size = parseInt(size) + 10 + "";
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].fontSize = size;
  
}

function decreaseFontSize() {
  var size = gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].fontSize;
  size = parseInt(size) - 10 + "";
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].fontSize = size;
}

function redrawCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  drawCanvasImgText(gCurrentMeme.id);
}

function updateCanvas() {
  gCanvas = document.getElementById("my-canvas");
  gCtx = gCanvas.getContext("2d");
}

function getMemesForDisplay(filter) {
  if (!filter) filter = "all";
  var memes = gMemes;
  return memes;
}

function moveLineUp(){
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].yPosition+=200;
  
}
function moveLineDown(){
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].yPosition-=200;
  
}

function updateText(value) {
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].text = value;
}

function setCanvasText(
  text,
  x,
  y,
  fillStyle = "white",
  strokeStyle = "black",
  fontSize = "30",
  fontFamily = "impact"
) {
  gCtx.beginPath();
  gCtx.lineWidth = "2";
  gCtx.strokeStyle = strokeStyle;
  gCtx.fillStyle = fillStyle;
  gCtx.font = fontSize + "px " + fontFamily;
  gCtx.textAlign = "center";
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
  gCtx.closePath();
}

function CheckLine(mouseX,mouseY){
 const line=gCurrentMeme.lines.findIndex(line=>{
    return mouseX > (line.xPosition - line.textWidth / 2) && mouseX < (line.xPosition + line.textWidth / 2) && mouseY > (line.yPosition-(+line.fontSize)) && mouseY < (line.yPosition + (+line.fontSize))
  })
  if (line !== -1) {
    gCurrentMeme.selectedLineIdx=line
  }
return line>-1
  
}

function switchLineUp() {
  if (gCurrentMeme.selectedLineIdx - 1 < 0) {
    return;
  }
  gCurrentMeme.selectedLineIdx--;
  setCurrTextInput();
}

function switchLineDown() {
  if (gCurrentMeme.selectedLineIdx + 1 > gCurrentMeme.lines.length - 1) {
    return;
  }
  gCurrentMeme.selectedLineIdx++;
  setCurrTextInput();
}

function setCurrTextInput() {
  const elMemeText = document.querySelector('input[name="meme-text"]');
  elMemeText.value = gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].text;
}

function changeOutLineColor(value){
gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].strokeStyle=value
}
function changeFillColor(value){
gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].fillStyle=value
}


function changeFont(value){
  var fontFace;
  if(value==='lobster') fontFace== new FontFace('lobster', 'url(fonts/Lobster-Regular.ttf)');
  fontFace.load().then(function() {
    gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].font=fontFace
    redrawCanvas()
  
  });
}


function drawOuterRectengle(){
  var line=gCurrentMeme.lines[gCurrentMeme.selectedLineIdx]
  var height=+line.fontSize
  var width=gCtx.measureText(line.text).width
  var PosX=line.xPosition
  var PosY=line.yPosition
  gCtx.beginPath();
  gCtx.strokeStyle = 'White';
  gCtx.rect(PosX-(width/2)-5,PosY-height,width+10,height+10);
  gCtx.stroke();
  gCtx.closePath();
}


function resetSelectedLine(){
  gCurrentMeme.selectedLineIdx=0
}


function getMemeId(){
  return gCurrentMeme.id
}

function findMeme(id) {
  return gMemes.find((meme) => meme.id === id);
}

function setCurrentMeme(meme) {
  gCurrentMeme = meme;
}

function setDragTrue(){
  gCurrentMeme.drag=true
}
function setDragFalse(){
  gCurrentMeme.drag=false
}

function isDragMode(){
  return gCurrentMeme.drag

}

function dragLine(mouseX,mouseY){
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].xPosition = mouseX;
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].yPosition = mouseY ;
}

function typeTextInBox(event){
  if(!gCurrentMeme) return;
  var letter=event.key
  var currentLine=gCurrentMeme.lines[gCurrentMeme.selectedLineIdx]
  if(gCurrentMeme.selectedLineIdx!==-1  && event.keyCode!==8){
    currentLine.text+=letter
  }
  else{
    currentLine.text= currentLine.text.substr(0, currentLine.text.length-1)
  }
  redrawCanvas()
}

 async function downloadMeme(){
  var elLink=document.querySelector('.download-meme');
  var img = gCanvas.toDataURL();
  elLink.href=img
  elLink.download = 'my-meme.jpg'
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gMemes);
}

function percentage(num, per) {
  return (num / 100) * per;
}
