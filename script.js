
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

function openResume() {
  window.open("resume.pdf", "_blank");
}

class Attractor {
  constructor(canvas, type = "lorenz") {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.type = type;
    this.dt = 0.01;
    this.reset();
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.animate();
  }

  reset() {
    this.particles = [
      { x: 1, y: 1, z: 1, color: "#00FFFF", trail: [] },
      { x: 2, y: 1, z: 1, color: "#FF00FF", trail: [] },
      { x: 1, y: 2, z: 1, color: "#FFFF00", trail: [] },
    ];
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  step(x, y, z) {
    switch (this.type) {
      case "rossler":
        const a = 0.2, b = 0.2, c = 5.7;
        return [
          x + (-y - z) * this.dt,
          y + (x + a * y) * this.dt,
          z + (b + z * (x - c)) * this.dt,
        ];
      case "thomas":
        const beta = 0.19;
        return [
          x + (Math.sin(y) - beta * x) * this.dt,
          y + (Math.sin(z) - beta * y) * this.dt,
          z + (Math.sin(x) - beta * z) * this.dt,
        ];
      default:
        const sigma = 10, rho = 28, betaL = 8 / 3;
        return [
          x + sigma * (y - x) * this.dt,
          y + (x * (rho - z) - y) * this.dt,
          z + (x * y - betaL * z) * this.dt,
        ];
    }
  }

  drawTrail(p) {
    const { trail, color } = p;
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
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p) => {
      const [dx, dy, dz] = this.step(p.x, p.y, p.z);
      p.x = dx;
      p.y = dy;
      p.z = dz;
      const scale = 10;
      const x2d = this.canvas.width / 2 + p.x * scale;
      const y2d = this.canvas.height / 2 - (p.z - 15) * scale;
      p.trail.push([x2d, y2d]);
      if (p.trail.length > 200) p.trail.shift();
      this.drawTrail(p);
    });

    requestAnimationFrame(() => this.animate());
  }

  changeType(type) {
    this.type = type;
    this.reset();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("lorenzCanvas");
  const attractor = new Attractor(canvas);
  const select = document.getElementById("attractorSelect");

  select.addEventListener("change", (e) => {
    attractor.changeType(e.target.value);
  });
});
