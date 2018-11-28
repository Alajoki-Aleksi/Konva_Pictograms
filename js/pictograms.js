PictogramNameSpace = function(){

  var width = window.innerWidth;
  var height = window.innerHeight;

  function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for(var src in sources) {
      numImages++;
    }

    // Create an object for each source
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        // Move to the callback method "buildStage" when every source has been given an object
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      // Add the picture source to the newly created object
      images[src].src = sources[src];
    }
  }

  // Image sources
  var sources = {
    confidence: "img/choice.png",
    research: "img/exam.png",
    manag: "img/management.png",
    teamwork: "img/network.png",
    you: "img/you.png"
  };



  function buildStage(images) {
    // Static image on the center
    var youImg = new Konva.Image({
        image: images.you,
        x: width * 0.4,
        y: height * 0.38,
        width: 150,
        height: 150,
        draggable: false
    });
    // Draggable images
    var confidenceImg = new Konva.Image({
      image: images.confidence,
      x: 5,
      y: 5,
      width: 128,
      height: 128,
      id: "1",
      draggable: true
    });
    calculateDistance(confidenceImg, youImg);

    var researchImg = new Konva.Image({
      image: images.research,
      x: 13,
      y: 200,
      width: 128,
      height: 128,
      id: "2",
      draggable: true
    });
    calculateDistance(researchImg, youImg);

    var managImg = new Konva.Image({
        image: images.manag,
        x: 8,
        y: 410,
        width: 128,
        height: 128,
        id: "3",
        draggable: true
    });
    calculateDistance(managImg, youImg);

    var teamworkImg = new Konva.Image({
        image: images.teamwork,
        x: 8,
        y: 600,
        width: 128,
        height: 128,
        id: "4",
        draggable: true
    });
    calculateDistance(teamworkImg, youImg);

    layer.add(confidenceImg);
    layer.add(researchImg);
    layer.add(managImg);
    layer.add(teamworkImg);
    layer.add(youImg);
    stage.add(layer);


    // Zoom ratio
    var scaleBy = 1.3;
    // Zoom by scrolling the mouse wheel
    window.addEventListener('wheel', (e) => {
      e.preventDefault();

      var oldScale = stage.scaleX();
      var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      // Zoom in relation to mouse position
      var mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };
      var newPos = {
          x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
          y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
      };

      // Min and max parameters for the zooming
      if (newScale > 0.15 && 2 > newScale) {
        stage.scale({ x: newScale, y: newScale });
        stage.position(newPos);
      }
      stage.batchDraw();
    });
  }

  // Calculate the distance from the draggable image to the center static image
  function calculateDistance(image, youImg) {
    image.on("dragmove", function() {
      document.getElementById("pic" + image.getId()).innerHTML =
      Math.floor(Math.sqrt(Math.pow((image.getX() - youImg.getX()),2) + Math.pow((image.getY() - youImg.getY()),2)) / 100);
    });
  }


  var stage = new Konva.Stage({
      container: "container",
      width: width * 0.8,
      height: height
  });

  var layer = new Konva.Layer();


  loadImages(sources, buildStage);

}();
