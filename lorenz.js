class LorenzAttractor {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.setupCanvas();

    this.sigma = 10.0;
    this.rho = 28.0;
    this.beta = 8.0 / 3.0;
    this.dt = 0.01;

    this.maxTrailLength = 300;

    this.attractors = [
      { x: 1, y: 1, z: 1, trail: [], color: "#00FFFF" },
      { x: 2, y: 1, z: 1, trail: [], color: "#FF00FF" },
      { x: 1, y: 2, z: 1, trail: [], color: "#FFFF00" },
      { x: 1, y: 1, z: 2, trail: [], color: "#00FF00" },
      { x: -1, y: -1, z: 1, trail: [], color: "#FF4000" },
      { x: 0.5, y: -0.5, z: 1.5, trail: [], color: "#8000FF" },
    ];

    this.setupEventListeners();
    this.prePopulateTrails();
    this.animate();
  }

  setupCanvas() {
    const container = this.canvas.parentElement;
    const { width, height } = container.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;

    this.canvas.width = width * pixelRatio * 2;
    this.canvas.height = height * pixelRatio * 2;
    this.ctx.scale(pixelRatio * 2, pixelRatio * 2);

    this.width = width;
    this.height = height;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.scale = 2 * (width / 700);
  }

  setupEventListeners() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.attractors.forEach((a) => (a.trail = []));
        this.setupCanvas();
        this.prePopulateTrails();
      }, 150);
    });
  }

  prePopulateTrails() {
    for (let step = 0; step < 100; step++) {
      this.attractors.forEach((a) => {
        const [dx, dy, dz] = this.lorenz(a.x, a.y, a.z);
        a.x += dx;
        a.y += dy;
        a.z += dz;
        const [sx, sy] = this.project(a.x, a.y, a.z);
        a.trail.push([sx, sy]);
      });
    }
  }

  lorenz(x, y, z) {
    const dx = this.sigma * (y - x) * this.dt;
    const dy = (x * (this.rho - z) - y) * this.dt;
    const dz = (x * y - this.beta * z) * this.dt;
    return [dx, dy, dz];
  }

  project(x, y, z) {
    return [
      this.centerX + x * this.scale * 2,
      this.centerY - (z - 15) * this.scale,
    ];
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.attractors.forEach((a) => {
      const [dx, dy, dz] = this.lorenz(a.x, a.y, a.z);
      a.x += dx;
      a.y += dy;
      a.z += dz;

      const [sx, sy] = this.project(a.x, a.y, a.z);
      a.trail.push([sx, sy]);
      if (a.trail.length > this.maxTrailLength) a.trail.shift();
      this.drawTrail(a);
    });
  }

  drawTrail(a) {
    if (a.trail.length < 2) return;
    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.strokeStyle = a.color;
    this.ctx.lineWidth = 1.5;
    this.ctx.globalAlpha = 0.4;

    this.ctx.beginPath();
    this.ctx.moveTo(a.trail[0][0], a.trail[0][1]);
    for (let i = 2; i < a.trail.length; i += 2) {
      this.ctx.lineTo(a.trail[i][0], a.trail[i][1]);
    }
    this.ctx.lineTo(
      a.trail[a.trail.length - 1][0],
      a.trail[a.trail.length - 1][1]
    );
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = "source-over";
  }

  animate() {
    this.update();
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("lorenzCanvas");
  new LorenzAttractor(canvas);
});
