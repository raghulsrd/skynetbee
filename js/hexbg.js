function initializeHexagonCanvas(canvasId, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const config = {
    hexHeight: 98,
    hexGlowRadius: 300,
    hexFillColor: "#FCD440", // honey yellow fill
    hexStrokeColor: "#B87420", // honey brown border
    hexStrokeWidth: 1, // thinner border
    glowColorStart: "#B87420",
    glowColorEnd: "transparent",
    glowSpeed: 0.1,
    hexRepelRadius: 200,
    hexRepelStrength: 50,
    ...options,
  };

  const hexWidth = config.hexHeight * Math.sqrt(2);
  const hexHorizDist = hexWidth * 0.5067 + 15;
  const hexVertDist = config.hexHeight * 0.755 + 0.01;
  const hexRadius = config.hexHeight / 2;

  let cursorPosition = { x: canvas.width / 2, y: canvas.height / 2 };
  let targetCursorPosition = { ...cursorPosition };

  const updateCanvasSize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  const drawHexagon = (x, y) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const xOffset = x + hexRadius * Math.cos(angle);
      const yOffset = y + (config.hexHeight / 2) * Math.sin(angle);
      if (i === 0) ctx.moveTo(xOffset, yOffset);
      else ctx.lineTo(xOffset, yOffset);
    }
    ctx.closePath();

    // Fill
    ctx.fillStyle = config.hexFillColor;
    ctx.fill();

    // Stroke (border)
    ctx.lineWidth = config.hexStrokeWidth;
    ctx.strokeStyle = config.hexStrokeColor;
    ctx.stroke();
  };

  const drawGlow = () => {
    const gradient = ctx.createRadialGradient(
      cursorPosition.x,
      cursorPosition.y,
      0,
      cursorPosition.x,
      cursorPosition.y,
      config.hexGlowRadius,
    );
    gradient.addColorStop(0, config.glowColorStart);
    gradient.addColorStop(1, config.glowColorEnd);

    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (2 * Math.PI) / 6;
      ctx.lineTo(
        cursorPosition.x + config.hexGlowRadius * Math.cos(a * i),
        cursorPosition.y + config.hexGlowRadius * Math.sin(a * i),
      );
    }
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGlow();

    const rows = Math.ceil(canvas.height / hexVertDist);
    const cols = Math.ceil(canvas.width / hexHorizDist) + 1;

    const gridWidth = (cols - 1) * hexHorizDist + hexWidth;
    const gridHeight = (rows - 1) * hexVertDist + config.hexHeight;

    const xOffsetStart = (canvas.width - gridWidth) / 2 + hexWidth / 2;
    const yOffsetStart =
      (canvas.height - gridHeight) / 2 + config.hexHeight / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX =
          xOffsetStart +
          col * hexHorizDist +
          (row % 2 === 0 ? 0 : hexHorizDist / 2);
        const baseY = yOffsetStart + row * hexVertDist;

        const dx = baseX - cursorPosition.x;
        const dy = baseY - cursorPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const repelFactor = Math.max(
          0,
          (config.hexRepelRadius - distance) / config.hexRepelRadius,
        );
        const offsetX =
          (dx * repelFactor * config.hexRepelStrength) / config.hexRepelRadius;
        const offsetY =
          (dy * repelFactor * config.hexRepelStrength) / config.hexRepelRadius;

        drawHexagon(baseX + offsetX, baseY + offsetY);
      }
    }
  };

  const animateCursor = () => {
    cursorPosition.x +=
      (targetCursorPosition.x - cursorPosition.x) * config.glowSpeed;
    cursorPosition.y +=
      (targetCursorPosition.y - cursorPosition.y) * config.glowSpeed;
    drawGrid();
    requestAnimationFrame(animateCursor);
  };

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    targetCursorPosition.x = e.clientX - rect.left;
    targetCursorPosition.y = e.clientY - rect.top;
  });

  window.addEventListener("resize", () => {
    updateCanvasSize();
    drawGrid();
  });

  updateCanvasSize();
  drawGrid();
  animateCursor();
}

// Initialize when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  initializeHexagonCanvas("canvas");
});
