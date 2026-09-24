// Refresh the offline snapshot using committed Markdown from a local idea clone.
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const {eligible,compile}=require('../js/idea-source.js');
const source=path.resolve(process.argv[2]||'../idea'),ref=process.argv[3]||'origin/main';
const git=args=>execFileSync('git',['-C',source,...args],{encoding:'utf8'});
const files=git(['ls-tree','-r','--name-only','-z',ref]).split('\0').filter(eligible);
const cards=compile(files.map(p=>({source:p,markdown:git(['show',ref+':'+p])})));
if(!cards.length)throw Error('No idea notes found');
fs.writeFileSync(path.join(__dirname,'../data/ideas.js'),'/* Generated from '+git(['rev-parse',ref]).trim()+'; run node scripts/build-ideas.cjs <idea-clone>. */\nwindow.IDEA_SNAPSHOT = '+JSON.stringify(cards,null,2)+';\n');
console.log('Built '+cards.length+' idea buildings.');
