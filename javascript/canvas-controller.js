function onInit() {
  updateCanvas();
  creatMemes();
  loadImages();
  renderMemesCards();
}

function renderCanvas() {
  var elContainerHeight = document.querySelector(".canvas-wrapper")
    .offsetHeight;
  var elContainerWidth = document.querySelector(".canvas-wrapper").offsetWidth;
  gCanvas.width = percentage(elContainerWidth,80) 
  gCanvas.height = percentage(elContainerHeight,80)
}

function addMeme(id) {
  var meme = findMeme(parseInt(id));
  hideTemplateModal();
  hideMain();
  showEditModal();
  renderCanvas();
  setCurrentMeme(meme);
  setInitialTextPosition();
  drawCanvasImgText(id);
}

function hideTemplateModal() {
  document.querySelector(".meme-template-modal").classList.add("hide");
}
function showTemplateModal() {
  document.querySelector(".meme-template-modal").classList.remove("hide");
}
function hideEditModal() {
  document.querySelector(".upload-modal").classList.add("hide");
}
function showEditModal() {
  document.querySelector(".upload-modal").classList.remove("hide");
}
function hideMain() {
  document.querySelector(".main-page").classList.add("hide");
}
function showMain() {
  document.querySelector(".main-page").classList.remove("hide");
}

function onShowTemplateModal() {
  // hideMain()
  hideEditModal();
  showTemplateModal();
}
function drawCanvasImgText(id) {
  var img = new Image();
  var selectedImage = gImgs.find((img) => img.id + "" == id);
  img.src = selectedImage.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gCurrentMeme.lines.forEach((line, idx) => {
      setCanvasText(
        line.text,
        line.xPosition,
        line.yPosition,
        line.fillStyle,
        line.strokeStyle,
        line.fontSize,
        line.fontFamily
      );
      updateOuterShape(line.text, line.xPosition, line.yPosition, idx);
    });
  };
}

function drawOuterShape(x, y, width, height) {
  height = +height;
  gCtx.beginPath();
  gCtx.strokeStyle = "White";
  gCtx.rect(x - width / 2 - 5, y - height, width + 10, height + 10);
  gCtx.stroke();
  gCtx.closePath();
}

function removeOuterShape() {}

function renderMemesCards() {
  // var filter = getFilter();
  // if(!filter) filter='all';
  var memesInGenre = getMemesForDisplay("filter");
  // var memes = getMemes(memesInGenre);
  // var searchString=getSearchString()
  // if(searchString) {
  //   var foundMeme=findMeme()
  //   if(!foundMeme) return;
  //   memes=[foundMeme];
  // }
  var strHtml;
  strHtml = memesInGenre.map((meme) => {
    return `<article class="meme">
        <section class="img-container" >
            <img src="images/meme-imgs(square)/${
              gImgs.find((img) => img.id === meme.id).id
            }.jpg" alt="meme Image" data-id=${meme.id} />
        </section>
        <section class="card-body">
            <button onclick="addMeme('${meme.id}')">Add Meme</button>
          </section>
      </article>`;
  });

  document.querySelector(".cards-container").innerHTML = strHtml.join("");
}

function onValueChange(el) {
  updateText(el.value);
  drawCanvasImgText(gCurrentMeme.id);
}

function onAddNewLine() {
  document.querySelector(".remove-line").classList.remove("hidden");
  addNewLine();
  redrawCanvas();
}

function onRemoveLine() {
  removeLine();
  redrawCanvas();
}

function onCheckBorders(ev) {
  
  var mouseX = ev.offsetX;
  var mouseY = ev.offsetY;
  var isLine = CheckLine(mouseX, mouseY);
  
  if (isLine) {
    drawOuterRectengle();
    setDragTrue()

  }
  else{
    var memeId=getMemeId()
    drawCanvasImgText(memeId)
    resetSelectedLine()

  }
}
function onMoveLine(ev) {
  var mouseX = ev.offsetX;
  var mouseY = ev.offsetY;
  var isDrag=isDragMode()
  var isLine = CheckLine(mouseX, mouseY);
  if(isDrag&&isLine){
    dragLine(mouseX,mouseY)
    redrawCanvas()
    drawOuterRectengle()
  }
}

function onStopChangePosition(){
  setDragFalse()
}



function onChangeOutlineColor(value) {
  changeOutLineColor(value);
  redrawCanvas();
}

function onChangeFillColor(value) {
  changeFillColor(value);
  redrawCanvas();
}
function onChangeFont(value) {
  changeFont(value);
  redrawCanvas();
}

function onIncreaseFontSize() {
  increaseFontSize();
  redrawCanvas();
}

function onDecreaseFontSize() {
  decreaseFontSize();
  redrawCanvas();
}

function onMoveLineUp() {
  moveLineUp();
  redrawCanvas();
}
function onMoveLineDown() {
  moveLineDown();
  redrawCanvas();
}

function onSelectLineUp() {
  switchLineUp();
}
function onSelectLineDown() {
  switchLineDown();
}

function onDownload(elLink) {
downloadMeme()
}

function onTypeText(event){
  typeTextInBox(event)
}


