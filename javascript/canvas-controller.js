function onInit() {
  updateCanvas();
  loadImages();
  creatMemes();
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
  hideTemplateModal();
  hideMain();
  showEditModal();
  renderCanvas();
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
  debugger
  var elImg = document.querySelector(`[data-id="${id}"]`);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,width,height
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


