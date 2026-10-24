import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { journeyState, ease } from './journey.js';

export function createStudio(container, {portrait,onSelect=()=>{}}={}) {
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia('(max-width:600px)').matches?1.25:1.6));
  renderer.setClearColor(0x000000,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.92;
  renderer.domElement.setAttribute('aria-hidden','true');container.appendChild(renderer.domElement);
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(36,1,.1,90);
  const room=new RoomEnvironment();const pmrem=new THREE.PMREMGenerator(renderer);const environment=pmrem.fromScene(room,.03);
  scene.environment=environment.texture;scene.environmentIntensity=.65;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfff6e6,0x67735b,1.5));
  const key=new THREE.DirectionalLight(0xffefd6,3);key.position.set(-3.5,8,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);
  Object.assign(key.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:.5,far:22});key.shadow.normalBias=.025;key.shadow.bias=-.00015;key.shadow.radius=3;scene.add(key);
  const fill=new THREE.DirectionalLight(0xe2e9ff,1.5);fill.position.set(5,4,-3);scene.add(fill);
  const lampLight=new THREE.PointLight(0xffd294,9,6,2);lampLight.position.set(-3.1,2.65,-.9);scene.add(lampLight);
  // Directional micrograin produces tactile material detail without remote textures.
  const data=new Uint8Array(128*128*4);
  for(let y=0;y<128;y++)for(let x=0;x<128;x++){const n=120+Math.round(12*Math.sin(y*37.23+x*.48)),i=(y*128+x)*4;data[i]=data[i+1]=data[i+2]=n;data[i+3]=255;}
  const grain=new THREE.DataTexture(data,128,128);grain.wrapS=grain.wrapT=THREE.RepeatWrapping;grain.repeat.set(5,5);grain.needsUpdate=true;
  const material=(color,roughness=.6,metalness=0,extra={})=>new THREE.MeshStandardMaterial({color,roughness,metalness,...extra});
  const metal=material(0xb4b7a9,.3,.85,{bumpMap:grain,bumpScale:.006}),dark=material(0x242d26,.4,.25),keys=material(0x454e40,.55,.2),brass=material(0xb99a5e,.23,.88);
  const paper=material(0xe5decb,.92,0,{bumpMap:grain,bumpScale:.007}),linen=material(0x53624b,.9,0,{bumpMap:grain,bumpScale:.025}),clay=material(0xb78662,.8,0,{bumpMap:grain,bumpScale:.012});
  const ceramic=new THREE.MeshPhysicalMaterial({color:0xe9e4d5,roughness:.26,clearcoat:.6,clearcoatRoughness:.2});
  const glass=new THREE.MeshPhysicalMaterial({color:0xc5d6ad,metalness:.05,roughness:.12,transmission:.72,thickness:.45,ior:1.45,clearcoat:1});
  function box(w,h,d,r,mat,x,y,z,parent=scene){const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,r),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function cylinder(rt,rb,h,mat,x,y,z,parent=scene){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,40),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function label(text,color='#e4ddc5'){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.font='500 33px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,64);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;return texture;}
  function flatLabel(text,w,d,x,y,z,parent,color){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:label(text,color),transparent:true,depthWrite:false}));mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);parent.add(mesh);}
  // One continuous physical desk; only the camera advances through the scene.
  box(9.4,.28,4.7,.18,material(0xc9c4af,.78,0,{bumpMap:grain,bumpScale:.01}),0,-.22,0);
  box(6.6,.035,3.2,.12,material(0x717d60,.94),-.1,-.058,.1);
  box(.22,1.25,3.4,.06,dark,-3.7,-.95,0);box(.22,1.25,3.4,.06,dark,3.7,-.95,0);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.ShadowMaterial({opacity:.17}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.65;floor.receiveShadow=true;scene.add(floor);
  const laptop=new THREE.Group();scene.add(laptop);
  box(3.35,.13,2.1,.075,metal,0,.09,.25,laptop);box(3.18,.018,1.94,.025,metal,0,.16,.25,laptop);
  box(1.16,.01,.59,.035,dark,0,.176,.8,laptop);box(1.13,.012,.56,.03,metal,0,.18,.8,laptop);
  for(let row=0;row<5;row++)for(let col=0;col<13;col++)box(.192,.025,.16,.018,keys,-1.32+col*.22,.19,-.48+row*.2,laptop);
  box(1.12,.025,.14,.015,keys,0,.19,.49,laptop);
  cylinder(.055,.055,2.8,dark,0,.15,-.73,laptop).rotation.z=Math.PI/2;
  for(let i=0;i<8;i++)box(.012,.006,.42,.002,dark,-1.51+i*.025,.178,-.05,laptop);
  box(.014,.036,.2,.006,dark,-1.677,.095,.25,laptop);
  const lid=new THREE.Group();lid.position.set(0,.16,-.76);lid.rotation.x=-.12;laptop.add(lid);
  box(3.35,2.13,.105,.08,metal,0,1.06,0,lid);box(3.18,1.97,.023,.04,dark,0,1.07,.066,lid);
  const c=document.createElement('canvas');c.width=1280;c.height=760;const ctx=c.getContext('2d');ctx.fillStyle='#233027';ctx.fillRect(0,0,1280,760);
  const glow=ctx.createRadialGradient(960,440,10,960,440,470);glow.addColorStop(0,'#61734d');glow.addColorStop(1,'#233027');ctx.fillStyle=glow;ctx.fillRect(0,0,1280,760);
  ctx.strokeStyle='#76836b';ctx.beginPath();ctx.moveTo(65,100);ctx.lineTo(1215,100);ctx.stroke();ctx.fillStyle='#acba9b';ctx.font='17px monospace';ctx.fillText('AMOGH / DIGITAL STUDIO',65,68);ctx.fillText('EST. 2026',1070,68);
  ctx.fillStyle='#e6e6cc';ctx.font='92px Georgia';ctx.fillText('A little curiosity.',65,315);ctx.fillText('A new perspective.',65,425);ctx.fillStyle='#acba9b';ctx.font='19px monospace';ctx.fillText('IDEAS. CODE. POSSIBILITIES.',70,520);ctx.fillText('SCROLL TO SEE WHAT I BUILD',70,690);
  const introTexture=new THREE.CanvasTexture(c);introTexture.colorSpace=THREE.SRGBColorSpace;
  const screen=new THREE.Mesh(new THREE.PlaneGeometry(3.04,1.8),new THREE.MeshBasicMaterial({map:introTexture}));screen.position.set(0,1.07,.081);lid.add(screen);
  const projectMaterial=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});const projectScreen=new THREE.Mesh(new THREE.PlaneGeometry(3.04,1.8),projectMaterial);projectScreen.position.set(0,1.07,.084);lid.add(projectScreen);
  const loader=new THREE.TextureLoader();loader.load('/projects/agriconnect-screen.png',texture=>{texture.colorSpace=THREE.SRGBColorSpace;projectMaterial.map=texture;projectMaterial.needsUpdate=true;invalidate();},undefined,()=>{projectScreen.visible=false;});
  const cameraDot=new THREE.Mesh(new THREE.SphereGeometry(.017,8,8),dark);cameraDot.position.set(0,2.06,.08);lid.add(cameraDot);
  const notebook=new THREE.Group();notebook.position.set(-2.65,.04,.45);notebook.rotation.y=-.2;scene.add(notebook);
  box(1.25,.045,1.67,.035,linen,0,0,0,notebook);box(1.19,.11,1.58,.025,paper,.02,.077,0,notebook);box(1.25,.045,1.67,.035,linen,0,.15,0,notebook);box(.035,.012,1.66,.004,brass,.44,.179,0,notebook);
  flatLabel('FIELD NOTES',1,.25,-.06,.18,-.24,notebook);flatLabel('AMOGH / 01',.75,.18,-.06,.18,.42,notebook);
  const pen=cylinder(.027,.027,1.25,brass,-1.85,.02,.53);pen.rotation.x=Math.PI/2;pen.rotation.z=.13;
  const folder=new THREE.Group();folder.position.set(2.6,.04,.64);folder.rotation.y=.18;scene.add(folder);
  box(1.45,.04,1.66,.035,clay,0,0,0,folder);box(1.3,.04,1.47,.02,paper,-.02,.04,-.04,folder);box(1.45,.025,1.57,.025,clay,0,.08,.05,folder);box(.57,.03,.2,.025,clay,-.4,.08,-.8,folder);flatLabel('SELECTED WORK',1.2,.25,0,.098,.16,folder,'#342e25');
  const trophy=new THREE.Group();trophy.position.set(3.25,.04,-1.38);scene.add(trophy);box(.81,.16,.65,.045,dark,0,.04,0,trophy);cylinder(.045,.09,.36,brass,0,.29,0,trophy);
  const award=new THREE.Mesh(new THREE.TorusKnotGeometry(.24,.065,96,14,2,3),brass);award.position.y=.7;award.castShadow=true;trophy.add(award);
  const plate=new THREE.Mesh(new THREE.PlaneGeometry(.5,.1),new THREE.MeshBasicMaterial({map:label('KEEP BUILDING','#e0ce91'),transparent:true}));plate.position.set(0,.055,.329);trophy.add(plate);
  // Warm task lamp, ceramic coffee cup, and a glass keepsake.
  cylinder(.38,.42,.09,dark,-3.6,.02,-1.35);cylinder(.038,.038,2.3,brass,-3.6,1.2,-1.35);const arm=cylinder(.035,.035,.8,brass,-3.25,2.32,-1.35);arm.rotation.z=-Math.PI/2;
  const shade=new THREE.Mesh(new THREE.ConeGeometry(.4,.42,48,1,true),dark);shade.position.set(-2.9,2.18,-1.35);shade.castShadow=true;scene.add(shade);cylinder(.34,.34,.018,new THREE.MeshBasicMaterial({color:0xffe1a1}),-2.9,1.98,-1.35);
  cylinder(.31,.35,.055,ceramic,-3.8,.01,.75);cylinder(.23,.18,.42,ceramic,-3.8,.23,.75);cylinder(.202,.202,.01,material(0x34271e,.16),-3.8,.445,.75);
  const handle=new THREE.Mesh(new THREE.TorusGeometry(.14,.045,12,32),ceramic);handle.position.set(-4.05,.26,.75);scene.add(handle);
  const orb=new THREE.Mesh(new THREE.SphereGeometry(.27,40,32),glass);orb.position.set(2.1,.3,-1.3);orb.castShadow=true;scene.add(orb);
  let portraitMesh;
  if(portrait)loader.load(portrait,texture=>{texture.colorSpace=THREE.SRGBColorSpace;const mat=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,alphaTest:.025,toneMapped:false});portraitMesh=new THREE.Mesh(new THREE.PlaneGeometry(4.8*texture.image.width/texture.image.height,4.8),mat);portraitMesh.position.set(0,2.65,-1.45);scene.add(portraitMesh);container.dataset.portrait='loaded';invalidate();},undefined,()=>{container.dataset.portrait='unavailable';});
  const items=[{id:'resume',group:notebook,anchor:new THREE.Vector3(-2.65,.35,.85)},{id:'work',group:folder,anchor:new THREE.Vector3(2.6,.3,1.1)},{id:'awards',group:trophy,anchor:new THREE.Vector3(3.25,1,-1.38)}];
  items.forEach(item=>item.group.traverse(object=>{if(object.isMesh)object.userData.action=item.id;}));
  const hotspots=items.map(item=>({...item,element:document.querySelector(`[data-desk="${item.id}"]`)}));
  const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2(),aim=new THREE.Vector2(),pointer=new THREE.Vector2(),target=new THREE.Vector3(),projected=new THREE.Vector3();
  let progress=0,motion=true,visible=true,paused=false,lost=false,frame=0,last=0,time=0,hovered=null,pointerDown=null;
  function pick(event){const r=container.getBoundingClientRect();mouse.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(mouse,camera);return raycaster.intersectObjects(items.map(i=>i.group),true)[0]?.object.userData.action;}
  function draw(now=0){
    frame=0;const dt=last?Math.min((now-last)/1000,.05):0;last=now;if(motion)time+=dt;
    const state=journeyState(progress,camera.aspect,motion);pointer.lerp(aim,.075);camera.position.fromArray(state.position);
    if(motion){camera.position.x+=pointer.x*.12*(1-progress);camera.position.y+=pointer.y*.055*(1-progress);}
    target.fromArray(state.target);camera.lookAt(target);camera.updateMatrixWorld();
    // Reveal a matching portion of the texture so two text layers never blend together.
    projectScreen.visible=Boolean(projectMaterial.map)&&state.screen>.001;
    projectMaterial.opacity=1;
    projectScreen.scale.x=Math.max(.001,state.screen);
    projectScreen.position.x=-1.52*(1-state.screen);
    if(projectMaterial.map)projectMaterial.map.repeat.x=Math.max(.001,state.screen);
    if(portraitMesh){portraitMesh.material.opacity=1-ease((progress-.24)/.29);portraitMesh.visible=portraitMesh.material.opacity>.005;}
    items.forEach(item=>{const up=motion && hovered===item.id ? .045 : 0;item.group.position.y=THREE.MathUtils.lerp(item.group.position.y,.04+up,.18);});orb.rotation.y=motion?time*.05:0;
    renderer.render(scene,camera);
    for(const item of hotspots){if(!item.element)continue;projected.copy(item.anchor).project(camera);const shown=state.hotspots&&projected.z<1&&Math.abs(projected.x)<.97&&Math.abs(projected.y)<.9;item.element.hidden=!shown;item.element.style.left=`${(projected.x*.5+.5)*100}%`;item.element.style.top=`${(-projected.y*.5+.5)*100}%`;item.element.classList.toggle('is-hovered',hovered===item.id);}
    container.dataset.cameraPhase=String(state.chapter);
    if(motion&&visible&&!paused&&!lost&&!document.hidden)frame=requestAnimationFrame(draw);
  }
  function invalidate(){if(!frame&&!paused&&!lost&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
  function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();invalidate();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){last=0;invalidate();}else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'80px'});observer.observe(container);
  container.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const r=container.getBoundingClientRect();aim.set((event.clientX-r.left)/r.width*2-1,(event.clientY-r.top)/r.height*2-1);hovered=progress<.66?pick(event):null;container.style.cursor=hovered?'pointer':'';invalidate();});
  container.addEventListener('pointerleave',()=>{aim.set(0,0);hovered=null;invalidate();});
  container.addEventListener('pointerdown',event=>{pointerDown={x:event.clientX,y:event.clientY};});
  container.addEventListener('pointerup',event=>{if(!pointerDown)return;const distance=Math.hypot(event.clientX-pointerDown.x,event.clientY-pointerDown.y);pointerDown=null;if(distance>8||progress>=.66)return;const id=pick(event);if(id)onSelect(id);});
  container.addEventListener('pointercancel',()=>{pointerDown=null;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{last=0;invalidate();}});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;cancelAnimationFrame(frame);frame=0;container.dataset.renderState='context-lost';container.parentElement.classList.add('scene-unavailable');hotspots.forEach(item=>{if(item.element)item.element.hidden=false;});});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{lost=false;delete container.dataset.renderState;container.parentElement.classList.remove('scene-unavailable');invalidate();});
  resize();
  return {setMotion(value){motion=value;aim.set(0,0);pointer.set(0,0);cancelAnimationFrame(frame);frame=0;invalidate();},setScroll(value){progress=value;invalidate();},pause(){paused=true;cancelAnimationFrame(frame);frame=0;},resume(){paused=false;last=0;invalidate();}};
}
