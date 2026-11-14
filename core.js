/* core.js v1 — util, mqtt, auth */
'use strict';
var DEV_PASS='ryoxd666#';
var $=function(s){return document.querySelector(s);};
var el=function(i){return document.getElementById(i);};
function put(i,h){var e=el(i);if(e)e.innerHTML=h;}
function on(i,ev,fn){var e=el(i);if(e)e.addEventListener(ev,fn);}
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var now=function(){return Date.now();};
var AL='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function rand(n){var b=new Uint8Array(n);crypto.getRandomValues(b);var o='';for(var i=0;i<n;i++)o+=AL[b[i]%AL.length];return o;}
var COLORS=['#53D8FF','#FF6AC1','#9D8CFF','#FFC24B','#4ADE80','#FF9F45','#C8F04B','#FF6B6B'];
var QUESTIONS=['Nama hewan peliharaanmu?','Nama guru favoritmu?','Kota kelahiranmu?','Makanan favoritmu?','Nama teman masa kecilmu?'];
function hash(s){var h=0;s=String(s);for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h;}
function colorOf(n){return COLORS[hash(String(n).toLowerCase())%COLORS.length];}
function initials(n){var p=String(n).trim().split(/\s+/).slice(0,2),o='';for(var i=0;i<p.length;i++)o+=p[i].charAt(0).toUpperCase();return o||'?';}
function pad(n){return(n<10?'0':'')+n;}
function fmtTime(t){var d=new Date(t);return pad(d.getHours())+':'+pad(d.getMinutes());}
function fmtDur(s){s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+pad(s%60);}
function dayKey(t){var d=new Date(t);return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();}
function dayLabel(t){var n=now();if(dayKey(t)===dayKey(n))return'Hari ini';if(dayKey(t)===dayKey(n-86400000))return'Kemarin';return new Date(t).toLocaleDateString('id-ID',{day:'numeric',month:'long'});}
function isTouch(){return matchMedia('(hover:none)').matches;}
function sha256(s){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return x.toString(16).padStart(2,'0');}).join('');});}
function b64buf(buf){var b=new Uint8Array(buf),s='';for(var i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return btoa(s);}
function bufb64(str){var bin=atob(str),a=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return a.buffer;}
var IC={x:'<path d="M18 6L6 18"/><path d="M6 6l12 12"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',back:'<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',userPlus:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>',userX:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="9" x2="23" y2="15"/><line x1="23" y1="9" x2="17" y2="15"/>',person:'<path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12z"/><path d="M3.5 21a8.5 8.5 0 0 1 17 0"/>',key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3L21 2"/><path d="M18 5l3 3"/><path d="M15 8l2 2"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',ban:'<circle cx="12" cy="12" r="10"/><path d="M4.9 4.9l14.2 14.2"/>',alert:'<path d="M10.3 3.8L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',eraser:'<path d="M20 20H8.5l-5-5a2 2 0 0 1 0-2.8l8.2-8.2a2 2 0 0 1 2.8 0l5 5a2 2 0 0 1 0 2.8L13 18.3"/><path d="M6.5 10.5l7 7"/>',smile:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',send:'<path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>',attach:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',mic:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',play:'<polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>',pause:'<rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',video:'<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',phoneOff:'<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="1" y1="1" x2="23" y2="23"/>',dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',check:'<path d="M20 6L9 17l-5-5"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'};
function icon(n,s){return '<svg viewBox="0 0 24 24" width="'+(s||18)+'" height="'+(s||18)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(IC[n]||'')+'</svg>';}
function toast(msg){var w=el('toasts');if(!w)return;var e=document.createElement('div');e.className='toast';e.textContent=msg;w.appendChild(e);requestAnimationFrame(function(){e.classList.add('in');});setTimeout(function(){e.classList.remove('in');setTimeout(function(){e.remove();},260);},2400);}
var uid=sessionStorage.getItem('qc-uid');if(!uid){uid=rand(10);sessionStorage.setItem('qc-uid',uid);}
var lastLP=0;
var monOn=false;
var Sound={ctx:null,on:localStorage.getItem('qc-sound')!=='0',ensure:function(){var A=window.AudioContext||window.webkitAudioContext;if(!this.ctx&&A){try{this.ctx=new A();}catch(e){}}if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume().catch(function(){});},play:function(k){if(!this.on)return;this.ensure();var c=this.ctx;if(!c)return;var t=c.currentTime;function b(f0,f1,d,v,ty){var o=c.createOscillator(),g=c.createGain();o.type=ty;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(f1,1),t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.03);}if(k==='send')b(540,820,.1,.05,'sine');else if(k==='recv')b(700,430,.11,.045,'sine');else if(k==='react')b(950,1150,.06,.035,'triangle');else if(k==='call')b(880,880,.12,.04,'triangle');},toggle:function(){this.on=!this.on;localStorage.setItem('qc-sound',this.on?'1':'0');}};
function syncHeight(){
var vv=window.visualViewport;
var h=vv?vv.height:window.innerHeight;
if(h>0)document.documentElement.style.setProperty('--apph',Math.round(h)+'px');
}
var NS='qcx-v8/';
function userT(u){return NS+'user/'+u;}
function profT(u){return NS+'prof/'+u;}
function presT(u){return NS+'pres/'+u;}
function banT(u){return NS+'ban/'+u;}
function kickT(u){return NS+'kick/'+u;}
function repT(id){return NS+'report/'+id;}
function inT(u,conv){return NS+'in/'+u+'/'+conv;}
function inWild(u){return NS+'in/'+u+'/+';}
function dmKey(a,b){return 'dm:'+([a,b].sort().join('~'));}
function grpKey(id){return 'grp:'+id;}
function convTopic(key){return key.indexOf('dm:')===0?NS+'dm/'+key.slice(3).replace('~','/'):NS+'grp/'+key.slice(4);}
function topicToKey(t){
if(t.indexOf(NS+'dm/')===0)return 'dm:'+t.slice((NS+'dm/').length).replace('/','~');
if(t.indexOf(NS+'grp/')===0)return 'grp:'+t.slice((NS+'grp/').length);
return null;
}
function callT(key){return NS+'call/'+key.replace(':','/').replace('~','/');}
function gmetaT(id){return NS+'gmeta/'+id;}
function vaultT(u){return NS+'vault/'+u;}
function newGroupCode(){var p=rand(8);var h=0;for(var i=0;i<p.length;i++)h=(h*31+p.charCodeAt(i)*(i+7))>>>0;return p.slice(0,3)+'-'+p.slice(3,6)+'-'+p.slice(6,8)+AL[h%AL.length];}
var S={me:null,hash:null,view:'auth',conv:null,convs:[],msgs:[],reactRaw:{},presence:{},profiles:{},unread:{},lastRead:{},editId:null,pendingImage:null,reactTarget:null};
var clients=[],libTries=0,subs={};
function anyConnected(){for(var i=0;i<clients.length;i++)if(clients[i]&&clients[i].connected)return true;return false;}
function whenConnected(ms){return new Promise(function(res){if(anyConnected())return res(true);var done=false;function off(){clearTimeout(t);clients.forEach(function(c){if(c)c.removeListener('connect',h);});}function h(){if(done)return;done=true;off();res(true);}var t=setTimeout(function(){if(done)return;done=true;off();res(anyConnected());},ms||8000);clients.forEach(function(c){if(c)c.on('connect',h);});});}
function outboxPush(topic,obj,ret){try{var ob=JSON.parse(localStorage.getItem('qc-ob')||'[]');ob.push({t:topic,o:obj,r:!!ret});if(ob.length>300)ob=ob.slice(-300);localStorage.setItem('qc-ob',JSON.stringify(ob));}catch(e){}}
function flushOutbox(){if(!anyConnected())return;var ob=[];try{ob=JSON.parse(localStorage.getItem('qc-ob')||'[]');}catch(e){}if(!ob.length)return;localStorage.setItem('qc-ob','[]');ob.forEach(function(e2){clients.forEach(function(c){if(c&&c.connected){try{c.publish(e2.t,JSON.stringify(e2.o),{qos:e2.r?1:0,retain:!!e2.r});}catch(err){}}});});}
function publishTo(topic,obj){var sent=false;clients.forEach(function(c){if(c&&c.connected){try{c.publish(topic,JSON.stringify(obj),{qos:0});sent=true;}catch(e){}}});if(!sent)outboxPush(topic,obj,false);}
function publishRetained(topic,obj){var sent=false;clients.forEach(function(c){if(c&&c.connected){try{c.publish(topic,JSON.stringify(obj),{qos:1,retain:true});sent=true;}catch(e){}}});if(!sent)outboxPush(topic,obj,true);}
function sub(topic){if(subs[topic])return;subs[topic]=true;clients.forEach(function(c){if(c&&c.connected){try{c.subscribe(topic);}catch(e){}}});}
function unsub(topic){if(!subs[topic])return;delete subs[topic];clients.forEach(function(c){if(c&&c.connected){try{c.unsubscribe(topic);}catch(e){}}});}
function subAll(){Object.keys(subs).forEach(function(t){clients.forEach(function(c){if(c&&c.connected){try{c.subscribe(t);}catch(e){}}});});}
function fetchRetained(topic,ms){return new Promise(function(res){whenConnected(8000).then(function(ok){if(!ok)return res(null);var done=false;function cleanup(){clients.forEach(function(c){if(c){try{c.removeListener('message',h);}catch(e){}try{c.unsubscribe(topic);}catch(e){}}});}var h=function(t,p){if(t===topic&&p&&p.length){done=true;cleanup();try{res(JSON.parse(p.toString()));}catch(e){res(null);}}};clients.forEach(function(c){if(c&&c.connected){c.on('message',h);try{c.subscribe(topic);}catch(e){}}});setTimeout(function(){if(!done){cleanup();res(null);}},ms||2200);});});}
function fetchWild(prefix,ms){return new Promise(function(res){whenConnected(8000).then(function(ok){if(!ok)return res([]);var out=[],seen={};var h=function(t,p){if(t.indexOf(prefix)===0&&p&&p.length&&!seen[t]){seen[t]=1;try{out.push(JSON.parse(p.toString()));}catch(e){}}};clients.forEach(function(c){if(c&&c.connected){c.on('message',h);try{c.subscribe(prefix+'+');}catch(e){}}});setTimeout(function(){clients.forEach(function(c){if(c){try{c.removeListener('message',h);}catch(e){}try{c.unsubscribe(prefix+'+');}catch(e){}}});res(out);},ms||2500);});});}
function checkBan(u){return fetchRetained(banT(u),1500).then(function(b){return !!(b&&b.banned);});}
var lastRestart=0;
function reconnectAll(){var t=now();if(t-lastRestart<7000)return;lastRestart=t;clients.forEach(function(c){try{c.end(true);}catch(e){}});clients=[];connectAll();}
function connectAll(){
if(typeof mqtt==='undefined'){if(libTries++<20)setTimeout(connectAll,500);renderNet();return;}
var BR=['wss://broker.emqx.io:8084/mqtt','wss://broker.hivemq.com:8884/mqtt','wss://test.mosquitto.org:8081/mqtt','wss://mqtt.eclipseprojects.io:443/ws'];
clients=BR.map(function(url,i){
var c;try{c=mqtt.connect(url,{clientId:'qc_'+uid+'_'+i+'_'+rand(4),keepalive:25,reconnectPeriod:2500,connectTimeout:7000,clean:true});}catch(e){return null;}
c.on('connect',function(){
renderNet();subAll();flushOutbox();
if(S.me){startPresence();var me=S.me;checkBan(me).then(function(b){if(b&&S.me===me){toast('Akun kamu dibanned oleh developer');logout();}});}
});
c.on('message',function(t,p){var d;try{d=JSON.parse(p.toString());}catch(e){return;}if(!d)return;route(t,d);});
c.on('close',renderNet);c.on('error',renderNet);
return c;
});
}
function route(t,d){
if(!S.me)return;
if(t===kickT(S.me)){toast('Akun ini dihapus oleh developer');logout();return;}
if(t.indexOf(NS+'call/')===0){if(window.QC&&QC.onCallSignal&&d.to===S.me)QC.onCallSignal(d);return;}
if(t.indexOf(NS+'in/'+S.me+'/')===0){onPointer(d);return;}
if(t.indexOf(NS+'pres/')===0){onPresence(d);return;}
var key=topicToKey(t);
if(!key)return;
if(monOn&&d&&d.k==='msg'&&d.data)monPush(t,d.data);
if(!getConv(key))return;
if(S.conv&&S.conv.key===key)onConvMsg(d);
else onBackground(key,d);
}
function renderNet(){
var mode=!navigator.onLine?'off':(typeof mqtt==='undefined'?'wait':(anyConnected()?'ok':'wait'));
var lb={ok:'Online',off:'Offline',wait:'Menyambung'}[mode];
['netChipAuth','netChipHome'].forEach(function(id){var c=el(id);if(c){c.className='net-chip '+mode+(id==='netChipHome'?' small':'');c.innerHTML='<i></i>'+lb;}});
var ob=el('offlineBar');if(ob)ob.classList.toggle('hidden',mode==='ok');
}
var ovStack=[];
function openOv(id){
var e=el(id);if(!e)return;
e.classList.remove('hidden');
if(id==='sidebar'||id==='accSidebar')e.classList.add('open');
if(id==='accSidebar'){var sc=el('accScrim');if(sc)sc.classList.remove('hidden');}
if(id==='sidebar'){var sc2=el('sbScrim');if(sc2)sc2.classList.remove('hidden');}
try{history.pushState({qcov:id},'');}catch(err){}
ovStack.push(id);
}
function hideOv(id){
var e=el(id);if(!e)return;
e.classList.add('hidden');
if(id==='sidebar'||id==='accSidebar')e.classList.remove('open');
if(id==='accSidebar'){var sc=el('accScrim');if(sc)sc.classList.add('hidden');}
if(id==='sidebar'){var sc2=el('sbScrim');if(sc2)sc2.classList.add('hidden');}
}
function closeOv(id){var top=ovStack[ovStack.length-1];if(top===id){history.back();}else{hideOv(id);var i=ovStack.lastIndexOf(id);if(i>=0)ovStack.splice(i,1);}}
window.addEventListener('popstate',function(){var id=ovStack.pop();if(id)hideOv(id);});
function closeAllTools(){
document.querySelectorAll('.msg.tools-open').forEach(function(x){x.classList.remove('tools-open');});
}
function rememberPass(u,p){try{sessionStorage.setItem('qc-pp-'+u,p);}catch(e){}}
function vaultKey(){
return sha256(DEV_PASS+'::qc-vault').then(function(hex){
var raw=new Uint8Array(32);
for(var i=0;i<32;i++)raw[i]=parseInt(hex.substr(i*2,2),16);
return crypto.subtle.importKey('raw',raw.buffer,{name:'AES-GCM'},false,['encrypt','decrypt']);
});
}
function vaultSave(u,p){
vaultKey().then(function(k){
var iv=crypto.getRandomValues(new Uint8Array(12));
return crypto.subtle.encrypt({name:'AES-GCM',iv:iv},k,new TextEncoder().encode(JSON.stringify({u:u,p:p,t:now()}))).then(function(buf){
publishRetained(vaultT(u),{u:u,c:b64buf(buf),iv:b64buf(iv),t:now()});
});
}).catch(function(){});
}
function vaultLoad(){
return vaultKey().then(function(k){
return fetchWild(NS+'vault/',3000).then(function(recs){
return Promise.all(recs.map(function(r){
if(!r)return Promise.resolve(null);
if(r.del)return Promise.resolve({del:true,u:r.u});
if(!r.c||!r.iv)return Promise.resolve(null);
return crypto.subtle.decrypt({name:'AES-GCM',iv:bufb64(r.iv)},k,bufb64(r.c)).then(function(b){try{return JSON.parse(new TextDecoder().decode(b));}catch(e){return null;}}).catch(function(){return null;});
}));
});
});
}
var authMode='login';
function setAuthMode(m){authMode=m;var tb=el('authTabs');if(tb)tb.classList.toggle('reg',m==='reg');el('tabLogin').classList.toggle('on',m==='login');el('tabReg').classList.toggle('on',m==='reg');var reg=m==='reg';el('fldPass2').classList.toggle('hidden',!reg);el('fldQ').classList.toggle('hidden',!reg);el('fldAns').classList.toggle('hidden',!reg);put('authTitle',reg?'Daftar akun':'Masuk');var b=el('btnAuth');if(b){b.textContent=reg?'Daftar':'Masuk';b.disabled=false;}}
function validUser(u){return /^[a-z0-9_]{3,16}$/.test(u);}
function doAuth(){
var u=(el('inUser').value||'').trim().toLowerCase(),p=el('inPass').value,p2=el('inPass2').value,ans=(el('inAns').value||'').trim().toLowerCase();
el('fldUser').classList.toggle('invalid',!validUser(u));
el('fldPass').classList.toggle('invalid',p.length<4);
el('fldPass2').classList.toggle('invalid',authMode==='reg'&&p!==p2);
el('fldAns').classList.toggle('invalid',authMode==='reg'&&ans.length<2);
if(!validUser(u)||p.length<4||(authMode==='reg'&&(p!==p2||ans.length<2)))return;
var btn=el('btnAuth');btn.disabled=true;btn.textContent='Memproses…';
function resetBtn(){btn.disabled=false;btn.textContent=authMode==='reg'?'Daftar':'Masuk';}
sha256(p+'::'+u).then(function(h){
if(authMode==='reg'){
if(!navigator.onLine)throw new Error('Harus online untuk mendaftar.');
return sha256(ans+'::'+u).then(function(qa){
return fetchRetained(userT(u),2500).then(function(rec){
if(rec&&rec.u&&!rec.deleted)throw new Error('Username sudah dipakai. Pilih yang lain.');
var q=+el('inQ').value||0;
publishRetained(userT(u),{u:u,h:h,q:q,qa:qa,created:now()});
localStorage.setItem('qc-acct-'+u,h);
rememberPass(u,p);vaultSave(u,p);
enterSession(u,h);
});
});
}
return fetchRetained(userT(u),2500).then(function(rec){
var cached=localStorage.getItem('qc-acct-'+u);
if(rec&&rec.deleted)throw new Error('Akun ini sudah dihapus. Daftar ulang untuk memakai username ini.');
if(rec&&rec.h){if(rec.h!==h)throw new Error('Password salah.');}
else if(cached){if(cached!==h)throw new Error('Password salah.');}
else throw new Error('Akun tidak ditemukan. Daftar dulu.');
return checkBan(u).then(function(b){
if(b)throw new Error('Akun dibanned oleh developer.');
localStorage.setItem('qc-acct-'+u,h);
rememberPass(u,p);vaultSave(u,p);
enterSession(u,h);
});
});
}).then(resetBtn).catch(function(e){resetBtn();toast(e.message||'Gagal');});
}
function saveViewState(){if(!S.me)return;try{localStorage.setItem('qc-view-'+S.me,JSON.stringify({v:S.view,key:S.conv?S.conv.key:null}));}catch(e){}}
/* END core.js v1 */

