// sound.js
export function createOscillator(frequency, volume) {
    const audioCtx = new (window.AudioContext || window.AudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'square';  // Equivalent to a pulse wave
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);  // Hz

    gainNode.gain.value = volume;  // Volume

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    return { oscillator, gainNode, audioCtx };
}

export function changeFrequency(oscillator, frequency) {
    oscillator.frequency.setValueAtTime(frequency, oscillator.context.currentTime);
}
 
export function createPolyrhythmOscillator(bpm, subdivision, volume) {
    const baseFrequency = bpm / 60;  // Base frequency (1 beat per second at 60 BPM)
    const frequency = baseFrequency * subdivision;  // Adjust based on subdivision

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(audioCtx.destination);

    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'square'; // Use square wave for pulse-like beats
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Set frequency based on rhythm

    oscillator.connect(gainNode);
    oscillator.start();

    // Return references to stop the oscillator later
    return { gainNode, audioCtx, oscillator };
}





export function stopPolyrhythmOscillator(oscillatorObj) {
    clearInterval(oscillatorObj.intervalId); // Stop the interval
    oscillatorObj.oscillator.stop(); // Stop the oscillator
    oscillatorObj.gainNode.disconnect(); // Disconnect the gain node
}
