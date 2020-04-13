function onInit() {
  updateCanvas();
  creatMemes();
  loadImages();
  renderMemesCards();
}



function addMeme(id) {
  var meme = findMeme(parseInt(id));
  var memeImg=gImgs.find(img=>''+img.id===id)
  updateCurrentImage(memeImg)
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
  document.querySelector('header').classList.add('hide');
}
function hideMain() {
  document.querySelector(".main-page").classList.add("hide");
}
function showMain() {
  document.querySelector(".main-page").classList.remove("hide");
}

function onReplaceImage() {
  showMain();
  showTemplateModal();
  hideEditModal();
}

function onShowTemplateModal() {
  hideEditModal();
  showTemplateModal();
}
function drawCanvasImgText() {
    gCtx.drawImage(getCurrentImage(), 0, 0, gCanvas.width, gCanvas.height);
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
  document.querySelector("main").style.backgroundColor = "white";
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

function onUploadImage(ev) {
  hideTemplateModal();
  hideMain();
  showEditModal();
  renderUploadedImage(ev);

}

function onValueChange(el) {
  updateText(el.value);
  drawCanvasImgText(gCurrentMeme.id);
}

function onSizeImageUp(){
  increaseImgSize()
  renderCanvas()
  setInitialTextPosition();
  drawCanvasImgText()

}

function onSizeImageDown(){
  decreaseImgSize()
  renderCanvas()
  setInitialTextPosition();
  drawCanvasImgText()
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
    setDragTrue();
  } else {
    var memeId = getMemeId();
    drawCanvasImgText(memeId);
    resetSelectedLine();
  }
}
function onMoveLine(ev) {
  var mouseX = ev.offsetX;
  var mouseY = ev.offsetY;
  var isDrag = isDragMode();
  var isLine = CheckLine(mouseX, mouseY);
  if (isDrag && isLine) {
    dragLine(mouseX, mouseY);
    redrawCanvas();
    drawOuterRectengle();
  }
}

function onStopChangePosition() {
  setDragFalse();
}

function onOpenTextEditor() {
  document.querySelector(".text-edit-modal").classList.toggle("hidden");
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
  downloadMeme();
}

function onTypeText(event) {
  typeTextInBox(event);
}
