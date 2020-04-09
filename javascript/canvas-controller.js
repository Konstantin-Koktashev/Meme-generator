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
  gCanvas.width = elContainerWidth;
  gCanvas.height = elContainerHeight;
}

function addMeme(id) {
  var meme=findMeme(parseInt(id))
  hideTemplateModal();
  hideMain();
  showEditModal();
  renderCanvas();
  setCurrentMeme(meme)
  setPosition()
  drawImg(id);
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
function drawImg(id) {
  var img = new Image();
  var selectedImage = gImgs.find((img) => img.id + "" == id);
  img.src = selectedImage.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gCurrentMeme.lines.forEach(line=>{
      setCanvasText(line.text, line.xPosition, line.yPosition, undefined, undefined, 60)
    })

  };
}


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
  drawImg(gCurrentMeme.id)
}







function drawTextInBox(txt, font, x=gCanvas.width/5, y= gCanvas.height/16, w, h, angle) {
  if(!w||!h){
    w=gCanvas.width/2
    h=100
  }
  if(!font) font="Comic Sans MS"
  angle = angle || 0;
  var fontHeight = 10;
  var hMargin = 2;
  gCtx.font = fontHeight + 'px ' + font;
  gCtx.textAlign = 'left';
  gCtx.textBaseline = 'top';
  var txtWidth = gCtx.measureText(txt).width + 2 * hMargin;
  gCtx.save();
  gCtx.translate(x+w/2, y);
  gCtx.rotate(angle);
  gCtx.strokeRect(-w/2, 0, w, h);
  gCtx.scale(w / txtWidth, h / fontHeight);
  gCtx.translate(hMargin, 0)
  gCtx.fillText(txt, -txtWidth/2, 0);
  gCtx.restore();
}

