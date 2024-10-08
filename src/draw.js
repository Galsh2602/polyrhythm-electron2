// draw.js
export function initializeCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
}
export function drawPolygon(canvas, sides, radius, color) {
    const ctx = canvas.getContext('2d');
    
    ctx.save();  // Save the current state of the canvas
    let x = canvas.width / 4; 
    let y = canvas.height / 4; 
    
    // Translate to the center of the canvas and rotate 90 degrees to the left
    ctx.translate(x, y);
    ctx.rotate(-Math.PI / 2);
    ctx.translate(-x, -y);
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    
    for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();  // Restore the state to avoid affecting other drawings
}

export function drawWaveOnCanvas(canvas, frequency) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 2;

    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * 0.05 * (frequency / 4)) * (height / 4);  // Sinusoidal curve
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

export function drawRhythmWaves(rhythmWaves) {
    rhythmWaves.forEach((wave) => {
        const canvas = document.getElementById(wave.canvasId);
        if (canvas) {
            drawWaveOnCanvas(canvas, wave.frequency);
        }
    });
}
