/* media.js v3 — modul media QuickChat (emoji kategori bersih, gambar, suara, video call) */
(function(){
'use strict';
if(!window.QC){
  console.warn('QC tidak ditemukan, media.js dimuat sebelum index.html siap');
  setTimeout(function(){ if(window.QC) initMedia(); }, 500);
  return;
}
initMedia();

function initMedia(){
var QC=window.QC, S=QC.S, icon=QC.icon, toast=QC.toast;
try{

/* ===== CSS untuk fitur media ===== */
var css=document.createElement('style');
css.textContent=
'.emoji-pop{display:flex;flex-direction:column;max-height:340px;width:min(360px,calc(100vw - 44px));overflow:hidden}'+
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
'.call-placeholder{display:flex;flex-direction:column;align-items:center;gap:14px;color:var(--muted)}.call-placeholder .big-av{width:110px;height:110px;border-radius:32px;display:grid;place-items:center;font-size:60px;color:#081018;overflow:hidden}'+
'.big-av img,.ic-av img{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}'+
'.call-local{position:absolute;bottom:20px;right:20px;width:110px;height:160px;border-radius:14px;overflow:hidden;border:2px solid rgba(255,255,255,.2);background:#111}.call-local video{width:100%;height:100%;object-fit:cover}'+
'.call-info{position:absolute;top:20px;left:20px;color:#fff;font:600 14px var(--body)}.call-info small{display:block;color:rgba(255,255,255,.8);font-size:12px}'+
'.call-controls{display:flex;justify-content:center;align-items:center;gap:14px;padding:18px;background:rgba(0,0,0,.6)}.call-controls button{width:56px;height:56px;border-radius:50%;border:0;color:#fff;cursor:pointer;display:grid;place-items:center}.call-controls button svg{width:22px;height:22px}'+
'.ctrl-mute,.ctrl-video{background:rgba(255,255,255,.15)}.ctrl-mute.on,.ctrl-video.off{background:var(--red)}.ctrl-end{background:var(--red);width:68px;height:68px}'+
'.call-status{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font:700 18px var(--body);text-align:center}.call-status small{display:block;font-size:12px;color:rgba(255,255,255,.7)}'+
'.incoming-call{position:fixed;top:20px;right:20px;z-index:350;min-width:280px;border:1px solid var(--line);border-radius:18px;background:rgba(11,17,32,.98);padding:14px}.ic-top{display:flex;align-items:center;gap:12px;margin-bottom:10px}.ic-av{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;color:#081018;font-size:22px;overflow:hidden}.ic-name{flex:1;font-weight:700;font-size:14px}.ic-name small{display:block;font-weight:500;font-size:11px;color:var(--cyan)}.ic-actions{display:flex;gap:8px;justify-content:flex-end}.ic-actions button{width:42px;height:42px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;color:#fff}.ic-actions button svg{width:18px;height:18px}.ic-accept{background:var(--green)}.ic-decline{background:var(--red)}';
document.head.appendChild(css);

/* ===== 1) Emoji berkategori (PAKAI ARRAY LITERAL agar bendera tidak rusak) ===== */
var CATS=[
  {k:'Smileys',i:'😀',l:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','😘','😜','🤪','😎','🥳','🤩','🥺','😭','😅','🙃','😴','🤔','🤫','🤯','😱','😨','😰','😥','😢','😣','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','💩','🤡','👹','👺','👻','👽','👾','🤖']},
  {k:'Gestur',i:'👋',l:['👋','🤚','🖐','✋','🖖','👌','🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','🦷','🦴','👀','👁','👅','👄']},
  {k:'Hewan',i:'🐶',l:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🐢','🐍','🦎','','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','','🦙','🐐','🦌','🐕','🐩','🐈','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿','🦔']},
  {k:'Makanan',i:'🍎',l:['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🧀','🥚','🍳','🧈','','🧇','🥓','🥩','🍗','🍖','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🥗','🫕','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮','🍢','','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','🍼','🫖','☕','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🧉','🍾','🧊','🥄','🍴','🍽','🥣','🥡','🥢','🧂']},
  {k:'Aktivitas',i:'⚽',l:['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🎽','🛹','🛼','🛷','⛸','🥌','🎿','⛷','🏂','','🏋️','🤼','🤸','🤺','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚵','🚴','🏆','🥇','🥈','🥉','🏅','🎖','🏵','🎗','🎫','🎟','🎪','🤹','🎭','🩰','🎨','🎬','🎤','🎧','','🎹','🥁','🪘','🎷','🎺','🪗','🎸','🪕','🎻','🎲','♟','🎯','🎳','🎮','🎰','🧩']},
  {k:'Travel',i:'🚗',l:['🚗','🚕','🚙','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍','🛵','🚲','🛴','🛺','🚔','🚍','🚘','🚖','✈️','🛫','🛬','🛩','💺','🛰','🚀','🛸','🚁','🛶','⛵','🚤','🛥','🛳','⛴','🚢','⚓','🪝','⛽','🚧','🚥','🚦','🗺','🗿','🗽','🗼','🏰','🏯','🏟','🎡','🎢','🎠','⛲','⛱','🏖','🏝','🏜','🌋','⛰','🏔','🗻','🏕','⛺','🛖','🏠','🏡','🏘','🏚','🏗','🏭','🏢','🏬','🏣','🏤','🏥','🏦','🏨','🏪','🏫','🏩','💒','🏛','⛪','🕌','🕍','🛕','🕋','⛩','🛤','🛣','🗾','','🏞','🌅','🌄','🌠','🎇','🎆','🌇','🌆','🏙','🌃','🌌','🌉','🌁']},
  {k:'Objek',i:'⌚',l:['⌚','📱','💻','⌨️','🖥','🖨','🖱','🖲','🕹','🗜','💽','💾','💿','📀','📼','📷','📸','📹','🎥','📽','🎞','📞','☎️','📟','📠','📺','📻','🎙','🎚','🎛','🧭','⏱','⏲','⏰','🕰','⌛','⏳','📡','🔋','🔌','💡','🔦','🕯','🪔','🧯','🛢','💸','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','🪛','🔧','🔨','⚒','🛠','⛏','🪚','🔩','⚙️','🪤','🧱','⛓','🧲','🔫','💣','🧨','🪓','🔪','🗡','⚔️','🛡','🚬','⚰️','🪦','⚱️','🏺','🔮','📿','🧿','💈','⚗️','🔭','🔬','🕳','🩹','🩺','💊','💉','🩸','🧬','🦠','🧫','🧪','🌡','🧹','🪠','🧺','🧻','🚽','🚰','🚿','🛁','🛀','🧼','🪥','🪒','🧽','🪣','🧴','🛎','🔑','🗝','🚪','🪑','🛋','🛏','🛌','🧸','🪆','🖼','🪞','🪟','🛍','🛒','🎁','🎈','🎏','🎀','🪄','🪅','🎊','🎉','🎎','','🎐','🧧','✉️','📩','📨','📧','💌','📥','📤','📦','🏷','🪧','📪','📫','📬','📭','📮','📯','📜','📃','📄','📑','🧾','📊','📈','📉','🗒','🗓','📆','📅','🗑','📇','🗃','🗳','🗄','📋','📁','📂','🗂','🗞','📰','📓','📔','📒','📕','📗','📘','📙','📚','📖','🔖','🧷','🔗','📎','🖇','📐','📏','🧮','📌','📍','✂️','🖊','🖋','✒️','🖌','🖍','📝','✏️','🔍','🔎','🔏','🔐','🔒','🔓']},
  {k:'Simbol',i:'❤️',l:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','✨','⭐','🌟','💫','⚡','🔥','💢','💥','💦','🎵','🎶','✅','❌','⭕','⛔','🚫','❗','❕','❓','❔','‼️','⁉️','🔔','🔕','📣','📢','💬','💭','💤','🌐','♻️','🆗','🆒','🆕','🆙','🆓','🆖','🔢','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','▶️','⏸','⏹','⏺','⏭','⏮','⏩','⏪','🔼','🔽','➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','🔄','🔁','🔂','🔀','➕','➖','➗','✖️','♾','💲','💱','™️','©️','®️','〰️','➰','➿','🔚','🔙','🔛','🔝','🔜','✔️','☑️','🔘','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔺','🔻','🔸','🔹','🔶','🔷','🔳','🔲','▪️','▫️','◾','◽','◼️','◻️','🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜','🟫']},
  {k:'Bendera',i:'🏁',l:['🏁','🚩','🎌','🏴','🏳','🏳️‍🌈','🏴‍☠️','🇮🇩','🇲🇾','🇸🇬','🇧🇳','🇹🇱','🇯🇵','🇰🇷','🇨🇳','🇹🇼','🇭🇰','🇮🇳','🇹🇭','🇻🇳','🇵🇭','🇦🇺','🇳🇿','🇺🇸','🇨🇦','🇲🇽','🇧🇷','🇦🇷','🇨🇱','🇨🇴','🇵🇪','🇬🇧','🇫🇷','🇩🇪','🇮🇹','🇪🇸','🇵🇹','🇳🇱','🇧🇪','🇨🇭','🇦🇹','🇸🇪','🇳🇴','🇩🇰','🇫🇮','🇮🇪','🇵🇱','🇷🇺','🇹🇷','🇬🇷','🇪🇬','🇿🇦','🇳🇬','🇰🇪','🇲🇦','🇸🇦','🇦🇪','🇮🇷','🇮🇱','🇵🇰','🇧🇩','🇶🇦','🇰🇼','🇺🇦','🇰🇿']}
];
var cat=0;
var pop=document.getElementById('emojiPop');
if(pop){
  pop.innerHTML='<input id="emojiSearch" class="emoji-search" placeholder="Cari emoji…" autocomplete="off"><div id="emojiCats" class="emoji-cats"></div><div id="emojiGrid" class="emoji-grid"></div>';
  var buildCats=function(){
    var c=document.getElementById('emojiCats');
    c.innerHTML='';
    CATS.forEach(function(k,i){
      var b=document.createElement('button');
      b.type='button';
      b.textContent=k.i;
      b.title=k.k;
      if(i===cat) b.classList.add('on');
      b.onclick=function(){ cat=i; buildCats(); grid(''); };
      c.appendChild(b);
    });
  };
  var grid=function(f){
    var g=document.getElementById('emojiGrid');
    g.innerHTML='';
    var add=function(em){
      if(!em) return;
      var b=document.createElement('button');
      b.type='button';
      b.textContent=em;
      b.onclick=function(){ QC.insertEmoji(em); };
      g.appendChild(b);
    };
    if(f){
      var q=f.toLowerCase();
      CATS.forEach(function(k){
        k.l.forEach(function(em){
          if(em.indexOf(q)>=0) add(em);
        });
      });
    } else {
      CATS[cat].l.forEach(add);
    }
  };
  buildCats();
  grid('');
  var es=document.getElementById('emojiSearch');
  if(es) es.addEventListener('input',function(e){ grid(e.target.value.trim()); });
}

/* ===== 2) Lampiran gambar ===== */
var composer=document.getElementById('composer');
if(composer){
  var menu=document.createElement('div');
  menu.className='attach-menu';
  menu.innerHTML='<button type="button" data-a="img">'+icon('image')+' Pilih gambar</button><button type="button" data-a="cam">'+icon('camera')+' Buka kamera</button>';
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
  
  var btnAttach=document.getElementById('btnAttach');
  if(btnAttach){
    btnAttach.onclick=function(e){
      e.stopPropagation();
      menu.classList.toggle('on');
      var ep=document.getElementById('emojiPop');
      if(ep) ep.classList.add('hidden');
    };
  }
  
  document.addEventListener('click',function(e){
    if(!e.target.closest('.attach-menu') && !e.target.closest('#btnAttach')){
      menu.classList.remove('on');
    }
  });
  
  var btnImg=menu.querySelector('[data-a="img"]');
  if(btnImg) btnImg.onclick=function(){ fi.click(); menu.classList.remove('on'); };
  
  var btnCam=menu.querySelector('[data-a="cam"]');
  if(btnCam) btnCam.onclick=function(){ ci.click(); menu.classList.remove('on'); };
  
  fi.onchange=function(){ if(fi.files[0]) handleImg(fi.files[0]); };
  ci.onchange=function(){ if(ci.files[0]) handleImg(ci.files[0]); };
}

function compress(file){
  return new Promise(function(res,rej){
    var r=new FileReader();
    r.onload=function(ev){
      var im=new Image();
      im.onload=function(){
        var w=im.width, h=im.height, mx=1280;
        if(w>mx || h>mx){
          var s=Math.min(mx/w, mx/h);
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
  if(!f.type || f.type.indexOf('image/')!==0){
    toast('Pilih file gambar','🖼');
    return;
  }
  if(f.size>12*1024*1024){
    toast('Maksimal 12MB','📦');
    return;
  }
  compress(f).then(function(d){
    S.pendingImage=d;
    var cpImg=document.getElementById('cpImg');
    if(cpImg) cpImg.src=d;
    var cp=document.getElementById('composePreview');
    if(cp) cp.classList.add('on');
    QC.updateSendBtn();
  }).catch(function(){
    toast('Gagal memproses gambar','❌');
  });
}

window.addEventListener('qc-image-sent',function(){
  var cp=document.getElementById('composePreview');
  if(cp) cp.classList.remove('on');
  if(fi) fi.value='';
  if(ci) ci.value='';
});

/* ===== 3) Pesan suara ===== */
var mr=null, chunks=[], t0=0, tmr=null;

function pickMime(){
  var list=['audio/mp4;codecs=mp4a.40.2','audio/mp4','audio/aac','audio/webm;codecs=opus','audio/webm'];
  for(var i=0;i<list.length;i++){
    try{
      if(MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(list[i]))
        return list[i];
    }catch(e){}
  }
  return '';
}

function startRec(){
  if(typeof MediaRecorder==='undefined'){
    toast('Browser tidak mendukung rekaman','🎙');
    return;
  }
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}})
  .then(function(st){
    chunks=[];
    t0=Date.now();
    var mime=pickMime();
    mr=new MediaRecorder(st, mime?{mimeType:mime}:undefined);
    mr.ondataavailable=function(e){
      if(e.data && e.data.size) chunks.push(e.data);
    };
    mr.onstop=function(){
      st.getTracks().forEach(function(t){ t.stop(); });
      var dur=Math.round((Date.now()-t0)/1000);
      if(dur<1){
        toast('Rekaman terlalu pendek','🎙');
        return;
      }
      var usedMime=(mr.mimeType||'audio/mp4').split(';')[0];
      var rd=new FileReader();
      rd.onload=function(){
        QC.writeMsg({
          id:QC.uid+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6),
          uid:QC.uid,
          user:S.name,
          text:'',
          time:Date.now(),
          type:'audio',
          audio:rd.result,
          dur:dur,
          mime:usedMime,
          editedAt:0,
          deleted:false,
          avatar:S.avatar,
          avatarColor:S.avatarColor,
          avatarImg:S.avatarImg||''
        });
        QC.Sound.play('send');
      };
      rd.readAsDataURL(new Blob(chunks,{type:mr.mimeType||'audio/mp4'}));
    };
    mr.start(250);
    if(composer) composer.classList.add('recording');
    var mb=document.getElementById('btnMic');
    if(mb) mb.classList.add('recording');
    var ri=document.getElementById('recIndicator');
    if(ri) ri.classList.add('on');
    var inp=document.getElementById('input');
    if(inp) inp.style.display='none';
    tmr=setInterval(function(){
      var s=Math.floor((Date.now()-t0)/1000);
      var rt=document.getElementById('recTime');
      if(rt) rt.textContent=Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);
    },250);
  })
  .catch(function(){
    toast('Izinkan akses mikrofon','🎙');
  });
}

function stopRec(){
  if(!mr || mr.state!=='recording') return;
  clearInterval(tmr);
  mr.stop();
  if(composer) composer.classList.remove('recording');
  var mb=document.getElementById('btnMic');
  if(mb) mb.classList.remove('recording');
  var ri=document.getElementById('recIndicator');
  if(ri) ri.classList.remove('on');
  var inp=document.getElementById('input');
  if(inp) inp.style.display='';
}

var btnMic=document.getElementById('btnMic');
if(btnMic){
  btnMic.onclick=function(){
    if(mr && mr.state==='recording') stopRec();
    else startRec();
  };
}

/* ===== 4) Penampil gambar layar penuh ===== */
var mm=document.createElement('div');
mm.className='media-modal hidden';
mm.id='mediaModal';
mm.innerHTML='<button class="mm-close" type="button">'+icon('x')+'</button><img id="mmImg" alt="">';
document.body.appendChild(mm);

var mmClose=mm.querySelector('.mm-close');
if(mmClose) mmClose.onclick=function(){ mm.classList.add('hidden'); };
mm.addEventListener('click',function(e){
  if(e.target===mm) mm.classList.add('hidden');
});

window.QC_MEDIA={
  viewImage:function(src){
    var mi=document.getElementById('mmImg');
    if(mi) mi.src=src;
    mm.classList.remove('hidden');
  }
};

/* ===== 5) Video call (WebRTC P2P, sinyal lewat MQTT) ===== */
document.body.insertAdjacentHTML('beforeend',
  '<div id="callModal" class="call-modal hidden">'+
    '<div class="call-remote">'+
      '<video id="remoteVideo" autoplay playsinline></video>'+
      '<div id="callPlaceholder" class="call-placeholder">'+
        '<div id="callBigAv" class="big-av">🦊</div>'+
        '<div id="callBigName">—</div>'+
      '</div>'+
      '<div id="callStatus" class="call-status" style="display:none">'+
        '<span id="callStatusText">Memanggil…</span>'+
        '<small id="callStatusSub"></small>'+
      '</div>'+
      '<div class="call-info">'+
        '<span id="callName">—</span>'+
        '<small id="callTimer">00:00</small>'+
      '</div>'+
      '<div class="call-local">'+
        '<video id="localVideo" autoplay playsinline muted></video>'+
      '</div>'+
    '</div>'+
    '<div class="call-controls">'+
      '<button id="ctrlMute" class="ctrl-mute" type="button">'+icon('mic')+'</button>'+
      '<button id="ctrlVideo" class="ctrl-video" type="button">'+icon('videoCam')+'</button>'+
      '<button id="ctrlEnd" class="ctrl-end" type="button">'+icon('phoneOff')+'</button>'+
    '</div>'+
  '</div>'+
  '<div id="incomingCall" class="incoming-call hidden">'+
    '<div class="ic-top">'+
      '<div id="icAv" class="ic-av">🦊</div>'+
      '<div class="ic-name">'+
        '<div id="icName">—</div>'+
        '<small>📞 Panggilan video masuk…</small>'+
      '</div>'+
    '</div>'+
    '<div class="ic-actions">'+
      '<button id="icDecline" class="ic-decline" type="button">'+icon('phoneOff')+'</button>'+
      '<button id="icAccept" class="ic-accept" type="button">'+icon('phone')+'</button>'+
    '</div>'+
  '</div>'
);

var pc=null, ls=null, active=false, answered=false, partner=null, incoming=null, ctmr=null, sec=0;
var ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]};

function initialsOf(n){
  var p=String(n).trim().split(/\s+/).slice(0,2), o='';
  for(var i=0;i<p.length;i++) o+=p[i].charAt(0).toUpperCase();
  return o||'?';
}

function setAv(elId, p){
  var e=document.getElementById(elId);
  if(!e) return;
  if(p.avatarImg){
    e.innerHTML='<img src="'+p.avatarImg+'" alt="">';
  } else {
    e.textContent=p.avatar||initialsOf(p.user);
    e.style.background='linear-gradient(145deg,rgba(255,255,255,.3),rgba(0,0,0,.12)),'+QC.COLORS[(p.avatarColor||0)%QC.COLORS.length];
  }
}

function csend(o){
  if(!partner || !S.room) return;
  QC.publishTo(QC.callTopic(S.room, QC.uid, partner), Object.assign({},o,{from:QC.uid, room:S.room}));
}

function openUI(p, ans){
  var cm=document.getElementById('callModal');
  if(cm) cm.classList.remove('hidden');
  setAv('callBigAv', p);
  var bn=document.getElementById('callBigName');
  if(bn) bn.textContent=p.user;
  var cn=document.getElementById('callName');
  if(cn) cn.textContent=p.user;
  var ph=document.getElementById('callPlaceholder');
  if(ph) ph.style.display='';
  var st=document.getElementById('callStatus');
  if(st) st.style.display=ans?'none':'';
}

function timer(){
  answered=true;
  sec=0;
  clearInterval(ctmr);
  ctmr=setInterval(function(){
    sec++;
    var ct=document.getElementById('callTimer');
    if(ct) ct.textContent=('0'+Math.floor(sec/60)).slice(-2)+':'+('0'+(sec%60)).slice(-2);
  },1000);
}

function getMedia(){
  return navigator.mediaDevices.getUserMedia({video:true, audio:{echoCancellation:true, noiseSuppression:true}})
    .catch(function(){
      return navigator.mediaDevices.getUserMedia({audio:true});
    });
}

function wirePC(){
  pc=new RTCPeerConnection(ICE);
  ls.getTracks().forEach(function(t){ pc.addTrack(t, ls); });
  pc.ontrack=function(e){
    var rv=document.getElementById('remoteVideo');
    if(rv) rv.srcObject=e.streams[0];
    var ph=document.getElementById('callPlaceholder');
    if(ph) ph.style.display='none';
  };
  pc.onicecandidate=function(e){
    if(e.candidate) csend({type:'ice', cand:e.candidate});
  };
  pc.onconnectionstatechange=function(){
    if(pc && /disconnected|failed|closed/.test(pc.connectionState)) endCall(true);
  };
}

function startCall(u){
  if(active){
    toast('Sedang dalam panggilan','📞');
    return;
  }
  var p=S.presence.get(u);
  if(!p){
    toast('Pengguna tidak online','🚫');
    return;
  }
  partner=u;
  answered=false;
  getMedia().then(function(st){
    ls=st;
    var lv=document.getElementById('localVideo');
    if(lv) lv.srcObject=st;
    openUI(p, false);
    wirePC();
    return pc.createOffer().then(function(of){
      return pc.setLocalDescription(of).then(function(){
        csend({type:'offer', sdp:of});
        active=true;
        setTimeout(function(){
          if(!answered && active){
            endCall(true);
            toast('Tidak ada jawaban. Pastikan perangkat tujuan terbuka.','📞');
          }
        },30000);
      });
    });
  }).catch(function(){
    endCall(true);
    toast('Izinkan kamera & mic untuk video call','🎥');
  });
}

function accept(){
  if(!incoming) return;
  var of=incoming.offer, from=incoming.from;
  partner=from;
  incoming=null;
  answered=false;
  var ic=document.getElementById('incomingCall');
  if(ic) ic.classList.add('hidden');
  var p=S.presence.get(from)||{user:'Teman', avatar:'🦊', avatarColor:0};
  getMedia().then(function(st){
    ls=st;
    var lv=document.getElementById('localVideo');
    if(lv) lv.srcObject=st;
    openUI(p, true);
    wirePC();
    return pc.setRemoteDescription(of).then(function(){
      return pc.createAnswer();
    }).then(function(an){
      return pc.setLocalDescription(an).then(function(){
        csend({type:'answer', sdp:an});
        active=true;
        timer();
      });
    });
  }).catch(function(){
    endCall(true);
    toast('Izinkan kamera & mic untuk video call','🎥');
  });
}

function decline(){
  if(incoming){
    csend({type:'decline'});
    incoming=null;
  }
  var ic=document.getElementById('incomingCall');
  if(ic) ic.classList.add('hidden');
}

function endCall(silent){
  clearInterval(ctmr);
  if(pc){
    try{ pc.close(); }catch(e){}
    pc=null;
  }
  if(ls){
    ls.getTracks().forEach(function(t){ t.stop(); });
    ls=null;
  }
  if(partner && !silent) csend({type:'end'});
  active=false;
  answered=false;
  partner=null;
  var cm=document.getElementById('callModal');
  if(cm) cm.classList.add('hidden');
  var rv=document.getElementById('remoteVideo');
  if(rv) rv.srcObject=null;
  var lv=document.getElementById('localVideo');
  if(lv) lv.srcObject=null;
}

QC.onCallSignal=function(d){
  if(!d || d.from===QC.uid || !S.joined) return;
  if(d.type==='offer'){
    if(active){
      csend({type:'busy'});
      return;
    }
    var p=S.presence.get(d.from)||{user:'Teman', avatar:'🦊', avatarColor:0};
    incoming={from:d.from, offer:d.sdp};
    setAv('icAv', p);
    var icn=document.getElementById('icName');
    if(icn) icn.textContent=p.user;
    var ic=document.getElementById('incomingCall');
    if(ic) ic.classList.remove('hidden');
    QC.Sound.play('call');
    setTimeout(function(){
      if(incoming) decline();
    },30000);
  }
  else if(d.type==='answer' && pc){
    pc.setRemoteDescription(d.sdp).then(timer).catch(function(){});
  }
  else if(d.type==='ice' && pc){
    pc.addIceCandidate(d.cand).catch(function(){});
  }
  else if(d.type==='decline' || d.type==='busy' || d.type==='end'){
    endCall(true);
  }
};

QC.startCall=startCall;
QC.endCall=endCall;

var icAccept=document.getElementById('icAccept');
if(icAccept) icAccept.onclick=accept;

var icDecline=document.getElementById('icDecline');
if(icDecline) icDecline.onclick=decline;

var ctrlMute=document.getElementById('ctrlMute');
if(ctrlMute){
  ctrlMute.onclick=function(){
    if(!ls) return;
    var a=ls.getAudioTracks()[0];
    if(!a) return;
    a.enabled=!a.enabled;
    this.classList.toggle('on', !a.enabled);
  };
}

var ctrlVideo=document.getElementById('ctrlVideo');
if(ctrlVideo){
  ctrlVideo.onclick=function(){
    if(!ls) return;
    var v=ls.getVideoTracks()[0];
    if(!v){
      toast('Video tidak tersedia','📷');
      return;
    }
    v.enabled=!v.enabled;
    this.classList.toggle('off', !v.enabled);
  };
}

var ctrlEnd=document.getElementById('ctrlEnd');
if(ctrlEnd){
  ctrlEnd.onclick=function(){ endCall(false); };
}

/* Tambahkan tombol video call di daftar online */
var origRenderPeople=QC.renderPeople;
if(origRenderPeople){
  QC.renderPeople=function(){
    origRenderPeople();
    var ul=document.getElementById('peopleList');
    if(!ul) return;
    ul.querySelectorAll('.p-call').forEach(function(b){
      b.onclick=function(){
        var u=b.dataset.call;
        if(QC.startCall) QC.startCall(u);
        else toast('Video call tidak tersedia','📞');
      };
    });
  };
}

window.QC_MEDIA=true;
console.log('✅ Media module loaded successfully');

}catch(e){
  console.error('Media module error:', e);
  try{ QC.toast('Modul media gagal: '+e.message,'⚠️'); }catch(x){}
}
}
})();
