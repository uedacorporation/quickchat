/* media.js v12 — modul media QuickChat */
(function(){
'use strict';
if(!window.QC)return;
var QC=window.QC,S=QC.S;
var icon=QC.icon,toast=QC.toast;
function gid(i){return document.getElementById(i);}
try{
var C='';
C+='.emoji-pop{display:flex;flex-direction:column;';
C+='max-height:320px;overflow:hidden}';
C+='.emoji-head{display:flex;gap:6px;';
C+='margin-bottom:7px}';
C+='.emoji-head .emoji-search{flex:1;margin-bottom:0;';
C+='border:1px solid var(--line);border-radius:10px;';
C+='background:rgba(148,170,220,.06);padding:7px 11px;';
C+='color:var(--text);font-size:13px}';
C+='.emoji-close{width:36px;height:36px;flex:none;';
C+='border:1px solid var(--line);border-radius:10px;';
C+='background:var(--glass);color:var(--muted);';
C+='cursor:pointer;display:grid;place-items:center}';
C+='.emoji-cats{display:flex;gap:2px;margin-bottom:5px;';
C+='padding-bottom:5px;border-bottom:1px solid var(--line);';
C+='overflow-x:auto}';
C+='.emoji-cats button{flex:none;padding:4px 8px;';
C+='border:1px solid transparent;border-radius:8px;';
C+='background:none;font-size:15px;cursor:pointer;opacity:.5}';
C+='.emoji-cats button.on{opacity:1;';
C+='border-color:rgba(200,240,75,.3);';
C+='background:rgba(200,240,75,.1)}';
C+='.emoji-grid{flex:1;min-height:150px;max-height:190px;';
C+='overflow-y:auto;display:grid;';
C+='grid-template-columns:repeat(8,1fr);gap:2px}';
C+='.emoji-grid button{height:32px;border:0;';
C+='border-radius:8px;background:none;font-size:19px;';
C+='cursor:pointer}';
C+='.attach-menu{position:absolute;';
C+='bottom:calc(100% + 8px);left:0;z-index:28;';
C+='display:none;flex-direction:column;gap:4px;';
C+='min-width:170px;border:1px solid var(--line);';
C+='border-radius:14px;background:rgba(11,17,32,.98);';
C+='padding:6px}';
C+='.attach-menu.on{display:flex}';
C+='.attach-menu button{display:flex;align-items:center;';
C+='gap:9px;padding:9px 11px;border:0;border-radius:10px;';
C+='background:none;color:var(--text);font-size:13px;';
C+='cursor:pointer;text-align:left}';
C+='.attach-menu button svg{width:17px;height:17px;';
C+='color:var(--cyan)}';
C+='.call-modal{position:fixed;inset:0;z-index:300;';
C+='background:#000;display:flex;flex-direction:column}';
C+='.call-remote{flex:1;position:relative;';
C+='background:#0a0a0a;display:grid;';
C+='place-items:center;overflow:hidden}';
C+='.call-remote video{width:100%;height:100%;';
C+='object-fit:cover}';
C+='.call-placeholder{display:flex;flex-direction:column;';
C+='align-items:center;gap:12px;color:var(--muted)}';
C+='.call-placeholder .big-av{width:100px;height:100px;';
C+='border-radius:30px;display:grid;place-items:center;';
C+='color:#081018;overflow:hidden}';
C+='.call-placeholder .big-av svg{width:56px;height:56px}';
C+='.big-av img,.ic-av img{width:100%;height:100%;';
C+='object-fit:cover;display:block}';
C+='.call-local{position:absolute;bottom:16px;right:16px;';
C+='width:100px;height:150px;border-radius:12px;';
C+='overflow:hidden;border:2px solid rgba(255,255,255,.2);';
C+='background:#111}';
C+='.call-local video{width:100%;height:100%;';
C+='object-fit:cover}';
C+='.call-info{position:absolute;top:16px;left:16px;';
C+='color:#fff;font:600 14px var(--body)}';
C+='.call-info small{display:block;';
C+='color:rgba(255,255,255,.8);font-size:12px}';
C+='.call-controls{display:flex;justify-content:center;';
C+='align-items:center;gap:14px;padding:16px;';
C+='background:rgba(0,0,0,.6)}';
C+='.call-controls button{width:54px;height:54px;';
C+='border-radius:50%;border:0;color:#fff;';
C+='cursor:pointer;display:grid;place-items:center}';
C+='.call-controls button svg{width:21px;height:21px}';
C+='.ctrl-mute,.ctrl-video{background:rgba(255,255,255,.15)}';
C+='.ctrl-mute.on,.ctrl-video.off{background:var(--red)}';
C+='.ctrl-end{background:var(--red);width:64px;height:64px}';
C+='.call-status{position:absolute;top:50%;left:50%;';
C+='transform:translate(-50%,-50%);color:#fff;';
C+='font:700 17px var(--body);text-align:center}';
C+='.incoming-call{position:fixed;top:16px;right:16px;';
C+='z-index:350;min-width:260px;';
C+='border:1px solid var(--line);border-radius:18px;';
C+='background:rgba(11,17,32,.98);padding:12px}';
C+='.ic-top{display:flex;align-items:center;gap:10px;';
C+='margin-bottom:9px}';
C+='.ic-av{width:40px;height:40px;border-radius:11px;';
C+='display:grid;place-items:center;color:#081018;';
C+='overflow:hidden}';
C+='.ic-av svg{width:22px;height:22px}';
C+='.ic-name{flex:1;font-weight:700;font-size:13.5px}';
C+='.ic-name small{display:block;font-weight:500;';
C+='font-size:10.5px;color:var(--cyan)}';
C+='.ic-actions{display:flex;gap:8px;';
C+='justify-content:flex-end}';
C+='.ic-actions button{width:40px;height:40px;';
C+='border-radius:50%;border:0;cursor:pointer;';
C+='display:grid;place-items:center;color:#fff}';
C+='.ic-actions button svg{width:17px;height:17px}';
C+='.ic-accept{background:var(--green)}';
C+='.ic-decline{background:var(--red)}';
var st=document.createElement('style');
st.textContent=C;
document.head.appendChild(st);
document.addEventListener('error',function(e){
var t=e.target;
if(t&&t.tagName==='AUDIO'){
toast('Audio tidak didukung browser ini');
}
},true);
var CATS=[];
function cat(k,i){
var o={k:k,i:i,l:[]};
CATS.push(o);
return o.l;
}
var L;
L=cat('Smileys','😀');
L.push('😀 😃  😁 😆  🤣 😂 🙂 🙃');
L.push('😉 😊 😇 🥰 😍  😜 🤪  🥳');
L.push('🤩 🥺 😭  🤫  😱 😨 😰 😥');
L.push('😢 😣 😩  🥱  😡 😠  😈');
L.push('👿  💩 🤡 👹 👺 👻 👽 👾 🤖');
L=cat('Gestur','👋');
L.push('👋 🤚 🖐 ✋ 🖖 👌 🤌 🤏 ✌️ 🤞');
L.push('🫰 🤟 🤘 🤙 👈 👉  🖕 👇 ️');
L.push(' 👍 👎 ✊ 👊  🤜 👏 🙌 ');
L.push(' 🤲 🤝  ✍️  🤳 💪 🦾 🦵');
L.push('🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀');
L.push('👁 👅 👄');
L=cat('Hewan','🐶');
L.push('🐶  🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯');
L.push('🦁  🐷 🐸 🐵 🙈 🙉 🙊 🐒 🐔');
L.push('🐧 🐦 🐤 🐣 🐥  🦅 🦉 🦇 🐺');
L.push('🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🐢');
L.push('🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡');
L.push('🐠  🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓');
L.push('🦍 🦧 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🐃');
L.push('🐂 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕');
L.push('🐩 🐈 🐇 🦝 🦨 🦡 🦫 🦦 🦥 🐁');
L.push('🐀 🐿 🦔');
L=cat('Makanan','🍎');
L.push('🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐');
L.push('🍈 🍒 🍑 🥭 🍍 🥥  🍅 🍆 🥑');
L.push('🥦 🥬 🥒 🌶 🫑 🌽 🥕  🧄 ');
L.push('🥔 🍠 🥐  🍞  🧀 🥚 🍳 🧈');
L.push('🥞 🧇 🥓 🥩 🍗 🍖 🍔 🍟 🍕 🫓');
L.push('🥪 🥙 🧆 🌮 🌯 🥗 🫕 🍝 🍜 🍲');
L.push('🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥');
L.push('🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰');
L.push('🎂  🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜');
L.push('🍯  🍼 🫖  🍵  🥤  🍶');
L.push('🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊');
L.push('🥄 🍴 🍽 🥣 🥡 🥢 🧂');
L=cat('Aktivitas','⚽');
L.push('⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱');
L.push('🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥅 ⛳');
L.push('🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷');
L.push('⛸  🎿  🏂  🏋️  🤸 🤺');
L.push('🏇  🏄  🤽  🧗  🚴 🏆');
L.push('🥇 🥈 🥉 🏅 🎖 🏵 🎗 🎫 🎟 🎪');
L.push('🤹 🎭 🩰 🎨 🎬 🎤 🎧 🎼 🎹 🥁');
L.push('🪘 🎷 🎺 🪗 🎸 🪕 🎻 🎲 ♟ 🎯');
L.push('🎳  🎰 🧩');
L=cat('Travel','🚗');
L.push('🚗 🚕 🚙 🚌 🚎  🚓  🚒 🚐');
L.push('🛻 🚚 🚛 🚜 🏍  🚲  🛺 ');
L.push('🚍 🚘 🚖 ✈️ 🛫 🛬 🛩 💺 🛰 ');
L.push('🛸  🛶  🚤 🛥 🛳 ⛴ 🚢 ⚓');
L.push('🪝 ⛽ 🚧 🚥 🚦 🗺 🗿 🗽 🗼 🏰');
L.push('🏯 🏟 🎡 🎢 🎠 ⛲ ⛱ 🏖 🏝 🏜');
L.push('🌋 ⛰  🗻  ⛺  🏠 🏡 🏘');
L.push('🏚 🏗 🏭 🏢 🏬 🏣 🏤 🏥 🏦 🏨');
L.push('🏪 🏫 🏩 💒  ⛪ 🕌 🕍  🕋');
L.push('⛩  🛣 🗾 🎑 🏞  🌄  🎇');
L.push('🎆 🌇 🌆 🏙 🌃 🌌 🌉 🌁');
L=cat('Objek','⌚');
L.push('⌚ 📱 💻 ️ 🖥 🖨 🖱 🖲 🕹 🗜');
L.push('💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽');
L.push('🎞  ☎️  📠  📻 🎙 🎚 🎛');
L.push('🧭 ⏱ ⏲ ⏰ 🕰 ⌛ ⏳ 📡 🔋 🔌');
L.push('💡 🔦 🕯  🧯  💸 💵 💴 💶');
L.push('💷 🪙 💰 💳 💎 ⚖️  🧰 🪛 🔧');
L.push('🔨 ⚒ 🛠 ⛏ 🪚 🔩 ⚙️ 🪤 🧱 ⛓');
L.push('🧲 🔫  🧨  🔪 🗡 ⚔️ 🛡 🚬');
L.push('⚰️  ⚱️  🔮 📿  💈 ️ 🔭');
L.push('🔬  🩹 🩺 💊 💉 🩸 🧬  🧫');
L.push('🧪 🌡 🧹 🪠 🧺 🧻  🚰  🛁');
L.push('🛀 🧼 🪥 🪒 🧽 🪣 🧴 🛎 🔑 ');
L.push('🚪 🪑 🛋 🛏 🛌 🧸 🪆 🖼 🪞 🪟');
L.push('🛍 🛒 🎁 🎈 🎏 🎀  🪅 🎊 🎉');
L.push('🎎  🎐 🧧 ✉️  📨  💌 📥');
L.push('📤 📦 🏷 🪧  📫  📭  📯');
L.push('📜 📃 📄 📑 🧾 📊 📈 📉 🗒 🗓');
L.push('📆 📅 🗑 📇 🗃 🗳 🗄 📋 📁 📂');
L.push('🗂 🗞 📰 📓 📔 📒 📕 📗 📘 📙');
L.push('📚  🔖  🔗  🖇  📏 ');
L.push('📌 📍 ✂️ 🖊 🖋 ✒️ 🖌 🖍 📝 ✏️');
L.push('🔍 🔎 🔏 🔐 🔒 🔓');
L=cat('Simbol','❤️');
L.push('❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔');
L.push('❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ✨');
L.push('⭐ 🌟 💫 ⚡ 🔥  💥 💦 🎵 🎶');
L.push('✅ ❌  ⛔  ❗ ❕ ❓ ❔ ‼️');
L.push('⁉️ 🔔 🔕 📣 📢 💬 💭 💤 🌐 ♻️');
L.push('🆗 🆒 🆕 🆙 🆓 🆖 🔢 🔟 ▶️ ⏸');
L.push('0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣');
L.push('⏹  ⏭ ⏮ ⏩ ⏪ 🔼 🔽 ➡️ ️');
L.push('⬆️ ️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ 🔄 ');
L.push(' 🔀 ➕ ➖ ➗ ✖️ ♾  💱 ™️');
L.push('©️ ®️ 〰️ ➰ ➿  🔙 🔛 🔝 🔜');
L.push('✔️ ☑️ 🔘 🔴  🟡 🟢 🔵 🟣 ⚫');
L.push('⚪  🔺 🔻 🔸 🔹 🔶 🔷 🔳 🔲');
L.push('▪️ ▫️ ◾ ◽ ◼️ ◻️  🟧 🟨 🟩');
L.push('🟦 🟪 ⬛  🟫');
L=cat('Bendera','🏁');
L.push('🏁 🚩 🎌 🏴 🏳 🏳️‍🌈 🏴‍☠️ 🇮🇩 🇲🇾 🇸🇬');
L.push('🇧🇳 🇹🇱 🇯🇵 🇰🇷 🇨🇳 🇹🇼 🇭🇰 🇮🇳 🇹🇭 🇻🇳');
L.push('🇵🇭 🇦🇺 🇳 🇺🇸 🇨🇦 🇲🇽 🇧🇷 🇦🇷 🇨🇱 🇨🇴');
L.push('🇵🇪 🇬🇧 🇫🇷 🇩🇪 🇮🇹 🇪🇸 🇵🇹 🇳🇱 🇧🇪 🇨🇭');
L.push('🇦🇹 🇸🇪 🇳🇴 🇩🇰 🇫🇮 🇮🇪 🇵🇱 🇷🇺 🇹🇷 🇬🇷');
L.push('🇪🇬 🇿🇦 🇳🇬 🇰🇪 🇲🇦 🇸🇦 🇦🇪 🇮🇷 🇮🇱 🇵🇰');
L.push('🇧🇩 🇶🇦 🇰🇼 🇺🇦 🇰🇿');
CATS.forEach(function(c){
c.l=c.l.join(' ').split(' ');
});
var catIdx=0;
function buildEmojiUI(){
var pop=gid('emojiPop');
if(!pop)return;
pop.innerHTML='';
var head=document.createElement('div');
head.className='emoji-head';
var si=document.createElement('input');
si.id='emojiSearch';
si.className='emoji-search';
si.placeholder='Cari emoji…';
si.autocomplete='off';
var xb=document.createElement('button');
xb.id='emojiClose';
xb.className='emoji-close';
xb.type='button';
xb.innerHTML=icon('x',14);
xb.onclick=function(e){
e.stopPropagation();
pop.classList.add('hidden');
};
head.appendChild(si);
head.appendChild(xb);
var cw=document.createElement('div');
cw.id='emojiCats';
cw.className='emoji-cats';
var gw=document.createElement('div');
gw.id='emojiGrid';
gw.className='emoji-grid';
pop.appendChild(head);
pop.appendChild(cw);
pop.appendChild(gw);
function buildCats(){
cw.innerHTML='';
CATS.forEach(function(k,i){
var b=document.createElement('button');
b.type='button';
b.textContent=k.i;
b.title=k.k;
if(i===catIdx)b.classList.add('on');
b.onclick=function(ev){
ev.stopPropagation();
catIdx=i;
buildCats();
grid('');
};
cw.appendChild(b);
});
}
function addEm(g,em){
if(!em)return;
var b=document.createElement('button');
b.type='button';
b.textContent=em;
b.onclick=function(ev){
ev.stopPropagation();
ev.preventDefault();
QC.insertEmoji(em);
};
g.appendChild(b);
}
function grid(f){
gw.innerHTML='';
if(f){
var q=f.toLowerCase();
CATS.forEach(function(k){
if(k.k.toLowerCase().indexOf(q)>=0){
k.l.forEach(function(em){addEm(gw,em);});
}else{
k.l.forEach(function(em){
if(em.indexOf(q)>=0)addEm(gw,em);
});
}
});
}else{
CATS[catIdx].l.forEach(function(em){
addEm(gw,em);
});
}
}
buildCats();
grid('');
si.addEventListener('input',function(e){
grid(e.target.value.trim());
});
si.addEventListener('click',function(e){
e.stopPropagation();
});
}
buildEmojiUI();
var composer=gid('composer');
var menu=document.createElement('div');
menu.className='attach-menu';
menu.innerHTML='';
var b1=document.createElement('button');
b1.type='button';
b1.setAttribute('data-a','img');
b1.innerHTML=icon('image')+' Pilih gambar';
var b2=document.createElement('button');
b2.type='button';
b2.setAttribute('data-a','cam');
b2.innerHTML=icon('camera')+' Buka kamera';
menu.appendChild(b1);
menu.appendChild(b2);
composer.appendChild(menu);
var fi=document.createElement('input');
fi.type='file';
fi.accept='image/*';
fi.hidden=true;
composer.appendChild(fi);
var ci=document.createElement('input');
ci.type='file';
ci.accept='image/*';
ci.setAttribute('capture','environment');
ci.hidden=true;
composer.appendChild(ci);
gid('btnAttach').onclick=function(e){
e.stopPropagation();
menu.classList.toggle('on');
gid('emojiPop').classList.add('hidden');
};
document.addEventListener('click',function(e){
var a=e.target.closest('.attach-menu');
var b=e.target.closest('#btnAttach');
if(!a&&!b)menu.classList.remove('on');
});
b1.onclick=function(){
fi.click();
menu.classList.remove('on');
};
b2.onclick=function(){
ci.click();
menu.classList.remove('on');
};
fi.onchange=function(){
if(fi.files[0])handleImg(fi.files[0]);
};
ci.onchange=function(){
if(ci.files[0])handleImg(ci.files[0]);
};
function compress(file){
return new Promise(function(res,rej){
var r=new FileReader();
r.onload=function(ev){
var im=new Image();
im.onload=function(){
var w=im.width,h=im.height,mx=1280;
if(w>mx||h>mx){
var s=Math.min(mx/w,mx/h);
w=Math.round(w*s);
h=Math.round(h*s);
}
var cv=document.createElement('canvas');
cv.width=w;
cv.height=h;
cv.getContext('2d').drawImage(im,0,0,w,h);
res(cv.toDataURL('image/jpeg',0.72));
};
im.onerror=rej;
im.src=ev.target.result;
};
r.onerror=rej;
r.readAsDataURL(file);
});
}
function handleImg(f){
if(!f.type||f.type.indexOf('image/')!==0){
toast('Pilih file gambar');
return;
}
if(f.size>12*1024*1024){
toast('Maksimal 12MB');
return;
}
compress(f).then(function(d){
S.pendingImage=d;
gid('cpImg').src=d;
gid('composePreview').classList.add('on');
QC.updateSendBtn();
}).catch(function(){
toast('Gagal memproses gambar');
});
}
window.addEventListener('qc-image-sent',function(){
gid('composePreview').classList.remove('on');
fi.value='';
ci.value='';
});
var mr=null,chunks=[],t0=0,tmr=null;
function pickMime(){
var list=[];
list.push('audio/mp4;codecs=mp4a.40.2');
list.push('audio/mp4');
list.push('audio/aac');
list.push('audio/webm;codecs=opus');
list.push('audio/webm');
for(var i=0;i<list.length;i++){
try{
var ok=MediaRecorder.isTypeSupported;
if(ok&&ok(list[i]))return list[i];
}catch(e){}
}
return '';
}
function startRec(){
if(typeof MediaRecorder==='undefined'){
toast('Browser tidak mendukung rekaman');
return;
}
var opt={audio:{echoCancellation:true,noiseSuppression:true}};
navigator.mediaDevices.getUserMedia(opt).then(function(st){
chunks=[];
t0=Date.now();
var mime=pickMime();
mr=new MediaRecorder(st,mime?{mimeType:mime}:undefined);
mr.ondataavailable=function(e){
if(e.data&&e.data.size)chunks.push(e.data);
};
mr.onstop=function(){
st.getTracks().forEach(function(t){t.stop();});
var dur=Math.round((Date.now()-t0)/1000);
if(dur<1){
toast('Rekaman terlalu pendek');
return;
}
var um=(mr.mimeType||'audio/mp4').split(';')[0];
var rd=new FileReader();
rd.onload=function(){
QC.writeMsg({type:'audio',audio:rd.result,dur:dur,mime:um});
QC.Sound.play('send');
};
rd.readAsDataURL(new Blob(chunks,{type:mr.mimeType||'audio/mp4'}));
};
mr.start(250);
composer.classList.add('recording');
gid('btnMic').classList.add('recording');
gid('recIndicator').classList.add('on');
gid('input').style.display='none';
tmr=setInterval(function(){
var s=Math.floor((Date.now()-t0)/1000);
gid('recTime').textContent=Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);
},250);
}).catch(function(){
toast('Izinkan akses mikrofon');
});
}
function stopRec(){
if(!mr||mr.state!=='recording')return;
clearInterval(tmr);
mr.stop();
composer.classList.remove('recording');
gid('btnMic').classList.remove('recording');
gid('recIndicator').classList.remove('on');
gid('input').style.display='';
}
gid('btnMic').onclick=function(){
if(mr&&mr.state==='recording')stopRec();
else startRec();
};
var H='';
H+='<div id="callModal" class="call-modal hidden">';
H+='<div class="call-remote">';
H+='<video id="remoteVideo" autoplay playsinline></video>';
H+='<div id="callPlaceholder" class="call-placeholder">';
H+='<div id="callBigAv" class="big-av"></div>';
H+='<div id="callBigName">—</div>';
H+='<div id="callModeTxt" style="font-size:12px;';
H+='color:var(--muted)"></div>';
H+='</div>';
H+='<div id="callStatus" class="call-status" ';
H+='style="display:none">Memanggil…</div>';
H+='<div class="call-info"><span id="callName">—</span>';
H+='<small id="callTimer">00:00</small></div>';
H+='<div class="call-local" id="callLocal">';
H+='<video id="localVideo" autoplay playsinline muted>';
H+='</video></div></div>';
H+='<div class="call-controls">';
H+='<button id="ctrlMute" class="ctrl-mute" type="button">';
H+=icon('mic')+'</button>';
H+='<button id="ctrlVideo" class="ctrl-video" type="button">';
H+=icon('video')+'</button>';
H+='<button id="ctrlEnd" class="ctrl-end" type="button">';
H+=icon('phoneOff')+'</button>';
H+='</div></div>';
H+='<div id="incomingCall" class="incoming-call hidden">';
H+='<div class="ic-top"><div id="icAv" class="ic-av"></div>';
H+='<div class="ic-name"><div id="icName">—</div>';
H+='<small id="icMode">Panggilan video masuk…</small>';
H+='</div></div><div class="ic-actions">';
H+='<button id="icDecline" class="ic-decline" type="button">';
H+=icon('phoneOff')+'</button>';
H+='<button id="icAccept" class="ic-accept" type="button">';
H+=icon('phone')+'</button>';
H+='</div></div>';
document.body.insertAdjacentHTML('beforeend',H);
var pc=null,ls=null,active=false,answered=false;
var partner=null,incoming=null,ctmr=null,sec=0;
var callMode='video';
var ICE={iceServers:[
{urls:'stun:stun.l.google.com:19302'},
{urls:'stun:stun1.l.google.com:19302'}
]};
function nm(u){
return QC.displayName?QC.displayName(u):u;
}
function setAvByName(node,name,size){
if(!node)return;
var p=QC.profileOf(name);
var bg='linear-gradient(145deg,rgba(255,255,255,.3),';
bg+='rgba(0,0,0,.12)),';
bg+=QC.COLORS[((p&&p.color)||0)%QC.COLORS.length];
node.style.background=bg;
node.innerHTML=QC.avatarHTML(name,size||60);
}
function csend(o){
if(!partner)return;
var pair=[QC.me,partner].sort().join('~');
var k='dm:'+pair;
var msg=Object.assign({},o);
msg.from=QC.me;
msg.to=partner;
QC.publishTo(QC.callTopic(k),msg);
}
function openUI(name,ans,mode){
callMode=mode||'video';
gid('callModal').classList.remove('hidden');
setAvByName(gid('callBigAv'),name,56);
gid('callBigName').textContent=nm(name);
gid('callName').textContent=nm(name);
gid('callModeTxt').textContent=
callMode==='audio'?'Panggilan suara':'Panggilan video';
gid('callPlaceholder').style.display='';
gid('callStatus').style.display=ans?'none':'';
gid('callLocal').style.display=
callMode==='audio'?'none':'';
gid('ctrlVideo').style.display=
callMode==='audio'?'none':'';
gid('remoteVideo').style.display=
callMode==='audio'?'none':'';
}
function timer(){
answered=true;
sec=0;
clearInterval(ctmr);
var s=gid('callStatus');
if(s)s.style.display='none';
ctmr=setInterval(function(){
sec++;
var m=('0'+Math.floor(sec/60)).slice(-2);
var d=('0'+(sec%60)).slice(-2);
gid('callTimer').textContent=m+':'+d;
},1000);
}
function getMedia(video){
var va={echoCancellation:true,noiseSuppression:true};
if(video){
return navigator.mediaDevices
.getUserMedia({video:true,audio:va})
.catch(function(){
return navigator.mediaDevices.getUserMedia({audio:va});
});
}
return navigator.mediaDevices.getUserMedia({audio:va});
}
function wirePC(){
pc=new RTCPeerConnection(ICE);
ls.getTracks().forEach(function(t){pc.addTrack(t,ls);});
pc.ontrack=function(e){
gid('remoteVideo').srcObject=e.streams[0];
if(callMode==='video'){
gid('callPlaceholder').style.display='none';
}
var s=gid('callStatus');
if(s)s.style.display='none';
if(!answered)timer();
};
pc.onicecandidate=function(e){
if(e.candidate)csend({type:'ice',cand:e.candidate});
};
pc.onconnectionstatechange=function(){
if(!pc)return;
var bad=/disconnected|failed|closed/;
if(bad.test(pc.connectionState))endCall(true);
};
}
function startCall(u,video){
if(active){
toast('Sedang dalam panggilan');
return;
}
if(!S.presence||!S.presence[u]){
toast('Pengguna tidak online');
return;
}
partner=u;
answered=false;
var wantVideo=video!==false;
getMedia(wantVideo).then(function(st){
ls=st;
gid('localVideo').srcObject=st;
openUI(u,false,wantVideo?'video':'audio');
wirePC();
return pc.createOffer().then(function(of){
return pc.setLocalDescription(of).then(function(){
csend({type:'offer',sdp:of,mode:callMode});
active=true;
setTimeout(function(){
if(!answered&&active){
endCall(true);
toast('Tidak ada jawaban');
}
},30000);
});
});
}).catch(function(){
endCall(true);
toast('Izinkan akses mikrofon'+(wantVideo?' & kamera':''));
});
}
function accept(){
if(!incoming)return;
var of=incoming.offer;
var from=incoming.from;
var mode=incoming.mode||'video';
partner=from;
incoming=null;
answered=false;
gid('incomingCall').classList.add('hidden');
getMedia(mode==='video').then(function(st){
ls=st;
gid('localVideo').srcObject=st;
openUI(from,true,mode);
wirePC();
return pc.setRemoteDescription(of).then(function(){
return pc.createAnswer();
}).then(function(an){
return pc.setLocalDescription(an).then(function(){
csend({type:'answer',sdp:an});
active=true;
timer();
});
});
}).catch(function(){
endCall(true);
toast('Izinkan akses mikrofon'+(mode==='video'?' & kamera':''));
});
}
function decline(){
if(incoming){
csend({type:'decline'});
incoming=null;
}
gid('incomingCall').classList.add('hidden');
}
function endCall(silent){
clearInterval(ctmr);
if(pc){
try{pc.close();}catch(e){}
pc=null;
}
if(ls){
ls.getTracks().forEach(function(t){t.stop();});
ls=null;
}
if(partner&&!silent)csend({type:'end'});
active=false;
answered=false;
partner=null;
gid('callModal').classList.add('hidden');
gid('remoteVideo').srcObject=null;
gid('localVideo').srcObject=null;
}
QC.onCallSignal=function(d){
if(!d||d.from===QC.me||d.to!==QC.me)return;
if(d.type==='offer'){
if(active){
csend({type:'busy'});
return;
}
incoming={from:d.from,offer:d.sdp,mode:d.mode||'video'};
setAvByName(gid('icAv'),d.from,22);
gid('icName').textContent=nm(d.from);
gid('icMode').textContent=
incoming.mode==='audio'
?'Panggilan suara masuk…'
:'Panggilan video masuk…';
gid('incomingCall').classList.remove('hidden');
QC.Sound.play('call');
setTimeout(function(){
if(incoming)decline();
},30000);
}
else if(d.type==='answer'&&pc){
pc.setRemoteDescription(d.sdp)
.then(timer).catch(function(){});
}
else if(d.type==='ice'&&pc){
pc.addIceCandidate(d.cand).catch(function(){});
}
else if(d.type==='decline'||d.type==='busy'||d.type==='end'){
endCall(true);
}
};
QC.startCall=startCall;
QC.endCall=endCall;
gid('icAccept').onclick=accept;
gid('icDecline').onclick=decline;
gid('ctrlMute').onclick=function(){
if(!ls)return;
var a=ls.getAudioTracks()[0];
if(!a)return;
a.enabled=!a.enabled;
this.classList.toggle('on',!a.enabled);
};
gid('ctrlVideo').onclick=function(){
if(callMode==='audio'){
toast('Mode panggilan suara');
return;
}
if(!ls)return;
var v=ls.getVideoTracks()[0];
if(!v){
toast('Video tidak tersedia');
return;
}
v.enabled=!v.enabled;
this.classList.toggle('off',!v.enabled);
};
gid('ctrlEnd').onclick=function(){
endCall(false);
};
window.QC_MEDIA=true;
}catch(e){
try{QC.toast('Modul media gagal: '+e.message);}catch(x){}
if(window.console)console.error(e);
}
})();
/* END media.js v12 */
