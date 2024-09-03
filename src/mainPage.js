// src/mainPage.js

import { playRhythm } from './rhythm.js';

document.addEventListener('DOMContentLoaded', () => {
    playRhythm(120, 10); // Example: Play a rhythm at 120 BPM for 10 seconds

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        playRhythm(100, 15); // Play rhythm at 100 BPM for 15 seconds on button click
    });
});