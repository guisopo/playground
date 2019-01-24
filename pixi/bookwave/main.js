const sections = document.querySelectorAll('section');

sections.forEach(section => {
  const originalImg = section.querySelector('img');
  const originalImgSrc = originalImg.getAttribute('src');

  section.innerHTML = '';

  //Set up pixi application
  const app = new PIXI.Application({
    width: 1100,
    height: 800,
    transparent: true
  });

  //Add pixi app to each section
  section.appendChild(app.view);

  //Make new Image
  let image = null;
  let displacementImage = null;
  let rgbFilter = new PIXI.filters.RGBSplitFilter([0, 0], [0, 0], [0, 0]);

  //Make new loader
  const loader = new PIXI.loaders.Loader();

  //Load images
  loader.add('image', originalImgSrc);
  loader.add('displacement', './assets/displacement1.jpg');

  loader.load((loader, resources) => {
    //Once image loaded do this
    image = new PIXI.Sprite(resources.image.texture);
    displacementImage = new PIXI.Sprite(resources.displacement.texture);

    image.x = 100;
    image.y = 100;
    image.width = 900;
    image.height = 600;
    image.interactive = true;

    displacementImage.width = 500;
    displacementImage.height = 500;
    displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    //Add filter to the image
    image.filters = [
      new PIXI.filters.DisplacementFilter(displacementImage, 10),
      rgbFilter
    ];

    //Add image to app
    app.stage.addChild(image);
    app.stage.addChild(displacementImage);

    //Add ticker
    app.ticker.add(() => {
      // displacementImage.x = displacementImage.x + 1;
      // displacementImage.y = displacementImage.y + 1;
      // displacementImage.rotation += 0.001; 0
    });
  });

  let currentX = 0;
  let aimX =  0;
  let currentY = 0;
  let aimY =  0;

  //Listen mouse movement
  section.addEventListener('mousemove', (event) => {
    aimX = event.pageX;
    aimY = event.pageY;
    // displacementImage.y = event.pageY;
  });

  //Animate
  const animate = function() {
    //currentX should get towards aimX every frame
    const diffX = aimX - currentX;
    const diffY = aimY - currentY;
    //ease current X
    currentX = currentX + diffX * 0.015;
    currentY = currentY + diffY * 0.015;

    //if there is displacement image, move it
    if(displacementImage) {
      displacementImage.x = currentX;
      displacementImage.y = currentY;

      rgbFilter.red = [diffX*0.025, 0];
      rgbFilter.green = [0, diffY*0.025];
    }

    requestAnimationFrame(animate);
  }

  //Load animation
  animate();

});
