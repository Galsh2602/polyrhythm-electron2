//animation.js
import { drawPolygon } from './draw.js';

export function animateBall(ctx, sides, radius, centerX, centerY, ballRadius, color) {
    let angle = 0;
    
    function animate() {
        // Save the current canvas state to only clear the specific area where the ball was.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw the polygon for reference
        drawPolygon(ctx, sides, radius, centerX, centerY, 'pink');

        // Calculate the ball's position based on the angle
        const ballX = centerX + radius * Math.cos(angle);
        const ballY = centerY + radius * Math.sin(angle);

        // Draw the ball at the calculated position
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        // Update the angle for the next frame
        angle += 0.02;  // Adjust speed by changing this value
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();
}
