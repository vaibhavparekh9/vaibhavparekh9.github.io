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

      // Rewrite relative src attributes (images, iframes) to resolve from the project subfolder
      el.querySelectorAll('img[src]').forEach(function(img) {
        var s = img.getAttribute('src');
        if (s && !s.startsWith('http') && !s.startsWith('/') && !s.startsWith(project + '/')) {
          img.setAttribute('src', project + '/' + s);
        }
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
    .replace(/^(?!<[hHudoltrbu]|<\/?div|<\/?table|<!--|\s*$|%%BESIDE)(.+)$/gm, '<p>$1</p>')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/((<tr>.*<\/tr>\s*)+)/g, '<table>$1</table>')
    .replace(/<!--sep-->/g, '')
    .replace(/<p>&nbsp;<\/p>/g, '<div class="md-spacer"></div>');
  mathStore.forEach(function(m, i) { html = html.replace('<p>%%MATH' + i + '%%</p>', m); html = html.replace('%%MATH' + i + '%%', m); });
  return html;
}
