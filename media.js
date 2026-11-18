/* media.js v41 — emoji, gambar, suara, call gaya WhatsApp (tembus MIUI Redmi Note 9) */
(function(){
'use strict';
if(!window.QC)return;
var QC=window.QC,S=QC.S;
var icon=QC.icon,toast=QC.toast;
function gid(i){return document.getElementById(i);}
function tr(a,b){return document.documentElement.lang==='en'?b:a;}
function delay(ms){return new Promise(function(r){setTimeout(r,ms);});}
function badEm(em){
if(!em)return true;
if(em==='\uFE0F'||em==='\u200D')return true;
if(em.indexOf('?')>=0)return true;
var cp=em.codePointAt(0);
if(cp>=0x1F1E6&&cp<=0x1F1FF&&em.length<4)return true;
return false;
}
var FLIPSVG='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 5h-3.17L15 3H9L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-8 14a6 6 0 0 1-6-6h1.5a4.5 4.5 0 0 0 4.5 4.5v-2.06l3.06 3.06L12 21.56V19Zm4.5-6a4.5 4.5 0 0 0-4.5-4.5V10.6L8.94 7.5 12 4.44V6a6 6 0 0 1 6 6h-1.5Z"/></svg>';
var MICSVG='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg>';
var MICOFFSVG='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.69 4.69c-.7.49-1.5.81-2.31 1.02V20h2v-3.28c.81-.12 1.55-.4 2.24-.8l-1.93-1.23zM12 14c.93 0 1.78-.27 2.5-.73L9 7.77V5c0-1.66 1.34-3 3-3s3 1.34 3 3v6l1 1V5c0-2.21-1.79-4-4-4S8 2.79 8 5v3.23l4 4V14zM4.27 3 3 4.27 6.01 7.3c-.01.23 0 .47 0 .7v3c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c1.27-.19 2.42-.7 3.38-1.45L19.73 19 21 17.73 4.27 3z"/></svg>';
var VIDSVG='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm4.5 4.7 3-2.2c.3-.2.5 0 .5.3v6.4c0 .3-.2.5-.5.3l-3-2.2v-2.6z"/></svg>';
var VIDOFFSVG='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 6.5v11l-4-3.5v3a2 2 0 0 1-2 2H9.83l-2-2H15V8.83l-2.17-2.17L21 6.5zM3 3l18 18-1.27 1.27L17.46 20H19a2 2 0 0 0 2-2v-1.54l1.73 1.81L21 20.27 3 3zM6 6.83V8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6.17l2 2H6a4 4 0 0 1-4-4v-6a4 4 0 0 1 2-3.46L6 6.83z" transform="translate(1 1) scale(.9167)"/></svg>';
function widenTrack(t){
if(!t||t.kind!=='video')return;
try{
var caps=t.getCapabilities?t.getCapabilities():null;
if(!caps)return;
var adv=[];
if(caps.zoom){
var zmin=caps.zoom.min!=null?caps.zoom.min:(Array.isArray(caps.zoom)?caps.zoom[0]:1);
adv.push({zoom:zmin});
}
if(caps.fieldOfView){
var fmax=caps.fieldOfView.max!=null?caps.fieldOfView.max:(Array.isArray(caps.fieldOfView)?caps.fieldOfView[caps.fieldOfView.length-1]:null);
if(fmax!=null)adv.push({fieldOfView:fmax});
}
if(caps.pan)adv.push({pan:0});
if(caps.tilt)adv.push({tilt:0});
if(adv.length)t.applyConstraints({advanced:adv}).catch(function(){});
}catch(e){}
}
try{
if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
var origGUM=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
navigator.mediaDevices.getUserMedia=function(c){
var chain=[];
if(c&&c.video&&typeof c.video.facingMode==='string'){
var ex={};
for(var k in c)ex[k]=c[k];
ex.video={};
for(var j in c.video)ex.video[j]=c.video[j];
ex.video.facingMode={exact:c.video.facingMode};
chain.push(ex);
}
chain.push(c);
if(c&&c.video&&c.video!==true&&!c.video.deviceId&&typeof c.video.facingMode==='string'){
var vo={};
for(var k2 in c)vo[k2]=c[k2];
vo.video=true;
chain.push(vo);
}
function attempt(i){
return origGUM(chain[i]).then(function(st){
st.getVideoTracks().forEach(widenTrack);
return st;
},function(err){
if(i+1<chain.length)return attempt(i+1);
throw err;
});
}
return attempt(0);
};
}
}catch(e){}
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
C+='.call-info{position:absolute;top:12px;left:50%;';
C+='transform:translateX(-50%);text-align:center;';
C+='color:#fff;font:600 14px var(--body);z-index:7;';
C+='text-shadow:0 1px 6px rgba(0,0,0,.7);';
C+='max-width:70vw;white-space:nowrap;overflow:hidden;';
C+='text-overflow:ellipsis}';
C+='.call-info small{display:block;';
C+='color:rgba(255,255,255,.85);font-size:12px}';
C+='.call-ctrl{position:absolute;left:50%;';
C+='transform:translateX(-50%);';
C+='bottom:calc(14px + env(safe-area-inset-bottom));';
C+='z-index:8;display:flex;align-items:center;gap:12px;';
C+='padding:10px 14px;border-radius:999px;';
C+='background:rgba(22,22,26,.82);';
C+='backdrop-filter:blur(22px) saturate(1.4);';
C+='-webkit-backdrop-filter:blur(22px) saturate(1.4);';
C+='box-shadow:0 10px 30px rgba(0,0,0,.45)}';
C+='.call-ctrl button{width:46px;height:46px;';
C+='border-radius:50%;border:0;';
C+='background:#fff;color:#151517;';
C+='cursor:pointer;display:grid;place-items:center;';
C+='box-shadow:0 2px 10px rgba(0,0,0,.25);';
C+='transition:transform .12s ease}';
C+='.call-ctrl button:active{transform:scale(.92)}';
C+='.call-ctrl button svg{width:20px;height:20px}';
C+='.c-mute.on,.c-vid.off{background:rgba(255,255,255,.28);';
C+='color:#fff}';
C+='.c-end{background:#FF3B5C!important;color:#fff;';
C+='width:52px;height:52px;';
C+='box-shadow:0 6px 18px rgba(255,59,92,.45)}';
C+='.pip-btn{position:absolute;';
C+='width:34px;height:34px;border-radius:50%;border:0;';
C+='background:rgba(10,10,12,.55);color:#fff;';
C+='display:grid;place-items:center;cursor:pointer;';
C+='z-index:9;backdrop-filter:blur(8px);';
C+='-webkit-backdrop-filter:blur(8px)}';
C+='.pip-btn.busy svg{animation:qcspin .9s linear infinite}';
C+='@keyframes qcspin{to{transform:rotate(360deg)}}';
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
H+='</video>';
H+='<button id="pipFlip" class="pip-btn" type="button">';
H+=FLIPSVG+'</button>';
H+='</div></div>';
H+='<div class="call-ctrl">';
H+='<button id="ctrlMute" class="c-mute" type="button">';
H+=MICSVG+'</button>';
H+='<button id="ctrlVideo" class="c-vid" type="button">';
H+=VIDSVG+'</button>';
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
var flipping=false;
var callStreams=[];
var wdTimer=null,lastBytes=-1,wdStall=0;
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
function camDbg(t){
var d=gid('camDbg');
if(!d){
d=document.createElement('div');
d.id='camDbg';
d.style.cssText='position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:400;background:rgba(0,0,0,.68);color:#fff;font:600 11px monospace;padding:6px 12px;border-radius:99px;pointer-events:none;opacity:0;transition:opacity .3s;max-width:80vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
document.body.appendChild(d);
}
d.textContent=t;
d.style.opacity='1';
clearTimeout(d._t);
d._t=setTimeout(function(){d.style.opacity='0';},2500);
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
function fitRemote(){
var rv=gid('remoteVideo');
var box=gid('callRemoteBox');
if(!rv||!box||!rv.videoWidth||!rv.videoHeight)return;
if(callMode==='audio')return;
var ta=rv.videoWidth/rv.videoHeight;
var bh=Math.max(1,box.clientHeight);
var ba=box.clientWidth/bh;
rv.style.objectFit=Math.abs(ta-ba)<0.22?'cover':'contain';
}
function placePipFlip(){
var b=gid('pipFlip');
if(!b)return;
b.style.position='absolute';
b.style.top='auto';
b.style.left='auto';
b.style.right='20px';
b.style.bottom='calc(92px + min(58vw,200px) - 42px)';
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
gid('pipFlip').style.display='none';
return;
}
rv.style.display='';
lv.style.display='';
gid('pipFlip').style.display='';
placePipFlip();
var bigV=swapped?lv:rv;
var pipV=swapped?rv:lv;
[rv,lv].forEach(function(v){
v.style.position='absolute';
v.style.zIndex='1';
});
lv.style.transform='scaleX(-1)';
lv.style.objectFit='cover';
rv.style.transform='none';
bigV.style.left='0';
bigV.style.top='0';
bigV.style.width='100%';
bigV.style.height='100%';
bigV.style.right='';
bigV.style.bottom='';
bigV.style.borderRadius='0';
bigV.style.border='0';
bigV.style.boxShadow='none';
bigV.style.zIndex='1';
pipV.style.left='auto';
pipV.style.top='auto';
pipV.style.right='12px';
pipV.style.bottom='92px';
pipV.style.width='min(42vw,150px)';
pipV.style.height='min(58vw,200px)';
pipV.style.borderRadius='16px';
pipV.style.border='1px solid rgba(255,255,255,.22)';
pipV.style.boxShadow='0 8px 26px rgba(0,0,0,.55)';
pipV.style.background='#111';
pipV.style.zIndex='6';
if(pipV===rv)rv.style.objectFit='cover';
else fitRemote();
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
function resetCallButtons(){
var cm=gid('ctrlMute');
cm.classList.remove('on');
cm.innerHTML=MICSVG;
var cv=gid('ctrlVideo');
cv.classList.remove('off');
cv.innerHTML=VIDSVG;
gid('pipFlip').classList.remove('busy');
}
function openUI(name,ans,mode){
callMode=mode||'video';
swapped=false;
resetCallButtons();
gid('callTimer').textContent='00:00';
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
startWatchdog();
}
function startWatchdog(){
stopWatchdog();
wdTimer=setInterval(function(){
if(!pc||!active||!answered)return;
pc.getStats().then(function(rep){
var bytes=0;
rep.forEach(function(r){
if(r.type==='inbound-rtp')bytes+=(r.bytesReceived||0);
});
if(lastBytes>=0&&bytes===lastBytes)wdStall++;
else wdStall=0;
lastBytes=bytes;
if(wdStall>=5)endCall(false);
}).catch(function(){});
},5000);
}
function stopWatchdog(){
if(wdTimer){clearInterval(wdTimer);wdTimer=null;}
lastBytes=-1;
wdStall=0;
}
function getMedia(video,face){
var va={echoCancellation:true,noiseSuppression:true};
if(!video)return navigator.mediaDevices.getUserMedia({audio:va});
return navigator.mediaDevices.getUserMedia({video:{facingMode:face||'user'},audio:va})
.catch(function(){
return navigator.mediaDevices.getUserMedia({video:true,audio:va});
})
.catch(function(){
return navigator.mediaDevices.getUserMedia({audio:va});
});
}
function getMediaVideoOnly(face){
return navigator.mediaDevices.getUserMedia({video:{facingMode:face}})
.catch(function(){
return navigator.mediaDevices.getUserMedia({video:true});
});
}
function killAudioOf(st){
st.getAudioTracks().forEach(function(t){try{t.stop();}catch(e){}});
}
function stopAllOf(st){
st.getTracks().forEach(function(t){try{t.stop();}catch(e){}});
}
function guardAudio(){
if(!ls)return;
var a=ls.getAudioTracks()[0];
if(!a)return;
a.addEventListener('ended',function(){
if(!active)return;
navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}}).then(function(st){
var na=st.getAudioTracks()[0];
if(!na)return;
callStreams.push(st);
if(ls)ls.addTrack(na);
if(pc){
pc.getSenders().forEach(function(s2){
if(s2.track&&s2.track.kind==='audio')s2.replaceTrack(na);
});
}
guardAudio();
}).catch(function(){});
});
}
function colorCheck(nv){
return new Promise(function(res){
var v=document.createElement('video');
v.muted=true;
v.playsInline=true;
v.setAttribute('playsinline','');
v.srcObject=new MediaStream([nv]);
var done=false,tries=0;
function fin(x){
if(done)return;
done=true;
clearTimeout(to);
try{v.srcObject=null;}catch(e){}
res(x);
}
var to=setTimeout(function(){fin(-1);},2200);
function measure(){
tries++;
try{
if(v.readyState<2){
if(tries<7){setTimeout(measure,200);return;}
fin(-1);
return;
}
var w=32,h=24;
var cv=document.createElement('canvas');
cv.width=w;cv.height=h;
var cx=cv.getContext('2d',{willReadFrequently:true});
cx.drawImage(v,0,0,w,h);
var d=cx.getImageData(0,0,w,h).data;
var sat=0,n=0;
for(var i=0;i<d.length;i+=4){
var mx=Math.max(d[i],d[i+1],d[i+2]);
var mn=Math.min(d[i],d[i+1],d[i+2]);
sat+=(mx-mn);
n++;
}
fin(n?(sat/n):-1);
}catch(e){
if(tries<7){setTimeout(measure,200);return;}
fin(-1);
}
}
var pr=v.play();
if(pr&&pr.catch)pr.catch(function(){});
setTimeout(measure,300);
});
}
function wirePC(){
pc=new RTCPeerConnection(ICE);
var iceRestarted=false;
ls.getTracks().forEach(function(t){pc.addTrack(t,ls);});
pc.ontrack=function(e){
var rv=gid('remoteVideo');
attachRemote(rv,e.streams[0]);
if(callMode==='video'){
gid('callPh').style.display='none';
}
var s=gid('callStatus');
if(s)s.style.display='none';
applyLayout();
fitRemote();
if(!answered)timer();
};
pc.onicecandidate=function(e){
if(e.candidate)csend({type:'ice',cand:e.candidate});
};
pc.oniceconnectionstatechange=function(){
if(!pc)return;
var s=pc.iceConnectionState;
if(s==='failed'){
if(!iceRestarted){iceRestarted=true;try{pc.restartIce();}catch(e){}}
setTimeout(function(){
if(pc&&pc.iceConnectionState==='failed')endCall(false);
},6000);
}else if(s==='disconnected'){
setTimeout(function(){
if(!pc)return;
if(pc.iceConnectionState==='disconnected'){
if(!iceRestarted){iceRestarted=true;try{pc.restartIce();}catch(e){}}
setTimeout(function(){
if(pc&&pc.iceConnectionState==='disconnected')endCall(false);
},8000);
}
},20000);
}
};
pc.onconnectionstatechange=function(){
if(!pc)return;
var s=pc.connectionState;
if(s==='closed'){
endCall(false);
}else if(s==='failed'){
if(!iceRestarted){iceRestarted=true;try{pc.restartIce();}catch(e){}}
setTimeout(function(){
if(pc&&pc.connectionState==='failed')endCall(false);
},6000);
}
};
}
function attachNewVideo(nv){
if(ls){ls.addTrack(nv);}else{ls=new MediaStream([nv]);}
var lv=gid('localVideo');
lv.srcObject=null;
lv.srcObject=ls;
lv.play().catch(function(){});
if(pc){
pc.getSenders().forEach(function(s2){
if(s2.track&&s2.track.kind==='video')s2.replaceTrack(nv);
});
}
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
callStreams.push(st);
guardAudio();
gid('localVideo').srcObject=st;
gid('localVideo').play().catch(function(){});
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
callStreams.push(st);
guardAudio();
gid('localVideo').srcObject=st;
gid('localVideo').play().catch(function(){});
openUI(from,true,mode);
wirePC();
return pc.setRemoteDescription(of).then(function(){
return pc.createAnswer();
}).then(function(an){
return pc.setLocalDescription(an).then(function(){
csend({type:'answer',sdp:an});
csend({type:'accepted'});
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
stopWatchdog();
if(pc){
try{pc.close();}catch(e){}
pc=null;
}
callStreams.forEach(function(s){
try{s.getTracks().forEach(function(t){t.stop();});}catch(e){}
});
callStreams=[];
if(ls){
ls.getTracks().forEach(function(t){t.stop();});
ls=null;
}
if(partner&&!silent)csend({type:'end'});
active=false;
answered=false;
partner=null;
swapped=false;
flipping=false;
resetCallButtons();
gid('callModal').classList.add('hidden');
gid('remoteVideo').srcObject=null;
gid('localVideo').srcObject=null;
}
function flipCam(){
if(callMode==='audio'||!active||flipping)return;
flipping=true;
var fb=gid('pipFlip');
fb.classList.add('busy');
var safety=setTimeout(function(){
if(flipping){
flipping=false;
fb.classList.remove('busy');
}
},10000);
var old=ls?ls.getVideoTracks()[0]:null;
var oldSet=(old&&old.getSettings)?old.getSettings():{};
var oldId=oldSet.deviceId||'';
var opp=facing==='user'?'environment':'user';
var saved=null;
try{saved=localStorage.getItem(opp==='environment'?'qc-cam-rear':'qc-cam-front');}catch(e){}
var stoppedOld=false;
var grayF=null;
function stopOldNow(){
if(stoppedOld)return;
stoppedOld=true;
if(old){try{old.stop();}catch(e){}}
if(old&&ls){try{ls.removeTrack(old);}catch(e){}}
}
function openCons(cons){
return navigator.mediaDevices.getUserMedia({video:cons,audio:false});
}
function openWithRelease(cons){
return openCons(cons).catch(function(){
stopOldNow();
return delay(350).then(function(){return openCons(cons);});
});
}
function variantsOf(base){
var out=[];
var b2={};for(var k in base)b2[k]=base[k];
b2.width={ideal:640};b2.height={ideal:480};
out.push(b2);
var b3={};for(var k3 in base)b3[k3]=base[k3];
b3.width={ideal:1280};b3.height={ideal:720};
out.push(b3);
var b4={};for(var k4 in base)b4[k4]=base[k4];
b4.frameRate={ideal:15};
out.push(b4);
return out;
}
function tryVariants(base,i){
if(i>=3)return Promise.reject(new Error('stillgray'));
return openWithRelease(variantsOf(base)[i]).then(function(st){
var nv=st.getVideoTracks()[0];
if(!nv){stopAllOf(st);return tryVariants(base,i+1);}
return colorCheck(nv).then(function(sat){
if(sat>=0&&sat<=1.2){stopAllOf(st);return tryVariants(base,i+1);}
return {st:st,nv:nv,gray:false};
});
},function(){return tryVariants(base,i+1);});
}
function finish(r){
killAudioOf(r.st);
callStreams.push(r.st);
stopOldNow();
attachNewVideo(r.nv);
facing=opp;
var set=r.nv.getSettings?r.nv.getSettings():{};
if(set.deviceId){
try{localStorage.setItem(opp==='environment'?'qc-cam-rear':'qc-cam-front',set.deviceId);}catch(e){}
}
camDbg((set.label||('kamera '+(set.deviceId||'').slice(0,6)))+(r.gray?' (mono)':''));
if(grayF&&grayF.st!==r.st)stopAllOf(grayF.st);
clearTimeout(safety);
fb.classList.remove('busy');
flipping=false;
applyLayout();
}
function failNow(){
if(grayF){stopAllOf(grayF.st);grayF=null;}
stopOldNow();
clearTimeout(safety);
fb.classList.remove('busy');
flipping=false;
camDbg(tr('Gagal ganti kamera','Flip failed'));
delay(200).then(function(){
return getMediaVideoOnly(facing);
}).then(function(st2){
killAudioOf(st2);
var nv2=st2.getVideoTracks()[0];
if(nv2){
callStreams.push(st2);
attachNewVideo(nv2);
}
}).catch(function(){});
}
function handle(st,base,idx,list){
var nv=st.getVideoTracks()[0];
if(!nv){
stopAllOf(st);
return walk(list,idx);
}
var set=nv.getSettings?nv.getSettings():{};
if(oldId&&set.deviceId&&set.deviceId===oldId){
stopAllOf(st);
return walk(list,idx);
}
if(opp!=='environment'){
return Promise.resolve({st:st,nv:nv,gray:false});
}
return colorCheck(nv).then(function(sat){
if(!(sat>=0&&sat<=1.2))return {st:st,nv:nv,gray:false};
if(!grayF)grayF={st:st,nv:nv,gray:true};
else stopAllOf(st);
return tryVariants(base,0).then(function(r){return r;},function(){return null;});
});
}
function walk(list,idx){
if(idx>=list.length){
if(grayF)return Promise.resolve(grayF);
return Promise.reject(new Error('noopen'));
}
var base=list[idx];
return openWithRelease(base).then(function(st){
return handle(st,base,idx+1,list);
},function(){
return walk(list,idx+1);
}).then(function(r){
if(r)return r;
return walk(list,idx+1);
});
}
navigator.mediaDevices.enumerateDevices().then(function(ds){
var cams=(ds||[]).filter(function(d){return d.kind==='videoinput';});
var list=[];
if(saved&&saved!==oldId)list.push({deviceId:{exact:saved}});
cams.forEach(function(d){
if(d.deviceId&&d.deviceId!==oldId&&d.deviceId!==saved)list.push({deviceId:{exact:d.deviceId}});
});
list.push({facingMode:{exact:opp}});
list.push({facingMode:opp});
return walk(list,0);
}).then(finish).catch(failNow);
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
else if(d.type==='accepted'){
if(incoming&&incoming.from===d.from)hideIncoming();
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
QC.widenTrack=widenTrack;
gid('icOk').onclick=accept;
gid('icNo').onclick=decline;
gid('remoteVideo').onclick=toggleSwap;
gid('localVideo').onclick=toggleSwap;
gid('pipFlip').onclick=function(e){
e.stopPropagation();
flipCam();
};
gid('remoteVideo').addEventListener('loadedmetadata',fitRemote);
gid('ctrlMute').onclick=function(){
if(!ls)return;
var a=ls.getAudioTracks()[0];
if(!a)return;
a.enabled=!a.enabled;
this.classList.toggle('on',!a.enabled);
this.innerHTML=a.enabled?MICSVG:MICOFFSVG;
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
this.innerHTML=v.enabled?VIDSVG:VIDOFFSVG;
};
gid('ctrlEnd').onclick=function(){
endCall(false);
};
window.addEventListener('resize',function(){
if(active)applyLayout();
});
window.addEventListener('orientationchange',function(){
if(active)setTimeout(function(){applyLayout();fitRemote();},120);
});
window.addEventListener('pagehide',function(){
if(active)endCall(false);
if(incoming)hideIncoming();
});
window.QC_MEDIA=true;
}catch(e){
try{QC.toast(tr('Modul media gagal: ','Media module failed: ')+e.message);}catch(x){}
if(window.console)console.error(e);
}
})();
/* END media.js v41 */
