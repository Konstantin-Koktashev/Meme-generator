function onInit() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderCanvas()
}

function renderCanvas() {
    var elContainerHeight=document.querySelector('.canvas-wrapper').offsetHeight;
    var elContainerWidth=document.querySelector('.canvas-wrapper').offsetWidth;
    gCanvas.width = elContainerWidth;
    gCanvas.height = elContainerHeight;

}