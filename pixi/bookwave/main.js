const sections = document.querySelectorAll('section');

sections.forEach(section => {
  const originalImg = section.querySelector('img');
  const originalImgSrc = originalImg.getAttribute('src');

  section.innerHTML = '';

  //Set up pixi application
  const app = new PIXI.Application({
    width: 650,
    height: 800,
    transparent: true
  });

  //Add pixi app to each section
  section.appendChild(app.view);

  //Make new Image
  let image = null;
  let image2 = null;
  let displacementImage = null;
  let displacementImage2 = null;
  let rgbFilter = new PIXI.filters.RGBSplitFilter([0, 0], [0, 0], [0, 0]);

  //Make new loader
  const loader = new PIXI.loaders.Loader();

  //Load images
  loader.add('image', originalImgSrc);
  loader.add('image2', './assets/displacement16.jpg');
  loader.add('displacement', './assets/displacement16.jpg');
  loader.add('displacement2', './assets/displacement15.jpg');

  loader.load((loader, resources) => {
    //Once image loaded do this
    image = new PIXI.Sprite(resources.image.texture);
    image2 = new PIXI.Sprite(resources.image2.texture);
    
    displacementImage = new PIXI.Sprite(resources.displacement.texture);
    displacementImage2 = new PIXI.Sprite(resources.displacement2.texture);

    image.width = 650;
    image.height = 800;
    image.x = 0;
    image.y = 0;
    image.rotation = 0.6;
    image.interactive = true;

    image.anchor.x = 0.5;
    image.anchor.y = 0.4;

    image2.width = 650;
    image2.height = 800;
    image2.x = 325;
    image2.y = 400;
    image2.interactive = true;
    image2.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    image2.anchor.x = 0.5;
    image2.anchor.y = 0.5;

    displacementImage.width = 650;
    displacementImage.height = 800;
    displacementImage.x = 325;
    displacementImage.y = 400;
    displacementImage.anchor.x = 0.5
    displacementImage.anchor.y = 0.5
    displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    //Add filter to the image
    image.filters = [
      new PIXI.filters.DisplacementFilter(displacementImage, 30),
      rgbFilter
    ];

    //Add image to app
    app.stage.addChild(image);
    app.stage.addChild(image2);
    app.stage.addChild(displacementImage);

    //Add ticker
    app.ticker.add(() => {
      image.x = image.x + 1;
      image.y = image.y + 1;
      if (image.y > 1110)  {
        image.y = -200;
        image.x = -200;
      };
      // displacementImage.rotation += 0.001; 0
    });
  });

  let currentX = 0;
  let aimX =  0;
  let currentY = 0;
  let aimY =  0;

  //Listen mouse movement
  section.addEventListener('mousemove', (event) => {
    // displacementImage.x = event.pageX;
    // aimY = event.pageY;
    // displacementImage.y = event.pageY;
  });

  //Animate
  const animate = function() {
    //currentX should get towards aimX every frame
    const diffX = aimX - currentX;
    const diffY = aimY - currentY;
    //ease current X
    currentX = currentX + diffX * 0.15;
    currentY = currentY + diffY * 0.15;

    //if there is displacement image, move it
    if(displacementImage) {
      displacementImage.x = currentX;
      displacementImage.y = currentY;

      // rgbFilter.red = [diffX*0.025, 0];
      // rgbFilter.green = [0, diffY*0.025];
    }

    requestAnimationFrame(animate);
  }

  //Load animation
  // animate();

});
