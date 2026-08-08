/* ---------- Timeline popup data ---------- */
var TIMELINE_DATA = {
  undergrad: {
    org: 'University of Mumbai (K. J. Somaiya College of Engineering)',
    url: 'https://kjsce.somaiya.edu/en/',
    logo: 'timeline_logos/mumbai_university.png',
    entries: [
      {
        dates: 'Aug 2018 – May 2022',
        title: 'B.Tech. Mechanical Engineering',
        desc: 'Graduated with a strong foundation in mechanical design, developing an early interest in robotics. Led the Drivetrain Department at <a href="https://www.teameta.in/" target="_blank" rel="noopener">Team Eta</a>.'
      }
    ]
  },
  tprel: {
    org: 'Tata Power Renewables',
    url: 'https://www.tatapower.com/renewables',
    logo: 'timeline_logos/tprel.png',
    entries: [
      {
        dates: 'Jun 2022 – Jun 2023',
        title: 'Lead Associate',
        desc: 'Worked on utility-scale solar plant operations. Gained industry experience in energy systems, data-driven maintenance scheduling, and large-scale project coordination before transitioning to graduate studies in robotics.'
      },
      {
        dates: 'Jun 2023 – Aug 2024',
        title: 'Graduate Engineer Trainee',
        desc: 'Worked on utility-scale solar plant operations. Gained industry experience in energy systems, data-driven maintenance scheduling, and large-scale project coordination before transitioning to graduate studies in robotics.'
      }
    ]
  },
  'cmu-start': {
    org: 'Carnegie Mellon University',
    url: 'https://www.cmu.edu/',
    logo: 'timeline_logos/cmu.png',
    entries: [
      {
        dates: 'Aug 2024 – May 2026',
        title: 'Robotics, Mechanical Engineering',
        desc: 'Focused on perception, navigation, SLAM, and deep learning for robotics.'
      }
    ]
  },
  cerlab: {
    org: 'CERLAB, Carnegie Mellon University',
    url: 'https://www.andrew.cmu.edu/user/shimada/',
    logo: 'timeline_logos/cerlab.png',
    entries: [
      {
        dates: 'Oct 2024 – May 2026',
        title: 'Graduate Research Assistant',
        desc: 'Conducted Master\'s thesis research on extending unsupervised landmark discovery from 2D frontal datasets to multi-viewpoint objects using DVE, LiDAR depth correspondences, and visibility-aware loss normalization.'
      }
    ]
  },
  ir: {
    org: 'Inductive Robotics',
    url: 'https://www.inductiverobotics.com/',
    logo: 'timeline_logos/ir.jpeg',
    entries: [
      {
        dates: 'Jul 2025 – Aug 2025',
        title: 'Robotics Intern',
        desc: 'Summer internship focused on robotic perception and autonomy. Worked on sensor integration and real-time planning systems for mobile robot platforms.'
      }
    ]
  },
  lightspeed: {
    org: 'Lightspeed Robotics',
    url: 'https://lightspeed.build/',
    logo: 'timeline_logos/lightspeed.png',
    entries: [
      {
        dates: 'Sep 2025 – Dec 2025',
        title: 'Robotics Intern',
        desc: 'Worked on high-speed autonomous navigation and control systems. Contributed to perception pipeline development and real-world testing of robotic platforms.'
      }
    ]
  },
  'cmu-end': {
    org: 'Carnegie Mellon University',
    url: 'https://www.cmu.edu/',
    logo: 'timeline_logos/cmu.png',
    entries: [
      {
        dates: 'May 2026',
        title: 'M.S. Degree Conferred',
        desc: '<strong>Thesis:</strong> Extending Unsupervised Landmark Discovery to Multi-Viewpoint Objects.' +
          '<br><strong>Coursework:</strong>' +
          '<br>16-663: F1 Tenth Autonomous Racing' +
          '<br>16-825: Learning for 3D Vision' +
          '<br>16-833: Robot Localization and Mapping' +
          '<br>16-782: Planning and Decision-making in Robotics' +
          '<br>24-678: Computer Vision for Engineers' +
          '<br>24-788/789: Introduction/Intermediate to Deep Learning' +
          '<br>24-778: Mechatronic Design' +
          '<br>24-677: Modern Control Theory' +
          '<br><img src="timeline_logos/graduation.jpg" alt="CMU Graduation" class="timeline-popup__desc-img">'
      }
    ]
  },
  forge: {
    org: 'FORGE Lab',
    url: 'https://forgelab-cmu.com/',
    logo: 'timeline_logos/forge.png',
    entries: [
      {
        dates: 'Jul 2026 – Present',
        title: 'Research Assistant',
        desc: 'Conducting research on deep learning methods for additive manufacturing.'
      }
    ]
  }
};

/* ---------- Popup logic ---------- */
(function() {
  var overlay = document.querySelector('.timeline-overlay');
  var popup = document.querySelector('.timeline-popup');
  if (!overlay || !popup) return;

  var closeBtn = popup.querySelector('.timeline-popup__close');
  var logoEl = popup.querySelector('.timeline-popup__logo');
  var orgEl = popup.querySelector('.timeline-popup__org');
  var bodyEl = popup.querySelector('.timeline-popup__body');

  function closePopup() {
    popup.classList.remove('active');
    overlay.classList.remove('active');
  }

  function openPopup(nodeEl) {
    var key = nodeEl.getAttribute('data-node');
    var data = TIMELINE_DATA[key];
    if (!data) return;

    logoEl.src = data.logo;
    logoEl.alt = data.org;

    var headerEl = popup.querySelector('.timeline-popup__header');
    if (data.url) {
      headerEl.innerHTML = '<a href="' + data.url + '" target="_blank" rel="noopener" class="timeline-popup__header-link">' +
        '<img class="timeline-popup__logo" src="' + data.logo + '" alt="' + data.org + '">' +
        '<span class="timeline-popup__org">' + data.org + '</span></a>';
    } else {
      headerEl.innerHTML = '<img class="timeline-popup__logo" src="' + data.logo + '" alt="' + data.org + '">' +
        '<span class="timeline-popup__org">' + data.org + '</span>';
    }

    var html = '';
    data.entries.forEach(function(e) {
      html += '<div class="timeline-popup__entry">';
      html += '<div class="timeline-popup__dates">' + e.dates + '</div>';
      html += '<div class="timeline-popup__title">' + e.title + '</div>';
      html += '<div class="timeline-popup__desc">' + e.desc + '</div>';
      html += '</div>';
    });
    bodyEl.innerHTML = html;

    overlay.classList.add('active');
    popup.classList.add('active');

    var rect = nodeEl.getBoundingClientRect();
    var vw = window.innerWidth;
    var popupW = 340;
    var topY = rect.top + window.scrollY;

    if (rect.left < vw / 2) {
      popup.style.left = Math.min(rect.right + 16, vw - popupW - 16) + 'px';
      popup.style.right = 'auto';
    } else {
      popup.style.left = Math.max(rect.left - popupW - 16, 16) + 'px';
      popup.style.right = 'auto';
    }

    popup.style.top = Math.max(topY - 40, 80) + 'px';
    popup.style.transform = 'none';
  }

  document.querySelectorAll('.timeline-node[data-node]').forEach(function(node) {
    node.addEventListener('click', function(e) {
      e.stopPropagation();
      openPopup(node);
    });
  });

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePopup();
  });
})();
