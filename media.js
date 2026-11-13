/* media.js v4.1 — emoji kategori, gambar, suara, video call (picker tidak auto-close) */
(function(){
'use strict';
if(!window.QC)return;
var QC=window.QC,S=QC.S,icon=QC.icon,toast=QC.toast;
function gid(i){return document.getElementById(i);}
try{
var css=document.createElement('style');
css.textContent='.emoji-pop{display:flex;flex-direction:column;max-height:320px;overflow:hidden}'
+'.emoji-head{display:flex;gap:6px;margin-bottom:7px}'
+'.emoji-head .emoji-search{flex:1;margin-bottom:0;border:1px solid var(--line);border-radius:10px;background:rgba(148,170,220,.06);padding:7px 11px;color:var(--text);font-size:13px}'
+'.emoji-close{width:36px;height:36px;flex:none;border:1px solid var(--line);border-radius:10px;background:var(--glass);color:var(--muted);cursor:pointer;display:grid;place-items:center}'
+'.emoji-cats{display:flex;gap:2px;margin-bottom:5px;padding-bottom:5px;border-bottom:1px solid var(--line);overflow-x:auto}'
+'.emoji-cats button{flex:none;padding:4px 8px;border:1px solid transparent;border-radius:8px;background:none;font-size:15px;cursor:pointer;opacity:.5}'
+'.emoji-cats button.on{opacity:1;border-color:rgba(200,240,75,.3);background:rgba(200,240,75,.1)}'
+'.emoji-grid{flex:1;min-height:150px;max-height:190px;overflow-y:auto;display:grid;grid-template-columns:repeat(8,1fr);gap:2px}'
+'.emoji-grid button{height:32px;border:0;border-radius:8px;background:none;font-size:19px;cursor:pointer}'
+'.attach-menu{position:absolute;bottom:calc(100% + 8px);left:0;z-index:28;display:none;flex-direction:column;gap:4px;min-width:170px;border:1px solid var(--line);border-radius:14px;background:rgba(11,17,32,.98);padding:6px}'
+'.attach-menu.on{display:flex}.attach-menu button{display:flex;align-items:center;gap:9px;padding:9px 11px;border:0;border-radius:10px;background:none;color:var(--text);font-size:13px;cursor:pointer;text-align:left}.attach-menu button svg{width:17px;height:17px;color:var(--cyan)}'
+'.media-modalx{position:fixed;inset:0;z-index:250;display:grid;place-items:center;background:rgba(0,0,0,.94);padding:20px}'
+'.call-modal{position:fixed;inset:0;z-index:300;background:#000;display:flex;flex-direction:column}.call-remote{flex:1;position:relative;background:#0a0a0a;display:grid;place-items:center;overflow:hidden}.call-remote video{width:100%;height:100%;object-fit:cover}'
+'.call-placeholder{display:flex;flex-direction:column;align-items:center;gap:12px;color:var(--muted)}.call-placeholder .big-av{width:100px;height:100px;border-radius:30px;display:grid;place-items:center;font-size:52px;overflow:hidden}'
+'.big-av img,.ic-av img{width:100%;height:100%;object-fit:cover;display:block}'
+'.call-local{position:absolute;bottom:16px;right:16px;width:100px;height:150px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,.2);background:#111}.call-local video{width:100%;height:100%;object-fit:cover}'
+'.call-info{position:absolute;top:16px;left:16px;color:#fff;font:600 14px var(--body)}.call-info small{display:block;color:rgba(255,255,255,.8);font-size:12px}'
+'.call-controls{display:flex;justify-content:center;align-items:center;gap:14px;padding:16px;background:rgba(0,0,0,.6)}.call-controls button{width:54px;height:54px;border-radius:50%;border:0;color:#fff;cursor:pointer;display:grid;place-items:center}.call-controls button svg{width:21px;height:21px}'
+'.ctrl-mute,.ctrl-video{background:rgba(255,255,255,.15)}.ctrl-mute.on,.ctrl-video.off{background:var(--red)}.ctrl-end{background:var(--red);width:64px;height:64px}'
+'.call-status{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font:700 17px var(--body);text-align:center}'
+'.incoming-call{position:fixed;top:16px;right:16px;z-index:350;min-width:260px;border:1px solid var(--line);border-radius:18px;background:rgba(11,17,32,.98);padding:12px}.ic-top{display:flex;align-items:center;gap:10px;margin-bottom:9px}.ic-av{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;font-size:20px;overflow:hidden}.ic-name{flex:1;font-weight:700;font-size:13.5px}.ic-name small{display:block;font-weight:500;font-size:10.5px;color:var(--cyan)}.ic-actions{display:flex;gap:8px;justify-content:flex-end}.ic-actions button{width:40px;height:40px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;color:#fff}.ic-actions button svg{width:17px;height:17px}.ic-accept{background:var(--green)}.ic-decline{background:var(--red)}';
document.head.appendChild(css);
document.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='AUDIO'){toast('Audio tidak didukung browser ini','🔇');}},true);

var CATS=[
{k:'Smileys',i:'😀',l:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','','😍','😘','😜','🤪','😎','🥳','','🥺','😭','😴','🤔','🤫','🤯','😱','😨','😰','😥','😢','😣','😩','😫','🥱','','😡','😠','🤬','','👿','💀','💩','🤡','','👺','','👽','','🤖']},
{k:'Gestur',i:'👋',l:['👋','🤚','','✋','🖖','👌','','🤏','️','🤞','','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','','🤜','','🙌','','👐','','🤝','','✍️','','🤳','','🦾','','🦶','','🦻','','🧠','','🫁','🦷','🦴','👀','','👅','👄']},
{k:'Hewan',i:'🐶',l:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','','🐵','','🙉','','🐒','','🐧','','🐤','','🐥','','🦅','','🦇','','🐗','','🦄','','🐛','','🐌','🐞','🐜','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🐈','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿','🦔']},
{k:'Makanan',i:'🍎',l:['🍏','','🍐','','🍋','','🍉','','🍓','','🍈','','🍑','','🍍','','🥝','🍅','','🥑','','🥬','','🌶','','🌽','','🫒','🧄','','🥔','','🥐','','🍞','','🧀','','🍳','','🥞','','🥓','🥩','','🍖','','🍟','','🫓','','🥙','','🌮','','🥗','','🍝','','🍲','','🍣','','🥟','','🍤','','🍚','','🍥','','🥮','','🍡','','🍨','','🥧','','🍰','','🍮','','🍬','','🍿','','🍪','','🥜','','🥛','🍼','🫖','','🍵','','🥤','','🍶','','🍻','','🍷','','🍸','','🧉','','🧊','','🍴','','🥣','','🥢','']},
{k:'Aktivitas',i:'⚽',l:['⚽','','🏈','','','🎾','','🏉','','🎱','','🏓','','🏒','','🥍','','🪃','','⛳','','🏹','🎣','🤿','','🥋','','🛹','','🛷','⛸','🥌','','⛷','🏂','🪂','🏋️','🤼','','🤺','','🧘','','🏊','','🚣','','🚵','','🏆','','🥈','','🏅','','🏵','','🎫','','🎪','','🎭','','🎨','','🎤','','🎼','','🥁','🪘','','🎺','','🎸','','🎻','','♟','','🎳','','🎰','🧩']},
{k:'Travel',i:'🚗',l:['🚗','','🚙','🚌','🚎','','🚓','','🚒','','🛻','','🚛','🚜','🏍','','🚲','','🛺','','🚍','','🚖','✈️','🛫','🛬','','💺','🛰','🚀','','🚁','🛶','⛵','','🛥','🛳','⛴','🚢','⚓','','⛽','🚧','🚥','🚦','🗺','🗿','🗽','🗼','🏰','🏯','🏟','🎡','🎢','🎠','⛲','','🏖','🏝','','🌋','⛰','🏔','🗻','🏕','⛺','🛖','🏠','🏡','🏘','🏚','🏗','🏭','🏢','🏬','🏣','🏤','🏥','🏦','🏨','🏪','🏫','🏩','💒','🏛','⛪','🕌','🕍','🛕','🕋','⛩','🛤','🛣','','🎑','🏞','','🌄','','🎇','','🌇','','🏙','','🌌','','🌁']},
{k:'Objek',i:'⌚',l:['⌚','','💻','⌨️','🖥','','🖱','🖲','','🗜','💽','💾','💿','📀','','','📸','','🎥','','🎞','📞','☎️','📟','','📺','','🎙','','🎛','','⏱','⏲','⏰','','⌛','⏳','📡','','🔌','💡','🔦','🕯','🪔','🧯','🛢','💸','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','','🔧','','⚒','','⛏','','🔩','️','','🧱','','🧲','🔫','💣','🧨','','🔪','','⚔️','','🚬','⚰️','🪦','⚱️','🏺','🔮','📿','🧿','💈','⚗️','🔭','','🕳','','🩺','💊','💉','🩸','🧬','🦠','🧫','🧪','🌡','🧹','🪠','','🧻','','🚰','','🛁','','🧼','','🪒','🧽','','🧴','','🔑','','🚪','','🛋','🛏','🛌','🧸','🪆','🖼','🪞','🪟','🛍','🛒','🎁','🎈','🎏','🎀','🪄','🪅','🎊','🎉','🎎','🏮','','🧧','✉️','📩','📨','📧','💌','📥','📤','📦','🏷','🪧','📪','','📬','','📮','','📜','','📄','','🧾','','📈','','🗒','','📆','','🗑','','🗃','','🗄','','📁','','🗂','','📰','','📔','📒','📕','','📘','','📚','','🔖','','🔗','','🖇','','📏','','📌','','✂️','🖊','','✒️','🖌','','📝','️','🔍','','🔏','🔐','🔒','🔓']},
{k:'Simbol',i:'❤️',l:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','✨','⭐','🌟','','⚡','🔥','💢','💥','💦','🎵','🎶','✅','❌','','⛔','🚫','❗','❕','❓','❔','‼️','⁉️','🔔','','📣','','💬','💭','💤','🌐','♻️','🆗','🆒','🆕','','🆓','🆖','','0️','1️','2️','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','','▶️','⏸','','⏺','⏭','','⏩','⏪','🔼','','➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','🔄','🔁','','🔀','','➖','➗','✖️','♾','💲','💱','™️','©️','®️','〰️','➰','➿','🔚','','🔛','','🔜','✔️','☑️','🔘','','🟠','','🟢','','🟣','⚫','⚪','','🔺','','🔸','','🔶','🔷','🔳','🔲','▪️','▫️','◾','◽','◼️','◻️','🟥','','🟨','','🟦','','⬛','','🟫']},
{k:'Bendera',i:'🏁',l:['🏁','','🎌','','🏳','️‍🌈','🏴‍☠️','🇮🇩','🇾','🇸🇬','🇳','🇹🇱','🇯🇵','🇰🇷','🇨🇳','🇹🇼','🇭🇰','🇮🇳','🇭','🇻🇳','🇭','🇦🇺','🇳🇿','🇺🇸','🇨🇦','🇲🇽','🇧🇷','🇷','🇨🇱','🇨🇴','🇵🇪','🇬🇧','🇫🇷','🇪','🇮🇹','🇪🇸','🇵🇹','🇳🇱','🇧🇪','🇭','🇦🇹','🇸🇪','🇳🇴','🇩','🇮','🇮🇪','🇵🇱','🇷🇺','🇷','🇬🇷','🇪🇬','🇦','🇬','🇪','🇦','🇦','🇦🇪','🇮🇷','🇱','🇵🇰','🇧','🇶🇦','🇼','🇺🇦','🇰']}
];
var cat=0;
function buildEmojiUI(){
  var pop=gid('emojiPop');if(!pop)return;
  pop.innerHTML='<div class="emoji-head"><input id="emojiSearch" class="emoji-search" placeholder="Cari emoji…" autocomplete="off"><button id="emojiClose" class="emoji-close" type="button">'+icon('x',14)+'</button></div><div id="emojiCats" class="emoji-cats"></div><div id="emojiGrid" class="emoji-grid"></div>';
  gid('emojiClose').onclick=function(e){e.stopPropagation();pop.classList.add('hidden');};
  function buildCats(){var c=gid('emojiCats');c.innerHTML='';CATS.forEach(function(k,i){var b=document.createElement('button');b.type='button';b.textContent=k.i;b.title=k.k;if(i===cat)b.classList.add('on');b.onclick=function(ev){ev.stopPropagation();cat=i;buildCats();grid('');};c.appendChild(b);});}
  function grid(f){var g=gid('emojiGrid');g.innerHTML='';function add(em){if(!em)return;var b=document.createElement('button');b.type='button';b.textContent=em;b.onclick=function(ev){ev.stopPropagation();ev.preventDefault();QC.insertEmoji(em);};g.appendChild(b);}if(f){var q=f.toLowerCase();CATS.forEach(function(k){if(k.k.toLowerCase().indexOf(q)>=0)k.l.forEach(add);else k.l.forEach(function(em){if(em.indexOf(q)>=0)add(em);});});}else{CATS[cat].l.forEach(add);}}
  buildCats();grid('');
  gid('emojiSearch').addEventListener('input',function(e){grid(e.target.value.trim());});
  gid('emojiSearch').addEventListener('click',function(e){e.stopPropagation();});
}
buildEmojiUI();

var composer=gid('composer');
var menu=document.createElement('div');menu.className='attach-menu';
menu.innerHTML='<button type="button" data-a="img">'+icon('image')+' Pilih gambar</button><button type="button" data-a="cam">'+icon('camera')+' Buka kamera</button>';
composer.appendChild(menu);
var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.hidden=true;composer.appendChild(fi);
var ci=document.createElement('input');ci.type='file';ci.accept='image/*';ci.setAttribute('capture','environment');ci.hidden=true;composer.appendChild(ci);
gid('btnAttach').onclick=function(e){e.stopPropagation();menu.classList.toggle('on');gid('emojiPop').classList.add('hidden');};
document.addEventListener('click',function(e){if(!e.target.closest('.attach-menu')&&!e.target.closest('#btnAttach'))menu.classList.remove('on');});
menu.querySelector('[data-a="img"]').onclick=function(){fi.click();menu.classList.remove('on');};
menu.querySelector('[data-a="cam"]').onclick=function(){ci.click();menu.classList.remove('on');};
fi.onchange=function(){if(fi.files[0])handleImg(fi.files[0]);};
ci.onchange=function(){if(ci.files[0])handleImg(ci.files[0]);};
function compress(file){return new Promise(function(res,rej){var r=new FileReader();r.onload=function(ev){var im=new Image();im.onload=function(){var w=im.width,h=im.height,mx=1280;if(w>mx||h>mx){var s=Math.min(mx/w,mx/h);w=Math.round(w*s);h=Math.round(h*s);}var cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(im,0,0,w,h);res(cv.toDataURL('image/jpeg',0.72));};im.onerror=rej;im.src=ev.target.result;};r.onerror=rej;r.readAsDataURL(file);});}
function handleImg(f){
  if(!f.type||f.type.indexOf('image/')!==0){toast('Pilih file gambar','🖼');return;}
  if(f.size>12*1024*1024){toast('Maksimal 12MB','📦');return;}
  compress(f).then(function(d){S.pendingImage=d;gid('cpImg').src=d;gid('composePreview').classList.add('on');QC.updateSendBtn();}).catch(function(){toast('Gagal memproses gambar','❌');});
}

var mr=null,chunks=[],t0=0,tmr=null;
function pickMime(){var list=['audio/mp4;codecs=mp4a.40.2','audio/mp4','audio/aac','audio/webm;codecs=opus','audio/webm'];for(var i=0;i<list.length;i++){try{if(MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(list[i]))return list[i];}catch(e){}}return '';}
function startRec(){
  if(typeof MediaRecorder==='undefined'){toast('Browser tidak mendukung rekaman','🎙');return;}
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}}).then(function(st){
    chunks=[];t0=Date.now();var mime=pickMime();
    mr=new MediaRecorder(st,mime?{mimeType:mime}:undefined);
    mr.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data);};
    mr.onstop=function(){st.getTracks().forEach(function(t){t.stop();});var dur=Math.round((Date.now()-t0)/1000);if(dur<1){toast('Rekaman terlalu pendek','🎙');return;}var rd=new FileReader();rd.onload=function(){QC.writeMsg({type:'audio',audio:rd.result,dur:dur,mime:(mr.mimeType||'audio/mp4').split(';')[0]});QC.Sound.play('send');};rd.readAsDataURL(new Blob(chunks,{type:mr.mimeType||'audio/mp4'}));};
    mr.start(250);
    composer.classList.add('recording');gid('btnMic').classList.add('recording');gid('recIndicator').classList.add('on');gid('input').style.display='none';
    tmr=setInterval(function(){var s=Math.floor((Date.now()-t0)/1000);gid('recTime').textContent=Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);},250);
  }).catch(function(){toast('Izinkan akses mikrofon','🎙');});
}
function stopRec(){if(!mr||mr.state!=='recording')return;clearInterval(tmr);mr.stop();composer.classList.remove('recording');gid('btnMic').classList.remove('recording');gid('recIndicator').classList.remove('on');gid('input').style.display='';}
gid('btnMic').onclick=function(){if(mr&&mr.state==='recording')stopRec();else startRec();};

document.body.insertAdjacentHTML('beforeend',
'<div id="callModal" class="call-modal hidden"><div class="call-remote"><video id="remoteVideo" autoplay playsinline></video><div id="callPlaceholder" class="call-placeholder"><div id="callBigAv" class="big-av">🦊</div><div id="callBigName">—</div></div><div id="callStatus" class="call-status" style="display:none">Memanggil…</div><div class="call-info"><span id="callName">—</span><small id="callTimer">00:00</small></div><div class="call-local"><video id="localVideo" autoplay playsinline muted></video></div></div><div class="call-controls"><button id="ctrlMute" class="ctrl-mute" type="button">'+icon('mic')+'</button><button id="ctrlVideo" class="ctrl-video" type="button">'+icon('video')+'</button><button id="ctrlEnd" class="ctrl-end" type="button">'+icon('phoneOff')+'</button></div></div>'+
'<div id="incomingCall" class="incoming-call hidden"><div class="ic-top"><div id="icAv" class="ic-av">🦊</div><div class="ic-name"><div id="icName">—</div><small>📞 Panggilan video masuk…</small></div></div><div class="ic-actions"><button id="icDecline" class="ic-decline" type="button">'+icon('phoneOff')+'</button><button id="icAccept" class="ic-accept" type="button">'+icon('phone')+'</button></div></div>');
var pc=null,ls=null,active=false,answered=false,partner=null,incoming=null,ctmr=null,sec=0;
var ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]};
function initialsOf(n){var p=String(n).trim().split(/\s+/).slice(0,2),o='';for(var i=0;i<p.length;i++)o+=p[i].charAt(0).toUpperCase();return o||'?';}
function setAv(node,p){if(!node)return;if(p&&p.img){node.innerHTML='<img src="'+p.img+'" alt="">';node.style.background='';}else{node.textContent=(p&&p.avatar)||initialsOf((p&&p.user)||'?');node.style.background='linear-gradient(145deg,rgba(255,255,255,.3),rgba(0,0,0,.12)),'+QC.COLORS[((p&&p.color)||0)%QC.COLORS.length];}}
function csend(o){if(!partner)return;var k=QC.callKey&&QC.callKey();QC.publishTo(QC.callTopic(k||('dm:'+partner)),Object.assign({},o,{from:QC.me,to:partner}));}
function openUI(name,ans){gid('callModal').classList.remove('hidden');setAv(gid('callBigAv'),QC.profileOf(name));gid('callBigName').textContent=name;gid('callName').textContent=name;gid('callPlaceholder').style.display='';gid('callStatus').style.display=ans?'none':'';}
function timer(){answered=true;sec=0;clearInterval(ctmr);var s=gid('callStatus');if(s)s.style.display='none';ctmr=setInterval(function(){sec++;gid('callTimer').textContent=('0'+Math.floor(sec/60)).slice(-2)+':'+('0'+(sec%60)).slice(-2);},1000);}
function getMedia(){return navigator.mediaDevices.getUserMedia({video:true,audio:{echoCancellation:true,noiseSuppression:true}}).catch(function(){return navigator.mediaDevices.getUserMedia({audio:true});});}
function wirePC(){pc=new RTCPeerConnection(ICE);ls.getTracks().forEach(function(t){pc.addTrack(t,ls);});pc.ontrack=function(e){gid('remoteVideo').srcObject=e.streams[0];gid('callPlaceholder').style.display='none';var s=gid('callStatus');if(s)s.style.display='none';if(!answered)timer();};pc.onicecandidate=function(e){if(e.candidate)csend({type:'ice',cand:e.candidate});};pc.onconnectionstatechange=function(){if(pc&&/disconnected|failed|closed/.test(pc.connectionState))endCall(true);};}
function startCall(u){if(active){toast('Sedang dalam panggilan','📞');return;}partner=u;answered=false;getMedia().then(function(st){ls=st;gid('localVideo').srcObject=st;openUI(u,false);wirePC();return pc.createOffer().then(function(of){return pc.setLocalDescription(of).then(function(){csend({type:'offer',sdp:of});active=true;setTimeout(function(){if(!answered&&active){endCall(true);toast('Tidak ada jawaban','📞');}},30000);});});}).catch(function(){endCall(true);toast('Izinkan kamera & mic','🎥');});}
function accept(){if(!incoming)return;var of=incoming.offer,from=incoming.from;partner=from;incoming=null;answered=false;gid('incomingCall').classList.add('hidden');getMedia().then(function(st){ls=st;gid('localVideo').srcObject=st;openUI(from,true);wirePC();return pc.setRemoteDescription(of).then(function(){return pc.createAnswer();}).then(function(an){return pc.setLocalDescription(an).then(function(){csend({type:'answer',sdp:an});active=true;timer();});});}).catch(function(){endCall(true);toast('Izinkan kamera & mic','🎥');});}
function decline(){if(incoming){csend({type:'decline'});incoming=null;}gid('incomingCall').classList.add('hidden');}
function endCall(silent){clearInterval(ctmr);if(pc){try{pc.close();}catch(e){}pc=null;}if(ls){ls.getTracks().forEach(function(t){t.stop();});ls=null;}if(partner&&!silent)csend({type:'end'});active=false;answered=false;partner=null;gid('callModal').classList.add('hidden');gid('remoteVideo').srcObject=null;gid('localVideo').srcObject=null;}
QC.onCallSignal=function(d){
  if(!d||d.from===QC.me||d.to!==QC.me)return;
  if(d.type==='offer'){if(active){csend({type:'busy'});return;}incoming={from:d.from,offer:d.sdp};setAv(gid('icAv'),QC.profileOf(d.from));gid('icName').textContent=d.from;gid('incomingCall').classList.remove('hidden');QC.Sound.play('call');setTimeout(function(){if(incoming)decline();},30000);}
  else if(d.type==='answer'&&pc){pc.setRemoteDescription(d.sdp).then(timer).catch(function(){});}
  else if(d.type==='ice'&&pc){pc.addIceCandidate(d.cand).catch(function(){});}
  else if(d.type==='decline'||d.type==='busy'||d.type==='end'){endCall(true);}
};
QC.startCall=startCall;QC.endCall=endCall;
gid('icAccept').onclick=accept;
gid('icDecline').onclick=decline;
gid('ctrlMute').onclick=function(){if(!ls)return;var a=ls.getAudioTracks()[0];if(!a)return;a.enabled=!a.enabled;this.classList.toggle('on',!a.enabled);};
gid('ctrlVideo').onclick=function(){if(!ls)return;var v=ls.getVideoTracks()[0];if(!v)return;v.enabled=!v.enabled;this.classList.toggle('off',!v.enabled);};
gid('ctrlEnd').onclick=function(){endCall(false);};
window.QC_MEDIA=true;
}catch(e){try{QC.toast('Modul media gagal: '+e.message,'⚠️');}catch(x){}if(window.console)console.error(e);}
})();
/* END media.js v4.1 */
