function onInit() {
  updateCanvas();
  creatMemes();
  loadImages();
  renderMemesCards();
}



function addMeme(id) {
  var meme = findMeme(parseInt(id));
  var memeImg=findImg(id)
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
  drawCanvas()
  document.querySelector("main").style.backgroundColor = "white";
}

function drawOuterShape(x, y, width, height) {
    drawShapeAround(x,y,width,height)
}

function removeOuterShape() {}

function renderMemesCards() {
  var searchString=getSearchString()
  setFilter(searchString)
  var filter = getFilter();
  if(!filter) filter='recommended';
  var memesInGenre = getMemesForDisplay(filter);
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


function getSearchString() {
  var searchString = document.querySelector("#search").value.trim();
  return searchString
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
  drawCanvasImgText()
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
  setTimeout(() => {
    hideEditModal()
    showMain()
    document.querySelector('.share-modal').classList.remove('hide');
  }, 1000);
}

function onTypeText(event) {
  typeTextInBox(event);
}
