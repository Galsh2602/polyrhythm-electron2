import Overtone from './overtone.js';
import { drawWaveOnCanvas } from './draw.js';
import { drawPolygon } from './draw.js';
document.addEventListener('DOMContentLoaded', () => {
    const Maincanvas = document.getElementById('canvas');
    const slider = document.getElementById('slider'); 
    const BPMText = document.getElementById('BPM'); 
    const HzText = document.getElementById('Hz'); 
    const stopButton = document.getElementById('stop-button');
    const WaveCanvas = [];
    const Toggles = [];
    
    for (let i = 1; i <= 8; i++) {
        Toggles.push(document.getElementById(`${i}beat`));
        WaveCanvas.push(document.getElementById(`${i}beat-canvas`));
        drawWaveOnCanvas(WaveCanvas[i-1], i);
    }


    const mainCanvas = document.getElementById('canvas');
    const ctx = mainCanvas.getContext('2d'); 

    let BPM = slider.value;
    let frequency = Math.round(BPM / 60 * 1000) / 1000; 

    BPMText.textContent = `${BPM} BPM`;
    HzText.textContent = `${frequency} Hz`;

    const subdivisions = [1, 2, 3, 4, 5, 6, 7, 8];  // Subdivisions for each beat
    const overtones = [];

    
        drawPolygon(Maincanvas, 3, 300, Maincanvas.width, Maincanvas.height, '#F3C4AC'); // Draw the polygon on the canvas
    
 

    // Stop all active overtones when the stop button is clicked
    stopButton.addEventListener('click', () => {
        overtones.forEach((overtone, i) => {
            if (overtone) {
                overtones[i].stop(); 
                overtones[i] = null;
                Toggles[i].checked = false;
            }
        });
    });
    // Iterate over the checkboxes to add event listeners
    Toggles.forEach((toggle, i) => {
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                // Checkbox is checked, create a new overtone object
                const overtone = new Overtone(i + 1, BPM, subdivisions[i], 0.1, { centerX: 200, centerY: 200, radius: 100 }, ctx);
                overtones[i] = overtone;
                overtone.start(); // Start the oscillator and visual animation
            } else {
                // Checkbox unchecked, stop and remove the overtone
                if (overtones[i]) {
                    overtones[i].stop(); // Stop the oscillator
                    overtones[i] = null;
                }
            }
        });
    });

    // Handle BPM slider updates
    slider.addEventListener('input', (event) => {
        BPM = event.target.value;  
        frequency = Math.round(BPM / 60 * 1000) / 1000; 

        BPMText.textContent = `${BPM} BPM`;
        HzText.textContent = `${frequency} Hz`;

        overtones.forEach((overtone, i) => {
            if (overtone) {
                overtone.updateBPM(BPM);  // Update the BPM for active overtones
            }
        });
    });

});
