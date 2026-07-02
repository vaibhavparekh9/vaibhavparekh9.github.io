/* ---------- Profile picture slider (with animation) ---------- */
(function() {
  var slider = document.querySelector('.photo-slider');
  if (!slider) return;

  var topImg = slider.querySelector('.photo-slider__top');
  var handle = slider.querySelector('.photo-slider__handle');
  var animFrame = null;

  function setPositionPct(pct) {
    pct = Math.max(0, Math.min(100, pct));
    topImg.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    handle.style.left = pct + '%';
  }

  function setPosition(x) {
    var rect = slider.getBoundingClientRect();
    setPositionPct((x - rect.left) / rect.width * 100);
  }

  function stopAnimation() {
    if (animFrame !== null) {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }
  }

  function easeIn(t) {
    return t * t;
  }

  function easeOut(t) {
    return 1 - (1 - t) * (1 - t);
  }

  function playIntroAnimation() {
    var leg1Duration = 1400;
    var leg2Duration = 1000;
    var totalDuration = leg1Duration + leg2Duration;
    var start = performance.now();

    function frame(now) {
      var elapsed = now - start;
      var pct;

      if (elapsed >= totalDuration) {
        setPositionPct(70);
        animFrame = null;
        return;
      }

      if (elapsed <= leg1Duration) {
        pct = 70 + (10 - 70) * easeIn(elapsed / leg1Duration);
      } else {
        pct = 10 + (70 - 10) * easeOut((elapsed - leg1Duration) / leg2Duration);
      }

      setPositionPct(pct);
      animFrame = requestAnimationFrame(frame);
    }

    animFrame = requestAnimationFrame(frame);
  }

  function onMove(e) {
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(x);
  }

  function onUp() {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
  }

  slider.addEventListener('mousedown', function(e) {
    stopAnimation();
    e.preventDefault();
    onMove(e);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });

  slider.addEventListener('touchstart', function(e) {
    stopAnimation();
    onMove(e);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('load', function() {
      setTimeout(playIntroAnimation, 400);
    });
  }
})();

/* ---------- Project tag colors ---------- */
var TAG_COLORS = {
  'Computer Vision':  '#a8d8ea',
  Learning:           '#d5a6e6',
  Navigation:         '#a8e6cf',
  SLAM:               '#f9d89c',
  Controls:           '#f4a7a3',
  CAD:                '#c8c8c8',
  'Mechanical Design':'#b8c9e8',
  Manufacturing:      '#e8c4a0'
};

function initTags() {
  document.querySelectorAll('.proj-tag').forEach(function(el) {
    var key = el.getAttribute('data-tag');
    if (key && TAG_COLORS[key]) {
      el.style.backgroundColor = TAG_COLORS[key];
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
