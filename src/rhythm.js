// src/rhythm.js

// Define the playRhythm function
export function playRhythm(bpm, duration) {
    const interval = 60000 / bpm; // Convert BPM to milliseconds
    const endTime = Date.now() + duration * 1000; // Convert duration to milliseconds

    const rhythmInterval = setInterval(() => {
        if (Date.now() >= endTime) {
            clearInterval(rhythmInterval);
        } else {
            console.log("Beat");
        }
    }, interval);
}