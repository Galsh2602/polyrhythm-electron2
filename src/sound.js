export function createOscillator(frequency, volume) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
