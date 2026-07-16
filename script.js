const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 6 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.hue = Math.random() * 360;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.97;
    }
    draw() {
        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.fillStyle = 'rgba(10, 20, 40, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size < 0.5) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();

document.addEventListener('mousemove', e => {
    for (let i = 0; i < 12; i++) {
        const p = new Particle(e.clientX, e.clientY);
        particles.push(p);
    }
});

function nav(n) {
    document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden'));
    document.getElementById('tab' + n).classList.remove('hidden');
}

async function performSearch() {
    const id = document.getElementById('idInput').value || "123456789";
    const area = document.getElementById('resultArea');
    area.innerHTML = `<p class="text-cyan-400">Recherche en cours sur ID : ${id}...</p>`;
    setTimeout(() => {
        area.innerHTML = `<pre class="bg-black/80 p-8 text-sm">{\n  "id": "${id}",\n  "username": "TargetUser",\n  "avatar": "https://cdn.discordapp.com/..."\n}</pre>`;
    }, 400);
}

// Init
nav(0);
