import { Kampos, effects, noise } from '../index.js';

const target = document.createElement('canvas');
target.width = 854;
target.height = 480;

const target2 = document.querySelector('#target');
const media1 = document.querySelector('#video5');
target2.style = 'height: 120%';

// uncomment here if you want to see just the turbulence
//target2.parentNode.replaceChild(target, target2);

// try playing with this factor
const AMPLITUDE = 1 / target.width;
const frequency = { x: AMPLITUDE, y: AMPLITUDE };

const octaves = 4;
// change to false (or comment out) if you want to see the turbulence noise variant
const isFractal = true;

// create the effects we need
const turbulence = effects.turbulence({
    noise: noise.simplex,
    frequency,
    octaves,
    isFractal,
});

// init kampos
const instance = new Kampos({ target, effects: [turbulence], noSource: true });

// create a simple effect that converts the turbulence return value into the output color
const disp = effects.displacement();

const instance2 = new Kampos({ target: target2, effects: [disp] });

// you can increase/decrease the time factor for a faster/slower animation
instance.play((time) => (turbulence.time = time * 2));

prepareMedia([media1], 'video', [
    `../Engineering Conference Assets/Fractal noise displacement.mov`,
]).then((videos) => {
    const width = 0.8 * videos[0].videoWidth || videos[0].naturalWidth;
    const height = 0.8 * videos[0].videoHeight || videos[0].naturalHeight;

    // set media source
    instance2.setSource({ media: videos[0], width, height });

    disp.map = target;
    disp.scale = { x: 0.15, y: -0.15 };
    disp.textures[0].update = true; // to update

    // start kampos
    instance2.play();
});
