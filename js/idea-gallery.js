window.IdeaGallery=(()=>{
  let dialog,returnFocus;
  function viewer(){if(dialog)return dialog;dialog=document.createElement('dialog');dialog.id='idea-image-viewer';dialog.setAttribute('aria-label','點子原始參考圖');
    const close=document.createElement('button');close.type='button';close.textContent='關閉圖片 ×';close.onclick=()=>dialog.close();const img=document.createElement('img');const caption=document.createElement('p');dialog.append(close,img,caption);document.body.append(dialog);
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>returnFocus?.isConnected&&returnFocus.focus({preventScroll:true}));return dialog;
  }
  function render(card,container){container.replaceChildren();
    const images=[...(card.images||[]),...(card.related||[]).flatMap(n=>n.images||[])].filter((im,i,all)=>all.findIndex(a=>a.src===im.src)===i);container.hidden=!images.length;
    images.forEach((im,index)=>{const figure=document.createElement('figure'),button=document.createElement('button'),img=document.createElement('img'),caption=document.createElement('figcaption');button.type='button';button.className='idea-image-open';button.setAttribute('aria-label','放大'+im.alt);img.src=im.src;img.alt=im.alt;img.loading='lazy';img.decoding='async';caption.textContent='原始參考圖'+(images.length>1?' '+(index+1):'')+' · 點圖放大';img.onerror=()=>{caption.textContent='圖片暫時無法載入，可點擊重試';};
      button.append(img);button.onclick=()=>{returnFocus=button;const d=viewer(),large=d.querySelector('img');large.src=im.src;large.alt=im.alt;d.querySelector('p').textContent=im.alt;d.showModal();};figure.append(button,caption);container.append(figure);});
  }return {render};
})();
