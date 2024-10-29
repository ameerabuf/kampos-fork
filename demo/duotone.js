import { Kampos, effects } from '../index.js';

const target = document.querySelector('#target');
const media = document.querySelector('#video6');

// create the effects we need
const duotone = effects.duotone();
const hueSaturation = effects.hueSaturation();

// init kampos with effect
const instance = new Kampos({ target, effects: [duotone, hueSaturation] });

prepareMedia(
    // change these URL to change image
    [
        'https://static.wixstatic.com/media/cec2b6_36e46176b7e54b678e4c6d39d36452e5~mv2.jpg',
    ],
    'img'
).then((images) => {
    const img = images[0];
    const height = window.document.documentElement.clientHeight;
    const width =
        (height * (img.videoWidth || img.naturalWidth)) /
        (img.videoHeight || img.naturalHeight);

    // set media source
    instance.setSource({ media: img, width, height });

    // start kampos
    instance.play((time) => {
        hueSaturation.hue = Math.sin(time / 2e3) * 360;
    });

    // add mouse events to disable/enable the effect
    target.addEventListener('mouseenter', () => {
        duotone.disabled = true;
        hueSaturation.hueDisabled = true;
    });

    target.addEventListener('mouseleave', () => {
        duotone.disabled = false;
        hueSaturation.hueDisabled = false;
    });
});
