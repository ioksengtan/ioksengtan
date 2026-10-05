// 以已提交的 Markdown 重新產生離線快照（idea/data/ideas.js）。
// 在個人站根目錄執行：node idea/scripts/build-ideas.cjs [ref]，ref 預設 HEAD。
// 日期來自 data/growth.json；對不到的筆記改查 git 第一次加入的提交日。
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const {eligible,compile,applyDates}=require('../js/idea-source.js');
const site=path.resolve(__dirname,'../..'),root='idea/',ref=process.argv[2]||'HEAD';
const git=args=>execFileSync('git',['-C',site,'-c','core.quotepath=false',...args],{encoding:'utf8',maxBuffer:1<<28});
const files=git(['ls-tree','-r','--name-only','-z',ref,root]).split('\0').filter(p=>p.startsWith(root)).map(p=>p.slice(root.length)).filter(eligible);
const sha=git(['rev-parse',ref]).trim();
let cards=compile(files.map(p=>({source:p,markdown:git(['show',ref+':'+root+p])})),sha);
if(!cards.length)throw Error('No idea notes found');
let growth=null;try{growth=JSON.parse(fs.readFileSync(path.join(site,'data/growth.json'),'utf8'));}catch{}
const day=iso=>new Date(iso).toLocaleDateString('sv-SE',{timeZone:'Asia/Taipei'});
// 併入前的提交用舊路徑（沒有 idea/ 前綴），兩個路徑一起查。
const firstAdded=p=>{const out=git(['log',ref,'--full-history','--reverse','--diff-filter=A','--format=%aI','--',root+p,p]).split('\n').find(Boolean);return out&&day(out);};
cards=applyDates(cards,growth);
// 清單項目若還不在 growth.json（每週才更新），取清單檔最近一次提交日；其他筆記取第一次加入日。
const lastTouched=p=>{const out=git(['log',ref,'--format=%aI','-1','--',root+p]).trim();return out&&day(out);};
for(const c of cards)if(!c.addedAt){const d=c.ordinal?lastTouched(c.source):firstAdded(c.source);if(d)c.addedAt=d;}
cards=applyDates(cards,null,Object.fromEntries(cards.filter(c=>c.addedAt).map(c=>[c.id||c.source,c.addedAt])));
fs.writeFileSync(path.join(__dirname,'../data/ideas.js'),'/* Generated from '+sha+'; run node idea/scripts/build-ideas.cjs from the site root. */\nwindow.IDEA_SNAPSHOT = '+JSON.stringify(cards,null,2)+';\n');
console.log('Built '+cards.length+' idea buildings, '+cards.filter(c=>c.addedAt).length+' dated.');
