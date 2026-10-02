const $=s=>document.querySelector(s),O={x:252,y:183},V={x:21.3,y:8.6},NM=14.4,LAND=13,ANG=Math.atan2(V.y,V.x)*180/Math.PI;
const P=(t)=>({x:O.x+V.x*(t+6),y:O.y+V.y*(t+6)});
const fmt=p=>{const ox=p.x/.375,oy=p.y/.375+60;return (18.907+(1095-oy)/2304).toFixed(2)+'°N, '+(72.808+(ox-1715)/2177).toFixed(2)+'°E'};
const VS=[
{id:'A',n:'MV BHARAT PRIDE',ty:'Tanker (simulated)',p:[265,190],v:[66,28],s:[.97,.96,.93],q:'AIS dark T−7 h to T−4 h near origin; recovered via CSN/VTS',g:[-7,-4]},
{id:'B',n:'SIM-7043',ty:'Tanker',p:[300,150],v:[14,50],s:[.72,.58,.49],q:'Continuous AIS'},
{id:'C',n:'SIM-3567',ty:'Fishing vessel',p:[220,215],v:[8,-6],s:[.61,.66,.31],q:'Sparse Class B AIS'},
{id:'D',n:'SIM-8921',ty:'Bulk carrier',p:[420,110],v:[-35,35],s:[.44,.35,.27],q:'Continuous AIS'},
{id:'E',n:'SIM-6012',ty:'Container ship',p:[150,330],v:[45,-20],s:[.21,.18,.12],q:'Continuous AIS'}];
const vp=(o,t)=>{t=Math.max(-9,Math.min(0,t));return{x:o.p[0]+o.v[0]*(t+6),y:o.p[1]+o.v[1]*(t+6)}};
VS.forEach(o=>{o.c=.35*o.s[0]+.25*o.s[1]+.4*o.s[2];let b=1e9,bt=0;for(let t=-9;t<=0;t+=.25){const q=vp(o,t),d=Math.hypot(q.x-O.x,q.y-O.y);if(d<b){b=d;bt=t}}o.d=b/NM;o.dt=bt});
VS.sort((a,b)=>b.c-a.c);let sel='A';
const trk=(o,a,b)=>{let s='';for(let t=a;t<=b;t++){const q=vp(o,t);s+=q.x.toFixed(0)+','+q.y.toFixed(0)+' '}return s};
let m=`<image href="assets/mumbai-coast.jpg" width="900" height="518" preserveAspectRatio="xMidYMid slice"/><defs><filter id="bl"><feGaussianBlur stdDeviation="2.2"/></filter></defs>`;
m+=`<path d="M24 492h72M24 486v12M96 486v12" stroke="#fff" stroke-width="2.5"/><text x="24" y="480">5 nm</text><g transform="translate(862 44)"><path d="M0-24L8 7 0 1-8 7Z" fill="#fff"/><text x="-4" y="24">N</text></g><text x="880" y="510" text-anchor="end" style="font-size:8px">Basemap: supplied satellite image · overlays simulated</text>`;
const o0=P(0),L=P(LAND),n={x:-Math.sin(ANG*Math.PI/180),y:Math.cos(ANG*Math.PI/180)};
const cone=`${o0.x+16*n.x},${o0.y+16*n.y} ${L.x+80*n.x},${L.y+80*n.y} ${L.x-80*n.x},${L.y-80*n.y} ${o0.x-16*n.x},${o0.y-16*n.y}`;
m+=`<g id="g-fore"><polygon points="${cone}" fill="#4fd1ff" opacity=".18"/><path d="M${o0.x} ${o0.y}L${L.x} ${L.y}" stroke="#4fd1ff" stroke-width="2.2" stroke-dasharray="7 5"/>`;
for(const hh of [3,6,12]){const q=P(hh);m+=`<circle cx="${q.x}" cy="${q.y}" r="4" fill="#4fd1ff"/><text x="${q.x-10}" y="${q.y-10}">+${hh} h</text>`}
m+=`<text x="${L.x-150}" y="${L.y+32}" style="font-weight:700;fill:#ffd27a">Shoreline contact ≈ +${LAND} h</text></g>`;
m+=`<g id="g-hind"><path d="M${o0.x} ${o0.y}L${O.x} ${O.y}" stroke="#ff5a4d" stroke-width="2.2" stroke-dasharray="7 5"/><ellipse cx="${O.x}" cy="${O.y}" rx="58" ry="44" fill="#ff5a4d" fill-opacity=".12" stroke="#ff5a4d" stroke-dasharray="4 4"/><path d="M${O.x-7} ${O.y-7}l14 14m0-14l-14 14" stroke="#ff5a4d" stroke-width="3.5"/><text x="${O.x-70}" y="${O.y-52}" style="font-weight:700;fill:#ff9d94">Probable origin (T−6 h)</text></g>`;
m+=`<g id="g-slick"><g id="sk" filter="url(#bl)"><ellipse id="se" fill="#f5c542" fill-opacity=".62" stroke="#fff2b0" stroke-width="1.5"/></g></g><g id="g-parts"><g id="pt"></g></g>`;
m+=`<g id="g-vess"><g id="trk">`;
for(const o of VS){const col=o.id=='A'?'#ff5a4d':'#cfe0ff';if(o.g){m+=`<polyline points="${trk(o,-9,o.g[0])}" fill="none" stroke="${col}" stroke-width="2"/><polyline points="${trk(o,o.g[0],o.g[1])}" fill="none" stroke="#ffb347" stroke-width="2.4" stroke-dasharray="5 4"/><polyline points="${trk(o,o.g[1],0)}" fill="none" stroke="${col}" stroke-width="2"/>`}else m+=`<polyline points="${trk(o,-9,0)}" fill="none" stroke="${col}" stroke-width="1.4" opacity=".6"/>`}
m+=`</g><g id="vm"></g></g>`;
$('#map').innerHTML=m;
const se=$('#se'),R=[];let s=11;const rn=()=>(s=s*16807%2147483647)/2147483647;
for(let i=0;i<70;i++){R.push([(rn()+rn()+rn()-1.5)*1.3,(rn()+rn()+rn()-1.5)*1.3]);$('#pt').insertAdjacentHTML('beforeend','<circle r="2" fill="#ffe9a8" opacity=".85"/>')}
const pts=$('#pt').children;
function render(){
 const t=+$('#t').value,tt=Math.min(t,LAND)+6,c=P(Math.min(t,LAND)),rx=Math.min(100,6+4.8*tt),ry=Math.min(40,2.5+1.9*tt);
 $('#tv').textContent=t==0?'0 h':(t>0?'+':'−')+Math.abs(t)+' h';
 const sk=$('#sk');sk.setAttribute('transform',`translate(${c.x} ${c.y}) rotate(${ANG})`);se.setAttribute('rx',rx);se.setAttribute('ry',ry);
 const pre=t<-6;$('#g-slick').style.visibility=$('#g-parts').style.visibility=pre?'hidden':'visible';
 const cs=Math.cos(ANG*Math.PI/180),sn=Math.sin(ANG*Math.PI/180);
 R.forEach((r,i)=>{const lx=r[0]*rx*.9,ly=r[1]*ry*.9;pts[i].setAttribute('cx',c.x+lx*cs-ly*sn);pts[i].setAttribute('cy',c.y+lx*sn+ly*cs)});
 let h='';for(const o of VS){const q=vp(o,t),hd=Math.atan2(o.v[0],-o.v[1])*180/Math.PI,k=o.id==sel,col=o.id=='A'?'#ff5a4d':'#e8f0ff';
  h+=`<g transform="translate(${q.x} ${q.y})">${k?'<circle r="15" fill="none" stroke="#ff9933" stroke-width="3"/>':''}<path transform="rotate(${hd})" d="M0-9L6 8 0 5-6 8Z" fill="${col}" stroke="#0b2a5b" stroke-width="1"/><text x="11" y="4">${o.n}</text></g>`}
 $('#vm').innerHTML=h;
 $('#ro').textContent=pre?'Before release: no slick on the water at this time.':`Slick centre ${fmt(c)} · length about ${(2*rx/NM).toFixed(1)} nm · area about ${(Math.PI*rx*ry/(NM*NM)*3.43).toFixed(0)} km² · drift east-southeast at about 1.6 kn${t>=LAND?' · reached the shoreline':''}`;
 document.querySelectorAll('tr.r').forEach(r=>r.classList.toggle('sel',r.dataset.id==sel));
}
$('#t').oninput=render;
// table
const bar=v=>`<div class="bar" role="img" aria-label="${Math.round(v*100)} percent"><i style="width:${v*100}%"></i></div><span class="tag">${Math.round(v*100)}%</span>`;
$('#tb').innerHTML=VS.map((o,i)=>`<tr class="r" data-id="${o.id}" tabindex="0"><td>${i+1}</td><td><b class="${i?'':'top1'}">${o.n}</b><br><span class="tag">${o.ty}</span></td><td>${o.d.toFixed(1)} nm<br><span class="tag">at T${o.dt<0?'−'+(-o.dt):'+'+o.dt} h</span></td><td>${o.q}</td><td>${bar(o.s[0])}</td><td>${bar(o.s[1])}</td><td>${bar(o.s[2])}</td><td><b>${(o.c*100).toFixed(1)}%</b></td></tr>`).join('');
document.querySelectorAll('tr.r').forEach(r=>{const f=()=>{sel=r.dataset.id;render()};r.onclick=f;r.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();f()}}});
// layers
document.querySelectorAll('[data-l]').forEach(c=>c.onchange=()=>$('#g-'+c.dataset.l).classList.toggle('hid',!c.checked));
// pipeline
const ST=[['Oil spill detection','SAR quality check, SAR + EO fusion, slick characterisation'],['Vessel data cleaning and tracking','AIS + CSN + VTS fused, 1 track gap recovered'],['Drift simulation and hindcast','OpenDrift backward origin and +3/+6/+12/+24 h forecast'],['Evidence fusion','Spatial, temporal and sensor consistency'],['Investigation report','Counterfactual check and uncertainty quantified']];
let step=5,tm;
function paint(){$('#st').innerHTML=ST.map((s,i)=>`<li class="${i<step?'done':i==step?'run':''}"><div class="dot">${i<step?'✓':''}</div><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join('');
 const G={slick:1,parts:1,vess:2,hind:3,fore:3};for(const k in G){const g=$('#g-'+k);g.classList.toggle('off',step<G[k])}
 $('#report').classList.toggle('hid',step<5);$('#vessels').style.opacity=step<4?.35:1}
$('#run').onclick=()=>{clearInterval(tm);step=0;paint();$('#run').disabled=true;tm=setInterval(()=>{step++;paint();if(step>=5){clearInterval(tm);$('#run').disabled=false}},900)};
// report
const lead=VS[0];
$('#rp').textContent=`Report no. BNAI/SIH26143/DEMO-001
Incident: Simulated oil release in the Arabian Sea off Mumbai (demonstration case).

1. Detection. An oil slick was detected on the simulated Sentinel-1 SAR scene (reliability 94%, SAR-first processing). Area about 25 km², centroid ${fmt(P(0))}.

2. Origin. Backward OpenDrift hindcast with wind and current forcing places the probable origin at ${fmt(O)} (±4 nm). The release window is T−8 h to T−4 h before the satellite pass.

3. Vessels. ${VS.length} candidates were reconstructed from AIS, CSN and VTS tracks. The highest ranked is ${lead.n} (${(lead.c*100).toFixed(1)}% consistency): ${lead.q}. The next candidate, ${VS[1].n}, scores ${(VS[1].c*100).toFixed(1)}%.

4. Forecast. The slick drifts east-southeast at about 1.6 kn, the rate observed in the MSC ELSA 3 case. Shoreline contact near south Mumbai is estimated at about +${LAND} h after the satellite pass.

5. Limitations. Ranking shows consistency with the observed slick and is not legal attribution. Vessel tracks in this demo are simulated, and operational CSN/VTS data requires authorised access.`;
// SAR canvas
function draw(mode){const c=$('#cv'),x=c.getContext('2d'),W=c.width,H=c.height,im=x.createImageData(W,H);let s=7;const r=()=>(s=s*16807%2147483647)/2147483647,a=.38,ca=Math.cos(a),sa=Math.sin(a);
 for(let j=0;j<H;j++)for(let i=0;i<W;i++){const u=(i-160)*ca+(j-110)*sa,w=-(i-160)*sa+(j-110)*ca,e=Math.exp(-((u/80)**2+(w/24)**2)*1.5)*(.85+.15*Math.sin(i/8)),sp=-Math.log(r()+1e-3)*.55,k=(j*W+i)*4;let R,G,B;
  if(mode=='sar'){R=G=B=Math.min(255,sp*(1-.8*e)*125+14)}
  else if(mode=='eo'){const n=(r()-.5)*14;R=28+n+e*50;G=88+n-e*38;B=128+n-e*70}
  else{const on=e>.33;R=G=B=on?240:18}
  im.data[k]=R;im.data[k+1]=G;im.data[k+2]=B;im.data[k+3]=255}
 x.putImageData(im,0,0)}
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-m]').forEach(z=>z.setAttribute('aria-pressed',z==b));draw(b.dataset.m)});
// chrome
let fs=100;document.querySelectorAll('[data-fs]').forEach(b=>b.onclick=()=>{fs=b.dataset.fs=='0'?100:Math.max(85,Math.min(130,fs+10*+b.dataset.fs));document.documentElement.style.fontSize=fs+'%'});
const clk=()=>$('#clk').textContent=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'medium'})+' IST';clk();setInterval(clk,1000);
draw('sar');paint();render();
