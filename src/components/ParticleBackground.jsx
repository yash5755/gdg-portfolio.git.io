import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ variant = 'drift', colorTheme = 'blue' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, type) {
                this.x = x;
                this.y = y;
                this.type = type;
                this.life = 100;

                if (colorTheme === 'gray') {
                    // Grayscale: Hue 0, Saturation 0%, Lightness 10-90%, Alpha 0.2-0.5
                    this.color = `hsla(0, 0%, ${Math.random() * 80 + 10}%, ${Math.random() * 0.3 + 0.2})`;
                } else if (colorTheme === 'white') {
                    // White shades: Hue 0, Saturation 0%, Lightness 80-100%, Alpha 0.3-0.8
                    this.color = `hsla(0, 0%, ${Math.random() * 20 + 80}%, ${Math.random() * 0.5 + 0.3})`;
                } else {
                    // Blue and White shades default - Subtle
                    // Hue 210 (Blue), Saturation 80%, Lightness 50-80%, Alpha 0.3-0.6
                    this.color = `hsla(210, 80%, ${Math.random() * 30 + 50}%, ${Math.random() * 0.3 + 0.3})`;
                }

                if (type === 'rain') {
                    this.size = Math.random() * 2 + 1;
                    this.speedX = Math.random() * 1 - 0.5;
                    this.speedY = Math.random() * 3 + 2; // Fall down
                } else if (type === 'burst') {
                    this.size = Math.random() * 4 + 2;
                    this.speedX = Math.random() * 6 - 3; // Fast spread
                    this.speedY = Math.random() * 6 - 3;
                    this.life = 60; // Shorter life
                } else {
                    // drift & connect
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 2 - 1;
                    this.speedY = Math.random() * 2 - 1;
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 1;
                this.size *= 0.95;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
                const count = variant === 'burst' ? 8 : 3;
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle(x, y, variant));
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Handle particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect logic
                if (variant === 'connect') {
                    for (let j = i; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 80) {
                            ctx.beginPath();
                            // Reduced opacity for lines
                            if (colorTheme === 'gray') {
                                ctx.strokeStyle = `rgba(100, 100, 100, ${0.1 * (particles[i].life / 100)})`;
                            } else if (colorTheme === 'white') {
                                ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (particles[i].life / 100)})`;
                            } else {
                                ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (particles[i].life / 100)})`;
                            }
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }

                if (particles[i].life <= 0 || particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [variant]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default ParticleBackground;
