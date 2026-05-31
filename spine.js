/* =====================================================================
 * DealMentor — Stratos Spine JS (shared)
 * Loaded by every page. Drives:
 *  - Theme toggle (dark/light, persisted)
 *  - FAQ accordion (toggleFaq global)
 *  - Mobile nav menu
 *  - Nav shrink on scroll
 *  - Flow field canvas (concept-c noise vector field, cursor-reactive)
 *  - Hero reveal (.is-in on hero elements)
 *  - Tile flip-in (per-card IntersectionObserver)
 * ===================================================================== */

/* ----- THEME TOGGLE ----- */
(function(){
  var html=document.documentElement,btn=document.getElementById('themeToggle');
  if(!btn)return;
  btn.addEventListener('click',function(){
    var isLight=html.getAttribute('data-theme')==='light';
    if(isLight){html.removeAttribute('data-theme');localStorage.setItem('dm-theme','dark')}
    else{html.setAttribute('data-theme','light');localStorage.setItem('dm-theme','light')}
  });
})();

/* ----- FAQ TOGGLE (global, referenced by inline onclick) ----- */
function toggleFaq(btn){
  var expanded=btn.getAttribute('aria-expanded')==='true';
  btn.setAttribute('aria-expanded',expanded?'false':'true');
  var panel=document.getElementById(btn.getAttribute('aria-controls'));
  if(panel)panel.hidden=expanded;
  btn.closest('.faq-item').classList.toggle('open',!expanded);
}

/* ----- MOBILE NAV + NAV SHRINK ----- */
(function(){
  var toggle=document.getElementById('navToggle'),links=document.getElementById('navLinks');
  if(toggle&&links){
    toggle.addEventListener('click',function(e){e.stopPropagation();var isOpen=links.classList.toggle('open');toggle.setAttribute('aria-expanded',isOpen?'true':'false')});
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');toggle.setAttribute('aria-expanded','false')})});
    document.addEventListener('click',function(e){if(!links.contains(e.target)&&!toggle.contains(e.target)){links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
  }
  var nav=document.querySelector('nav');
  if(nav){var onScroll=function(){nav.classList.toggle('shrink',window.scrollY>200)};window.addEventListener('scroll',onScroll,{passive:true});onScroll()}
})();

/* ----- HERO REVEAL ----- */
(function(){
  if(!document.documentElement.classList.contains('js'))return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var hero=document.querySelectorAll('.hero-eyebrow,.hero-h1,.hero-sub,.hero-ctas');
  Array.prototype.forEach.call(hero,function(e,i){e.style.transitionDelay=(i*0.08)+'s'});
  requestAnimationFrame(function(){requestAnimationFrame(function(){hero.forEach(function(e){e.classList.add('is-in')})})});
})();

/* ----- FLOW FIELD ----- */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var c=document.getElementById('field');if(!c)return;
  var ctx=c.getContext('2d',{alpha:true}),DPR=Math.min(window.devicePixelRatio||1,2),W=0,H=0;
  function hash(i){var n=Math.sin(i)*43758.5453;return n-Math.floor(n)}
  function vn(x,y){var ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);var a=hash(ix*.31415+iy*1.61803),b=hash((ix+1)*.31415+iy*1.61803),cc=hash(ix*.31415+(iy+1)*1.61803),d=hash((ix+1)*.31415+(iy+1)*1.61803);return ((a*(1-fx)+b*fx)*(1-fy))+((cc*(1-fx)+d*fx)*fy)}
  function flow(x,y,t){var nx=vn(x*.0024+t*.025,y*.0024-t*.02),ny=vn(x*.0024+91.1,y*.0024-13.7);var n=vn(x*.0017+nx*1.2+t*.03,y*.0017+ny*1.2-t*.025);return n*Math.PI*4}
  var particles=[],COUNT=0;
  function targetCount(){var area=W*H,mobile=window.matchMedia('(max-width:720px)').matches;return Math.min(mobile?350:900,Math.max(220,Math.floor(area/1600)))}
  function makeP(p){if(!p)p={};p.x=Math.random()*W;p.y=Math.random()*H;p.life=80+Math.random()*220;p.age=0;p.seed=Math.random();return p}
  function resize(){var r=c.getBoundingClientRect();W=r.width;H=r.height;c.width=W*DPR;c.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,W,H);COUNT=targetCount();particles=[];for(var i=0;i<COUNT;i++)particles.push(makeP())}
  var mouse={x:0,y:0,px:0,py:0,vx:0,vy:0,active:false,last:0};
  window.addEventListener('pointermove',function(e){var x=e.clientX,y=e.clientY;mouse.vx=x-mouse.px;mouse.vy=y-mouse.py;mouse.px=mouse.x;mouse.py=mouse.y;mouse.x=x;mouse.y=y;mouse.active=true;mouse.last=performance.now();var inj=Math.min(4,Math.floor(Math.hypot(mouse.vx,mouse.vy)*.2));for(var k=0;k<inj;k++)particles.push({x:x+(Math.random()-.5)*14,y:y+(Math.random()-.5)*14,life:50+Math.random()*100,age:0,seed:Math.random(),injected:true,ivx:mouse.vx*(.3+Math.random()*.3),ivy:mouse.vy*(.3+Math.random()*.3)});if(particles.length>COUNT*1.4)particles.splice(0,particles.length-COUNT*1.4|0)},{passive:true});
  var t0=performance.now(),vis=true;
  document.addEventListener('visibilitychange',function(){vis=!document.hidden});
  var html=document.documentElement;
  new MutationObserver(function(){var isL=html.getAttribute('data-theme')==='light';ctx.globalCompositeOperation='source-over';ctx.fillStyle=isL?'#FFFFFF':'#04060F';ctx.fillRect(0,0,W,H)}).observe(html,{attributes:true,attributeFilter:['data-theme']});
  var isLight=function(){return html.getAttribute('data-theme')==='light'};
  function frame(){
    if(!vis){requestAnimationFrame(frame);return}
    var now=performance.now(),t=(now-t0)*.001;
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle=isLight()?'rgba(255,255,255,0.06)':'rgba(4,6,15,0.06)';
    ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation=isLight()?'multiply':'lighter';
    var mr=110,mr2=mr*mr,mx=mouse.x,my=mouse.y,mAct=mouse.active&&(now-mouse.last)<400;
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      var a=flow(p.x,p.y,t),vx=Math.cos(a)*.7,vy=Math.sin(a)*.7;
      if(p.injected){vx+=p.ivx*.06;vy+=p.ivy*.06;p.ivx*=.92;p.ivy*=.92}
      if(mAct){var dx=p.x-mx,dy=p.y-my,d2=dx*dx+dy*dy;if(d2<mr2&&d2>1){var d=Math.sqrt(d2),f=(1-d/mr)*1.4;vx+=(dx/d)*f;vy+=(dy/d)*f}}
      p.x+=vx;p.y+=vy;p.age++;
      var lifeA=(1-p.age/p.life);
      if(lifeA<=0||p.x<-20||p.x>W+20||p.y<-20||p.y>H+20){if(p.injected){particles.splice(i,1);i--;continue}makeP(p);continue}
      var hue=195+p.seed*35;
      var alpha=isLight()?(.04+.06*lifeA):(.05+.10*lifeA);
      var sat=isLight()?60:85,light=isLight()?45:62;
      ctx.fillStyle='hsla('+hue.toFixed(1)+','+sat+'%,'+light+'%,'+alpha.toFixed(3)+')';
      ctx.beginPath();ctx.arc(p.x,p.y,1.0+(p.injected?.6:0),0,Math.PI*2);ctx.fill();
    }
    if(mAct){
      var hg=ctx.createRadialGradient(mx,my,0,mx,my,70);
      hg.addColorStop(0,isLight()?'rgba(0,100,200,0.10)':'rgba(120,180,255,0.16)');
      hg.addColorStop(1,'rgba(120,180,255,0)');
      ctx.fillStyle=hg;ctx.beginPath();ctx.arc(mx,my,70,0,Math.PI*2);ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  window.addEventListener('resize',resize);resize();
  mouse.x=W/2;mouse.y=H/2;mouse.active=true;mouse.last=performance.now();setTimeout(function(){mouse.active=false},1500);
  requestAnimationFrame(frame);
})();

/* ----- TILE FLIP-IN (per-card IntersectionObserver) ----- */
(function(){
  if(!document.documentElement.classList.contains('js'))return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.tile-flip').forEach(function(c){c.classList.add('is-in')});
    return;
  }
  var cards=document.querySelectorAll('.tile-flip');
  if(!cards.length)return;
  if(!('IntersectionObserver' in window)){cards.forEach(function(c){c.classList.add('is-in')});return}
  var strips={};
  cards.forEach(function(c){
    var parent=c.closest('.morph-grid,.tools-grid,.testimonials-grid,.pain-row,.plans-grid,.steps');
    if(!parent)return;
    var key=parent.dataset.flipKey;
    if(!key){key='s'+Math.random().toString(36).slice(2,8);parent.dataset.flipKey=key}
    strips[key]=strips[key]||0;
    c.style.animationDelay=(strips[key]++*0.18)+'s';
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}});
  },{threshold:0,rootMargin:'0px 0px -25% 0px'});
  cards.forEach(function(c){io.observe(c)});
  setTimeout(function(){
    document.querySelectorAll('.tile-flip').forEach(function(c){
      if(c.classList.contains('is-in'))return;
      var r=c.getBoundingClientRect();
      if(r.top<window.innerHeight*0.85&&r.bottom>50){c.classList.add('is-in');io.unobserve(c)}
    });
  },6000);
})();
