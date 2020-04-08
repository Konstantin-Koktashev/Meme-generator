var gCanvas;
var gCtx;
var gKeywords = { happy: 12, "funny puk": 1 };
var gId=101
const KEY = "memes";
var gPageIdx=1
var gImgs = [
  { id: 1, url: "../images/meme-imgs (square)/1.jpg", keywords: ["happy"] },
];
var gMemes = [];
var gFilter;
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
  for (var i = 0; i < 19; i++) {
    gMemes.push(creatMeme());
  }
}

function creatMeme(category) {
  if (!category) category = "random";
  return {
    id: gId++,
    category,
    lines: [
      { txt: "I never eat Falafel", size: 20, align: "left", color: "red" },
      {},
    ],
  };
}

function loadImages() {
  var images = [];
  for (var i = 0; i < 19; i++) {
    var image = { id: gId++, url:`../images/meme-imgs (square)/${i + 1}.jpg`};
    images.push(image);
  }
  gImgs = images;
  gId=101
}

function generateMeme() {}

function renderImg() {}

function updateCanvas() {
  gCanvas = document.getElementById("my-canvas");
  gCtx = gCanvas.getContext("2d");
}


function getMemesForDisplay(filter){
  if(!filter) filter='all'
  var memes=gMemes[0]
  return [memes]
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gMemes);
}

