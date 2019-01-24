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

    displacementImage.width = 600;
    displacementImage.height = 600;
    displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    //Add filter to the image
    image.filters = [
      new PIXI.filters.DisplacementFilter(displacementImage, 100)
    ];

    //Add image to app
    app.stage.addChild(image);
    app.stage.addChild(displacementImage);

    //Add ticker
    app.ticker.add(() => {
      displacementImage.x = displacementImage.x + 1;
      displacementImage.y = displacementImage.y + 1;
      // displacementImage.rotation += 0.001; 0
    });
  })

});
