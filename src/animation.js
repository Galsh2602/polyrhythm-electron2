import { drawPolygon, drawBall } from './draw.js';

export function animateBall(ctx, sides, radius, centerX, centerY, ballRadius, color) {
    let angle = 0;
    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        drawPolygon(ctx, sides, radius, centerX, centerY, color);
        
        const ballX = centerX + radius * Math.cos(angle);
        const ballY = centerY + radius * Math.sin(angle);
        
        drawBall(ctx, ballX, ballY, ballRadius, color);

        angle += 0.01;  // Adjust speed by changing this value
        requestAnimationFrame(animate);
    }
    animate();
}
