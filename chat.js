/* chat.js v1 — sesi, chat, reaksi, profil, wallpaper */
'use strict';
function migrateConvs(){
try{
var cs=JSON.parse(localStorage.getItem('qc-convs-'+S.me)||'[]');var ch=false;
cs.forEach(function(c){
if(c.key&&c.key.indexOf('+')>=0){
var nk=c.key.replace(/\+/g,'~');
var om=localStorage.getItem('qc-msgs-'+S.me+'-'+c.key);
if(om)localStorage.setItem('qc-msgs-'+S.me+'-'+nk,om);
var orr=localStorage.getItem('qc-react-'+S.me+'-'+c.key);
if(orr)localStorage.setItem('qc-react-'+S.me+'-'+nk,orr);
c.key=nk;ch=true;
}
});
if(ch)localStorage.setItem('qc-convs-'+S.me,JSON.stringify(cs));
}catch(e){}
}
function enterSession(u,h){
S.me=u;S.hash=h;
localStorage.setItem('qc-session',JSON.stringify({u:u,h:h}));
var pp=null;try{pp=sessionStorage.getItem('qc-pp-'+u);}catch(e){}
if(pp)vaultSave(u,pp);
migrateConvs();
loadConvs();
S.convs.forEach(function(c){recalcUnread(c.key);});
saveConvs();
setupHomeSubs();publishProfile();startPresence();
S.convs.forEach(function(c){publishTo(convTopic(c.key),{k:'hist-req',from:S.me,conv:c.key});});
renderAcc();
var vs=null;try{vs=JSON.parse(localStorage.getItem('qc-view-'+u)||'null');}catch(e){}
if(vs&&vs.v==='chat'&&vs.key&&getConv(vs.key)){showView('chat');openConv(vs.key);}
else{showView('home');renderHome();}
}
function logout(){
if(S.me)publishRetained(presT(S.me),{k:'pres',from:S.me,seen:now(),online:false});
stopPresence();Object.keys(subs).forEach(unsub);
S.me=null;S.conv=null;S.convs=[];S.msgs=[];
localStorage.removeItem('qc-session');
hideOv('accSidebar');
showView('auth');
}
function deleteAccount(){
if(!S.me)return;
var u=S.me;
publishRetained(userT(u),{u:u,deleted:true,t:now()});
publishRetained(vaultT(u),{u:u,del:true,t:now()});
publishRetained(profT(u),{u:u,deleted:true});
localStorage.removeItem('qc-acct-'+u);
localStorage.removeItem('qc-session');
localStorage.removeItem('qc-view-'+u);
hideOv('profModal');
logout();
setAuthMode('reg');
toast('Akun '+u+' dihapus permanen');
}
var delArm=0,delT=null;
function armDelete(){
var b=el('btnDelAcc');if(!b)return;
if(delArm){clearTimeout(delT);delArm=0;b.innerHTML=icon('userX')+' Hapus akun permanen';deleteAccount();return;}
delArm=1;b.innerHTML=icon('userX')+' Ketuk lagi untuk konfirmasi';
delT=setTimeout(function(){delArm=0;b.innerHTML=icon('userX')+' Hapus akun permanen';},4000);
}
function showView(v){S.view=v;el('authView').classList.toggle('hidden',v!=='auth');el('homeView').classList.toggle('hidden',v!=='home');el('chatView').classList.toggle('hidden',v!=='chat');saveViewState();}
var recRec=null;
function recStep(n){el('recStep1').classList.toggle('hidden',n!==1);el('recStep2').classList.toggle('hidden',n!==2);el('recStep3').classList.toggle('hidden',n!==3);}
function rec1(){
var u=(el('recUser').value||'').trim().toLowerCase();
if(!validUser(u)){toast('Username tidak valid');return;}
fetchRetained(userT(u),2500).then(function(rec){
if(!rec||!rec.u||rec.deleted){toast('Akun tidak ditemukan / sudah dihapus');return;}
recRec=rec;put('recQ',QUESTIONS[rec.q||0]);recStep(2);
});
}
function rec2(){
var a=(el('recAns').value||'').trim().toLowerCase();
sha256(a+'::'+recRec.u).then(function(h){
if(h!==recRec.qa){toast('Jawaban salah');return;}
recStep(3);
});
}
function rec3(){
var p=el('recPass').value,p2=el('recPass2').value;
if(p.length<4||p!==p2){toast('Password baru tidak valid');return;}
sha256(p+'::'+recRec.u).then(function(h){
publishRetained(userT(recRec.u),{u:recRec.u,h:h,q:recRec.q,qa:recRec.qa,created:recRec.created});
localStorage.setItem('qc-acct-'+recRec.u,h);
rememberPass(recRec.u,p);vaultSave(recRec.u,p);
closeOv('recModal');recStep(1);
el('inUser').value=recRec.u;el('inPass').value='';
toast('Password diganti. Silakan masuk.');
});
}
function myProfile(){var p=JSON.parse(localStorage.getItem('qc-prof-'+S.me)||'null');if(!p){p={img:null,color:hash(S.me)%COLORS.length,name:''};localStorage.setItem('qc-prof-'+S.me,JSON.stringify(p));}if(p.img===undefined)p.img=null;if(p.color==null)p.color=hash(S.me)%COLORS.length;if(p.name===undefined)p.name='';return p;}
function publishProfile(){var p=myProfile();S.profiles[S.me]=p;publishRetained(profT(S.me),{u:S.me,avatar:null,color:p.color,img:p.img,name:p.name||''});}
function profileOf(u){if(S.profiles[u])return S.profiles[u];var c=JSON.parse(localStorage.getItem('qc-pcache-'+u)||'null');if(c){S.profiles[u]=c;return c;}if(u===S.me)return myProfile();var d={img:null,color:hash(u)%COLORS.length,name:''};ensureProfile(u);return d;}
function displayName(u){var p=profileOf(u);return (p&&p.name)?p.name:u;}
function ensureProfile(u){if(S.profiles[u])return;fetchRetained(profT(u),1800).then(function(r){if(r&&r.u&&!r.deleted){var p={img:r.img||null,color:r.color!=null?r.color:hash(u)%COLORS.length,name:r.name||''};S.profiles[u]=p;localStorage.setItem('qc-pcache-'+u,JSON.stringify(p));renderHome();renderAcc();if(S.conv){renderChatHeader();renderSidebar();}}});}
function avatarHTML(u,size){var p=profileOf(u);if(p.img)return '<img src="'+esc(p.img)+'" alt="">';return icon('person',Math.round(size*0.55));}
function avNode(u,size,cls){var p=profileOf(u);var d=document.createElement('div');d.className=(cls||'c-av');d.style.width=size+'px';d.style.height=size+'px';d.style.borderRadius=Math.round(size*0.3)+'px';d.style.display='grid';d.style.placeItems='center';d.style.color='#081018';d.style.fontWeight='700';d.style.background='linear-gradient(145deg,rgba(255,255,255,.28),rgba(0,0,0,.12)),'+COLORS[p.color%COLORS.length];if(p.img){d.classList.add('has-img');d.innerHTML='<img src="'+esc(p.img)+'" alt="">';}else{d.innerHTML=icon('person',Math.round(size*0.55));}return d;}
function renderAcc(){
if(!S.me)return;
var a=el('accAv');
if(a){a.innerHTML='';a.appendChild(avNode(S.me,44));}
put('accName',displayName(S.me));
put('accUser','@'+S.me);
}
function loadConvs(){S.convs=JSON.parse(localStorage.getItem('qc-convs-'+S.me)||'[]');S.lastRead=JSON.parse(localStorage.getItem('qc-read-'+S.me)||'{}');S.unread=JSON.parse(localStorage.getItem('qc-unread-'+S.me)||'{}');}
function saveConvs(){localStorage.setItem('qc-convs-'+S.me,JSON.stringify(S.convs));localStorage.setItem('qc-read-'+S.me,JSON.stringify(S.lastRead));localStorage.setItem('qc-unread-'+S.me,JSON.stringify(S.unread));}
function getConv(key){for(var i=0;i<S.convs.length;i++)if(S.convs[i].key===key)return S.convs[i];return null;}
function upsertConv(meta){var c=getConv(meta.key);if(!c){c=meta;S.convs.push(c);}else{if(meta.name)c.name=meta.name;if(meta.members)c.members=meta.members;if(meta.type)c.type=meta.type;if(meta.owner)c.owner=meta.owner;}saveConvs();return c;}
function msgsKey(key){return 'qc-msgs-'+S.me+'-'+key;}
function loadMsgs(key){return JSON.parse(localStorage.getItem(msgsKey(key))||'[]');}
function saveMsgs(key,arr){localStorage.setItem(msgsKey(key),JSON.stringify(arr.slice(-300)));}
function removeConv(key){unsub(convTopic(key));if(key.indexOf('dm:')===0)unsub(callT(key));S.convs=S.convs.filter(function(c){return c.key!==key;});delete S.unread[key];delete S.lastRead[key];saveConvs();localStorage.removeItem(msgsKey(key));localStorage.removeItem('qc-react-'+S.me+'-'+key);}
function peerRead(key){return +(localStorage.getItem('qc-prt-'+S.me+'-'+key)||0);}
function setPeerRead(key,t){localStorage.setItem('qc-prt-'+S.me+'-'+key,String(t));}
function sendRead(key){publishTo(convTopic(key),{k:'read',from:S.me,conv:key,t:now()});}
function recalcUnread(key){
var lr=S.lastRead[key]||0;
var arr=loadMsgs(key);
var n=0;
for(var i=0;i<arr.length;i++){
var m=arr[i];
if(m.from!==S.me&&m.type!=='system'&&m.time>lr)n++;
}
S.unread[key]=n;
}
function requestSync(key){
publishTo(convTopic(key),{k:'hist-req',from:S.me,conv:key});
}
function normRaw(raw){
var out={};
for(var mid in raw){
var o={};
for(var k in raw[mid]){
var i=k.lastIndexOf('|');
if(i<0){o[k]=1;continue;}
var em=k.slice(0,i),who=k.slice(i+1);
if(!em)continue;
if(who===uid)who=S.me;
o[em+'|'+who]=1;
}
out[mid]=o;
}
return out;
}
function updateTicks(){
var l=el('msgList');if(!l||!S.conv)return;
var ns=l.querySelectorAll('.m-tick');
for(var i=0;i<ns.length;i++){
var e=ns[i];
var msgEl=e.closest('.msg');
if(!msgEl)continue;
var m=findMsg(msgEl.dataset.id);
if(!m||m.user!==S.me){e.textContent='';continue;}
var rd=m.time<=peerRead(S.conv.key);
e.textContent=rd?'✓✓':'✓';
e.classList.toggle('read',rd);
}
}
function getWall(){
var raw=localStorage.getItem('qc-wall');
if(!raw)return null;
if(raw.indexOf('data:')===0)return {img:raw,dark:65,zoom:140};
try{
var o=JSON.parse(raw);
if(o&&o.img)return {img:o.img,dark:o.dark==null?65:o.dark,zoom:o.zoom==null?140:o.zoom};
}catch(e){}
return null;
}
function setWall(o){localStorage.setItem('qc-wall',JSON.stringify(o));}
function wallBG(w){
var a=(w.dark/100).toFixed(2);
return 'linear-gradient(rgba(4,6,12,'+a+'),rgba(4,6,12,'+a+')),url('+w.img+')';
}
function applyWall(){
var s=el('msgScroll');if(!s)return;
var w=getWall();
if(w){
s.style.backgroundImage=wallBG(w);
s.style.backgroundSize=w.zoom+'%';
s.style.backgroundPosition='center';
s.style.backgroundRepeat='no-repeat';
}else{
s.style.backgroundImage='';
s.style.backgroundSize='';
s.style.backgroundPosition='';
s.style.backgroundRepeat='';
}
}
function loadImgSafe(file){
return new Promise(function(res,rej){
function fallback(){
var u=URL.createObjectURL(file);
var im=new Image();
im.onload=function(){URL.revokeObjectURL(u);res(im);};
im.onerror=function(e){URL.revokeObjectURL(u);rej(e);};
im.src=u;
}
if(window.createImageBitmap){
createImageBitmap(file,{imageOrientation:'from-image'}).then(res).catch(fallback);
}else{fallback();}
});
}
function srcSize(o){
var w=o.width||o.naturalWidth||0;
var h=o.height||o.naturalHeight||0;
return [w,h];
}
function compressWall(file){
return loadImgSafe(file).then(function(src){
var d=srcSize(src),w=d[0],h=d[1],mx=1920;
if(w>mx||h>mx){var s2=Math.min(mx/w,mx/h);w=Math.round(w*s2);h=Math.round(h*s2);}
var cv=document.createElement('canvas');
cv.width=w;cv.height=h;
cv.getContext('2d').drawImage(src,0,0,w,h);
return cv.toDataURL('image/jpeg',0.85);
});
}
function compressAvatar(file){
return loadImgSafe(file).then(function(src){
var d=srcSize(src),w=d[0],h=d[1];
var s=Math.min(w,h);
var size=256;
var cv=document.createElement('canvas');
cv.width=size;cv.height=size;
cv.getContext('2d').drawImage(src,(w-s)/2,(h-s)/2,s,s,0,0,size,size);
return cv.toDataURL('image/jpeg',0.82);
});
}
var wallPending=null;
function openWallEditor(img){
var w=getWall();
wallPending=(w&&w.img===img)?Object.assign({},w):{img:img,dark:65,zoom:140};
syncWallUI();
openOv('wallModal');
}
function syncWallUI(){
if(!wallPending)return;
var p=el('wallPreview');
p.style.backgroundImage=wallBG(wallPending);
p.style.backgroundSize=wallPending.zoom+'%';
p.style.backgroundPosition='center';
p.style.backgroundRepeat='no-repeat';
el('wallDark').value=wallPending.dark;
el('wallZoom').value=wallPending.zoom;
put('wallDarkVal',wallPending.dark+'%');
put('wallZoomVal',wallPending.zoom+'%');
}
function pinChat(){
try{window.scrollTo(0,0);}catch(e){}
try{document.documentElement.scrollTop=0;document.body.scrollTop=0;}catch(e){}
var s=el('msgScroll');
if(s&&S.conv)s.scrollTop=s.scrollHeight;
}
function setupHomeSubs(){sub(inWild(S.me));sub(NS+'call/#');sub(presT(S.me));sub(kickT(S.me));S.convs.forEach(subscribeConvPassive);}
function subscribeConvPassive(c){
if(c.type==='dm'){sub(presT(c.peer));sub(convTopic(c.key));ensureProfile(c.peer);}
else{sub(convTopic(c.key));}
}
function renderPresenceUI(){if(S.view==='home')renderHome();if(S.conv){renderChatHeader();renderSidebar();}}
function onPointer(d){
if(!d||!d.conv)return;
var c=upsertConv({key:d.conv,type:d.type,name:d.name,members:d.members||null,peer:d.type==='dm'?(d.from===S.me?d.peer:d.from):null,owner:d.owner||null});
if(!c.peer&&c.type==='dm')c.peer=d.from===S.me?d.peer:d.from;
c.last={text:d.preview||'',time:d.time||now(),from:d.from||''};
if(d.from&&d.from!==S.me){
sub(convTopic(c.key));
recalcUnread(c.key);
var la=loadMsgs(c.key),have=false;
for(var i=0;i<la.length;i++){if(la[i].time>=(d.time||0)){have=true;break;}}
if(!have){
if((d.time||0)>(S.lastRead[c.key]||0)&&S.unread[c.key]===0)S.unread[c.key]=1;
requestSync(c.key);
}
}
if(d.from&&d.from!==S.me&&d.type==='dm'){sub(presT(d.from));ensureProfile(d.from);}
saveConvs();
if(S.view==='home')renderHome();
if(S.conv&&S.conv.key===c.key&&S.view==='chat')renderChatHeader();
}
function isOnline(u){var p=S.presence[u];return !!p&&p.online!==false&&now()-p.seen<30000;}
function renderHome(){
var list=el('convList');if(!list)return;
var arr=S.convs.slice().sort(function(a,b){return (b.last?b.last.time:0)-(a.last?a.last.time:0);});
if(!arr.length){list.innerHTML='<div class="empty"><b>Belum ada chat</b>Ketuk + untuk chat pribadi atau buat/grup gabung.</div>';return;}
list.innerHTML='';
arr.forEach(function(c){
var online=c.type==='dm'&&isOnline(c.peer);
var d=document.createElement('div');d.className='conv';
var av=c.type==='dm'?avNode(c.peer,46).outerHTML:'<div class="c-av" style="background:linear-gradient(145deg,rgba(255,255,255,.25),rgba(0,0,0,.1)),'+colorOf(c.key)+'">'+esc(initials(c.name))+'</div>';
var un=S.unread[c.key]||0;
var badge=un>0?'<span class="c-badge">'+un+'</span>':'';
var grp=c.type==='group'?' '+icon('users',12):'';
var nm=c.type==='dm'?displayName(c.peer):c.name;
d.innerHTML='<div style="position:relative">'+av+(online?'<span class="c-dot"></span>':'')+'</div><div class="c-body"><div class="c-name">'+esc(nm)+grp+'</div><div class="c-prev">'+esc(c.last?((c.last.from&&c.last.from!==S.me?displayName(c.last.from)+': ':'')+c.last.text):'Belum ada pesan')+'</div></div><div class="c-side"><span class="c-time'+(un>0?' unread':'')+'">'+(c.last?fmtTime(c.last.time):'')+'</span>'+badge+'</div>';
d.onclick=function(){openConv(c.key);};
list.appendChild(d);
});
}
var presTimer=null;
function startPresence(){stopPresence();publishPresence();presTimer=setInterval(publishPresence,5000);}
function stopPresence(){if(presTimer){clearInterval(presTimer);presTimer=null;}}
function publishPresence(){
if(!S.me)return;
publishRetained(presT(S.me),{k:'pres',from:S.me,seen:now(),online:!document.hidden});
}
function onPresence(d){
if(!d||d.from===S.me)return;
var cur=S.presence[d.from];
if(cur&&cur.seen>(d.seen||0))return;
S.presence[d.from]={seen:d.seen||now(),online:d.online!==false};
renderPresenceUI();
}
function openConv(key){
var c=getConv(key);if(!c)return;
S.conv=c;S.msgs=loadMsgs(key);
S.reactRaw=normRaw(JSON.parse(localStorage.getItem('qc-react-'+S.me+'-'+key)||'{}'));
localStorage.setItem('qc-react-'+S.me+'-'+key,JSON.stringify(S.reactRaw));
S.unread[key]=0;S.lastRead[key]=now();saveConvs();
showView('chat');
applyWall();
sub(convTopic(key));
if(c.type==='dm'){sub(presT(c.peer));ensureProfile(c.peer);sub(callT(key));}
else{fetchRetained(gmetaT(key.slice(4)),1600).then(function(meta){if(meta&&meta.deleted){toast('Grup sudah dihapus pemilik');removeConv(key);backHome();return;}if(meta&&meta.members){c.members=meta.members;c.name=meta.name;c.owner=meta.owner;saveConvs();renderSidebar();renderChatHeader();}});}
renderChatHeader();renderMsgs();updateTicks();
setTimeout(function(){sendRead(key);requestSync(key);},60);
}
function backHome(){
if(S.conv){unsub(convTopic(S.conv.key));if(S.conv.type==='dm')unsub(callT(S.conv.key));}
S.conv=null;S.msgs=[];showView('home');renderHome();
}
function renderChatHeader(){
var c=S.conv;if(!c)return;
var host=el('chatAv');
if(c.type==='dm'){var node=avNode(c.peer,40);node.id='chatAv';node.classList.remove('c-av');node.classList.add('chat-av');host.replaceWith(node);put('chatTitle',displayName(c.peer));put('chatSub',isOnline(c.peer)?'online':'offline');el('btnCall').style.display='';el('btnCallAudio').style.display='';}
else{var d2=document.createElement('div');d2.id='chatAv';d2.className='chat-av';d2.style.background='linear-gradient(145deg,rgba(255,255,255,.25),rgba(0,0,0,.1)),'+colorOf(c.key);d2.textContent=initials(c.name);host.replaceWith(d2);put('chatTitle',c.name);put('chatSub',(c.members?c.members.length:1)+' anggota');el('btnCall').style.display='none';el('btnCallAudio').style.display='none';}
renderSidebar();
}
function renderSidebar(){
var c=S.conv;if(!c)return;
var isG=c.type==='group';
el('sbGroupCard').classList.toggle('hidden',!isG);
el('sbPeopleCard').style.display=isG?'':'none';
if(isG)put('sbCode',c.key.slice(4));
el('btnDeleteConv').style.display=isG?'none':'';
el('btnLeaveGroup').style.display=isG?'':'none';
el('btnDeleteGroup').style.display=(isG&&c.owner===S.me)?'':'none';
el('btnWallClear').style.display=getWall()?'':'none';
el('btnReport').style.display=isG?'none':'';
var ul=el('peopleList');ul.innerHTML='';
var names=isG?(c.members||[S.me]):[S.me,c.peer];
names.forEach(function(n){
var online=n===S.me||isOnline(n);
var li=document.createElement('li');
li.appendChild(avNode(n,30,'p-av'));
var sp=document.createElement('span');sp.className='p-name';sp.textContent=displayName(n)+(n===S.me?' (kamu)':'');li.appendChild(sp);
var dot=document.createElement('span');dot.className='p-dot'+(online?'':' off');li.appendChild(dot);
ul.appendChild(li);ensureProfile(n);
});
}
function onConvMsg(d){
if(!d)return;
if(d.k==='msg')applyMsg(d.data);
else if(d.k==='react'){
var rk=d.rk||'';
var i=rk.lastIndexOf('|');
if(i>=0){var who=rk.slice(i+1);if(who!==d.from)rk=rk.slice(0,i)+'|'+d.from;}
var emi=rk.slice(0,rk.lastIndexOf('|'));
if(!emi)return;
patchRaw(d.mid,rk,d.val);
renderReactions(d.mid);
}
else if(d.k==='read'&&d.from!==S.me){
var rt=Math.max(peerRead(S.conv.key),d.t||0);
setPeerRead(S.conv.key,rt);
updateTicks();
}
else if(d.k==='type'&&d.from!==S.me){var tr=el('typingRow');if(tr){tr.textContent=displayName(d.from)+' sedang mengetik…';tr.classList.add('on');clearTimeout(S._tt);S._tt=setTimeout(function(){tr.classList.remove('on');},2500);}}
else if(d.k==='hist-req'&&d.from!==S.me){publishTo(convTopic(S.conv.key),{k:'hist-res',to:d.from,conv:S.conv.key,msgs:S.msgs.slice(-200)});}
else if(d.k==='hist-res'&&d.to===S.me){
var ch=false;
(d.msgs||[]).forEach(function(m){if(!findMsg(m.id)){S.msgs.push(m);ch=true;}});
if(ch){
S.msgs.sort(function(a,b){return a.time-b.time;});
saveMsgs(S.conv.key,S.msgs);
renderMsgs();updateTicks();
S.lastRead[S.conv.key]=now();saveConvs();sendRead(S.conv.key);
}
}
else if(d.k==='grp-del'){toast('Grup dihapus oleh pemilik');var k=S.conv?S.conv.key:null;removeConv(d.conv);if(k===d.conv)backHome();else renderHome();}
}
function onBackground(key,d){
if(d.k==='msg'&&d.data){
var m=d.data,arr=loadMsgs(key),ex=false;
for(var i=0;i<arr.length;i++)if(arr[i].id===m.id){ex=true;break;}
if(!ex){arr.push(m);saveMsgs(key,arr);}
var c=getConv(key);
if(c){
c.last={text:m.type==='image'?'Gambar':m.type==='audio'?'Suara':m.text,time:m.time,from:m.from};
if(m.from!==S.me)recalcUnread(key);
saveConvs();
if(S.view==='home')renderHome();
}
}else if(d.k==='hist-req'&&d.from!==S.me){
publishTo(convTopic(key),{k:'hist-res',to:d.from,conv:key,msgs:loadMsgs(key).slice(-200)});
}else if(d.k==='hist-res'&&d.to===S.me){
var arr2=loadMsgs(key),ch=false;
(d.msgs||[]).forEach(function(m){var ex2=false;for(var j=0;j<arr2.length;j++)if(arr2[j].id===m.id){ex2=true;break;}if(!ex2){arr2.push(m);ch=true;}});
if(ch){
arr2.sort(function(a,b){return a.time-b.time;});
saveMsgs(key,arr2);
recalcUnread(key);
saveConvs();
if(S.view==='home')renderHome();
}
}
}
function findMsg(id){for(var i=0;i<S.msgs.length;i++)if(S.msgs[i].id===id)return S.msgs[i];return null;}
function applyMsg(m){
if(!m||!m.id)return;
var prev=findMsg(m.id);
if(prev){Object.assign(prev,m);saveMsgs(S.conv.key,S.msgs);updateMsgDOM(prev);return;}
S.msgs.push(m);saveMsgs(S.conv.key,S.msgs);renderMsgs();updateTicks();
if(m.from!==S.me&&m.type!=='system')Sound.play('recv');
if(m.from!==S.me&&S.conv){
S.conv.last={text:m.type==='image'?'Gambar':m.type==='audio'?'Suara':m.text,time:m.time,from:m.from};
S.lastRead[S.conv.key]=now();
saveConvs();
recalcUnread(S.conv.key);
sendRead(S.conv.key);
}
}
function writeMsg(partial){
var c=S.conv;if(!c)return null;
var m=Object.assign({id:S.me+'-'+Date.now().toString(36)+'-'+rand(4),uid:uid,user:S.me,conv:c.key,time:now(),type:'message',text:'',editedAt:0,deleted:false},partial);
applyMsg(m);
publishTo(convTopic(c.key),{k:'msg',conv:c.key,from:S.me,data:m});
publishPointer(c,m);
return m;
}
function publishPointer(c,m){
var preview=m.type==='image'?'Gambar':m.type==='audio'?'Suara':(m.text||'');
var recips=c.type==='dm'?[c.peer]:(c.members||[]);
var obj={conv:c.key,type:c.type,name:c.name,peer:c.peer||null,members:c.members||null,owner:c.owner||null,from:S.me,preview:preview.slice(0,60),time:m.time};
recips.forEach(function(r){if(r&&r!==S.me)publishRetained(inT(r,c.key),obj);});
if(c.type==='dm')publishRetained(inT(S.me,c.key),obj);
}
function renderMsgs(){
var list=el('msgList');if(!list)return;list.innerHTML='';
var prev=null;
var afterDay=false;
S.msgs.forEach(function(m){
afterDay=false;
if(m.type!=='system'&&(!prev||dayKey(prev.time)!==dayKey(m.time))){
var d=document.createElement('div');d.className='day-div';d.innerHTML='<span>'+dayLabel(m.time)+'</span>';list.appendChild(d);
afterDay=true;
}
if(prev&&prev.type!=='system'&&m.type!=='system'&&prev.user!==m.user&&!afterDay){
var dv=document.createElement('div');dv.className='user-div';list.appendChild(dv);
}
list.appendChild(buildMsg(m,prev&&prev.type==='message'&&m.type==='message'&&prev.user===m.user&&m.time-prev.time<120000));
prev=m;
});
var s=el('msgScroll');if(s)s.scrollTop=s.scrollHeight;
}
function buildMsg(m,grouped){
var e=document.createElement('div');e.dataset.id=m.id;
if(m.type==='system'){e.className='msg system';e.innerHTML='<div class="sys-pill" style="width:100%"><span>'+esc(m.text)+'</span></div>';return e;}
var own=m.user===S.me;
e.className='msg '+(own?'own':'other')+(grouped?' grouped':'');
var nr=(!own&&!grouped)?'<div class="m-name" style="color:'+colorOf(m.user)+'">'+esc(displayName(m.user))+'</div>':'';
var tick='';
if(own){
var rd=m.time<=peerRead(m.conv||(S.conv?S.conv.key:''));
tick='<span class="m-tick'+(rd?' read':'')+'">'+(rd?'✓✓':'✓')+'</span>';
}
e.innerHTML=(own?'':'<span data-av="1"></span>')+'<div class="m-body">'+nr+'<div class="m-tools"></div><div class="m-bubble"></div><div class="m-meta"><span>'+fmtTime(m.time)+'</span><span class="edited hidden">(diedit)</span>'+tick+'</div><div class="m-react"></div></div>';
var slot=e.querySelector('[data-av]');if(slot)slot.replaceWith(avNode(m.user,30,'m-av'));
fillBubble(e,m);fillTools(e,m);renderReactions(m.id,e);
var bub=e.querySelector('.m-bubble');
var lpT=null,lpFired=false;
function lpOpen(){
lpFired=true;
lastLP=now();
closeAllTools();
e.classList.add('tools-open');
if(navigator.vibrate){try{navigator.vibrate(25);}catch(v){}}
}
bub.addEventListener('pointerdown',function(ev){
if(ev.button)return;
lpFired=false;
clearTimeout(lpT);
lpT=setTimeout(lpOpen,420);
});
bub.addEventListener('pointermove',function(){clearTimeout(lpT);});
bub.addEventListener('pointerup',function(ev){
clearTimeout(lpT);
if(lpFired){ev.preventDefault();lpFired=false;lastLP=now();}
});
bub.addEventListener('pointercancel',function(){clearTimeout(lpT);});
bub.addEventListener('contextmenu',function(ev){ev.preventDefault();});
return e;
}
function fillBubble(e,m){
var b=e.querySelector('.m-bubble');if(!b)return;
b.classList.remove('media','plain');
b.classList.toggle('deleted',!!m.deleted);
if(m.deleted){b.textContent='Pesan dihapus';}
else if(m.type==='image'){b.classList.add('media');b.replaceChildren();var w=document.createElement('div');w.className='m-media';var img=document.createElement('img');img.src=m.image;img.onclick=function(){el('mmImg').src=m.image;openOv('mediaModal');};w.appendChild(img);if(m.text){var t=document.createElement('div');t.style.marginTop='6px';t.textContent=m.text;w.appendChild(t);}b.appendChild(w);}
else if(m.type==='audio'){b.classList.add('plain');b.replaceChildren();var row=document.createElement('div');row.className='m-audio';var pl=document.createElement('button');pl.className='audio-play';pl.innerHTML=icon('play');var au=document.createElement('audio');au.src=m.audio;var du=document.createElement('span');du.className='audio-dur';du.textContent=fmtDur(m.dur);au.ontimeupdate=function(){du.textContent=fmtDur(au.currentTime)+' / '+fmtDur(au.duration||m.dur);};au.onended=function(){pl.innerHTML=icon('play');};pl.onclick=function(){if(au.paused){au.play();pl.innerHTML=icon('pause');}else{au.pause();pl.innerHTML=icon('play');}};row.append(pl,au,du);b.appendChild(row);}
else{b.textContent=m.text;}
var ed=e.querySelector('.edited');if(ed)ed.classList.toggle('hidden',!m.editedAt||m.deleted);
}
function fillTools(e,m){
var t=e.querySelector('.m-tools');if(!t)return;
if(m.deleted||m.type!=='message'){t.remove();return;}
t.innerHTML='';
['❤️','😂',''].forEach(function(em){
if(!em)return;
var b=document.createElement('button');
b.type='button';
b.textContent=em;
b.onclick=function(ev){ev.stopPropagation();toggleReaction(m.id,em);};
t.appendChild(b);
});
var bp=document.createElement('button');
bp.type='button';
bp.title='Pilih emoji lain';
bp.innerHTML=icon('plus',14);
bp.onclick=function(ev){
ev.stopPropagation();
S.reactTarget=m.id;
var p=el('emojiPop');
if(p)p.classList.remove('hidden');
};
t.appendChild(bp);
if(m.user===S.me){
var be=document.createElement('button');
be.type='button';
be.title='Edit pesan';
be.innerHTML=icon('edit',14);
be.onclick=function(ev){
ev.stopPropagation();
S.editId=m.id;
el('editBar').classList.add('on');
el('input').value=m.text;
updateSendBtn();
closeAllTools();
};
t.appendChild(be);
var bd=document.createElement('button');
bd.type='button';
bd.title='Hapus pesan';
bd.innerHTML=icon('trash',14);
bd.onclick=function(ev){
ev.stopPropagation();
var mm=findMsg(m.id);
if(mm){
mm.deleted=true;
mm.editedAt=now();
saveMsgs(S.conv.key,S.msgs);
updateMsgDOM(mm);
publishTo(convTopic(S.conv.key),{k:'msg',conv:S.conv.key,from:S.me,data:mm});
toast('Pesan dihapus');
}
closeAllTools();
};
t.appendChild(bd);
}
}
function updateMsgDOM(m){var l=el('msgList');if(!l)return;var e=l.querySelector('[data-id="'+CSS.escape(m.id)+'"]');if(!e)return;fillBubble(e,m);renderReactions(m.id,e);}
function patchRaw(mid,k,v){if(!S.conv)return;if(v){if(!S.reactRaw[mid])S.reactRaw[mid]={};S.reactRaw[mid][k]=1;}else if(S.reactRaw[mid])delete S.reactRaw[mid][k];localStorage.setItem('qc-react-'+S.me+'-'+S.conv.key,JSON.stringify(S.reactRaw));}
function toggleReaction(mid,em){
if(!S.conv||!em)return;
var k=em+'|'+S.me;
var v=(S.reactRaw[mid]&&S.reactRaw[mid][k])?null:1;
patchRaw(mid,k,v);
renderReactions(mid);
Sound.play('react');
publishTo(convTopic(S.conv.key),{k:'react',conv:S.conv.key,from:S.me,mid:mid,rk:k,val:v});
closeAllTools();
}
function renderReactions(mid,e){
e=e||(el('msgList')?el('msgList').querySelector('[data-id="'+CSS.escape(mid)+'"]'):null);if(!e)return;
var r=e.querySelector('.m-react');if(!r)return;r.innerHTML='';
var counts={};
for(var k in (S.reactRaw[mid]||{})){
var p=k.split('|');
if(!p[0])continue;
if(!counts[p[0]])counts[p[0]]=new Set();
counts[p[0]].add(p[1]);
}
Object.keys(counts).forEach(function(em){
var mine=counts[em].has(S.me);
var b=document.createElement('button');
b.type='button';
b.className='r-pill'+(mine?' mine':'');
b.innerHTML=em+(counts[em].size>1?'<b>'+counts[em].size+'</b>':'');
b.onclick=function(ev){ev.stopPropagation();toggleReaction(mid,em);};
r.appendChild(b);
});
}
function sendMessage(){
var ta=el('input');if(!ta)return;var text=ta.value.trim().slice(0,2000);
if(S.editId){var m=findMsg(S.editId);if(m&&text){m.text=text;m.editedAt=now();saveMsgs(S.conv.key,S.msgs);updateMsgDOM(m);publishTo(convTopic(S.conv.key),{k:'msg',conv:S.conv.key,from:S.me,data:m});}S.editId=null;el('editBar').classList.remove('on');ta.value='';updateSendBtn();return;}
if(S.pendingImage){writeMsg({type:'image',image:S.pendingImage,text:text});S.pendingImage=null;el('composePreview').classList.remove('on');ta.value='';updateSendBtn();Sound.play('send');return;}
if(!text)return;
writeMsg({text:text});Sound.play('send');ta.value='';updateSendBtn();
}
function updateSendBtn(){var ta=el('input');var has=ta?(ta.value.trim().length>0||!!S.pendingImage):false;var b=el('btnSend');if(b)b.disabled=!has;}
function autoGrow(){var t=el('input');if(!t)return;t.style.height='auto';t.style.height=Math.min(t.scrollHeight,130)+'px';}
function insertEmojiMain(em){
if(S.reactTarget){
var mid=S.reactTarget;
S.reactTarget=null;
var p=el('emojiPop');
if(p)p.classList.add('hidden');
toggleReaction(mid,em);
return;
}
var ta=el('input');
if(!ta)return;
var s=ta.selectionStart!=null?ta.selectionStart:ta.value.length;
var e2=ta.selectionEnd!=null?ta.selectionEnd:s;
ta.setRangeText(em,s,e2,'end');
autoGrow();
updateSendBtn();
}
function startDM(u){
u=(u||'').trim().toLowerCase();
if(!validUser(u)){toast('Username tidak valid');return;}
if(u===S.me){toast('Tidak bisa chat dengan diri sendiri');return;}
if(!anyConnected()){toast('Harus online untuk memeriksa username');return;}
fetchRetained(userT(u),2500).then(function(rec){
if(!rec||!rec.u||rec.deleted){toast('Username tidak terdaftar');return;}
var key=dmKey(S.me,u);
var c=getConv(key)||upsertConv({key:key,type:'dm',peer:u,name:u,members:null,owner:null,last:null});
subscribeConvPassive(c);ensureProfile(u);
closeOv('dmModal');
openConv(key);
});
}
function createGroup(name){
name=(name||'').trim();if(name.length<3){toast('Nama grup minimal 3 karakter');return;}
var id=newGroupCode();var key=grpKey(id);
var c=upsertConv({key:key,type:'group',name:name,members:[S.me],peer:null,owner:S.me,created:now(),last:null});
publishRetained(gmetaT(id),{id:id,name:name,owner:S.me,members:[S.me],created:now()});
subscribeConvPassive(c);
closeOv('grpModal');
openConv(key);
writeMsg({type:'system',text:'Grup "'+name+'" dibuat oleh '+S.me});
}
function joinGroup(code){
code=(code||'').trim().toUpperCase();if(!code){toast('Masukkan kode grup');return;}
fetchRetained(gmetaT(code),2500).then(function(meta){
if(!meta||!meta.id||meta.deleted){toast('Kode grup tidak ditemukan');return;}
var key=grpKey(meta.id);
var members=(meta.members||[]).slice();if(members.indexOf(S.me)<0)members.push(S.me);
var c=upsertConv({key:key,type:'group',name:meta.name,members:members,peer:null,owner:meta.owner,created:meta.created,last:null});
publishRetained(gmetaT(code),{id:meta.id,name:meta.name,owner:meta.owner,members:members,created:meta.created});
subscribeConvPassive(c);
closeOv('grpModal');
openConv(key);
writeMsg({type:'system',text:S.me+' bergabung ke grup'});
toast('Bergabung ke grup '+meta.name);
});
}
var tmpProf=null;
function openProfile(){tmpProf=Object.assign({},myProfile());el('inpDisplayName').value=tmpProf.name||'';renderProfModal();openOv('profModal');var b=el('btnDelAcc');if(b){delArm=0;b.innerHTML=icon('userX')+' Hapus akun permanen';}}
function renderProfModal(){
put('profName',S.me);
var av=el('avatarPreview');
av.style.background='linear-gradient(145deg,rgba(255,255,255,.3),rgba(0,0,0,.12)),'+COLORS[tmpProf.color%COLORS.length];
if(tmpProf.img){av.classList.add('has-img');av.innerHTML='<img src="'+esc(tmpProf.img)+'" alt="">';}
else{av.classList.remove('has-img');av.innerHTML=icon('person',34);}
var cr=el('colorRow');cr.innerHTML='';
COLORS.forEach(function(c,i){var b=document.createElement('button');b.type='button';b.className='color-dot'+(tmpProf.color===i?' selected':'');b.style.background=c;b.style.color=c;b.onclick=function(){tmpProf.color=i;renderProfModal();};cr.appendChild(b);});
}
function saveProfile(){
tmpProf.name=(el('inpDisplayName').value||'').trim();
localStorage.setItem('qc-prof-'+S.me,JSON.stringify(tmpProf));
S.profiles[S.me]=Object.assign({},tmpProf);
publishProfile();
closeOv('profModal');renderAcc();renderHome();if(S.conv){renderChatHeader();renderSidebar();}
toast('Profil disimpan');
}
function pickAvatarFile(f){if(!f)return;compressAvatar(f).then(function(d){tmpProf.img=d;renderProfModal();}).catch(function(){toast('Gagal memproses foto');});}
window.QC={get me(){return S.me;},get uid(){return uid;},get S(){return S;},icon:icon,toast:toast,esc:esc,COLORS:COLORS,profileOf:profileOf,displayName:displayName,avatarHTML:avatarHTML,writeMsg:function(p){return writeMsg(p);},publishTo:publishTo,callTopic:function(k){return callT(k);},insertEmoji:insertEmojiMain,updateSendBtn:updateSendBtn,autoGrow:autoGrow,fmtDur:fmtDur,Sound:Sound};
/* END chat.js v1 */