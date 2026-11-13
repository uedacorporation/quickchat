/* media.js v6.2 — QuickChat: emoji kategori, gambar, suara, video call */
(function(){
'use strict';
if(!window.QC)return;

var QC=window.QC,S=QC.S,icon=QC.icon,toast=QC.toast;
function gid(i){return document.getElementById(i);}

try{

/* =========================================================
   1. GAYA MODUL MEDIA
   ========================================================= */
var css=document.createElement('style');
css.textContent=''
+'.emoji-pop{position:absolute;bottom:calc(100% + 8px);left:0;z-index:30;width:min(330px,calc(100vw - 40px));border:1px solid var(--line);border-radius:16px;background:rgba(12,18,33,.98);padding:10px;display:flex;flex-direction:column;max-height:320px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.5)}'
+'.emoji-head{display:flex;gap:6px;margin-bottom:7px}'
+'.emoji-search{flex:1;min-width:0;border:1px solid var(--line);border-radius:10px;background:rgba(148,170,220,.07);padding:8px 11px;font-size:13px;color:var(--tx);outline:none}'
+'.emoji-close{width:34px;height:34px;flex:none;border:1px solid var(--line);border-radius:10px;background:var(--glass);color:var(--mu);display:grid;place-items:center}'
+'.emoji-cats{display:flex;gap:2px;margin-bottom:5px;padding-bottom:5px;border-bottom:1px solid var(--line);overflow-x:auto}'
+'.emoji-cats button{flex:none;padding:4px 8px;border:1px solid transparent;border-radius:8px;background:none;font-size:15px;opacity:.5}'
+'.emoji-cats button.on{opacity:1;border-color:rgba(200,240,75,.3);background:rgba(200,240,75,.1)}'
+'.emoji-grid{flex:1;min-height:150px;max-height:190px;overflow-y:auto;display:grid;grid-template-columns:repeat(8,1fr);gap:2px}'
+'.emoji-grid button{height:32px;border:0;border-radius:8px;background:none;font-size:19px}'
+'.emoji-empty{grid-column:1/-1;color:var(--dim);font-size:12px;text-align:center;padding:24px 8px}'
+'.attach-menu{position:absolute;bottom:calc(100% + 8px);left:0;z-index:28;display:none;flex-direction:column;gap:4px;min-width:170px;border:1px solid var(--line);border-radius:14px;background:rgba(12,18,33,.98);padding:6px;box-shadow:0 16px 44px rgba(0,0,0,.5)}'
+'.attach-menu.on{display:flex}'
+'.attach-menu button{display:flex;align-items:center;gap:9px;padding:9px 11px;border:0;border-radius:10px;background:none;color:var(--tx);font-size:13px;text-align:left}'
+'.attach-menu button svg{width:17px;height:17px;color:var(--cyan)}'
+'.media-modal{position:fixed;inset:0;z-index:250;display:grid;place-items:center;background:rgba(0,0,0,.94);padding:20px}'
+'.media-modal img{max-width:92vw;max-height:92vh;border-radius:12px}'
+'.mm-close{position:absolute;top:16px;right:16px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.5);color:#fff;display:grid;place-items:center}'
+'.call-modal{position:fixed;inset:0;z-index:300;background:#000;display:flex;flex-direction:column}'
+'.call-remote{flex:1;position:relative;background:#0a0a0a;display:grid;place-items:center;overflow:hidden}'
+'.call-remote video{width:100%;height:100%;object-fit:cover}'
+'.call-placeholder{display:flex;flex-direction:column;align-items:center;gap:12px;color:var(--mu)}'
+'.big-av{width:100px;height:100px;border-radius:30px;display:grid;place-items:center;font-size:52px;color:#081018;overflow:hidden;background-size:cover;background-position:center}'
+'.call-local{position:absolute;bottom:16px;right:16px;width:100px;height:150px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,.2);background:#111}'
+'.call-local video{width:100%;height:100%;object-fit:cover}'
+'.call-info{position:absolute;top:16px;left:16px;color:#fff;font:600 14px var(--body)}'
+'.call-info small{display:block;color:rgba(255,255,255,.8);font-size:12px;margin-top:2px}'
+'.call-controls{display:flex;justify-content:center;align-items:center;gap:14px;padding:16px;background:rgba(0,0,0,.6)}'
+'.call-controls button{width:54px;height:54px;border-radius:50%;border:0;color:#fff;display:grid;place-items:center}'
+'.call-controls button svg{width:21px;height:21px}'
+'.ctrl-mute,.ctrl-video{background:rgba(255,255,255,.15)}'
+'.ctrl-mute.on,.ctrl-video.off,.ctrl-end{background:var(--red)}'
+'.call-status{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font:700 17px var(--body);text-align:center}'
+'.incoming-call{position:fixed;top:16px;right:14px;left:14px;z-index:350;border:1px solid var(--line);border-radius:18px;background:rgba(12,18,33,.98);padding:12px;box-shadow:0 18px 50px rgba(0,0,0,.6)}'
+'.ic-top{display:flex;align-items:center;gap:10px;margin-bottom:9px}'
+'.ic-av{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;font-size:20px;color:#081018;overflow:hidden;background-size:cover;background-position:center}'
+'.ic-name{flex:1;font-weight:700;font-size:13.5px}'
+'.ic-name small{display:block;font-weight:500;font-size:10.5px;color:var(--cyan);margin-top:2px}'
+'.ic-actions{display:flex;gap:8px;justify-content:flex-end}'
+'.ic-actions button{width:40px;height:40px;border-radius:50%;border:0;display:grid;place-items:center;color:#fff}'
+'.ic-actions button svg{width:17px;height:17px}'
+'.ic-accept{background:var(--grn)}'
+'.ic-decline{background:var(--red)}';
document.head.appendChild(css);

document.addEventListener('error',function(e){
  var t=e.target;
  if(t&&t.tagName==='AUDIO')toast('Audio tidak didukung browser ini','🔇');
},true);

/* =========================================================
   2. KATEGORI EMOJI (tanpa entri kosong)
   ========================================================= */
var CATS=[
{k:'Smileys',i:'😀',l:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','😘','😜','🤪','😎','🥳','🤩','🥺','😭','😴','🤔','🤫','🤯','😱','😨','😰','😥','😢','😡','😠','🤬','😈','💀','💩','🤡','👻','👽','🤖']},
{k:'Gestur',i:'👋',l:['👋','🤚','🖐','✋','🖖','👌','','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','','👐','','🤝','','✍️','','🤳','','🦾','','🦶','','👃','','👀','👁','👅','👄']},
{k:'Hewan',i:'🐶',l:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐢','🐍','🦎','🦖','🦕','🐙','🦐','🦞','🦀','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🦓','🦍','🐘','🐪','🐫','🦒','🐄','🐎','🐖','🐑','🐐','🐕','🐩','🐈','🐇','🦦','🦥','🐁','']},
{k:'Makanan',i:'🍎',l:['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🥑','🥦','🥬','🥒','🌶','🌽','🥕','🥔','🥐','🍞','🥖','🧀','🥚','🍳','🥞','🥓','🥩','🍗','🍔','🍟','🍕','🥪','🌮','🌯','🥗','🍝','🍜','🍲','🍛','🍱','🥟','🍤','🍙','🍚','🍦','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🍯','🥛','☕','🍵','🧃','🥤','🧋','🍺','🍻','🥂','🍷','🍸','🍹','🍾']},
{k:'Aktivitas',i:'⚽',l:['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🛹','🛼','🛷','🎿','🏂','🪂','🏋️','🤸','🤺','🏇','🧘','🏄','🏊','🚣','🧗','🚵','🚴','🏆','🥇','🥈','🥉','🏅','🎫','🎪','🤹','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🎻','🎲','🎯','🎳','🎮','']},
{k:'Travel',i:'🚗',l:['🚗','🚕','🚙','🚌','🏎','🚓','🚑','🚒','🚐','🚚','🚛','🚜','🏍','🛵','🚲','🛴','🛺','🚔','🚖','✈️','🛫','🛬','🛩','💺','🛰','🚀','🛸','🚁','🛶','⛵','🚤','🛳','⛴','🚢','⚓','⛽','🚧','🚥','🚦','🗺','🗿','🗽','🗼','🏰','🏯','🏟','🎡','🎢','🎠','⛲','⛱','🏖','🏝','🏜','🌋','⛰','🏔','🗻','🏕','⛺','🏠','🏡','🏢','🏬','🏥','🏦','🏨','🏪','🏫','💒','🏛','⛪','🕌','🕋','⛩','🛤','🛣','🌅','🌄','🌠','🎇','🎆','🌇','🌆','🏙','🌃','🌌','🌉']},
{k:'Objek',i:'⌚',l:['⌚','📱','💻','⌨️','🖥','🖨','🖱','🕹','💾','💿','📀','📷','📸','📹','🎥','📞','☎️','📺','📻','🎙','🧭','⏰','⌛','⏳','📡','🔋','🔌','💡','🔦','🕯','💸','💵','💰','💳','💎','🧰','🔧','🔨','🛠','🔩','⚙️','🧱','⛓','🧲','💣','🪓','🔪','🗡','⚔️','🛡','🔮','🧿','⚗️','🔭','🔬','🩹','🩺','💊','💉','🧬','🦠','🧪','🌡','🧹','🧺','🧻','🚽','🚿','🛁','🧼','🪥','🧽','🧴','🔑','🗝','🚪','🪑','🛋','🛏','🧸','🛍','🛒','🎁','🎈','🎀','🎊','🎉','🏮','✉️','📩','📨','📧','💌','📦','📜','📄','📑','📊','📈','📉','📆','📅','🗑','📋','📁','📂','📰','📓','📒','📕','📗','📘','📙','📚','📖','🔖','🔗','📎','📐','📏','📌','📍','✂️','🖊','🖌','📝','✏️','🔍','🔎','🔐','🔒','🔓']},
{k:'Simbol',i:'❤️',l:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','✨','⭐','🌟','💫','⚡','🔥','💢','💥','💦','🎵','🎶','✅','❌','⭕','⛔','🚫','❗','❓','‼️','⁉️','🔔','🔕','📣','📢','💬','💭','💤','🌐','♻️','🆗','🆒','🆕','🆙','🔢','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','▶️','⏸','⏹','⏺','⏭','⏮','⏩','⏪','➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','🔄','🔁','🔀','➕','➖','➗','✖️','♾','💲','™️','©️','®️','✔️','☑️','🔘','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔺','🔻','🔸','🔹','🔶','🔷','🔳','🔲','🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜']},
{k:'Bendera',i:'🏁',l:['🏁','🚩','🎌','🏴','🏳','🏳️‍🌈','🏴‍☠️','🇩','🇾','🇬','🇧🇳','🇹🇱','🇯🇵','🇰🇷','🇨🇳','🇹🇼','🇰','🇮','🇹','🇻🇳','🇵🇭','🇦🇺','🇳🇿','🇺🇸','🇨🇦','🇲🇽','🇧🇷','🇦🇷','🇨🇱','🇨🇴','🇵🇪','🇬🇧','🇫🇷','🇩🇪','🇮🇹','🇪🇸','🇵🇹','🇳','🇧','🇨🇭','🇦🇹','🇸','🇳🇴','🇩🇰','🇫🇮','🇮🇪','🇵','🇷🇺','🇹🇷','🇬🇷','🇪🇬','🇿🇦','🇳🇬','🇰🇪','🇲🇦','🇸🇦','🇦🇪','🇮🇷','🇮🇱','🇵🇰','🇧','🇶🇦','🇰🇼','🇦','🇰']}
];

var KW={
  cinta:'❤️ 🥰 😍 💕 💖',love:'❤️ 🥰 😍',hati:'❤️ 💔 💕',api:'🔥',semangat:'🔥 💪 ⚡',
  bintang:'⭐ 🌟 ✨',kucing:'🐱 🐈',anjing:'🐶 🐕',kelinci:'🐰 🐇',rubah:'🦊',panda:'🐼',
  singa:'🦁',harimau:'🐯',monyet:'🐵 🐒',burung:'🐦 🐧',ikan:'🐟 ',paus:' 🐋',
  hantu:'👻',robot:'🤖',alien:'👽',makan:'🍔 🍕 🍜 🍚',nasi:'🍚 🍛',mie:'🍜 🍝',
  pizza:'🍕',burger:'🍔',kopi:'☕',teh:'🍵',kue:'🍰 🎂 🧁',apel:'🍎 🍏',pisang:'🍌',
  semangka:'🍉',bola:'⚽ 🏀 🏐',game:'🎮 🎲',musik:'🎵 🎶 🎸 🎹',hadiah:'🎁 🎉',
  mobil:'🚗 🚕 🚙',motor:'🏍 🛵',sepeda:'🚲',pesawat:'✈️ 🛫',roket:'🚀',rumah:'🏠 🏡',
  uang:'💰 💵 💸',hp:'📱',laptop:'💻',kamera:'📷 📸',jam:'⌚ ',buku:' 📖',
  kunci:'🔑 🗝',lampu:'💡',indonesia:'🇮🇩',jepang:'🇯🇵',korea:'🇰🇷',
  senyum:'😀 😃 😄 😊',tawa:'😂 🤣 😆',sedih:'😢 😭 😥',marah:'😡 😠 🤬',
  takut:'😱 😨 😰',tidur:'😴 🛌',ok:'👌 ✅',setuju:'👍',tolak:'👎',halo:'👋',
  doa:'🙏',mata:'👀',otot:'💪',cium:'😘',keren:'😎',pikir:'🤔',rahasia:'🤫',
  bunga:'🌸 🌹 🌺',piala:'🏆',medali:'🥇 🏅',centang:'✅ ✔️',silang:'❌',
  tanya:'❓',petir:'⚡',gunung:'⛰ 🏔',pantai:'🏖',kota:'🏙',malam:'🌃'
};

/* =========================================================
   3. PEMILIH EMOJI
   ========================================================= */
var cat=0;
function buildEmojiUI(){
  var pop=gid('emojiPop');
  if(!pop)return;
  pop.innerHTML=''
    +'<div class="emoji-head">'
    +'<input id="emojiSearch" class="emoji-search" placeholder="Cari emoji… (cinta, kucing, api)" autocomplete="off">'
    +'<button id="emojiClose" class="emoji-close" type="button">'+icon('x',14)+'</button>'
    +'</div>'
    +'<div id="emojiCats" class="emoji-cats"></div>'
    +'<div id="emojiGrid" class="emoji-grid"></div>';

  gid('emojiClose').onclick=function(e){
    e.stopPropagation();pop.classList.add('hidden');
  };

  function buildCats(){
    var c=gid('emojiCats');c.innerHTML='';
    CATS.forEach(function(k,i){
      var b=document.createElement('button');
      b.type='button';b.textContent=k.i;b.title=k.k;
      if(i===cat)b.classList.add('on');
      b.onclick=function(ev){ev.stopPropagation();cat=i;buildCats();grid('');};
      c.appendChild(b);
    });
  }

  function grid(filter){
    var g=gid('emojiGrid');g.innerHTML='';
    var seen={};
    function add(em){
      if(!em||seen[em])return;
      seen[em]=1;
      var b=document.createElement('button');
      b.type='button';b.textContent=em;
      b.onclick=function(ev){ev.stopPropagation();ev.preventDefault();QC.insertEmoji(em);};
      g.appendChild(b);
    }
    if(filter){
      var q=filter.toLowerCase(),found=false;
      Object.keys(KW).forEach(function(k){
        if(k.indexOf(q)>=0){KW[k].split(' ').forEach(add);found=true;}
      });
      CATS.forEach(function(c){
        if(c.k.toLowerCase().indexOf(q)>=0){c.l.forEach(add);found=true;}
      });
      if(!found){
        CATS.forEach(function(c){
          c.l.forEach(function(em){if(em.indexOf(q)>=0)add(em);});
        });
      }
    }else{
      CATS[cat].l.forEach(add);
    }
    if(!g.children.length){
      var e=document.createElement('div');
      e.className='emoji-empty';e.textContent='Emoji tidak ditemukan.';
      g.appendChild(e);
    }
  }

  buildCats();grid('');
  gid('emojiSearch').addEventListener('input',function(e){grid(e.target.value.trim());});
  gid('emojiSearch').addEventListener('click',function(e){e.stopPropagation();});
}
buildEmojiUI();

/* =========================================================
   4. LAMPIRAN GAMBAR
   ========================================================= */
var composer=gid('composer');
var menu=document.createElement('div');
menu.className='attach-menu';
menu.innerHTML=''
  +'<button type="button" data-a="img">'+icon('image')+' Pilih gambar</button>'
  +'<button type="button" data-a="cam">'+icon('camera')+' Buka kamera</button>';
composer.appendChild(menu);

var fi=document.createElement('input');
fi.type='file';fi.accept='image/*';fi.hidden=true;composer.appendChild(fi);
var ci=document.createElement('input');
ci.type='file';ci.accept='image/*';ci.setAttribute('capture','environment');ci.hidden=true;composer.appendChild(ci);

gid('btnAttach').onclick=function(e){
  e.stopPropagation();
  menu.classList.toggle('on');
  gid('emojiPop').classList.add('hidden');
};
document.addEventListener('click',function(e){
  if(!e.target.closest('.attach-menu')&&!e.target.closest('#btnAttach'))menu.classList.remove('on');
});
menu.querySelector('[data-a="img"]').onclick=function(){fi.click();menu.classList.remove('on');};
menu.querySelector('[data-a="cam"]').onclick=function(){ci.click();menu.classList.remove('on');};
fi.onchange=function(){if(fi.files[0])handleImg(fi.files[0]);fi.value='';};
ci.onchange=function(){if(ci.files[0])handleImg(ci.files[0]);ci.value='';};

function compress(file){
  return new Promise(function(res,rej){
    var r=new FileReader();
    r.onload=function(ev){
      var im=new Image();
      im.onload=function(){
        var w=im.width,h=im.height,mx=1280;
        if(w>mx||h>mx){
          var s=Math.min(mx/w,mx/h);
          w=Math.round(w*s);h=Math.round(h*s);
        }
        var cv=document.createElement('canvas');
        cv.width=w;cv.height=h;
        var cx=cv.getContext('2d');
        cx.fillStyle='#fff';cx.fillRect(0,0,w,h);
        cx.drawImage(im,0,0,w,h);
        res(cv.toDataURL('image/jpeg',.72));
      };
      im.onerror=rej;im.src=ev.target.result;
    };
    r.onerror=rej;r.readAsDataURL(file);
  });
}
function handleImg(f){
  if(!f.type||f.type.indexOf('image/')!==0){toast('Pilih file gambar','🖼');return;}
  if(f.size>12*1024*1024){toast('Maksimal 12MB','📦');return;}
  compress(f).then(function(d){
    S.pendingImage=d;
    gid('cpImg').src=d;
    gid('composePreview').classList.add('on');
    QC.updateSendBtn();
  }).catch(function(){toast('Gagal memproses gambar','❌');});
}
window.addEventListener('qc-image-sent',function(){
  gid('composePreview').classList.remove('on');
  fi.value='';ci.value='';
});

/* =========================================================
   5. PESAN SUARA
   ========================================================= */
var mr=null,chunks=[],t0=0,tmr=null;
function pickMime(){
  var list=['audio/mp4;codecs=mp4a.40.2','audio/mp4','audio/aac','audio/webm;codecs=opus','audio/webm'];
  for(var i=0;i<list.length;i++){
    try{
      if(window.MediaRecorder&&MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(list[i]))return list[i];
    }catch(e){}
  }
  return '';
}
function startRec(){
  if(typeof MediaRecorder==='undefined'){toast('Browser tidak mendukung rekaman','🎙');return;}
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){toast('Butuh HTTPS untuk mikrofon','🔒');return;}
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}}).then(function(st){
    chunks=[];t0=Date.now();
    var mime=pickMime();
    mr=new MediaRecorder(st,mime?{mimeType:mime}:undefined);
    mr.ondataavai
