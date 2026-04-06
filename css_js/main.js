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

window.addEventListener('load', initBorders);
window.addEventListener('resize', initBorders);

/* ---------- Active nav link on scroll ---------- */
(function() {
  var navLinks = document.querySelectorAll('.nav-bar__right > a[href]');
  var sections = {};

  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href.charAt(0) === '#') {
      var target = document.getElementById(href.substring(1));
      if (target) sections[href] = { el: target, link: link };
    }
  });

  var homeLink = document.querySelector('.nav-bar__right > a[href="index.html"]')
              || document.querySelector('.nav-bar__right > a[href="/"]');

  function updateActive() {
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
