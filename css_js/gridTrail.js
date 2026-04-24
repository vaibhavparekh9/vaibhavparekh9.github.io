/**
 * Light grid around the cursor on the index page only.
 * Respects prefers-reduced-motion.
 */
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cell = 22;
  var radius = 400;
  /* Peak stroke ~30% black (rgba alpha on black) */
  var alphaPeak = 0.10;
  var fadePower = 1.65;

  var canvas = document.createElement('canvas');
  canvas.id = 'grid-trail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var mx = -9999;
  var my = -9999;
  var dpr = 1;
  var pending = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scheduleDraw();
  }

  function alphaForDist(dist) {
    if (dist >= radius) return 0;
    var t = 1 - dist / radius;
    return alphaPeak * Math.pow(t, fadePower);
  }

  function draw() {
    pending = false;
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    if (mx < -5000) return;

    var x0 = Math.floor((mx - radius) / cell) * cell;
    var x1 = Math.ceil((mx + radius) / cell) * cell;
    var y0 = Math.floor((my - radius) / cell) * cell;
    var y1 = Math.ceil((my + radius) / cell) * cell;

    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';

    /* Vertical grid lines: chord of circle, gradient fades toward chord ends (radial edge) */
    for (var x = x0; x <= x1; x += cell) {
      var dx = x - mx;
      var inner = radius * radius - dx * dx;
      if (inner < 0) continue;
      var half = Math.sqrt(inner);
      var ya = my - half;
      var yb = my + half;
      var peakA = alphaForDist(Math.abs(dx));
      if (peakA < 0.006) continue;
      var g = ctx.createLinearGradient(x, ya, x, yb);
      var tMid = yb > ya ? (my - ya) / (yb - ya) : 0.5;
      tMid = Math.max(0.02, Math.min(0.98, tMid));
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(tMid, 'rgba(0,0,0,' + peakA + ')');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(x, ya);
      ctx.lineTo(x, yb);
      ctx.stroke();
    }

    /* Horizontal grid lines */
    for (var y = y0; y <= y1; y += cell) {
      var dy = y - my;
      var innerH = radius * radius - dy * dy;
      if (innerH < 0) continue;
      var halfH = Math.sqrt(innerH);
      var xa = mx - halfH;
      var xb = mx + halfH;
      var peakH = alphaForDist(Math.abs(dy));
      if (peakH < 0.006) continue;
      var span = xb - xa;
      var tMidH = span > 0 ? (mx - xa) / span : 0.5;
      tMidH = Math.max(0.02, Math.min(0.98, tMidH));
      var gh = ctx.createLinearGradient(xa, y, xb, y);
      gh.addColorStop(0, 'rgba(0,0,0,0)');
      gh.addColorStop(tMidH, 'rgba(0,0,0,' + peakH + ')');
      gh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.strokeStyle = gh;
      ctx.beginPath();
      ctx.moveTo(xa, y);
      ctx.lineTo(xb, y);
      ctx.stroke();
    }
  }

  function scheduleDraw() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    scheduleDraw();
  });

  window.addEventListener('mouseleave', function() {
    mx = -9999;
    my = -9999;
    scheduleDraw();
  });

  resize();
})();
