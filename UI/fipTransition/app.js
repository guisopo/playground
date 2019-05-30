const app = document.querySelector('#app');

app.addEventListener('click', () => {
  let scene = document.querySelector(`[data-scene="${app.dataset.state}"]`);
  
  // FIRST
  const smallImg1 = scene.querySelector('[data-key="img-1"]');
  let firstRect = smallImg1.getBoundingClientRect();

  const state = (app.dataset.state = 
                 app.dataset.state === 'detail'? 'gallery' : 'detail');
  scene = document.querySelector(`[data-scene="${state}"]`);  
  
  requestAnimationFrame(() => {
    // LAST
    const bigImg1 = scene.querySelector('[data-key="img-1"]');
    const lastRect = bigImg1.getBoundingClientRect();

    // INVERT
    const deltaX = firstRect.left - lastRect.left;
    const deltaY = firstRect.top - lastRect.top;
    const deltaW = firstRect.width / lastRect.width;
    const deltaH = firstRect.height / lastRect.height;

    bigImg1.style.transition = 'none';
    bigImg1.style.transformOrigin = 'top left';
    bigImg1.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;

    // PLAY
    requestAnimationFrame(() => {
      bigImg1.style.transition = "transform .5s cubic-bezier(.5,0,.5,1)";
      bigImg1.style.transform = "none";
    });
  });
});