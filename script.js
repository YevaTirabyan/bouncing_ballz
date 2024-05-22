let canvas = document.getElementById("ballz-canvas");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
let maxHeight = window.innerHeight - 20;
let maxWidth = window.innerWidth - 20;

let c = canvas.getContext("2d");
class Ball {
    constructor(x, y, radius, acceleration, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xChange = 5;
        this.yChange = 1;
        this.acceleration = acceleration;
        this.color = color;
        this.damping = 0.9;
        this.friction = 0.99;
    }

    draw() {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fill();
    }

    tick() {
        this.draw();


        if (this.y + this.radius >= maxHeight) {
            this.y = maxHeight - this.radius;
            this.yChange = -this.yChange * this.damping;
            if (this.damping > 0) {
                this.damping -= 0.03;
            }
            if (Math.abs(this.yChange) < 0.5) {
                this.yChange = 0;
            }
        } else {
            this.yChange += this.acceleration;
        }


        this.xChange *= this.friction;


        if (this.x + this.radius >= maxWidth) {
            this.xChange = -this.xChange;
            this.x = maxWidth - this.radius;
        }
        if (this.x <= this.radius) {
            this.xChange = -this.xChange;
            this.x = this.radius;
        }


        this.y += this.yChange;
        this.x += this.xChange;


        if (Math.abs(this.yChange) < 0.1 && this.y + this.radius >= maxHeight) {
            this.yChange = 0;
            this.y = maxHeight - this.radius;
        }
        if (Math.abs(this.xChange) < 0.1) {
            this.xChange = 0;
        }
    }
}

let balls = [];
let colors = ["#4deeea","#74ee15","#ffe700","#f000ff","#001eff"];

canvas.addEventListener('click', (event) => {
    if (balls.length <= 15) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        balls.push(new Ball(
            x,
            y,
            30,
            1,
            colors[Math.floor(Math.random() * colors.length)]
        ));

        document.getElementById('ballz-count').innerText = balls.length;
    }
});

function animate() {
    c.fillStyle = 'rgba(0,0,0,0.3)';
    c.fillRect(0, 0, window.innerWidth - 20, window.innerHeight - 20);
    balls.forEach(ball => {
        ball.tick();
    });
    requestAnimationFrame(animate);
}
animate();