const app = document.querySelector('#app');

app.addEventListener('click', () => {
  let scene = document.querySelector(`[data-scene="${app.dataset.state}"]`);
  
  // FIRST
  const firstImg = scene.querySelector('[data-key="img-1"]');
  const firstRect = firstImg.getBoundingClientRect();

  const state = (app.dataset.state = app.dataset.state === 'detail'? 'gallery' : 'detail');
  scene = document.querySelector(`[data-scene="${state}"]`);  
  
  requestAnimationFrame(() => {
    // LAST
    const nextImg = scene.querySelector('[data-key="img-1"]');
    const lastRect = bigImg1.getBoundingClientRect();

    // INVERT
    const deltaX = firstRect.left - lastRect.left;
    const deltaY = firstRect.top - lastRect.top;
    const deltaW = firstRect.width / lastRect.width;
    const deltaH = firstRect.height / lastRect.height;

    nextImg.style.transition = 'none';
    nextImg.style.transformOrigin = 'top left';
    nextImg.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;

    // PLAY
    requestAnimationFrame(() => {
      nextImg.style.transition = "transform .3s cubic-bezier(.5,0,.5,1)";
      nextImg.style.transform = "none";
    });
  });
});