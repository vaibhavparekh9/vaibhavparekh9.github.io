/* ---------- Laser trail pointer ---------- */
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var color = '#c41230';
  var maxAge = 250;       // trail lifetime in ms (lower = shorter trail)
  var maxPoints = 40;     // max trail dots kept (lower = shorter trail)
  var headRadius = 4;
  var tailRadius = 1.1;
  var glowSize = 12;
  var maxGap = 4;         // max px between trail dots (lower = denser)
  var trail = [];
  var headPos = null;     // always remembers last cursor position

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  document.body.style.cursor = 'none';

  var ctx = canvas.getContext('2d');
  var dpr = 1;
  var pending = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    pending = false;
    var now = performance.now();
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    // prune old points
    while (trail.length && now - trail[0].t > maxAge) trail.shift();

    // draw trail dots
    for (var i = 0; i < trail.length; i++) {
      var p = trail[i];
      var age = (now - p.t) / maxAge;
      var alpha = 1 - age;
      var r = tailRadius + (headRadius - tailRadius) * (1 - age);

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha * 0.7;
      ctx.fill();
    }

    // always draw head dot with glow at last known position
    if (headPos) {
      ctx.globalAlpha = 1;
      ctx.shadowColor = color;
      ctx.shadowBlur = glowSize;
      ctx.beginPath();
      ctx.arc(headPos.x, headPos.y, headRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // keep animating while trail has points to fade
    if (trail.length) scheduleDraw();
  }

  function scheduleDraw() {
    if (!pending) {
      pending = true;
      requestAnimationFrame(draw);
    }
  }

  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', function(e) {
    var now = performance.now();
    var nx = e.clientX;
    var ny = e.clientY;

    // interpolate to fill gaps for dense trail
    if (trail.length) {
      var last = trail[trail.length - 1];
      var dx = nx - last.x;
      var dy = ny - last.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxGap) {
        var steps = Math.ceil(dist / maxGap);
        for (var s = 1; s < steps; s++) {
          var frac = s / steps;
          trail.push({ x: last.x + dx * frac, y: last.y + dy * frac, t: now });
        }
      }
    }

    trail.push({ x: nx, y: ny, t: now });
    if (trail.length > maxPoints) trail.splice(0, trail.length - maxPoints);
    headPos = { x: nx, y: ny };
    scheduleDraw();
  });

  window.addEventListener('mouseleave', function() {
    trail.length = 0;
    headPos = null;
    scheduleDraw();
  });

  resize();
})();

/* ---------- Routing ---------- */
(function() {
  var params = new URLSearchParams(window.location.search);
  var project = params.get('p');
  if (!project) return;

  var mdPath = project + '/' + project + '.md';

  fetch(mdPath)
    .then(function(r) { return r.text(); })
    .then(function(md) {
      var el = document.getElementById('md-content');
      el.innerHTML = parseMd(md);

      // Rewrite relative src attributes (images, videos, iframes) to resolve from the project subfolder
      el.querySelectorAll('img[src], video[src]').forEach(function(el) {
        var s = el.getAttribute('src');
        if (s && !s.startsWith('http') && !s.startsWith('/') && !s.startsWith(project + '/')) {
          el.setAttribute('src', project + '/' + s);
        }
      });

      // Same for links: from projects.html, bare "file.pdf" would wrongly resolve to projects/file.pdf
      el.querySelectorAll('a[href]').forEach(function(a) {
        var h = a.getAttribute('href');
        if (!h || /^(?:https?:|mailto:|tel:|#)/i.test(h) || h.startsWith('/')) return;
        if (h.startsWith(project + '/')) return;
        if (h.startsWith('../') || h.startsWith('./')) return;
        a.setAttribute('href', project + '/' + h);
      });

      // Set page title from first h1
      var h1 = el.querySelector('h1');
      if (h1) document.title = h1.textContent + ' - Vaibhav Parekh';
    });
})();

/* ---------- Markdown parser ---------- */
function parseMd(src) {
  src = src.replace(/\r/g, '');
  var besideBlocks = {};
  var bid = 0;

  function parseBesideTag(_, imgRaw, cap, content, side) {
    var parts = imgRaw.split('|');
    var img = parts[0].trim();
    var width = parts[1] ? parts[1].trim() : '';
    var key = '%%BESIDE' + bid + '%%';
    besideBlocks[bid] = { img: img, caption: cap || '', content: content, side: side, width: width };
    bid++;
    return key;
  }

  src = src.replace(/<!-- IMG_RIGHT: (.+?) -->\n+(?:<!-- CAPTION: (.+?) -->\n+)?([\s\S]*?)<!-- \/IMG_RIGHT -->/g,
    function(_, img, cap, content) { return parseBesideTag(_, img, cap, content, 'right'); });

  src = src.replace(/<!-- IMG_LEFT: (.+?) -->\n+(?:<!-- CAPTION: (.+?) -->\n+)?([\s\S]*?)<!-- \/IMG_LEFT -->/g,
    function(_, img, cap, content) { return parseBesideTag(_, img, cap, content, 'left'); });

  var html = parseContent(src);

  html = html.replace(/<p>%%BESIDE(\d+)%%<\/p>/g, '%%BESIDE$1%%');

  Object.keys(besideBlocks).forEach(function(k) {
    var b = besideBlocks[k];
    var inner = parseContent(b.content);
    var capHtml = b.caption ? '<p class="md-beside__caption">' + b.caption + '</p>' : '';
    var imgStyle = b.width ? ' style="flex:0 0 ' + b.width + '"' : '';
    var imgCol = '<div class="md-beside__img"' + imgStyle + '><img src="' + b.img + '">' + capHtml + '</div>';
    var txtCol = '<div class="md-beside__text">' + inner + '</div>';
    var cls = b.side === 'left' ? 'md-beside md-beside--img-left' : 'md-beside';
    var layout = b.side === 'left'
      ? '<div class="' + cls + '">' + imgCol + txtCol + '</div>'
      : '<div class="' + cls + '">' + txtCol + imgCol + '</div>';
    html = html.replace('%%BESIDE' + k + '%%', layout);
  });

  return html;
}

function parseContent(src) {
  var mathStore = [];
  src = src.replace(/\$\$[\s\S]*?\$\$/g, function(m) { mathStore.push(m); return '%%MATH' + (mathStore.length - 1) + '%%'; });
  src = src.replace(/\$([^$\n]+?)\$/g, function(m) { mathStore.push(m); return '%%MATH' + (mathStore.length - 1) + '%%'; });
  var html = src
    .replace(/^---$/gm, '<hr>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, function(_, content) {
      var idx = content.indexOf(' | <a ');
      if (idx !== -1) {
        return '<h1>' + content.substring(0, idx) + ' <span class="md-h1-divider">|</span> <span class="md-h1-link">' + content.substring(idx + 3) + '</span></h1>';
      }
      return '<h1>' + content + '</h1>';
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    .replace(/^\|(.+)\|$/gm, function(match, inner) {
      if (/^[\s\-|]+$/.test(inner)) return '<!--sep-->';
      var cells = inner.split('|').map(function(c) { return c.trim(); });
      return '<tr>' + cells.map(function(c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    })
    .replace(/^<!-- YOUTUBE_ROW: (.+?) \| (.+?) -->$/gm, '<div class="md-video-row"><div class="md-video"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></div><div class="md-video"><iframe src="https://www.youtube.com/embed/$2" frameborder="0" allowfullscreen></iframe></div></div>')
    .replace(/^<!-- YOUTUBE: (.+?) -->$/gm, '<div class="md-video"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></div>')
    .replace(/^<!--.*?-->$/gm, '')
    .replace(/<\/blockquote>\n<blockquote>/g, '<br>')
    .replace(/^(?!<[hHudoltrbuvp]|<\/?div|<\/?table|<!--|\s*$|%%BESIDE)(.+)$/gm, '<p>$1</p>')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/((<tr>.*<\/tr>\s*)+)/g, '<table>$1</table>')
    .replace(/<!--sep-->/g, '')
    .replace(/<p>&nbsp;<\/p>/g, '<div class="md-spacer"></div>');
  mathStore.forEach(function(m, i) { html = html.replace('<p>%%MATH' + i + '%%</p>', m); html = html.replace('%%MATH' + i + '%%', m); });
  return html;
}
