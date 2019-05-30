const images = document.querySelectorAll('[data-scene="gallery"] figure');
const app = document.querySelector('#app');

// FIRST
const smallImg1 = document.querySelector('[data-key="small-img-1"]');
const loadedImage = document.querySelector('[data-key="small-img-1"] img');
let firstRect;
loadedImage.addEventListener('load', () => {
  firstRect = smallImg1.getBoundingClientRect();
});


app.addEventListener('click', () => {
  app.dataset.state =
    app.dataset.state === 'detail' ? 'gallery' : 'detail';
  

  requestAnimationFrame(() => {
    // LAST
    const bigImg1 = document.querySelector('[data-key="big-img-1"]');
    const lastRect = bigImg1.getBoundingClientRect();

    // INVERT
    const deltaX = firstRect.left - lastRect.left;
    const deltaY = firstRect.top - lastRect.top;
    const deltaW = firstRect.width / lastRect.width;
    const deltaH = firstRect.height / lastRect.height;

    bigImg1.style.transform = 'none';
    bigImg1.style.transformOrigin = 'top left';
    bigImg1.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
    // PLAY
    requestAnimationFrame(() => {
      bigImg1.style.transition = "transform .5s cubic-bezier(.5,0,.5,1)";
      bigImg1.style.transform = "none";
    });
  });
  
});