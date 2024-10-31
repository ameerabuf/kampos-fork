import { Kampos, effects } from '../index.js';

const media = document.querySelector('#video8');
const target = document.querySelector('#target');

const kaleidoscope = effects.kaleidoscope();

const instance = new Kampos({ effects: [kaleidoscope], target });

/* make sure video is loaded and playing */
prepareMedia([media], 'video', [
    `../Engineering Conference Assets/Kaleidoscope.mov`,
]).then((videos) => {
    const width = videos[0].videoWidth || videos[0].naturalWidth;
    const height = videos[0].videoHeight || videos[0].naturalHeight;

    /* set media source */
    instance.setSource({ media: videos[0], width, height });

    instance.play();

    target.addEventListener('pointermove', (e) => {
        const { offsetX, offsetY } = e;
        kaleidoscope.offset = offsetX / width - 0.5;
    });
});
