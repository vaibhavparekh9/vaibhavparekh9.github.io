/**
 * Dot grid with crosshair around the cursor on the index page only.
 * Respects prefers-reduced-motion.
 */
(function() {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'grid-trail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, dpr = 1;
  var mx = -9999, my = -9999;
  var cx = -9999, cy = -9999;

  var step = 26;
  var radius = 200;
  var fade = 240;
  var dotBase = 0.05;
  var dotGlow = 0.20;
  var dotRGB = [0, 0, 0];
  var crossRGB = [0, 0, 0];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var r = dotRGB[0], g = dotRGB[1], b = dotRGB[2];

    for (var y = 0; y <= H; y += step) {
      for (var x = 0; x <= W; x += step) {
        var a = dotBase, rad = 0.9;

        if (cx > -5000 && !reduce) {
          var dd = Math.hypot(x - cx, y - cy);
          if (dd < radius) {
            var t = 1 - dd / radius;
            a = dotBase + (dotGlow - dotBase) * t * t;
            rad = 0.9 + t * 0.7;
          }
        }

        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 6.2832);
        ctx.fill();
      }
    }

    if (cx > -5000 && !reduce) {
      var cr = crossRGB[0], cg = crossRGB[1], cb = crossRGB[2];

      var gh = ctx.createLinearGradient(cx - fade, 0, cx + fade, 0);
      gh.addColorStop(0, 'rgba(' + cr + ',' + cg + ',' + cb + ',0)');
      gh.addColorStop(0.5, 'rgba(' + cr + ',' + cg + ',' + cb + ',0.10)');
      gh.addColorStop(1, 'rgba(' + cr + ',' + cg + ',' + cb + ',0)');
      ctx.strokeStyle = gh;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - fade, cy + 0.5);
      ctx.lineTo(cx + fade, cy + 0.5);
      ctx.stroke();

      var gv = ctx.createLinearGradient(0, cy - fade, 0, cy + fade);
      gv.addColorStop(0, 'rgba(' + cr + ',' + cg + ',' + cb + ',0)');
      gv.addColorStop(0.5, 'rgba(' + cr + ',' + cg + ',' + cb + ',0.10)');
      gv.addColorStop(1, 'rgba(' + cr + ',' + cg + ',' + cb + ',0)');
      ctx.strokeStyle = gv;
      ctx.beginPath();
      ctx.moveTo(cx + 0.5, cy - fade);
      ctx.lineTo(cx + 0.5, cy + fade);
      ctx.stroke();
    }
  }

  var raf = null;

  function tick() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    draw();
    if (Math.abs(mx - cx) > 0.4 || Math.abs(my - cy) > 0.4) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
      draw();
    }
  }

  function kick() {
    if (raf === null) raf = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function() { resize(); draw(); });
  window.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; kick(); });
  window.addEventListener('mouseleave', function() { mx = -9999; my = -9999; kick(); });

  resize();
  draw();
})();
