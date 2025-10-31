// 🌙 Theme toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") body.classList.add("dark-mode");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

// 📄 Resume open
function openResume() {
  window.open("resume.pdf", "_blank");
}

// 🌀 Lorenz Attractor background
class LorenzAttractor {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sigma = 10.0;
    this.rho = 28.0;
    this.beta = 8.0 / 3.0;
    this.dt = 0.01;
    this.attractors = [
      { x: 1, y: 1, z: 1, color: "#00FFFF", trail: [] },
      { x: 2, y: 1, z: 1, color: "#FF00FF", trail: [] },
      { x: 1, y: 2, z: 1, color: "#FFFF00", trail: [] },
    ];
    this.setupCanvas();
    this.animate();
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.globalAlpha = 0.5;
    window.addEventListener("resize", () => this.setupCanvas());
  }

  lorenz(x, y, z) {
    const dx = this.sigma * (y - x) * this.dt;
    const dy = (x * (this.rho - z) - y) * this.dt;
    const dz = (x * y - this.beta * z) * this.dt;
    return [dx, dy, dz];
  }

  drawTrail(attractor) {
    const { trail, color } = attractor;
    if (trail.length < 2) return;
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(trail[0][0], trail[0][1]);
    for (let i = 1; i < trail.length; i++) {
      this.ctx.lineTo(trail[i][0], trail[i][1]);
    }
    this.ctx.stroke();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.attractors.forEach((a) => {
      const [dx, dy, dz] = this.lorenz(a.x, a.y, a.z);
      a.x += dx;
      a.y += dy;
      a.z += dz;
      const x2d = this.canvas.width / 2 + a.x * 10;
      const y2d = this.canvas.height / 2 - (a.z - 15) * 10;
      a.trail.push([x2d, y2d]);
      if (a.trail.length > 200) a.trail.shift();
      this.drawTrail(a);
    });
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("lorenzCanvas");
  new LorenzAttractor(canvas);
});
