import { drawPolygon } from './draw.js';

export function animateBall(ctx, sides, radius, centerX, centerY, ballRadius, color, bpm) {
    let currentEdge = 0;  // Track the current edge (between two vertices)
    let t = 0;  // Parameter to interpolate between vertices
    const maxBPM = 5800;  // Maximum BPM value for scaling
    const minBPM = 1;     // Minimum BPM value for scaling

    // Adjust the time per vertex based on the BPM
    let scaledBPM = Math.max(minBPM, Math.min(bpm, maxBPM));  // Ensure BPM is within range
    const timePerVertex = 60000 / scaledBPM;  // Time per vertex based on BPM (ms)

    // Precompute the vertices of the polygon
    const vertices = [];
    for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        vertices.push({ x, y });
    }

    function animate(lastTime) {
        // Get the current time and calculate time delta
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;

        // Move the ball along the edge based on the time passed
        t += deltaTime / timePerVertex;  // t goes from 0 to 1 over the course of one vertex movement

        if (t >= 1) {
            t = 0;  // Reset `t` once we've completed the move to the next vertex
            currentEdge = (currentEdge + 1) % sides;  // Move to the next edge (vertex)
        }

        // Clear the canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw the polygon
        drawPolygon(ctx, sides, radius, centerX, centerY, 'pink');

        // Get the current and next vertex
        const v0 = vertices[currentEdge];
        const v1 = vertices[(currentEdge + 1) % sides];

        // Interpolate the position of the ball between the two vertices
        const ballX = (1 - t) * v0.x + t * v1.x;
        const ballY = (1 - t) * v0.y + t * v1.y;

        // Draw the ball at the interpolated position
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        // Request the next animation frame, passing the current time as lastTime
        requestAnimationFrame((newTime) => animate(newTime));
    }

    // Start the animation, passing the initial time
    requestAnimationFrame((startTime) => animate(startTime));
}
