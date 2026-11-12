/* media.js — modul media QuickChat (emoji kategori, gambar, suara, video call) */
(function(){
'use strict';
if(!window.QC)return;
var QC=window.QC,S=QC.S,icon=QC.icon,toast=QC.toast;
var css=document.createElement('style');
css.textContent='.emoji-pop{display:flex;flex-direction:column;max-height:340px;width:min(360px,calc(100vw - 44px));overflow:hidden}'+
'.emoji-search{width:100%;margin-bottom:8px;border:1px solid var(--line);border-radius:10px;background:rgba(148,170,220,.06);padding:8px 12px;color:var(--text);font-size:13px}'+
'.emoji-cats{display:flex;gap:2px;margin-bottom:6px;padding-bottom:6px;border-bottom:1px solid var(--line);overflow-x:auto}'+
'.emoji-cats button{flex:none;padding:5px 9px;border:1px solid transparent;border-radius:8px;background:none;font-size:16px;cursor:pointer;opacity:.5}'+
'.emoji-cats button.on{opacity:1;border-color:rgba(200,240,75,.3);background:rgba(200,240,75,.1)}'+
'.emoji-grid{flex:1;min-height:170px;max-height:210px;overflow-y:auto;display:grid;grid-template-columns:repeat(8,1fr);gap:2px}'+
'.emoji-grid button{height:34px;border:0;border-radius:8px;background:none;font-size:20px;cursor:pointer}'+
'.attach-menu{position:absolute;bottom:calc(100% + 10px);left:0;z-index:28;display:none;flex-direction:column;gap:4px;min-width:180px;border:1px solid var(--line);border-radius:14px;background:rgba(11,17,32,.98);padding:6px}'+
'.attach-menu.on{display:flex}.attach-menu button{display:flex;align-items:center;gap:10px;padding:10px 12px;border:0;border-radius:10px;background:none;color:var(--text);font-size:13.5px;cursor:pointer;text-align:left}.attach-menu button svg{width:18px;height:18px;color:var(--cyan)}'+
'.media-modal{position:fixed;inset:0;z-index:250;display:grid;place-items:center;background:rgba(0,0,0,.94);padding:20px}.media-modal img{max-width:92vw;max-height:92vh;border-radius:10px}.media-modal .mm-close{position:absolute;top:16px;right:16px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.5);color:#fff;cursor:pointer;display:grid;place-items:center}'+
'.call-modal{position:fixed;inset:0;z-index:300;background:#000;display:flex;flex-direction:column}.call-remote{flex:1;position:relative;background:#0a0a0a;display:grid;place-items:center;overflow:hidden}.call-remote video{width:100%;height:100%;object-fit:cover}'+
'.call-placeholder{display:flex;flex-direction:column;align-items:center;gap:14px;color:var(--muted)}.call-placeholder .big-av{width:110px;height:110px;border-radius:32px;display:grid;place-items:center;font-size:60px;color:#081018}'+
'.call-local{position:absolute;bottom:20px;right:20px;width:110px;height:160px;border-radius:14px;overflow:hidden;border:2px solid rgba(255,255,255,.2);background:#111}.call-local video{width:100%;height:100%;object-fit:cover}'+
'.call-info{position:absolute;top:20px;left:20px;color:#fff;font:600 14px var(--body)}.call-info small{display:block;color:rgba(255,255,255,.8);font-size:12px}'+
'.call-controls{display:flex;justify-content:center;align-items:center;gap:14px;padding:18px;background:rgba(0,0,0,.6)}.call-controls button{width:56px;height:56px;border-radius:50%;border:0;color:#fff;cursor:pointer;display:grid;place-items:center}.call-controls button svg{width:22px;height:22px}'+
'.ctrl-mute,.ctrl-video{background:rgba(255,255,255,.15)}.ctrl-mute.on,.ctrl-video.off{background:var(--red)}.ctrl-end{background:var(--red);width:68px;height:68px}'+
'.call-status{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font:700 18px var(--body);text-align:center}.call-status small{display:block;font-size:12px;color:rgba(255,255,255,.7)}'+
'.incoming-call{position:fixed;top:20px;right:20px;z-index:350;min-width:280px;border:1px solid var(--line);border-radius:18px;background:rgba(11,17,32,.98);padding:14px}.ic-top{display:flex;align-items:center;gap:12px;margin-bottom:10px}.ic-av{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;color:#081018;font-size:22px}.ic-name{flex:1;font-weight:700;font-size:14px}.ic-name small{display:block;font-weight:500;font-size:11px;color:var(--cyan)}.ic-actions{display:flex;gap:8px;justify-content:flex-end}.ic-actions button{width:42px;height:42px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;color:#fff}.ic-actions button svg{width:18px;height:18px}.ic-accept{background:var(--green)}.ic-decline{background:var(--red)}';
document.head.appendChild(css);

/* ===== 1) Emoji berkategori + pencarian ===== */
var CATS=[
{k:'Smileys',i:'😀',l:'😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇  😍  😜 🤪 😎 🥳  🥹 😭 😅 🙃 😴 🤔 🤫 🤯 😱 😨 😰 😥  😣 😩 😫 🥱 😤 😡 😠 🤬 😈  💀 💩 🤡 👹 👺 👻 👽 👾 🤖'.split(' ')},
{k:'Gestur',i:'👋',l:'👋  🖐 ✋ 🖖 👌  🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 🫵 👍 👎 ✊ 👊 🤛 🤜 👏 🙌  👐  🙏 ✍️ 💅 🤳 💪  🦿 🦵 🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀 👁 👅 👄'.split(' ')},
{k:'Hewan',i:'🐶',l:'🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉  🐒  🐧  🐤  🐥  🦅  🦇 🐺 🐗 🐴 🦄 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰  🦟  🕷  🦂  🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🦬 🐃  🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🦮 🐈 🐈‍⬛ 🐇 🦝 🦨 🦡 🦫 🦦 🦥 🐁 🐀 🐿 🦔'.split(' ')},
{k:'Makanan',i:'🍎',l:'🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯  🥖  🧀  🍳  🥞  🥓  🍗  🦴  🍔  🍕  🥪  🧆  🌯  🥗  🫕  🍝  🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨  🥧  🍰  🍮  🍬 🍫 🍿 🍩 🍪  🥜  🥛 🍼 🫖 ☕  🧃  🧋  🍺  🥂  🥃  🍹  🍾  🥄  🍽  🥡  🧂'.split(' ')},
{k:'Aktivitas',i:'⚽',l:'⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥅 ⛳ 🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷 ⛸ 🥌 🎿  🏂  🏋️ 🤼 🤸 🤺 🏇 🧘 🏄 🏊 🤽 🚣 🧗 🚵 🚴 🏆 🥇 🥈 🥉 🏅 🎖 🏵 🎗 🎫 🎟 🎪 🤹 🎭 🩰 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🪘 🎷 🎺 🪗 🎸 🪕 🎻 🎲 ♟ 🎯 🎳 🎮 🎰 🧩'.split(' ')},
{k:'Travel',i:'🚗',l:'🚗 🚕 🚙 🚌  🏎  🚑  🚐  🚚  🚜  🛵  🛴  🚔  🚘  ✈️  🛬  💺 🛰  🛸  🛶  🚤  🛳 ⛴ 🚢  🪝  🚧  🚦 🗺 🗿 🗽 🗼 🏰 🏯 🏟 🎡 🎢 🎠  ⛱  🏝  🌋 ⛰ 🏔 🗻 🏕 ⛺ 🛖 🏠 🏡 🏘 🏚 🏗 🏭 🏢 🏬 🏣 🏤 🏥 🏦 🏨 🏪 🏫 🏩 💒 🏛 ⛪ 🕌 🕍 🛕 🕋 ⛩ 🛤 🛣 🗾 🎑 🏞 🌅 🌄 🌠 🎇 🎆 🌇 🌆 🏙 🌃 🌌  🌁'.split(' ')},
{k:'Objek',i:'',l:' 📱 💻 ⌨️ 🖥 🖨 🖱 🖲 🕹 🗜 💽 💾  📀  📷  📹  📽  📞 ☎️ 📟 📠 📺 📻 🎙 🎚 🎛 🧭 ⏱ ⏲ ⏰ 🕰 ⌛ ⏳ 📡 🔋 🔌 💡 🔦 🕯 🪔 🧯 🛢 💸 💵 💴 💶 💷 🪙 💰  💎 ️ 🪜 🧰 🪛 🔧 🔨 ⚒ 🛠 ⛏ 🪚 🔩 ⚙️  🧱  🧲  💣 🧨 🪓 🔪 🗡 ⚔️ 🛡 🚬 ⚰️ 🪦 ⚱️  🔮  🧿 💈 ⚗️  🔬  🩹 🩺 💊 💉 🩸 🧬 🦠 🧫 🧪  🧹  🧺  🚽  🚿  🛀  🪥  🧽  🧴  🔑 🗝 🚪 🪑 🛋 🛏 🛌 🧸 🪆 🖼 🪞 🪟 🛍 🛒 🎁 🎈 🎏 🎀 🪄 🪅 🎊 🎉 🎎 🏮 🎐 🧧 ️ 📩 📨  💌  📤  🏷  📪  📬 📭 📮 📯 📜 📃 📄 📑 🧾 📊 📈 📉 🗒 🗓 📆 📅 🗑 📇 🗃 🗳 🗄 📋 📁 📂 🗂 🗞 📰 📓 📔 📒 📕 📗 📘 📙 📚 📖 🔖  🔗  🖇  📏  📌  ✂️  🖋 ✒️ 🖌 🖍  ✏️ 🔍 🔎 🔏 🔐 🔒 🔓'.split(' ')},
{k:'Simbol',i:'❤️',l:'❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ✝️ ️ 🕉 ️ ✡️  🕎 ☯️ ☦️ 🛐 ⛎ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ 🆔 ⚛️ 🉑 ☢️ ☣️ 📴 📳 🈶 🈚 🈸 🈺 ️ ✴️ 🆚 💮  ㊙️ ㊗️  🈵  🈲 ️ 🅱️ 🆎 🆑 🅾️ 🆘 ❌ ⭕ 🛑 ⛔ 📛 🚫 💯 💢 ♨️ 🚷 🚯 🚳 🚱 🔞  🚭  ❕ ❓ ❔ ‼️ ⁉️ 🔅 🔆 〽️ ⚠️ 🚸 🔱 ⚜️ 🔰 ♻️ ✅ 🈯 💹 ️ ✳️  🌐 💠 Ⓜ️  💤 🏧 🚾 ♿ ️ 🛗 🈳 🈂️ 🛂 🛃 🛄  🚹  🚼  🚻  🎦  🈁  ℹ️  🔡 🔠 🆖 🆗 🆙 🆒 🆕 🆓 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔢 #️⃣ *️⃣ ⏏️ ▶️ ⏸ ⏯ ⏹ ⏺ ⏭ ⏮ ⏩ ⏪ ⏫ ⏬ ◀️  🔽 ➡️ ⬅️ ⬆️ ⬇️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ ↪️ ↩️ ⤴️ ⤵️ 🔀 🔁 🔂 🔄 🔃 🎵 🎶 ➕ ➖ ➗ ✖️ ♾ 💲 💱 ™️ ©️ ®️ 〰️ ➰ ➿  🔙 🔛 🔝 🔜 ✔️ ☑️  🔴  🟡  🔵 🟣 ⚫ ⚪ 🟤 🔺 🔻 🔸 🔹 🔶 🔷 🔳 🔲 ▪️ ▫️ ◾ ◽ ◼️ ◻️  🟧 🟨 🟩 🟦 🟪 ⬛ ⬜ 🟫 🔈 🔇 🔉 🔊 🔔 🔕 📣 📢 👁‍ 💬 💭 🗯 ♠️ ️ ♥️ ♦️ 🃏 🎴 🀄 🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚 🕛'.split(' ')},
{k:'Bendera',i:'🏁',l:'🏁  🎌  🏳 ️‍ 🏳️‍⚧️ ‍☠️ 🇮🇩 🇲🇾 🇸 🇧 🇹 🇯 🇰 🇨 🇹 🇭 🇮 🇹🇭 🇻🇳 🇵🇭 🇦🇺 🇳🇿 🇺🇸 🇨🇦 🇲🇽 🇧🇷 🇦🇷 🇨🇱 🇨🇴 🇵🇪 🇧 🇫🇷 🇩🇪 🇮🇹 🇪🇸 🇵🇹 🇳🇱 🇧🇪 🇨🇭 🇦🇹 🇸🇪 🇴 🇩🇰 🇫🇮 🇮🇪 🇵🇱 🇷🇺 🇹🇷 🇬🇷 🇪🇬 🇿🇦 🇳🇬 🇰🇪 🇲🇦 🇸🇦 🇦🇪 🇮🇷 🇮🇱 🇵🇰 🇧🇩'.split(' ')}
];
var cat=0;
var pop=document.getElementById('emojiPop');
if(pop){
  pop.innerHTML='<input id="emojiSearch" class="emoji-search" placeholder="Cari emoji…" autocomplete="off"><div id="emojiCats" class="emoji-cats"></div><div id="emojiGrid" class="emoji-grid"></div>';
  var buildCats=function(){var c=document.getElementById('emojiCats');c.innerHTML='';CATS.forEach(function(k,i){var b=document.createElement('button');b.type='button';b.textContent=k.i;b.title=k.k;if(i===cat)b.classList.add('on');b.onclick=function(){cat=i;buildCats();grid('');};c.appendChild(b);});};
  var grid=function(f){var g=document.getElementById('emojiGrid');g.innerHTML='';var add=function(em){var b=document.createElement('button');b.type='button';b.textContent=em;b.onclick=function(){QC.insertEmoji(em);};g.appendChild(b);};if(f){CATS.forEach(function(k){k.l.forEach(add);});}else{CATS[cat].l.forEach(add);}};
  buildCats();grid('');
  document.getElementById('emojiSearch').addEventListener('input',function(e){grid(e.target.value.trim());});
}

/* ===== 2) Lampiran gambar ===== */
var composer=document.getElementById('composer');
var menu=document.createElement('div');menu.className='attach-menu';
menu.innerHTML='<button type="button" data-a="img">'+icon('image')+' Pilih gambar</button><button type="button" data-a="cam">'+icon('camera')+' Buka kamera</button>';
composer.appendChild(menu);
var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.hidden=true;composer.appendChild(fi);
var ci=document.createElement('input');ci.type='file';ci.accept='image/*';ci.setAttribute('capture','environment');ci.hidden=true;composer.appendChild(ci);
document.getElementById('btnAttach').onclick=function(e){e.stopPropagation();menu.classList.toggle('on');document.getElementById('emojiPop').classList.add('hidden');};
document.addEventListener('click',function(e){if(!e.target.closest('.attach-menu')&&!e.target.closest('#btnAttach'))menu.classList.remove('on');});
menu.querySelector('[data-a="img"]').onclick=function(){fi.click();menu.classList.remove('on');};
menu.querySelector('[data-a="cam"]').onclick=function(){ci.click();menu.classList.remove('on');};
fi.onchange=function(){if(fi.files[0])handleImg(fi.files[0]);};
ci.onchange=function(){if(ci.files[0])handleImg(ci.files[0]);};
function compress(file){return new Promise(function(res,rej){var r=new FileReader();r.onload=function(ev){var im=new Image();im.onload=function(){var w=im.width,h=im.height,mx=1280;if(w>mx||h>mx){var s=Math.min(mx/w,mx/h);w=Math.round(w*s);h=Math.round(h*s);}var cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(im,0,0,w,h);res(cv.toDataURL('image/jpeg',0.72));};im.onerror=rej;im.src=ev.target.result;};r.onerror=rej;r.readAsDataURL(file);});}
function handleImg(f){
  if(!f.type||f.type.indexOf('image/')!==0){toast('Pilih file gambar','🖼');return;}
  if(f.size>12*1024*1024){toast('Maksimal 12MB','📦');return;}
  compress(f).then(function(d){
    S.pendingImage=d;
    document.getElementById('cpImg').src=d;
    document.getElementById('composePreview').classList.add('on');
    QC.updateSendBtn();
  }).catch(function(){toast('Gagal memproses gambar','❌');});
}
window.addEventListener('qc-image-sent',function(){document.getElementById('composePreview').classList.remove('on');fi.value='';ci.value='';});

/* ===== 3) Pesan suara ===== */
var mr=null,chunks=[],t0=0,tmr=null;
function startRec(){
  if(typeof MediaRecorder==='undefined'){toast('Browser tidak mendukung rekaman','🎙');return;}
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}}).then(function(st){
    chunks=[];t0=Date.now();
    var mime='';['audio/webm;codecs=opus','audio/webm','audio/mp4'].forEach(function(m){if(!mime&&MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m))mime=m;});
    mr=new MediaRecorder(st,mime?{mimeType:mime}:undefined);
    mr.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data);};
    mr.onstop=function(){
      st.getTracks().forEach(function(t){t.stop();});
      var dur=Math.round((Date.now()-t0)/1000);
      if(dur<1){toast('Rekaman terlalu pendek','🎙');return;}
      var rd=new FileReader();
      rd.onload=function(){
        QC.writeMsg({id:QC.uid+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6),uid:QC.uid,user:S.name,text:'',time:Date.now(),type:'audio',audio:rd.result,dur:dur,editedAt:0,deleted:false,avatar:S.avatar,avatarColor:S.avatarColor});
        QC.Sound.play('send');
      };
      rd.readAsDataURL(new Blob(chunks,{type:mr.mimeType||'audio/webm'}));
    };
    mr.start(250);
    composer.classList.add('recording');
    document.getElementById('btnMic').classList.add('recording');
    document.getElementById('recIndicator').classList.add('on');
    document.getElementById('input').style.display='none';
    tmr=setInterval(function(){var s=Math.floor((Date.now()-t0)/1000);document.getElementById('recTime').textContent=Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);},250);
  }).catch(function(){toast('Izinkan akses mikrofon','🎙');});
}
function stopRec(){
  if(!mr||mr.state!=='recording')return;
  clearInterval(tmr);mr.stop();
  composer.classList.remove('recording');
  document.getElementById('btnMic').classList.remove('recording');
  document.getElementById('recIndicator').classList.remove('on');
  document.getElementById('input').style.display='';
}
document.getElementById('btnMic').onclick=function(){if(mr&&mr.state==='recording')stopRec();else startRec();};

/* ===== 4) Penampil gambar ===== */
var mm=document.createElement('div');mm.className='media-modal hidden';mm.id='mediaModal';
mm.innerHTML='<button class="mm-close" type="button">'+icon('x')+'</button><img id="mmImg" alt="">';
document.body.appendChild(mm);
mm.querySelector('.mm-close').onclick=function(){mm.classList.add('hidden');};
mm.addEventListener('click',function(e){if(e.target===mm)mm.classList.add('hidden');});
window.QC_MEDIA={viewImage:function(src){document.getElementById('mmImg').src=src;mm.classList.remove('hidden');}};

/* ===== 5) Video call (WebRTC P2P, sinyal lewat MQTT) ===== */
document.body.insertAdjacentHTML('beforeend',
'<div id="callModal" class="call-modal hidden"><div class="call-remote"><video id="remoteVideo" autoplay playsinline></video><div id="callPlaceholder" class="call-placeholder"><div id="callBigAv" class="big-av">🦊</div><div id="callBigName">—</div></div><div id="callStatus" class="call-status" style="display:none"><span id="callStatusText">Memanggil…</span><small id="callStatusSub"></small></div><div class="call-info"><span id="callName">—</span><small id="callTimer">00:00</small></div><div class="call-local"><video id="localVideo" autoplay playsinline muted></video></div></div><div class="call-controls"><button id="ctrlMute" class="ctrl-mute" type="button">'+icon('mic')+'</button><button id="ctrlVideo" class="ctrl-video" type="button">'+icon('videoCam')+'</button><button id="ctrlEnd" class="ctrl-end" type="button">'+icon('phoneOff')+'</button></div></div>'+
'<div id="incomingCall" class="incoming-call hidden"><div class="ic-top"><div id="icAv" class="ic-av">🦊</div><div class="ic-name"><div id="icName">—</div><small>📞 Panggilan video masuk…</small></div></div><div class="ic-actions"><button id="icDecline" class="ic-decline" type="button">'+icon('phoneOff')+'</button><button id="icAccept" class="ic-accept" type="button">'+icon('phone')+'</button></div></div>');
var pc=null,ls=null,active=false,partner=null,incoming=null,ctmr=null,sec=0;
var ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]};
function csend(o){if(!partner||!S.room)return;QC.publishTo(QC.callTopic(S.room,QC.uid,partner),Object.assign({},o,{from:QC.uid,room:S.room}));}
function openUI(p,ans){
  document.getElementById('callModal').classList.remove('hidden');
  var c=QC.COLORS[(p.avatarColor||0)%QC.COLORS.length];
  var ba=document.getElementById('callBigAv');ba.textContent=p.avatar||initialsOf(p.user);ba.style.background='linear-gradient(145deg,rgba(255,255,255,.3),rgba(0,0,0,.12)),'+c;
  document.getElementById('callBigName').textContent=p.user;
  document.getElementById('callName').textContent=p.user;
  document.getElementById('callPlaceholder').style.display='';
  document.getElementById('callStatus').style.display=ans?'none':'';
}
function initialsOf(n){var p=String(n).trim().split(/\s+/).slice(0,2),o='';for(var i=0;i<p.length;i++)o+=p[i].charAt(0).toUpperCase();return o||'?';}
function timer(){sec=0;clearInterval(ctmr);ctmr=setInterval(function(){sec++;document.getElementById('callTimer').textContent=('0'+Math.floor(sec/60)).slice(-2)+':'+('0'+(sec%60)).slice(-2);},1000);}
function getMedia(){return navigator.mediaDevices.getUserMedia({video:true,audio:{echoCancellation:true,noiseSuppression:true}}).catch(function(){return navigator.mediaDevices.getUserMedia({audio:true});});}
function wirePC(){
  pc=new RTCPeerConnection(ICE);
  ls.getTracks().forEach(function(t){pc.addTrack(t,ls);});
  pc.ontrack=function(e){

