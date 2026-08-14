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
        desc: '• Performed financial and energy modeling using Plexos and Excel to integrate over 6 GW of energy from wind, solar, and ESS, optimizing generation capacities for RTC (Round-the-Clock) and FDRE (Firm and Dispatchable Renewable Energy) tenders to meet DISCOM requirements.' +
          '<br>• Led bid management for a 225 MW wind-solar hybrid project (150 MW + 75 MW greenshoe option), owning financial modeling and tariff strategy from pre-bid through PPA execution. Represented TPREL in multiple utility-scale auctions.' +
          '<br>• Led renewable capacity design for a green hydrogen plant requiring 24x7 firm supply, optimizing the wind-solar-ESS mix against state renewable energy policy, and factoring in open-market sale of surplus generation.' +
          '<br>• Analyzed repowering potential across ageing wind sites in Maharashtra, mapping turbine capacities nearing end-of-life against available land parcels. Built the cost-benefit case for replacing legacy turbines with modern high-capacity units and rerouting the uprated capacity to existing and new offtake projects.' +
          '<br><br><strong>Beyond my scope, I:</strong>' +
          '<br>• Remodeled financial/energy modeling workflows using a SciPy-based solver, reducing modeling time compared to Plexos and overcoming convergence challenges to achieve minimum LCOE (Levelized Cost of Energy) in Excel.' +
          '<br>• Fine-tuned a GPT-3.5 model for summarizing/comparing lengthy Proposal Request documents and assessing risks, reducing TAT for tender analysis from hours to minutes.'
      },
      {
        dates: 'Jun 2023 – Aug 2024',
        title: 'Graduate Engineer Trainee',
        desc: '• Erected and commissioned 3 solar projects totaling 375 MW, helping organizations meet their renewable energy obligations.' +
          '<br>• Conducted testing on mechanical/civil structures and heavy electrical equipment to ensure first-time-right quality and reliability.' +
          '<br>• Planned daily project workflow and managed resource allocation, minimizing downtime for efficient on-site project execution.'
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
        desc: 'Honed skills as a Robotics Engineer: perception, navigation, SLAM, deep learning, autonomous vehicles, controls, and simulation.'
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
        desc: 'Worked in Perception and Front-end SLAM.' +
          '<br><strong>Thesis:</strong> <a href="https://vaibhavparekh9.github.io/projects/projects.html?p=unsupervised_keypoint_detection" target="_blank" rel="noopener">Extending Unsupervised Landmark Discovery to Multi-Viewpoint Objects.</a>'
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
        desc: '• Developed ROS2-based perception and navigation stack for docking a Clearpath Jackal-based robot to an inductive charger, and simulated the same in Nvidia Isaac Sim.' +
          '<br>• Generated synthetic dataset in Isaac Sim using Replicator and trained a YOLOv11 model for preemptive detection of reversing vehicles through taillight-state classification, achieving 92% accuracy on real-world data through effective sim-to-real transfer using domain randomization.' +
          '<br>• Modeled the comprehensive robot in SolidWorks and authored its URDF, along with the sim environment and assets in Blender.'
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
        desc: '• Built an LLM-based parser for BTLx (XML schema for timber fabrication) to translate design data into robotic panel-cutting instructions, enabling AI-driven construction automation.' +
          '<br>• Curated datasets and developed the perception stack for BRUTE robot (a stationary dual-arm cell for panel construction) for detecting processed lumber at the cutting station.' +
          '<br>• Developed ROS2 based navigation (Nav2) and manipulation (MoveIt) stacks for DEX robot (a mobile dual-arm manipulator), with simulations in Nvidia Isaac Sim.'
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
    org: 'FORGE Lab, Carnegie Mellon University',
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

/* ---------- Raise-cycle + Popup logic ---------- */
(function() {
  /* ---- tweakable ---- */
  var RAISE_DURATION_MS = 1200;

  /* ---- elements ---- */
  var nodes = Array.prototype.slice.call(
    document.querySelectorAll('.timeline-node[data-node]')
  );
  var overlay = document.querySelector('.timeline-overlay');
  var popup = document.querySelector('.timeline-popup');
  if (!overlay || !popup || nodes.length === 0) return;

  var closeBtn = popup.querySelector('.timeline-popup__close');
  var bodyEl = popup.querySelector('.timeline-popup__body');

  /* ---- raise cycle ---- */
  var cycleIndex = 0;
  var cycleTimer = null;
  var hovered = false;

  function clearRaised() {
    nodes.forEach(function(n) { n.classList.remove('raised'); });
  }

  function raiseNext() {
    clearRaised();
    nodes[cycleIndex].classList.add('raised');
    cycleIndex = (cycleIndex + 1) % nodes.length;
  }

  function startCycle() {
    stopCycle();
    raiseNext();
    cycleTimer = setInterval(raiseNext, RAISE_DURATION_MS);
  }

  function stopCycle() {
    if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
  }

  startCycle();

  /* ---- hover ---- */
  nodes.forEach(function(node) {
    node.addEventListener('mouseenter', function() {
      hovered = true;
      stopCycle();
      clearRaised();
      node.classList.add('raised');
    });

    node.addEventListener('mouseleave', function() {
      hovered = false;
      node.classList.remove('raised');
      cycleIndex = 0;
      startCycle();
    });
  });

  /* ---- popup ---- */
  function closePopup() {
    popup.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openPopup(nodeEl) {
    var key = nodeEl.getAttribute('data-node');
    var data = TIMELINE_DATA[key];
    if (!data) return;

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

    document.body.style.overflow = 'hidden';
    overlay.classList.add('active');
    popup.classList.add('active');
  }

  nodes.forEach(function(node) {
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
