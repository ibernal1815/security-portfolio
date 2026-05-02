// radar.js — competency radar chart drawn on a <canvas> element.
// pure canvas — no external libraries, no eval, no dynamic DOM injection.

(function () {
  'use strict';

  const canvas = document.getElementById('radarCanvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const W   = canvas.width;
  const H   = canvas.height;
  const cx  = W / 2;
  const cy  = H / 2;
  const R   = Math.min(W, H) / 2 - 36;

  // axes mapped to actual skill domains
  const labels = ['SIEM', 'Detection Eng.', 'DFIR', 'Offensive', 'Scripting', 'Networking'];
  const scores  = [0.88,   0.82,            0.78,   0.72,        0.90,        0.80];
  const N       = labels.length;
  const STEP    = (Math.PI * 2) / N;
  const START   = -Math.PI / 2;
  const RINGS   = 5;

  function ptAt(i, radius) {
    const a = START + i * STEP;
    return { x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius };
  }

  function drawGrid() {
    // rings
    for (let r = 1; r <= RINGS; r++) {
      const rad = (R / RINGS) * r;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const p = ptAt(i, rad);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = r === RINGS ? '#3a3736' : '#242222';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    // spokes
    for (let i = 0; i < N; i++) {
      const p = ptAt(i, R);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = '#242222';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawShape(ease) {
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const p = ptAt(i, R * scores[i] * ease);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle   = 'rgba(191, 58, 43, 0.12)';
    ctx.fill();
    ctx.strokeStyle = '#bf3a2b';
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    // data point dots
    for (let i = 0; i < N; i++) {
      const p = ptAt(i, R * scores[i] * ease);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#bf3a2b';
      ctx.fill();
    }
  }

  function drawLabels() {
    ctx.font         = '500 10px Fragment Mono, monospace';
    ctx.fillStyle    = '#78736f';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < N; i++) {
      const p = ptAt(i, R + 22);
      ctx.fillText(labels[i], p.x, p.y);
    }
  }

  let progress  = 0;
  let animating = false;

  function frame() {
    progress = Math.min(progress + 0.035, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out

    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawShape(ease);
    drawLabels();

    if (progress < 1) requestAnimationFrame(frame);
    else animating = false;
  }

  // trigger animation once when canvas enters viewport
  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !animating) {
      animating = true;
      requestAnimationFrame(frame);
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(canvas);

})();
