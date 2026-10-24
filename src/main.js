import './fonts.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './style.css';
import './achievements.css';
import { profile } from './profile.js';
import { createStudio } from './desk-scene.js';
import { journeyState, clamp01 } from './journey.js';
import './studio.css';

const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<span aria-hidden="true">↗</span>';
const socials = [['GitHub', profile.github], ['LinkedIn', profile.linkedin]].filter(([,url]) => url);
const projects = profile.projects.length ? profile.projects : [{title:'A different perspective',type:'Personal portfolio · In progress',description:'An exploration of editorial design, real-time 3D, and interactions that respond naturally to you.',tags:['Three.js','JavaScript','Web design'],url:'',visual:'portfolio'}];

document.querySelector('#app').innerHTML = `
  <a href="#main" class="skip-link">Skip to content</a>
  <header class="header">
    <a href="#home" class="wordmark" aria-label="${esc(profile.name)} home">a<span class="mark-dot">.</span></a>
    <span class="header-note">PERSONAL PORTFOLIO <span>© 2026</span></span>
    <nav aria-label="Main navigation"><a href="#work">Work <sup>01</sup></a><a href="#about">About <sup>02</sup></a><a href="#contact" class="contact-nav">Let’s talk ${arrow}</a></nav>
  </header>
  <main id="main">
    <section class="hero" id="home" aria-labelledby="hero-title">
      <div class="hero-topline"><span><i class="status-dot"></i> STILL BUILDING. STILL EXPLORING.</span><span class="edition">A PERSONAL EXPLORATION — VOL. 01</span></div>
      <h1 id="hero-title"><span class="intro-word">INTRODUCING</span><span class="name-word">${esc(profile.firstName.toUpperCase())}<span class="name-star" aria-hidden="true">✳</span></span></h1>
      <div class="hero-stage">
        <div class="hero-aside"><span class="eyebrow">A LITTLE CURIOUS.<br>A LOT OF POSSIBILITIES.</span><p>Making<br>ideas feel<br><em>real.</em></p><a class="round-link" href="#work" aria-label="Explore my work">↓</a></div>
        <div class="scene-wrap"><div id="studio" role="img" aria-label="An interactive three-dimensional laptop with floating sculptural objects"></div>${profile.portrait ? `<img class="hero-portrait" src="${esc(profile.portrait)}" alt="${esc(profile.name)} working at a laptop" />` : ''}<div class="scene-floor"></div><span class="scene-caption">A DIFFERENT PERSPECTIVE <span>↔ MOVE YOUR CURSOR</span></span></div>
        <div class="hero-description"><span class="eyebrow">HELLO, I’M ${esc(profile.firstName.toUpperCase())}.</span><h2>${esc(profile.intro)}</h2><p>${esc(profile.role)}</p><div class="social-list">${socials.map(([name,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name} ${arrow}</a>`).join('')}${profile.resume ? `<a href="${esc(profile.resume)}" target="_blank" rel="noopener">Résumé ${arrow}</a>`:''}</div></div>
      </div>
      <div class="hero-bottom"><span>IDEAS × CODE × CURIOSITY</span><a href="#signal">SCROLL TO EXPLORE <span>↓</span></a><button id="motion-toggle" aria-pressed="false">Motion: on <span aria-hidden="true">◉</span></button></div>
    </section>
    <section id="signal" class="signal" aria-labelledby="signal-title">
      <div class="signal-inner"><div class="section-meta"><span>01 / THE PHILOSOPHY</span><span>LESS NOISE. MORE INTENTION.</span></div><h2 id="signal-title">GOOD IDEAS<br>DESERVE A<br><em>new dimension.</em></h2><div class="signal-foot"><span class="signal-star" aria-hidden="true">✳</span><p>Beyond what’s on the screen.<br>Into something you can feel.</p><span class="scroll-measure" aria-hidden="true"><i></i></span></div><span class="orbit orbit-one" aria-hidden="true"></span><span class="orbit orbit-two" aria-hidden="true"></span></div>
    </section>
    <section id="work" class="work section-pad" aria-labelledby="work-title"><div class="section-meta"><span>02 / SELECTED WORK</span><span>FROM IDEA TO INTERACTION</span></div><div class="section-heading"><h2 id="work-title">Made with<br><em>intention.</em></h2><p>A closer look at the things<br>I’m bringing to life.</p></div><div class="project-list">${projects.map((p,i)=>`<article class="project"><div class="project-art art-${i%3}" aria-hidden="true"><span class="art-index">0${i+1} / SELECTED PROJECT</span><div class="project-window"><div class="window-bar"><i></i><i></i><i></i><span>${esc(p.type)}</span></div><div class="window-content"><span class="window-small">${esc(profile.firstName)} / DIGITAL EXPLORATIONS</span><strong>${esc(p.title)}</strong><span class="window-orb"></span><span class="window-bottom">CRAFTED WITH CURIOSITY ↗</span></div></div><span class="art-caption">${esc(p.tags.join(' / ').toUpperCase())}</span></div><div class="project-info"><div><span class="eyebrow">${esc(p.type)}</span><h3>${esc(p.title)}</h3></div><button class="project-open" data-project="${i}" aria-label="Read about ${esc(p.title)}">${arrow}</button></div><p class="project-summary">${esc(p.description)}</p></article>`).join('')}</div></section>
    <section id="about" class="about section-pad" aria-labelledby="about-title"><div class="section-meta"><span>03 / THE PERSON BEHIND THE PIXELS</span><span>ALWAYS A WORK IN PROGRESS</span></div><div class="about-layout"><div class="about-art" aria-hidden="true"><span class="about-initial">a.</span><span class="about-orbit"></span><span class="about-caption">CURIOUS BY DEFAULT.</span></div><div class="about-copy"><span class="eyebrow">${esc(profile.name.toUpperCase())}</span><h2 id="about-title">A builder.<br>A thinker.<br><em>Always curious.</em></h2><p>${esc(profile.about)}</p><div class="skills">${profile.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div>${profile.resume ? `<a class="text-link" href="${esc(profile.resume)}" target="_blank" rel="noopener">A little more about me — Résumé ${arrow}</a>`:''}</div></div></section>
    <section id="contact" class="contact section-pad" aria-labelledby="contact-title"><div class="section-meta"><span>04 / NEXT CHAPTER</span><span>GOOD THINGS START WITH A CONVERSATION</span></div><h2 id="contact-title">Have an idea?<br><em>Let’s make it real.</em></h2>${profile.email ? `<a class="contact-cta" href="mailto:${esc(profile.email)}">Say hello ${arrow}</a>` : '<p class="contact-note">New ideas. Different perspectives. Endless possibilities.</p>'}<footer><a class="footer-name" href="#home">${esc(profile.name)} <span>↑</span></a><div>${socials.map(([name,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name} ${arrow}</a>`).join('')}</div><span>DESIGNED WITH INTENTION. © 2026</span></footer></section>
  </main>
  <dialog id="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close project details">×</button><span class="eyebrow" id="dialog-type"></span><h2 id="dialog-title"></h2><p id="dialog-description"></p><div class="skills" id="dialog-tags"></div><a class="text-link" id="dialog-link" target="_blank" rel="noopener noreferrer">Explore project ↗</a></dialog>
  <div class="progress-line" aria-hidden="true"></div>
`;

// Upgrade the opening into a single pinned scene with ordinary document scrolling.
const stage = document.querySelector('.hero-stage');
const journey = document.createElement('div');
journey.className = 'studio-journey';
journey.id = 'studio-journey';
stage.before(journey);
journey.append(stage);
document.querySelector('.scene-wrap').innerHTML = `
  <div id="studio" role="img" aria-label="Amogh at an interactive 3D desk with a laptop, résumé notebook, project folder, and achievement trophy"></div>
  <div class="scene-fallback"><img src="${esc(profile.portrait)}" alt="Professional portrait of ${esc(profile.name)}"/><p>Welcome to my workspace.</p></div>
  <div class="desk-hotspots" aria-label="Explore the desk">
    <a class="desk-hotspot" data-desk="resume" href="${esc(profile.resume)}" target="_blank" rel="noopener" aria-label="Open résumé notebook"><i></i><span>Résumé ↗</span></a>
    <a class="desk-hotspot" data-desk="work" href="#work" aria-label="Explore project folder"><i></i><span>Projects ↗</span></a>
    <button class="desk-hotspot" data-desk="awards" aria-label="Open achievement trophy"><i></i><span>Milestones ↗</span></button>
  </div>`;
stage.insertAdjacentHTML('beforeend', `
  <div class="desk-toolbar"><span class="desk-kicker">THE PERSONAL STUDIO / 2026</span><a href="#work">Skip to work ↓</a></div>
  <div class="journey-project" hidden><span class="eyebrow">FROM THIS DESK TO THE REAL WORLD</span><h2>Meet<br><em>AgriConnect.</em></h2><p>An idea brought to life.<br>Built together, for agriculture.</p><button class="text-link" data-project="0">Explore the project ↗</button></div>
  <div class="journey-hud"><div><span class="chapter-number">01 / 03</span><p class="chapter-title">A place for possibilities.</p></div><span class="journey-hint">EXPLORE THE OBJECTS · SCROLL TO GET CLOSER</span><div class="chapter-track" aria-hidden="true"><i></i></div></div>`);
document.querySelector('.desk-toolbar').append(document.querySelector('#motion-toggle'));
document.querySelector('.hero-bottom').remove();
document.querySelector('.hero-aside .round-link').href = '#work';
if(profile.portrait) {
  const art=document.querySelector('.about-art');
  art.classList.add('portrait-art');
  art.removeAttribute('aria-hidden');
  art.innerHTML=`<span class="portrait-orbit" aria-hidden="true"></span><img src="${esc(profile.portrait)}" alt="${esc(profile.name)} in a charcoal jacket" loading="lazy"/><span class="about-caption">CURIOUS BY DEFAULT.</span>`;
}

const awards = document.createElement('div');
awards.className = 'achievements';
awards.setAttribute('aria-label', 'Achievements');
awards.innerHTML = (profile.achievements || []).map(([result,event]) => `<div class="achievement"><strong>${esc(result)}</strong><span>${esc(event)}</span></div>`).join('');
document.querySelector('.about-copy .skills').after(awards);
document.querySelector('nav a[href="#work"] sup').textContent = '02';
document.querySelector('nav a[href="#about"] sup').textContent = '03';

const media = window.matchMedia('(prefers-reduced-motion: reduce)');
let motion = !media.matches;
const motionToggle = document.querySelector('#motion-toggle');
let studio;
try { studio = createStudio(document.querySelector('#studio'), {portrait:profile.portrait,onSelect:id=>document.querySelector(`[data-desk="${id}"]`)?.click()}); } catch (error) {
  console.warn('3D rendering unavailable; static fallback enabled.', error);
  document.querySelector('.scene-wrap').classList.add('scene-unavailable');
  document.querySelector('#studio').replaceChildren();
  journey.classList.add('without-webgl');
}
function setMotion(enabled) {
  motion = enabled;
  document.documentElement.classList.toggle('reduced-motion', !enabled);
  motionToggle.setAttribute('aria-pressed', String(!enabled));
  motionToggle.innerHTML = `Motion: ${enabled ? 'on' : 'off'} <span aria-hidden="true">${enabled ? '◉' : '○'}</span>`;
  studio?.setMotion(enabled);
  requestAnimationFrame(updateScroll);
}
setMotion(motion);
motionToggle.addEventListener('click', () => setMotion(!motion));
media.addEventListener('change', e => setMotion(!e.matches));

const signal = document.querySelector('.signal');
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  document.documentElement.style.setProperty('--page-progress', progress);
  const rect = signal.getBoundingClientRect();
  const local = Math.min(1, Math.max(0, -rect.top / Math.max(1, signal.offsetHeight - window.innerHeight)));
  signal.style.setProperty('--signal-progress', local);
  const travel = Math.max(1,journey.offsetHeight - stage.offsetHeight);
  const sceneProgress = clamp01(-journey.getBoundingClientRect().top / travel);
  const state = journeyState(sceneProgress,stage.clientWidth/stage.clientHeight,motion);
  journey.style.setProperty('--journey-progress',sceneProgress);
  journey.style.setProperty('--intro-opacity',state.copy);
  stage.classList.toggle('close-view',state.copy<.05);
  document.querySelectorAll('.hero-aside,.hero-description').forEach(node=>{node.inert=state.copy<.05;});
  document.querySelector('.journey-project').hidden = state.reveal < .75;
  document.querySelector('.chapter-number').textContent = `0${state.chapter+1} / 03`;
  document.querySelector('.chapter-title').textContent = ['A place for possibilities.','A few things that tell my story.','From a thought to something real.'][state.chapter];
  document.querySelector('.journey-hint').textContent = state.chapter===2 ? 'KEEP SCROLLING TO EXPLORE THE WORK ↓' : 'EXPLORE THE OBJECTS · SCROLL TO GET CLOSER';
  studio?.setScroll(sceneProgress);
  document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 40);
}
const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
window.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('resize', onScroll, {passive:true});
updateScroll();

const dialog = document.querySelector('#project-dialog');
let opener;
function openDetails(p,trigger) {
  opener = trigger;
  document.querySelector('#dialog-title').textContent = p.title;
  document.querySelector('#dialog-type').textContent = p.type;
  document.querySelector('#dialog-description').textContent = p.detail || p.description;
  document.querySelector('#dialog-tags').innerHTML = p.tags.map(tag=>`<span>${esc(tag)}</span>`).join('');
  const link = document.querySelector('#dialog-link');
  link.hidden = !p.url;
  if(p.url) link.href = p.url; else link.removeAttribute('href');
  dialog.showModal();
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openDetails(projects[Number(button.dataset.project)],button)));
document.querySelector('[data-desk="awards"]').addEventListener('click',event=>openDetails({title:'Small wins. Forward motion.',type:'MILESTONES / ALWAYS LEARNING',description:'Every competition is an opportunity to build, collaborate, and learn. These are a few moments from that journey.',tags:profile.achievements.map(([result,name])=>`${result} — ${name}`),url:''},event.currentTarget));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) {const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();} });
dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
window.addEventListener('pagehide',()=>studio?.pause());
window.addEventListener('pageshow',()=>studio?.resume());
