import { createOscillator,changeFrequency } from "./sound.js";
import { drawPolygon } from "./draw.js";
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider'); // Get the slider element
    const BPMText = document.getElementById('BPM'); // Get the BPM text element
    const HzText = document.getElementById('Hz'); // Get the Hz text element

    const mainCanvas = document.getElementById('canvas'); // Get the canvas element

    let BPM = slider.value; // Get the slider's initial value
    let frequency = Math.round(BPM / 60 * 1000) / 1000;

    BPMText.textContent = `${BPM} BPM`; //Display the inital BPM
    HzText.textContent = `${frequency} Hz`; // Display the inital frequency

    drawPolygon(mainCanvas.getContext('2d'), 3, 20, canvas.width / 2, canvas.height / 2, 'red'); // Draw a triangle on the canvas
    drawPolygon(mainCanvas.getContext('2d'), 4, 20, canvas.width / 2, canvas.height / 2, 'yellow'); // Draw a triangle on the 
    drawPolygon(mainCanvas.getContext('2d'), 360, 20, canvas.width / 2, canvas.height / 2, 'green'); // Draw a triangle on the 
    

    const { oscillator, gainNode, audioCtx } = createOscillator(0.75, 0.02);
    slider.addEventListener('input', (event) => {
        BPM = event.target.value; // puts the sliders value as BPM 
        frequency = Math.round(BPM / 60 * 1000) / 1000; // turns the BPM into a frequency and rounds up to 3 decimal places

        console.log(frequency);
        changeFrequency(oscillator, frequency); // Change the frequency of the oscillator
        BPMText.textContent = `${BPM} BPM`;
        HzText.textContent = `${frequency} Hz`;

    });
});
