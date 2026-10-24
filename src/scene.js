import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createStudio(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 60);
  camera.position.set(0, 3.5, 8.8);
  camera.lookAt(0, .65, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, .04);
  scene.environment = env.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xf6f6e8, 0x667357, 2));
  const key = new THREE.DirectionalLight(0xfff5dc, 4.2);
  key.position.set(-3, 7, 5); key.castShadow = true;
  key.shadow.mapSize.set(1024,1024);
  key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;
  key.shadow.normalBias=.035;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf2ffe0, 2);
  rim.position.set(4, 3, -2);scene.add(rim);

  const body = new THREE.MeshStandardMaterial({color:0x858f77,metalness:.72,roughness:.3});
  const edge = new THREE.MeshStandardMaterial({color:0x242a22,metalness:.3,roughness:.42});
  const keyMat = new THREE.MeshStandardMaterial({color:0x3a4333,metalness:.25,roughness:.55});
  const olive = new THREE.MeshStandardMaterial({color:0x889a67,metalness:.55,roughness:.28});
  const silver = new THREE.MeshStandardMaterial({color:0xd9dccc,metalness:.95,roughness:.2});
  const laptop = new THREE.Group();scene.add(laptop);
  function box(w,h,d,r,material,x,y,z,parent=laptop) {
    const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,r),material);
    mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  }
  box(3.35,.13,2.1,.075,body,0,.09,.25);
  box(3.18,.018,1.94,.025,body,0,.16,.25);
  box(1.16,.01,.6,.035,edge,0,.176,.78);
  box(1.13,.012,.57,.03,body,0,.18,.78);
  for(let row=0;row<5;row++) {
    for(let col=0;col<13;col++) box(.192,.025,.16,.018,keyMat,-1.32+col*.22,.19,-.48+row*.2);
  }
  box(1.12,.025,.14,.015,keyMat,0,.19,.49);
  const lid = new THREE.Group();
  lid.position.set(0,.16,-.76);lid.rotation.x=-.17;laptop.add(lid);
  box(3.35,2.13,.105,.08,body,0,1.06,0,lid);
  box(3.18,1.97,.022,.04,edge,0,1.07,.065,lid);
  const textureCanvas = document.createElement('canvas');
  textureCanvas.width=1280;textureCanvas.height=760;
  const ctx=textureCanvas.getContext('2d');
  ctx.fillStyle='#1f2b22';ctx.fillRect(0,0,1280,760);
  const glow=ctx.createRadialGradient(950,430,10,950,430,430);
  glow.addColorStop(0,'#657651');glow.addColorStop(1,'#1f2b22');ctx.fillStyle=glow;ctx.fillRect(0,0,1280,760);
  ctx.strokeStyle='#708266';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(65,100);ctx.lineTo(1215,100);ctx.stroke();
  ctx.fillStyle='#a5b49b';ctx.font='16px monospace';ctx.fillText('AMOGH / DIGITAL STUDIO',65,70);ctx.fillText('EST. 2026',1080,70);
  ctx.fillStyle='#e1e7cb';ctx.font='90px Georgia';ctx.fillText('A little curiosity.',65,300);ctx.fillText('A new perspective.',65,405);
  ctx.fillStyle='#b0be9b';ctx.font='19px monospace';ctx.fillText('IDEAS. CODE. POSSIBILITIES.',70,490);
  ctx.strokeStyle='#a9ba8e';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(1030,535,110,110,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.ellipse(1030,535,110,39,-.6,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#a5b49b';ctx.font='15px monospace';ctx.fillText('HELLO, WORLD.',65,697);ctx.fillText('LET’S BUILD SOMETHING. ↗',900,697);
  const screenTexture=new THREE.CanvasTexture(textureCanvas);screenTexture.colorSpace=THREE.SRGBColorSpace;
  const screen=new THREE.Mesh(new THREE.PlaneGeometry(3.04,1.8),new THREE.MeshBasicMaterial({map:screenTexture}));
  screen.position.set(0,1.07,.079);lid.add(screen);
  const cameraDot=new THREE.Mesh(new THREE.SphereGeometry(.018,8,8),edge);cameraDot.position.set(0,2.062,.074);lid.add(cameraDot);
  laptop.rotation.set(.01,-.28,-.04);laptop.position.set(0,.04,0);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.46,.14,20,70),olive);
  ring.position.set(-2.05,1.85,-.1);ring.rotation.set(.6,.8,-.25);ring.castShadow=true;scene.add(ring);
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(.26,.095,90,12,2,3),silver);
  knot.position.set(2.05,1.2,.3);knot.castShadow=true;scene.add(knot);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(.18,24,20),olive);
  ball.position.set(1.65,2.8,-.65);ball.castShadow=true;scene.add(ball);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.16}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-.14;ground.receiveShadow=true;scene.add(ground);
  let motion=true,visible=true,paused=false,frame=0,progress=0,time=0,last=0;
  const pointer=new THREE.Vector2();
  const aim=new THREE.Vector2();
  function draw(now=0) {
    frame=0;
    const dt=last ? Math.min((now-last)/1000,.05) : 0;last=now;
    if(motion) time+=dt;
    pointer.lerp(aim,.065);
    laptop.rotation.y=-.28+(motion?pointer.x*.15+progress*.35:0);
    laptop.rotation.x=.01+(motion?pointer.y*.035:0);
    laptop.position.y=.04+(motion?Math.sin(time*.85)*.035:0);
    ring.position.y=1.85+(motion?Math.sin(time*.8)*.12:0);
    ring.rotation.z=-.25+(motion?time*.12:0);
    knot.rotation.set(.3+(motion?time*.16:0),.4+(motion?time*.2:0),.1);
    ball.position.y=2.8+(motion?Math.sin(time*.9+2)*.08:0);
    renderer.render(scene,camera);
    if(motion&&visible&&!paused&&!document.hidden) frame=requestAnimationFrame(draw);
  }
  function invalidate(){if(!frame&&!paused&&visible&&!document.hidden) frame=requestAnimationFrame(draw);}
  function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=camera.aspect<1.25?10.8:8.8;camera.updateProjectionMatrix();invalidate();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){last=0;invalidate();}else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'80px'});observer.observe(container);
  container.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||!motion)return;const r=container.getBoundingClientRect();aim.set((event.clientX-r.left)/r.width*2-1,(event.clientY-r.top)/r.height*2-1);});
  container.addEventListener('pointerleave',()=>aim.set(0,0));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{last=0;invalidate();}});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();paused=true;cancelAnimationFrame(frame);frame=0;container.dataset.renderState='context-lost';});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{paused=false;delete container.dataset.renderState;invalidate();});
  resize();
  return {
    setMotion(value){motion=value;aim.set(0,0);pointer.set(0,0);cancelAnimationFrame(frame);frame=0;invalidate();},
    setScroll(value){progress=value;},
    pause(){paused=true;cancelAnimationFrame(frame);frame=0;},
    resume(){paused=false;last=0;invalidate();},
  };
}
