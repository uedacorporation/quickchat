/* media.js v31 — emoji, gambar, suara, call WA-style (fullscreen cover, potret, anti-delay) */
(function(){
'use strict';
if(!window.QC)return;
var QC=window.QC,S=QC.S;
var icon=QC.icon,toast=QC.toast;
function gid(i){return document.getElementById(i);}
function tr(a,b){return document.documentElement.lang==='en'?b:a;}
function badEm(em){
if(!em)return true;
if(em==='\uFE0F'||em==='\u200D')return true;
if(em.indexOf('?')>=0)return true;
var cp=em.codePointAt(0);
if(cp>=0x1F1E6&&cp<=0x1F1FF&&em.length<4)return true;
return false;
}
var FLIPSVG='<svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor"><path d="M20 5h-3.17L15 3H9L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-8 14a6 6 0 0 1-6-6h1.5a4.5 4.5 0 0 0 4.5 4.5v-2.06l3.06 3.06L12 21.56V19Zm4.5-6a4.5 4.5 0 0 0-4.5-4.5V10.6L8.94 7.5 12 4.44V6a6 6 0 0 1 6 6h-1.5Z"/></svg>';
try{
var C='';
C+='.emoji-pop{display:flex;flex-direction:column;';
C+='max-height:320px;overflow:hidden}';
C+='.emoji-head{display:flex;gap:6px;margin-bottom:7px}';
C+='.emoji-search{flex:1;min-width:0;';
C+='border:1px solid var(--line);border-radius:10px;';
C+='background:rgba(148,170,220,.06);padding:7px 11px;';
C+='color:var(--text);font-size:13px}';
C+='.emoji-close{width:36px;height:36px;flex:none;';
C+='border:1px solid var(--line);border-radius:10px;';
C+='background:var(--glass);color:var(--muted);';
C+='cursor:pointer;display:grid;place-items:center}';
C+='.emoji-cats{display:flex;gap:2px;margin-bottom:5px;';
C+='padding-bottom:5px;';
C+='border-bottom:1px solid var(--line);overflow-x:auto}';
C+='.emoji-cats button{flex:none;padding:4px 8px;border:0;';
C+='border-radius:8px;background:none;font-size:15px;';
C+='cursor:pointer;opacity:.5}';
C+='.emoji-cats button.on{opacity:1;';
C+='background:rgba(0,168,132,.14)}';
C+='.emoji-grid{flex:1;min-height:150px;max-height:190px;';
C+='overflow-y:auto;display:grid;';
C+='grid-template-columns:repeat(8,1fr);gap:2px}';
C+='.emoji-grid button{height:32px;border:0;';
C+='border-radius:8px;background:none;font-size:19px;';
C+='cursor:pointer}';
C+='.attach-menu{position:absolute;';
C+='bottom:calc(100% + 8px);left:0;z-index:28;';
C+='display:none;flex-direction:column;gap:4px;';
C+='min-width:170px;border:1px solid rgba(255,255,255,.14);';
C+='border-radius:14px;background:rgba(11,17,32,.92);';
C+='backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);';
C+='padding:6px}';
C+='.attach-menu.on{display:flex}';
C+='.attach-menu button{display:flex;align-items:center;';
C+='gap:9px;padding:9px 11px;border:0;border-radius:10px;';
C+='background:none;color:var(--text);font-size:13px;';
C+='cursor:pointer;text-align:left}';
C+='.attach-menu button svg{width:17px;height:17px;';
C+='color:var(--lime,#00A884)}';
C+='.call-modal{position:fixed;inset:0;z-index:300;';
C+='background:#000;display:flex;flex-direction:column}';
C+='.call-remote{flex:1;position:relative;';
C+='background:#000;overflow:visible}';
C+='.call-remote video{background:#000}';
C+='.call-ph{position:absolute;left:50%;top:42%;';
C+='transform:translate(-50%,-50%);';
C+='display:flex;flex-direction:column;';
C+='align-items:center;gap:12px;color:var(--muted);z-index:2}';
C+='.call-ph .big-av{width:96px;height:96px;';
C+='border-radius:50%;display:grid;place-items:center;';
C+='color:#DFE7EA;overflow:hidden}';
C+='.call-ph .big-av svg{width:52px;height:52px}';
C+='.big-av img,.ic-av img{width:100%;height:100%;';
C+='object-fit:cover;display:block}';
C+='.call-info{position:absolute;top:14px;left:16px;';
C+='color:#fff;font:600 14px var(--body);z-index:7;';
C+='text-shadow:0 1px 6px rgba(0,0,0,.6)}';
C+='.call-info small{display:block;';
C+='color:rgba(255,255,255,.8);font-size:12px}';
C+='.call-ctrl{position:relative;z-index:8;';
C+='display:flex;justify-content:center;';
C+='align-items:center;gap:14px;';
C+='padding:14px calc(14px + env(safe-area-inset-bottom));';
C+='background:rgba(10,14,24,.55);';
C+='backdrop-filter:blur(18px) saturate(1.4);';
C+='-webkit-backdrop-filter:blur(18px) saturate(1.4)}';
C+='.call-ctrl button{width:52px;height:52px;';
C+='border-radius:50%;border:1px solid rgba(255,255,255,.16);';
C+='background:rgba(255,255,255,.10);';
C+='backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);';
C+='color:#fff;cursor:pointer;display:grid;place-items:center;';
C+='box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}';
C+='.call-ctrl button svg{width:20px;height:20px}';
C+='.c-mute.on,.c-vid.off,.c-flip.on{background:rgba(255,255,255,.88);';
C+='color:#081018}';
C+='.c-end{background:#EF5350;border-color:transparent;';
C+='width:60px;height:60px;';
C+='box-shadow:0 6px 18px rgba(239,83,80,.4)}';
C+='.call-status{position:absolute;top:50%;left:50%;';
C+='transform:translate(-50%,-50%);color:#fff;';
C+='font:700 17px var(--body);z-index:3}';
C+='.in-call{position:fixed;top:16px;right:16px;';
C+='z-index:350;min-width:260px;';
C+='border:1px solid rgba(255,255,255,.14);border-radius:18px;';
C+='background:rgba(12,16,28,.88);';
C+='backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);';
C+='padding:12px;box-shadow:0 10px 30px rgba(0,0,0,.45)}';
C+='.ic-top{display:flex;align-items:center;gap:10px;';
C+='margin-bottom:9px}';
C+='.ic-av{width:40px;height:40px;border-radius:50%;';
C+='display:grid;place-items:center;color:#DFE7EA;';
C+='overflow:hidden}';
C+='.ic-av svg{width:22px;height:22px}';
C+='.ic-nm{flex:1;font-weight:700;font-size:13.5px}';
C+='.ic-nm small{display:block;font-weight:500;';
C+='font-size:10.5px;color:var(--lime,#00A884)}';
C+='.ic-act{display:flex;gap:8px;';
C+='justify-content:flex-end}';
C+='.ic-act button{width:42px;height:42px;';
C+='border-radius:50%;border:0;cursor:pointer;';
C+='display:grid;place-items:center;color:#fff}';
C+='.ic-act button svg{width:18px;height:18px}';
C+='.ic-ok{background:var(--lime,#00A884);color:#04120E;';
C+='box-shadow:0 6px 18px rgba(0,168,132,.4)}';
C+='.ic-no{background:#EF5350;';
C+='box-shadow:0 6px 18px rgba(239,83,80,.4)}';
var stx=document.createElement('style');
stx.textContent=C;
document.head.appendChild(stx);
var CATS=[];
function cat(k,i){
var o={k:k,i:i,l:[]};
CATS.push(o);
return o.l;
}
var L;
L=cat('Smileys','😀');
L.push('😀 😃 😄 😆 😅 😂 🙂 🙃');
L.push('😉 😊 😇 🥰 😍 😜 🤪 😎 🥳');
L.push('🤩 🥺 😭 🤫 🤯 😱 😨 😰 😥');
L.push('😢 😣 😩 🥱 😤 😡 😠 🤬 😈');
L.push('👿 💀 💩 👹 👺 👻 👽 👾 🤖');
L=cat('Gestur','👋');
L.push('👋 🤚 🖐 ✋ 🖖 👌 🤌 ✌️');
L.push('🤟 🤘 🤙 👈 👉 🖕 👇');
L.push('👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶');
L.push('👐 🤲 🤝 🙏 💅 💪 🦵');
L.push('🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀');
L.push('👁 👅 👄');
L=cat('Hewan','🐶');
L.push('🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯');
L.push('🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐒 🐔');
L.push('🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺');
L.push('🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🐢');
L.push('🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡');
L.push('🐠 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓');
L.push('🦍 🦧 🐘 🦛 🦏 🐫 🦒 🦘 🐃');
L.push('🐂 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🐕');
L.push('🐩 🐈 🐇 🦝 🦨 🦡 🦫 🦦 🦥 🐁');
L.push('🐀 🐿 🦔');
L=cat('Makanan','🍎');
L.push('🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐');
L.push('🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑');
L.push('🥦 🥬 🥒 🌶 🌽 🫒 🧅');
L.push('🥔 🍠 🥐 🍞 🧀 🥚 🍳 🧈');
L.push('🥞 🧇 🥓 🥩 🍗 🍖 🍔 🍟 🍕 🫓');
L.push('🥪 🥙 🧆 🌮 🌯 🥗 🍝 🍜 🍲');
L.push('🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥');
L.push('🥠 🥮 🍢 🍡 🍧 🍨 🥧 🧁 🍰');
L.push('🎂 🍮 🍬 🍫 🍿 🍩 🌰');
L.push('🥛 🍼 🍵 🥤 🧋 🍶');
L.push('🍺 🥂 🥃 🍹 🍾');
L.push('🍴 🥣 🥢');
L=cat('Aktivitas','⚽');
L.push('⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🥏 🎱');
L.push('🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥅 ⛳');
L.push('🪁 🎣 🥊 🥋 🎽 🛹 🛼 🛷');
L.push('⛸ 🎿 🏂 🏋️ 🤸');
L.push('🏇 🧘 🏄 🏊 🚣 🧗 🚵 🚴 🏆');
L.push('🥇 🥈 🥉 🏅 🎖 🏵 🎗 🎫 🎟 🎪');
L.push('🤹 🎭 🩰 🎨 🎬 🎤 🎧 🎼 🎹 🥁');
L.push('🪘 🎷 🎺 🪗 🎸 🪕 🎻 🎲 ♟ 🎯');
L.push('🎳 🎰 🧩');
L=cat('Travel','🚗');
L.push('🚗 🚕 🚙 🚌 🚎 🚓 🚒 🚐');
L.push('🛻 🚚 🚛 🚜 🛵 🛴 🛺 🚔');
L.push('🚍 🚘 🚖 ✈️ 🛫 🛬 🛩 💺 🛰 🚀');
L.push('🛸 🛶 🚤 🛥 🛳 ⛴ 🚢 ⚓');
L.push('🪝 ⛽ 🚧 🚥 🚦 🗺 🗿 🗽 🗼 🏰');
L.push('🏯 🏟 🎡 🎢 🎠 ⛲ ⛱ 🏖 🏝 🏜');
L.push('🌋 🏔 🏕 ⛺ 🛖 🏠 🏡 🏘');
L.push('🏚 🏗 🏭 🏢 🏬 🏣 🏤 🏥 🏦 🏨');
L.push('🏪 🏫 🏩 💒 🏛 ⛪ 🕌 🕍 🛕 🕋');
L.push('⛩ 🛤 🛣 🗾 🎑 🏞 🌅 🌄 🌠 🎇');
L.push('🎆 🌇 🌆 🏙 🌃 🌌 🌉 🌁');
L=cat('Objek','⌚');
L.push('⌚ 📱 💻 🖥 🖨 🖱 🖲 🕹 🗜');
L.push('💽 💾 💿 📀 📷 📹 📽');
L.push('🎞 📞 ☎️ 📟 📠 📺 📻 🎙 🎚 🎛');
L.push('🧭 ⏱ ⏲ ⏰ 🕰 ⌛ ⏳ 📡 🔋 🔌');
L.push('💡 🔦 🪔 🧯 💸 💵 💴 💶');
L.push('💷 🪙 💰 💳 💎 ⚖️ 🧰 🔧');
L.push('🔨 ⚒ 🛠 ⛏ 🪚 🔩 ⚙️ 🪤 🧱 ⛓');
L.push('🧲 🔫 💣 🧨 🪓 🔪 🗡 ⚔️ 🛡 🚬');
L.push('⚰️ ⚱️ 📿 💈 ⚗️ 🔭');
L.push('🔬 🕳 🩺 💊 💉 🩸 🧬 🦠 🧫');
L.push('🧪 🧹 🧺 🚽 🚰 🚿 🛁');
L.push('🛀 🧼 🪥 🪒 🪣 🛎 🔑 🗝');
L.push('🚪 🪑 🛋 🛏 🛌 🧸 🪆 🖼 🪞 🪟');
L.push('🛍 🛒 🎁 🎈 🎏 🎀 🪅 🎊 🎉');
L.push('🎎 🏮 🎐 🧧 ✉️ 📩 📨 📧 💌');
L.push('📥 📤 📦 🏷 🪧 📬 📭 📮');
L.push('📯 📜 📃 📄 📑 🧾 📊 📈 📉 🗒');
L.push('🗓 📅 📇 🗳 🗄 📋 📁');
L.push('📂 🗂 🗞 📰 📓 📔 📒 📕 📗 📘');
L.push('📙 📚 📖 🔖 🔗 🖇 📏');
L.push('🧮 📌 📍 ✂️ 🖊 🖋 ✒️ 🖌 🖍 📝');
L.push('✏️ 🔍 🔎 🔏 🔐 🔒 🔓');
L=cat('Simbol','❤️');
L.push('❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔');
L.push('❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ✨');
L.push('⭐ 🌟 💫 ⚡ 🔥 💥 💦 🎵 🎶');
L.push('✅ ❌ ⛔ 🚫 ❗ ❕ ❓ ❔ ‼️');
L.push('⁉️ 🔔 🔕 📣 📢 💬 💭 💤 🌐 ♻️');
L.push('🆗 🆕 🆓 🔢 🔟 ▶️ ⏸');
L.push('0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣');
L.push('⏹ ⏺ ⏭ ⏮ ⏩ ⏪ 🔼 🔽 ➡️ ⬅️');
L.push('⬆️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ 🔄');
L.push('🔂 🔀 ➕ ➖ ➗ ✖️ ♾ 💲 💱 ™️');
L.push('©️ ®️ 〰️ ➰ ➿ 🔙 🔛 🔝 🔜');
L.push('✔️ ☑️ 🔘 🔴 🟠 🟡 🟢 🔵 🟣 ⚫');
L.push('⚪ 🟤 🔺 🔻 🔸 🔹 🔶 🔷 🔳 🔲');
L.push('▪️ ▫️ ◾ ◽ ◼️ ◻️ 🟥 🟧 🟨 🟩');
L.push('🟦 🟪 ⬛ 🟫');
L=cat('Bendera','🏁');
L.push('🏁 🚩 🎌 🏴 🏳 🇮🇩 🇲🇾 🇸🇬');
L.push('🇧🇳 🇹🇱 🇯🇵 🇰🇷 🇹🇼 🇭🇰 🇮🇳 🇹🇭 🇻🇳');
L.push('🇵🇭 🇦🇺 🇳🇿 🇺🇸 🇨🇦 🇲🇽 🇧🇷 🇦🇷 🇨🇱 🇨🇴');
L.push('🇵🇪 🇫🇷 🇩🇪 🇮🇹 🇪🇸 🇵🇹 🇳🇱 🇧🇪 🇨🇭');
L.push('🇹🇷 🇸🇪 🇳🇴 🇩🇰 🇫🇮 🇮🇪 🇵🇱 🇷🇺 🇬🇷');
L.push('🇪🇬 🇿🇦 🇳🇬 🇰🇪 🇲🇦 🇸🇦 🇦🇪 🇮🇱 🇵🇰');
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
si.placeholder=tr('Cari emoji…','Search emoji…');
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
if(badEm(em))return;
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
var b1=document.createElement('button');
b1.type='button';
b1.setAttribute('data-a','img');
b1.innerHTML=icon('image')+' '+tr('Pilih gambar','Pick image');
var b2=document.createElement('button');
b2.type='button';
b2.setAttribute('data-a','cam');
b2.innerHTML=icon('camera')+' '+tr('Buka kamera','Open camera');
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
toast(tr('Pilih file gambar','Pick an image file'));
return;
}
if(f.size>12*1024*1024){
toast(tr('Maksimal 12MB','Max 12MB'));
return;
}
compress(f).then(function(d){
S.pendingImage=d;
gid('cpImg').src=d;
gid('composePreview').classList.add('on');
QC.updateSendBtn();
}).catch(function(){
toast(tr('Gagal memproses gambar','Failed to process image'));
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
toast(tr('Browser tidak mendukung rekaman','Browser does not support recording'));
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
toast(tr('Rekaman terlalu pendek','Recording too short'));
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
var mm2=Math.floor(s/60);
var ss=('0'+(s%60)).slice(-2);
gid('recTime').textContent=mm2+':'+ss;
},250);
}).catch(function(){
toast(tr('Izinkan akses mikrofon','Allow microphone access'));
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
H+='<div class="call-remote" id="callRemoteBox">';
H+='<video id="remoteVideo" autoplay playsinline></video>';
H+='<div id="callPh" class="call-ph">';
H+='<div id="callBigAv" class="big-av"></div>';
H+='<div id="callBigName">—</div>';
H+='<div id="callModeTxt" style="font-size:12px"></div>';
H+='</div>';
H+='<div id="callStatus" class="call-status" ';
H+='style="display:none"></div>';
H+='<div class="call-info"><span id="callName">—</span>';
H+='<small id="callTimer">00:00</small></div>';
H+='<div class="call-local" id="callLocal">';
H+='<video id="localVideo" autoplay playsinline muted>';
H+='</video></div></div>';
H+='<div class="call-ctrl">';
H+='<button id="ctrlMute" class="c-mute" type="button">';
H+=icon('mic')+'</button>';
H+='<button id="ctrlVideo" class="c-vid" type="button">';
H+=icon('video2')+'</button>';
H+='<button id="ctrlFlip" class="c-flip" type="button">';
H+=FLIPSVG+'</button>';
H+='<button id="ctrlEnd" class="c-end" type="button">';
H+=icon('endbar')+'</button>';
H+='</div></div>';
H+='<div id="incomingCall" class="in-call hidden">';
H+='<div class="ic-top"><div id="icAv" class="ic-av"></div>';
H+='<div class="ic-nm"><div id="icName">—</div>';
H+='<small id="icMode"></small>';
H+='</div></div><div class="ic-act">';
H+='<button id="icNo" class="ic-no" type="button">';
H+=icon('endbar')+'</button>';
H+='<button id="icOk" class="ic-ok" type="button">';
H+=icon('phone')+'</button>';
H+='</div></div>';
document.body.insertAdjacentHTML('beforeend',H);
var pc=null,ls=null,active=false,answered=false;
var partner=null,incoming=null,ctmr=null,sec=0;
var callMode='video',facing='user',swapped=false;
var ICE={iceServers:[
{urls:'stun:stun.l.google.com:19302'},
{urls:'stun:stun1.l.google.com:19302'},
{urls:'turn:openrelay.metered.ca:80',
username:'openrelayproject',
credential:'openrelayproject'},
{urls:'turn:openrelay.metered.ca:443?transport=tcp',
username:'openrelayproject',
credential:'openrelayproject'}
]};
function nm2(u){
return QC.displayName?QC.displayName(u):u;
}
function hideIncoming(){
incoming=null;
gid('incomingCall').classList.add('hidden');
}
function setAvByName(node,name,size){
if(!node)return;
var p=QC.profileOf(name);
var bg='linear-gradient(145deg,rgba(255,255,255,.06),';
bg+='rgba(0,0,0,.18)),';
bg+=QC.COLORS[((p&&p.color)||0)%QC.COLORS.length];
node.style.background=bg;
node.innerHTML=QC.avatarHTML(name,size||60);
}
function attachRemote(rv,stream){
rv.srcObject=stream;
rv.muted=true;
var p=rv.play();
if(p&&p.then){
p.then(function(){rv.muted=false;}).catch(function(){rv.muted=false;});
}else{
rv.muted=false;
}
}
function tuneSender(){
if(!pc)return;
try{
pc.getSenders().forEach(function(snd){
if(!snd.track||snd.track.kind!=='video')return;
if(!snd.setParameters)return;
var p=snd.getParameters()||{};
if(!p.encodings||!p.encodings.length)p.encodings=[{}];
p.encodings[0].maxBitrate=1200000;
p.encodings[0].maxFramerate=30;
p.degradationPreference='maintain-framerate';
snd.setParameters(p).catch(function(){});
});
}catch(e){}
}
function orientBig(v,box){
if(!v||!box||!v.videoWidth)return false;
var trackLand=v.videoWidth>v.videoHeight;
var boxLand=box.clientWidth>box.clientHeight;
if(trackLand&&!boxLand){
var bw=box.clientWidth;
var bh=Math.max(1,box.clientHeight-84);
v.style.width=bh+'px';
v.style.height=bw+'px';
v.style.left='50%';
v.style.top='calc(50% - 42px)';
v.style.transform='translate(-50%,-50%) rotate(90deg)';
v.style.objectFit='cover';
return true;
}
return false;
}
function applyLayout(){
var box=gid('callRemoteBox'),loc=gid('callLocal');
var rv=gid('remoteVideo'),lv=gid('localVideo');
if(!box||!loc||!rv||!lv)return;
box.style.position='static';
box.style.overflow='visible';
loc.style.position='static';
loc.style.overflow='visible';
loc.style.width='0';
loc.style.height='0';
loc.style.border='0';
loc.style.background='transparent';
loc.style.borderRadius='0';
if(callMode==='audio'){
rv.style.display='none';
lv.style.display='none';
return;
}
rv.style.display='';
lv.style.display='';
var bigV=swapped?lv:rv;
var pipV=swapped?rv:lv;
[rv,lv].forEach(function(v){
v.style.position='absolute';
v.style.zIndex='1';
v.style.objectFit='cover';
});
lv.style.transform='scaleX(-1)';
rv.style.transform='none';
bigV.style.left='0';
bigV.style.top='0';
bigV.style.width='100%';
bigV.style.height='calc(100% - 84px)';
bigV.style.right='';
bigV.style.bottom='';
bigV.style.borderRadius='0';
bigV.style.border='0';
bigV.style.boxShadow='none';
bigV.style.zIndex='1';
if(bigV===rv){
orientBig(rv,box);
}else{
rv.style.width='';
rv.style.height='';
}
pipV.style.left='auto';
pipV.style.top='auto';
pipV.style.right='14px';
pipV.style.bottom='98px';
pipV.style.width='112px';
pipV.style.height='150px';
pipV.style.borderRadius='14px';
pipV.style.border='2px solid rgba(255,255,255,.28)';
pipV.style.boxShadow='0 6px 20px rgba(0,0,0,.5)';
pipV.style.background='#111';
pipV.style.zIndex='6';
}
function toggleSwap(){
if(callMode==='audio')return;
swapped=!swapped;
applyLayout();
}
function csendTo(to,o){
if(!to)return;
var pair=[QC.me,to].sort().join('~');
var k='dm:'+pair;
var msg=Object.assign({},o);
msg.from=QC.me;
msg.to=to;
QC.publishTo(QC.callTopic(k),msg);
}
function csend(o){
if(!partner)return;
csendTo(partner,o);
}
function openUI(name,ans,mode){
callMode=mode||'video';
swapped=false;
gid('callModal').classList.remove('hidden');
setAvByName(gid('callBigAv'),name,56);
gid('callBigName').textContent=nm2(name);
gid('callName').textContent=nm2(name);
gid('callModeTxt').textContent=
callMode==='audio'
?tr('Panggilan suara','Voice call')
:tr('Panggilan video','Video call');
gid('callStatus').textContent=tr('Memanggil…','Calling…');
gid('callPh').style.display='';
gid('callStatus').style.display=ans?'none':'';
gid('ctrlVideo').style.display=
callMode==='audio'?'none':'';
gid('ctrlFlip').style.display=
callMode==='audio'?'none':'';
gid('callLocal').style.display=
callMode==='audio'?'none':'';
applyLayout();
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
function getMedia(video,face){
var va={echoCancellation:true,noiseSuppression:true};
if(!video)return navigator.mediaDevices.getUserMedia({audio:va});
return navigator.mediaDevices.getUserMedia({video:{facingMode:face||'user',aspectRatio:{ideal:0.5625},width:{max:1280},frameRate:{max:30}},audio:va})
.catch(function(){
return navigator.mediaDevices.getUserMedia({video:{facingMode:face||'user',width:{max:1280},frameRate:{max:30}},audio:va});
})
.catch(function(){
return navigator.mediaDevices.getUserMedia({video:{facingMode:face||'user'},audio:va});
})
.catch(function(){
return navigator.mediaDevices.getUserMedia({video:true,audio:va});
})
.catch(function(){
return navigator.mediaDevices.getUserMedia({audio:va});
});
}
function wirePC(){
pc=new RTCPeerConnection(ICE);
ls.getTracks().forEach(function(t){pc.addTrack(t,ls);});
tuneSender();
pc.ontrack=function(e){
var rv=gid('remoteVideo');
attachRemote(rv,e.streams[0]);
if(callMode==='video'){
gid('callPh').style.display='none';
}
var s=gid('callStatus');
if(s)s.style.display='none';
applyLayout();
if(!answered)timer();
};
pc.onicecandidate=function(e){
if(e.candidate)csend({type:'ice',cand:e.candidate});
};
pc.oniceconnectionstatechange=function(){
if(!pc)return;
var s=pc.iceConnectionState;
if(s==='failed'){
endCall(true);
toast(tr('Koneksi panggilan gagal (jaringan memblokir)','Call connection failed (network blocked)'));
}else if(s==='disconnected'){
setTimeout(function(){
if(pc&&pc.iceConnectionState==='disconnected'){
endCall(true);
}
},10000);
}
};
pc.onconnectionstatechange=function(){
if(!pc)return;
var s=pc.connectionState;
if(s==='failed'||s==='closed'){
endCall(true);
}
};
}
function startCall(u,video){
if(active){
toast(tr('Sedang dalam panggilan','Already in a call'));
return;
}
if(!S.presence||!S.presence[u]){
toast(tr('Pengguna tidak online','User is not online'));
return;
}
partner=u;
answered=false;
facing='user';
var wantVideo=video!==false;
getMedia(wantVideo,facing).then(function(st){
ls=st;
gid('localVideo').srcObject=st;
openUI(u,false,wantVideo?'video':'audio');
wirePC();
return pc.createOffer().then(function(of){
return pc.setLocalDescription(of).then(function(){
csend({type:'offer',sdp:of,mode:callMode});
active=true;
setTimeout(function(){
if(active&&!answered&&pc){
if(pc.signalingState==='have-local-offer'){
toast(tr('Peer belum merespons sinyal panggilan','Peer has not responded to call signal'));
}
}
},12000);
setTimeout(function(){
if(!answered&&active){
endCall(true);
toast(tr('Tidak ada jawaban','No answer'));
}
},30000);
});
});
}).catch(function(){
endCall(true);
toast(tr('Izinkan akses mikrofon','Allow microphone access')+(wantVideo?' & '+tr('kamera','camera'):''));
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
facing='user';
gid('incomingCall').classList.add('hidden');
getMedia(mode==='video',facing).then(function(st){
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
toast(tr('Izinkan akses mikrofon','Allow microphone access')+(mode==='video'?' & '+tr('kamera','camera'):''));
});
}
function decline(){
if(incoming){
csendTo(incoming.from,{type:'decline'});
hideIncoming();
}
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
swapped=false;
gid('callModal').classList.add('hidden');
gid('remoteVideo').srcObject=null;
gid('localVideo').srcObject=null;
}
function flipCam(){
if(callMode==='audio'||!active)return;
var next=facing==='user'?'environment':'user';
getMedia(true,next).then(function(st){
var nv=st.getVideoTracks()[0];
if(!nv){
st.getTracks().forEach(function(t){t.stop();});
toast(tr('Gagal mengganti kamera','Failed to switch camera'));
return;
}
var old=ls?ls.getVideoTracks()[0]:null;
if(old)old.stop();
if(ls){
if(old)ls.removeTrack(old);
ls.addTrack(nv);
}else{
ls=st;
}
var lv=gid('localVideo');
lv.srcObject=null;
lv.srcObject=ls;
if(pc){
pc.getSenders().forEach(function(s2){
if(s2.track&&s2.track.kind==='video')s2.replaceTrack(nv);
});
tuneSender();
}
facing=next;
gid('ctrlFlip').classList.toggle('on',facing==='environment');
applyLayout();
}).catch(function(){
toast(tr('Gagal mengganti kamera','Failed to switch camera'));
});
}
QC.onCallSignal=function(d){
if(!d||d.from===QC.me||d.to!==QC.me)return;
if(d.type==='offer'){
if(active){
csendTo(d.from,{type:'busy'});
return;
}
incoming={from:d.from,offer:d.sdp,mode:d.mode||'video'};
setAvByName(gid('icAv'),d.from,22);
gid('icName').textContent=nm2(d.from);
gid('icMode').textContent=
incoming.mode==='audio'
?tr('Panggilan suara masuk…','Incoming voice call…')
:tr('Panggilan video masuk…','Incoming video call…');
gid('incomingCall').classList.remove('hidden');
QC.Sound.play('call');
setTimeout(function(){
if(incoming&&incoming.from===d.from){
csendTo(d.from,{type:'decline'});
hideIncoming();
}
},30000);
}
else if(d.type==='answer'&&pc){
pc.setRemoteDescription(d.sdp)
.then(timer).catch(function(){});
}
else if(d.type==='ice'&&pc){
pc.addIceCandidate(d.cand).catch(function(){});
}
else if(d.type==='decline'){
if(incoming&&incoming.from===d.from)hideIncoming();
endCall(true);
toast(tr('Panggilan ditolak oleh ','Call declined by ')+nm2(d.from));
}
else if(d.type==='busy'){
if(incoming&&incoming.from===d.from)hideIncoming();
endCall(true);
toast(nm2(d.from)+' '+tr('sedang dalam panggilan lain','is in another call'));
}
else if(d.type==='end'){
if(incoming&&incoming.from===d.from)hideIncoming();
endCall(true);
}
};
QC.startCall=startCall;
QC.endCall=endCall;
gid('icOk').onclick=accept;
gid('icNo').onclick=decline;
gid('remoteVideo').onclick=toggleSwap;
gid('localVideo').onclick=toggleSwap;
gid('remoteVideo').addEventListener('loadedmetadata',function(){
applyLayout();
});
gid('ctrlMute').onclick=function(){
if(!ls)return;
var a=ls.getAudioTracks()[0];
if(!a)return;
a.enabled=!a.enabled;
this.classList.toggle('on',!a.enabled);
};
gid('ctrlVideo').onclick=function(){
if(callMode==='audio'){
toast(tr('Mode panggilan suara','Voice call mode'));
return;
}
if(!ls)return;
var v=ls.getVideoTracks()[0];
if(!v){
toast(tr('Video tidak tersedia','Video not available'));
return;
}
v.enabled=!v.enabled;
this.classList.toggle('off',!v.enabled);
};
gid('ctrlFlip').onclick=flipCam;
gid('ctrlEnd').onclick=function(){
endCall(false);
};
window.addEventListener('resize',function(){
if(active)applyLayout();
});
window.addEventListener('orientationchange',function(){
if(active)setTimeout(applyLayout,120);
});
window.addEventListener('pagehide',function(){
if(active)endCall(true);
if(incoming)hideIncoming();
});
window.QC_MEDIA=true;
}catch(e){
try{QC.toast(tr('Modul media gagal: ','Media module failed: ')+e.message);}catch(x){}
if(window.console)console.error(e);
}
})();
/* END media.js v31 */
