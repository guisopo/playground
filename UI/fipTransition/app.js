const images = document.querySelectorAll('[data-scene="gallery"');
const app = document.querySelector('#app');

app.addEventListener('click', () => {
  app.dataset.state =
    app.dataset.state === 'detail' ? 'gallery' : 'detail';
});