import { createPolyrhythmOscillator, stopPolyrhythmOscillator, changeFrequency } from './sound.js'; // Import changeFrequency

class Overtone {
    constructor(overtone, bpm, subdivision, volume, poly, canvasContext) {
        this.overtone = overtone;
        this.bpm = bpm;
        this.subdivision = subdivision;
        this.volume = volume;
        this.poly = poly;
        this.ctx = canvasContext;
        this.oscillator = null;
    }

    start() {
        const { oscillator, gainNode, audioCtx } = createPolyrhythmOscillator(this.bpm, this.subdivision, this.volume);
        this.oscillator = { oscillator, gainNode, audioCtx };
    }

    updateBPM(newBPM) {
        this.bpm = newBPM;
        if (this.oscillator) {
            const frequency = (newBPM / 60) * this.subdivision;
            changeFrequency(this.oscillator.oscillator, frequency);  // Update oscillator frequency
        }
    }

    stop() {
        if (this.oscillator) {
            stopPolyrhythmOscillator(this.oscillator);
        }
    }
}

export default Overtone;
