import { Kampos, effects } from '../index.js';

const media1 = document.querySelector('#video3');
const media2 = document.querySelector('#video4');
const target = document.querySelector('#target');

// create the effects/transitions we need
const alphaMask = effects.alphaMask();

// make sure videos are loaded and playing
prepareMedia([media1, media2], 'video', [
    `../Engineering Conference Assets/Luminance Mask1.mov`,
    `../Engineering Conference Assets/Luminance Mask2.mov`,
]).then((videos) => {
    const width = videos[0].videoWidth || videos[0].naturalWidth;
    const height = videos[0].videoHeight || videos[0].naturalHeight;

    alphaMask.isLuminance = true;
    alphaMask.mask = videos[1];
    // it's a video so update on every frame
    alphaMask.textures[0].update = true;

    // init kampos
    const instance = new Kampos({ target, effects: [alphaMask] });

    // set media source
    instance.setSource({ media: videos[0], width, height });
    // start kampos
    instance.play();
});
