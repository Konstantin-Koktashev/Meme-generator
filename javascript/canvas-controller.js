function onInit() {
  updateCanvas();
  renderCanvas();
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
  drawImg(id);
}

function hideTemplateModal() {
  document.querySelector(".meme-template-modal").classList.add(".hide");
}
function hideEditModal() {
  document.querySelector(".upload-modal").classList.add(".hide");
}

function drawImg(id) {
  var elImg = document
    .querySelector(`.${id}`)
    .parentElement()
    .parentElement()
    .querySelector("img");
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function renderMemesCards() {
  // var filter = getFilter();
  // if(!filter) filter='all';
  var memesInGenre = getMemesForDisplay("filter");
  debugger;
  // var memes = getMemes(memesInGenre);
  // var searchString=getSearchString()
  // if(searchString) {
  //   var foundMeme=findMeme()
  //   if(!foundMeme) return;
  //   memes=[foundMeme];
  // }
  var strHtml;
  strHtml = memesInGenre.map((meme) => {

   return  `<article class="meme">
        <section class="img-container">
            <img src="images/meme-imgs (square)/${
              gImgs.find((img) => img.id === meme.id).id
            }.jpg" alt="meme Image" />
        </section>
        <section class="card-body">
            <button onclick="addMeme('${meme.id}')">Add Meme</button>
          </section>
      </article>`;
  });

  document.querySelector(".cards-container").innerHTML = strHtml.join("");
}
