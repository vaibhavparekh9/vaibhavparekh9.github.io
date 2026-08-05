/* ============================================================================
   Shared behaviors — safe to load on every page (all element lookups guarded)
   theme · mobile menu · scroll progress/active · reveal · accordion · dot-grid
   ========================================================================== */
(function(){ /* THEME */
  var root=document.documentElement, btn=document.getElementById('theme');
  try{var s=localStorage.getItem('vp-theme'); if(s) root.setAttribute('data-theme',s);}catch(e){}
  if(!btn) return;
  function lbl(){var d=root.getAttribute('data-theme')==='dark'; btn.setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme');}
  lbl();
  function toggle(){var d=root.getAttribute('data-theme')==='dark',n=d?'light':'dark'; root.setAttribute('data-theme',n); try{localStorage.setItem('vp-theme',n);}catch(e){} lbl();}
  btn.addEventListener('click',toggle);
  document.addEventListener('keydown',function(e){ if((e.key==='t'||e.key==='T')&&!/input|textarea/i.test(e.target.tagName)) toggle(); });
})();

(function(){ /* MOBILE MENU */
  var nav=document.getElementById('nav'), ham=document.getElementById('ham');
  if(!nav||!ham) return;
  function set(o){nav.classList.toggle('open',o); ham.setAttribute('aria-expanded',o?'true':'false'); ham.setAttribute('aria-label',o?'Close menu':'Open menu');}
  ham.addEventListener('click',function(e){e.stopPropagation(); set(!nav.classList.contains('open'));});
  document.addEventListener('click',function(e){ if(nav.classList.contains('open')&&!nav.contains(e.target)) set(false); });
  nav.querySelectorAll('.nav__panel a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
})();

(function(){ /* SCROLL PROGRESS + ACTIVE SECTION */
  var bar=document.getElementById('progress');
  var links=[].slice.call(document.querySelectorAll('.nav__panel a[href^="#"]'));
  var secs=links.map(function(l){return document.querySelector(l.getAttribute('href'));}).filter(Boolean);
  function onScroll(){
    if(bar){var st=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight; bar.style.width=(h>0?st/h*100:0)+'%';}
    if(!secs.length) return;
    var cur=null; secs.forEach(function(s){ if(s.getBoundingClientRect().top<=120) cur=s; });
    links.forEach(function(l){l.removeAttribute('aria-current');});
    if(cur){var a=links.find(function(l){return l.getAttribute('href')==='#'+cur.id;}); if(a)a.setAttribute('aria-current','true');}
  }
  window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('load',onScroll);
})();

(function(){ /* REVEAL ON SCROLL */
  var els=document.querySelectorAll('.reveal');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');}); return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){ if(x.isIntersecting){x.target.classList.add('in'); io.unobserve(x.target);} });},{threshold:.12});
  els.forEach(function(e){io.observe(e);});
})();

(function(){ /* ACCORDION */
  document.querySelectorAll('.acc__btn').forEach(function(btn){
    var panel=document.getElementById(btn.getAttribute('aria-controls')); if(!panel) return;
    btn.addEventListener('click',function(){
      var open=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded', open?'false':'true');
      panel.style.maxHeight = open ? '0' : (panel.scrollHeight+40)+'px';
    });
  });
})();

(function(){ /* YEAR */
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
  window.addEventListener('load',function(){document.body.classList.add('ready');});
})();

(function(){ /* BACKGROUND — subtle grayscale dot grid, cursor-reactive */
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse=window.matchMedia('(pointer: coarse)').matches;
  var canvas=document.getElementById('grid'); if(!canvas) return;
  var ctx=canvas.getContext('2d');
  if(coarse){ canvas.style.display='none'; return; }
  var W=0,H=0,dpr=1, mx=-9999,my=-9999, cx=-9999,cy=-9999, step=26, radius=200, fade=240;
  function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim();}
  var dotRGB,dotBase,dotGlow,crossRGB;
  function readColors(){var d=css('--dot').match(/rgba?\(([^)]+)\)/); dotRGB=d?d[1].split(',').slice(0,3).map(Number):[243,243,233];
    dotBase=parseFloat(css('--dot-base'))||.05; dotGlow=parseFloat(css('--dot-glow'))||.20; crossRGB=css('--cross').split(',').map(Number);}
  function resize(){dpr=Math.min(window.devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);}
  function draw(){ctx.clearRect(0,0,W,H);var r=dotRGB[0],g=dotRGB[1],b=dotRGB[2];
    for(var y=0;y<=H;y+=step){for(var x=0;x<=W;x+=step){var a=dotBase,rad=0.9;
      if(cx>-5000&&!reduce){var dd=Math.hypot(x-cx,y-cy);if(dd<radius){var t=1-dd/radius;a=dotBase+(dotGlow-dotBase)*t*t;rad=0.9+t*0.7;}}
      ctx.fillStyle='rgba('+r+','+g+','+b+','+a.toFixed(3)+')';ctx.beginPath();ctx.arc(x,y,rad,0,6.2832);ctx.fill();}}
    if(cx>-5000&&!reduce){var cr=crossRGB[0],cg=crossRGB[1],cb=crossRGB[2];
      var gh=ctx.createLinearGradient(cx-fade,0,cx+fade,0);gh.addColorStop(0,'rgba('+cr+','+cg+','+cb+',0)');gh.addColorStop(.5,'rgba('+cr+','+cg+','+cb+',0.10)');gh.addColorStop(1,'rgba('+cr+','+cg+','+cb+',0)');
      ctx.strokeStyle=gh;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx-fade,cy+0.5);ctx.lineTo(cx+fade,cy+0.5);ctx.stroke();
      var gv=ctx.createLinearGradient(0,cy-fade,0,cy+fade);gv.addColorStop(0,'rgba('+cr+','+cg+','+cb+',0)');gv.addColorStop(.5,'rgba('+cr+','+cg+','+cb+',0.10)');gv.addColorStop(1,'rgba('+cr+','+cg+','+cb+',0)');
      ctx.strokeStyle=gv;ctx.beginPath();ctx.moveTo(cx+0.5,cy-fade);ctx.lineTo(cx+0.5,cy+fade);ctx.stroke();}}
  var raf=null;
  function tick(){cx+=(mx-cx)*0.18;cy+=(my-cy)*0.18;draw();if(Math.abs(mx-cx)>0.4||Math.abs(my-cy)>0.4){raf=requestAnimationFrame(tick);}else{raf=null;draw();}}
  function kick(){if(raf===null)raf=requestAnimationFrame(tick);}
  window.addEventListener('resize',function(){resize();draw();});
  window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;kick();});
  window.addEventListener('mouseleave',function(){mx=-9999;my=-9999;kick();});
  new MutationObserver(function(){readColors();draw();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  resize();readColors();draw();
})();
