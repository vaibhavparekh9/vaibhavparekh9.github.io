/* ---------- Profile picture slider removed — pointcloud in css_js/pointcloud.js ---------- */

/* ---------- Project tag colors ---------- */
var TAG_COLORS = {
  'Computer Vision':  '#4a9cb8',
  Learning:           '#9b5eb8',
  Navigation:         '#4aab7a',
  SLAM:               '#c9a035',
  Controls:           '#c95a55',
  CAD:                '#888888',
  'Mechanical Design':'#6a8ab8',
  Manufacturing:      '#b88a50',
};

function initTags() {
  document.querySelectorAll('.proj-tag').forEach(function(el) {
    var key = el.getAttribute('data-tag');
    if (key && TAG_COLORS[key]) {
      el.style.color = TAG_COLORS[key];
      el.style.borderColor = TAG_COLORS[key];
    }
  });
}

window.addEventListener('load', initTags);

/* ---------- Mobile hamburger menu ---------- */
(function() {
  var btn = document.querySelector('.nav-bar__hamburger');
  if (!btn) return;
  var nav = btn.closest('.nav-bar');
  var menu = nav.querySelector('.nav-bar__menu');

  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!nav.classList.contains('open'));
  });

  document.addEventListener('click', function(e) {
    if (!nav.classList.contains('open')) return;
    if (menu && menu.contains(e.target)) return;
    setOpen(false);
  });

  nav.querySelectorAll('.nav-bar__right a').forEach(function(link) {
    link.addEventListener('click', function() {
      setOpen(false);
    });
  });
})();

/* ---------- Scroll progress bar ---------- */
(function() {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    var st = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? st / h * 100 : 0) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('load', update);
})();

/* ---------- Animated project card borders ---------- */
function initBorders() {
  var r = 15;
  document.querySelectorAll('.proj-card').forEach(function(card) {
    var w = card.offsetWidth;
    var h = card.offsetHeight;
    var svg = card.querySelector('.proj-card__border');
    var p   = svg.querySelector('path');

    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

    p.setAttribute('d',
      'M 0 ' + h/2 +
      ' L 0 ' + (h - r) +
      ' Q 0 ' + h + ' ' + r + ' ' + h +
      ' L ' + (w - r) + ' ' + h +
      ' Q ' + w + ' ' + h + ' ' + w + ' ' + (h - r) +
      ' L ' + w + ' ' + r +
      ' Q ' + w + ' 0 ' + (w - r) + ' 0' +
      ' L ' + r + ' 0' +
      ' Q 0 0 0 ' + r +
      ' L 0 ' + h/2
    );
  });
}

window.addEventListener('load', function() {
  if (document.querySelector('.proj-card')) initBorders();
});
window.addEventListener('resize', function() {
  if (document.querySelector('.proj-card')) initBorders();
});

/* ---------- Lazy video play/pause on scroll ---------- */
(function() {
  var videos = document.querySelectorAll('video[preload="none"]');
  if (!videos.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0 });

  videos.forEach(function(v) { observer.observe(v); });
})();

/* ---------- Active nav link on scroll ---------- */
(function() {
  var navLinks = document.querySelectorAll('.nav-bar__right > a.nav-bar__text-link');
  if (!navLinks.length) return;

  var sections = {};
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href') || '';
    var hashIdx = href.indexOf('#');
    if (hashIdx !== -1) {
      var id = href.substring(hashIdx + 1);
      var target = document.getElementById(id);
      if (target) sections['#' + id] = { el: target, link: link };
    }
  });

  var homeLink = document.querySelector('.nav-bar__text-link[href="index.html"]')
    || document.querySelector('.nav-bar__text-link[href="/index.html"]')
    || document.querySelector('.nav-bar__text-link[href="/"]')
    || document.querySelector('.nav-bar__text-link[href="../index.html"]');

  var hasInPageAnchors = Object.keys(sections).length > 0;

  function updateActive() {
    if (!hasInPageAnchors) return;

    var scrollY = window.scrollY || window.pageYOffset;
    var activeLink = homeLink;

    Object.keys(sections).forEach(function(key) {
      var s = sections[key];
      if (s.el.offsetTop - 170 <= scrollY) {
        activeLink = s.link;
      }
    });

    navLinks.forEach(function(l) { l.classList.remove('active'); });
    if (activeLink) activeLink.classList.add('active');
  }

  var clickLock = false;

  window.addEventListener('scroll', function() {
    if (!clickLock) updateActive();
  });
  window.addEventListener('load', updateActive);

  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      link.classList.add('active');
      clickLock = true;
      setTimeout(function() { clickLock = false; }, 800);
    });
  });
})();
