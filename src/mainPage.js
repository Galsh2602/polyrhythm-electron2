import { createOscillator } from './sound.js';
import { animateBall } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('screen');
    const ctx = canvas.getContext('2d');

    // Example: Animate a ball on a polygon
    animateBall(ctx, 6, 100, canvas.width / 2, canvas.height / 2, 10, 'red');

    // Example: Start an oscillator (sound)
    const { oscillator, gainNode, audioCtx } = createOscillator(440, 0.5);
    // Stop oscillator after 2 seconds
    setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
    }, 2000);
});
