var gCanvas;
var gCtx;
var gKeywords = { happy: 12, 'funny puk': 1 };
var gId = 101;
const KEY = 'memes';
var gPageIdx = 1;
var gImgs = [
  { id: 1, url: 'images/meme-imgs(square)/1.jpg', keywords: ['happy'] },
];
var gMemes = [];
var gFilter;
var gCurrentMeme;
var gCurrentImage;



function creatMemes() {
  for (var i = 0; i < 18; i++) {
    gMemes.push(creatMeme());
  }
  gId = 101;
  console.log(12);
}


function creatMeme(category) {
  if (!category) category = 'random';
  return {
    text: 'Enter Text Here',
    selectedLineIdx: 0,
    id: gId++,
    category,
    lines: [
      {
        text: 'Enter Text Here',
        align: 'left',
        color: 'red',
        fillStyle: 'white',
        strokeStyle: 'black',
        fontSize: '50',
        fontFamily: 'impact',
        textWidth: 0,
        xPosition: 0,
        yPosition: 0,
      },
      {
        text: 'Hello',
        align: 'left',
        color: 'red',
        fillStyle: 'white',
        strokeStyle: 'black',
        fontSize: '50',
        fontFamily: 'impact',
        textWidth: 0,
        xPosition: 0,
        yPosition: 0,
      },
    ],
  };
}



function updateCurrentImage(img) {
  var image = new Image();
  if (!img.url) image.src = img.src;
  else image.src = img.url;
  gCurrentImage = image;
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
  gCurrentMeme.lines[1].yPosition = percentage(gCanvas.height, 10);
  gCurrentMeme.lines[1].xPosition = gCanvas.width / 2;
}

function addNewLinesPosition() {
  for (var i = 2; i < gCurrentMeme.lines.length; i++) {
    var line = gCurrentMeme.lines[i];
    line.yPosition = gCurrentMeme.lines[i - 1].yPosition + 100;
    line.xPosition = gCanvas.width / 2;
  }
}





function addNewLine() {
  gCurrentMeme.lines.push({
    text: 'Enter Text Here',
    size: 40,
    align: 'left',
    color: 'red',
    fillStyle: 'white',
    strokeStyle: 'black',
    fontSize: '50',
    fontFamily: 'impact',
    textWidth: 0,
    xPosition: 0,
    yPosition: 0,
    drag: false,
  });
  gCurrentMeme.selectedLineIdx++;
  addNewLinesPosition();
}

function renderUploadedImage(e) {
  gCurrentMeme = creatMeme();
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image();
    img.onload = function () {
      gCurrentImage = img;
      // updateCurrentImage(img);
      renderCanvas();
      setInitialTextPosition();
      drawCanvasImgText();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

function getCurrentImage() {
  return gCurrentImage;
}

function removeLine() {
  --gCurrentMeme.selectedLineIdx;
  if (gCurrentMeme.lines.length === 2) {
    document.querySelector('.remove-line').classList.add('hidden');
    gCurrentMeme.lines.pop();
    redrawCanvas();
    return;
  }
  gCurrentMeme.lines.pop();
}

function updateOuterShape(text, xPosition, yPosition, idx) {
  gCurrentMeme.lines[idx].textWidth = gCtx.measureText(text).width;
  gCurrentMeme.lines[idx].xPosition = xPosition;
  gCurrentMeme.lines[idx].yPosition = yPosition;
}

function increaseFontSize() {
  var size = getSelectedLine().fontSize;
  size = parseInt(size) + 10 + '';
  getSelectedLine().fontSize = size;
}

function decreaseFontSize() {
  var size = getSelectedLine().fontSize;
  size = parseInt(size) - 10 + '';
  getSelectedLine().fontSize = size;
}

function redrawCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  drawCanvasImgText(gCurrentMeme.id);
}

function updateCanvas() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
}

function renderCanvas() {
  var height = getCurrentImage().height;
  var width = getCurrentImage().width;
  gCanvas.width = width;
  gCanvas.height = height;

  //TODO
  // To Render Full height, Resizing Needed
  // var elContainerHeight = document.querySelector(".canvas-wrapper")
  //   .offsetHeight;
  // var elContainerWidth = document.querySelector(".canvas-wrapper").offsetWidth;
}

function getMemesForDisplay(filter) {
  if (!filter) filter = 'all';
  var memes = gMemes;
  return memes;
}

function updateText(value) {
  getSelectedLine().text = value;
}

function setCanvasText(
  text,
  x,
  y,
  fillStyle = 'white',
  strokeStyle = 'black',
  fontSize = '30',
  fontFamily = 'impact'
) {
  gCtx.beginPath();
  gCtx.lineWidth = '2';
  gCtx.strokeStyle = strokeStyle;
  gCtx.fillStyle = fillStyle;
  gCtx.font = fontSize + 'px ' + fontFamily;
  gCtx.textAlign = 'center';
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
  gCtx.closePath();
}

function CheckLine(mouseX, mouseY) {
  const line = gCurrentMeme.lines.findIndex((line) => {
    return (
      mouseX > line.xPosition - line.textWidth / 2 &&
      mouseX < line.xPosition + line.textWidth / 2 &&
      mouseY > line.yPosition - +line.fontSize &&
      mouseY < line.yPosition + +line.fontSize
    );
  });
  if (line !== -1) {
    gCurrentMeme.selectedLineIdx = line;
  }
  return line > -1;
}


function increaseImgSize(){
  gCurrentImage.height+=15
  gCurrentImage.width+=15
  
}

function decreaseImgSize(){
  gCurrentImage.height-=15
  gCurrentImage.width-=15
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

function getSelectedLine(value){
  return  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx]
}

function setCurrTextInput() {
  const elMemeText = document.querySelector('input[name="meme-text"]');
  elMemeText.value = getSelectedLine().text;
}

function changeOutLineColor(value) {
  getSelectedLine().strokeStyle = value;
}
function changeFillColor(value) {
  getSelectedLine().fillStyle = value;
}

function changeFont(value) {
  getSelectedLine().fontFamily=value
}

function drawOuterRectengle() {
  var line = getSelectedLine();
  var height = +line.fontSize;
  var width = gCtx.measureText(line.text).width;
  var PosX = line.xPosition;
  var PosY = line.yPosition;
  gCtx.beginPath();
  gCtx.strokeStyle = 'White';
  gCtx.rect(PosX - width / 2 - 5, PosY - height, width + 10, height + 10);
  gCtx.stroke();
  gCtx.closePath();
}

function resetSelectedLine() {
  gCurrentMeme.selectedLineIdx = 0;
}

function getMemeId() {
  return gCurrentMeme.id;
}

function findMeme(id) {
  return gMemes.find((meme) => meme.id === id);
}

function setCurrentMeme(meme) {
  gCurrentMeme = meme;
}

function setDragTrue() {
  gCurrentMeme.drag = true;
}
function setDragFalse() {
  gCurrentMeme.drag = false;
}

function isDragMode() {
  return gCurrentMeme.drag;
}

function dragLine(mouseX, mouseY) {
  var line =getSelectedLine()
  line.xPosition = mouseX;
  line.yPosition = mouseY;
}

function typeTextInBox(event) {
  if (!gCurrentMeme) return;
  var letter = event.key;
  var currentLine = getSelectedLine();
  if (gCurrentMeme.selectedLineIdx !== -1 && event.keyCode !== 8) {
    currentLine.text += letter;
  } else {
    currentLine.text = currentLine.text.substr(0, currentLine.text.length - 1);
  }
  redrawCanvas();
}

async function downloadMeme() {
  var elLink = document.querySelector('.download-meme');
  var img = gCanvas.toDataURL();
  elLink.href = img;
  elLink.download = 'my-meme.jpg';
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gMemes);
}

function percentage(num, per) {
  return (num / 100) * per;
}
