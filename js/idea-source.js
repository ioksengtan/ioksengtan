(function (scope) {
  'use strict';
  const repo = 'ioksengtan/idea';
  const known = ['AI/卡片大小本地大模型電腦選型.md','Maker/M5Stack研究.md','Maker/今日鳥訪客電子紙畫框.md','Maker/ESP32超音波掃描避障車.md','Maker/3D列印迷你RC車模組化底盤.md','Maker/桌上型縮景越野場.md','Maker/韓屋迷你氛圍燈.md','hot-stir-fry/README.md','Maker/機械肢體.md','Design/互動式咖啡店手繪平面圖.md','Maker/可程式化電子活動識別證.md','AI/Agents Office 專案拆解.md','AI/Bot Crossing 專案拆解.md'];
  const plain = s => s.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/<[^>]*>/g,'').replace(/[*_`]/g,'').trim();
  function eligible(p) { return /\.md$/i.test(p) && !p.split('/').some(x => x.startsWith('.') || ['node_modules','vendor'].includes(x)) && (!/^(readme|agents|license|changelog|contributing)\.md$/i.test(p.split('/').pop()) || known.includes(p)); }
  function parse(source, markdown) {
    const text=markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').replace(/```[^\n]*\n[\s\S]*?```/g,'');
    const title=plain(text.match(/^#\s+(.+)$/m)?.[1] || source.split('/').pop().replace(/\.md$/i,''));
    const sections=text.split(/^##\s+/m);
    const preferred=sections.find(s=>/^(點子|核心概念|專案概述|概念|簡介|目標)\s*\r?\n/.test(s));
    const paragraphs=(preferred ? preferred.replace(/^[^\n]*\n/,'') : text).split(/\r?\n\s*\r?\n/).map(plain).filter(s=>s && !/^#|^\||^[-=]{3}|^(記錄日期|靈感來源|原專案|開源程式|更新日期|資料來源)[:：]/.test(s));
    const category=source.includes('/')?source.split('/')[0]:'其他';
    const corpus=title+' '+paragraphs.slice(0,2).join(' ');
    const model=known.indexOf(source);
    const theme=/鳥|聲音|感測|電子紙/.test(corpus)?'sensing':/車|機械|硬體|模組|ESP32/.test(corpus)?'maker':/咖啡|料理|食|餐/.test(corpus)?'food':/AI|agent|模型|運算/i.test(corpus)?'ai':'creative';
    return {source,title,category,summary:(paragraphs[0]||title).slice(0,700),more:paragraphs.slice(1,4).join('\n\n').slice(0,1800),model,theme,url:'https://github.com/'+repo+'/blob/main/'+source.split('/').map(encodeURIComponent).join('/')};
  }
  function sort(cards) { return cards.sort((a,b)=>(a.model<0?999:a.model)-(b.model<0?999:b.model)||a.source.localeCompare(b.source,'en')); }
  async function load(snapshot) {
    const status=document.getElementById('source-status');
    status.textContent='正在同步點子 repo…';
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    try {
      const get=async url=>{const r=await fetch(url,{signal:controller.signal});if(!r.ok)throw Error('HTTP '+r.status);return r;};
      const commit=await (await get('https://api.github.com/repos/'+repo+'/commits/main')).json();
      const tree=await (await get('https://api.github.com/repos/'+repo+'/git/trees/'+commit.sha+'?recursive=1')).json();
      if(tree.truncated)throw Error('Incomplete tree');
      const paths=tree.tree.filter(x=>x.type==='blob'&&eligible(x.path)).map(x=>x.path);
      if(!paths.length || paths.length>500)throw Error('Unexpected source size');
      const cards=[];let cursor=0;
      await Promise.all(Array.from({length:Math.min(6,paths.length)},async()=>{while(cursor<paths.length){const path=paths[cursor++];const md=await (await get('https://raw.githubusercontent.com/'+repo+'/'+commit.sha+'/'+path.split('/').map(encodeURIComponent).join('/'))).text();cards.push(parse(path,md));}}));
      status.textContent='已同步 repo · '+cards.length+' 個點子 · '+commit.sha.slice(0,7);
      return sort(cards);
    } catch {status.textContent='目前顯示部署快照 · '+snapshot.length+' 個點子（暫時無法同步）';return snapshot;}
    finally {clearTimeout(timeout);}
  }
  const api={parse,eligible,sort,load};
  if(typeof module!=='undefined')module.exports=api;else scope.IdeaSource=api;
})(globalThis);
