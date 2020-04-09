var gCanvas;
var gCtx;
var gKeywords = { happy: 12, "funny puk": 1 };
var gId = 101;
const KEY = "memes";
var gPageIdx = 1;
var gImgs = [
  { id: 1, url: "../images/meme-imgs(square)/1.jpg", keywords: ["happy"] },
];
var gMemes = [];
var gFilter;
var gCurrentMeme;
// var memeTemplate = {
//   text: "Enter Text Here",
//   xPosition: gCanvas.height / 2,
//   yPosition: gCanvas.width / 20,
//   fontSize: 30,
//   font: "Impact",
//   align: "center",
//   color: "white",
//   strokeColor: `black`
// };
// var gMeme = {
//   selectedImgId: 5,
//   selectedLineIdx: 0,
//   lines: [
//     { txt: "I never eat Falafel", size: 20, align: "left", color: "red" },
//   ],
// };
// var gMemes = [
//   {
//     id,
//     selectedImgId,
//     selectedLineIdx,
//     category,
//     lines: [
//       { txt: "I never eat Falafel", size: 20, align: "left", color: "red" },
//       {},
//     ],
//   },
// ];

function creatMemes() {
  for (var i = 0; i < 18; i++) {
    gMemes.push(creatMeme());
  }
  gId = 101;
}

function creatMeme(category) {
  if (!category) category = "random";
  return {
    text: "Enter Text Here",
    fontSize: 44,
    font: "Impact",
    align: "center",
    color: "white",
    strokeColor: `black`,
    selectedLineIdx: 0,
    id: gId++,
    category,
    lines: [
      { text: "Enter Text Here", size: 40, align: "left", color: "red" },
      { text: "Enter Text Here", size: 40, align: "left", color: "red" }
    ],
  };
}

function loadImages() {
  var images = [];
  gMemes.forEach((meme) => {
    var image = {
      id: gId++,
      url: `../images/meme-imgs(square)/${meme.id}.jpg`,
    };
    images.push(image);
  });

  gImgs = images;
}


function setPosition() {
      gCurrentMeme.lines[0].yPosition = percentage(gCanvas.height,5);
      gCurrentMeme.lines[0].xPosition =gCanvas.width / 2;
      gCurrentMeme.lines[1].yPosition = percentage(gCanvas.height,97)
      gCurrentMeme.lines[1].xPosition =gCanvas.width / 2;
}
function generateMeme() {}

function renderImg() {}

function updateCanvas() {
  gCanvas = document.getElementById("my-canvas");
  gCtx = gCanvas.getContext("2d");
}

function getMemesForDisplay(filter) {
  if (!filter) filter = "all";
  var memes = gMemes;
  return memes;
}

function moveLine(diff) {
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].yPosition += parseInt(diff);
}

function updateFontSize(diff) {
  gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].size += parseInt(diff);
}

function updateText(value) {
  gCurrentMeme.lines[0].text = value;
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

function switchLine() {
  if (gCurrentMeme.selectedLineIdx < gMeme.lines.length - 1) {
    gCurrentMeme.selectedLineIdx++;
  } else {
    gCurrentMeme.selectedLineIdx = 0;
  }
  setCurrTextInput();
}

function setCurrTextInput() {
  const elMemeText = document.querySelector('input[name="meme-text"]');
  elMemeText.value = gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].text;
}


function findMeme(id) {
  return gMemes.find((meme) => meme.id === id);
}

function setCurrentMeme(meme) {
  gCurrentMeme = meme;
  setCanvasText
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gMemes);
}


function percentage(num, per)
{
  return (num/100)*per;
}