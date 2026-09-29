window.CityNeighborhoods=(()=>{
 function layout(count){const lots=[];for(let i=0;i<count;i++){lots.push({kind:'idea',i});if(i%4===1)lots.push({kind:'park',variant:Math.floor(i/4)%3});if(i%4===3)lots.push({kind:'homes',variant:Math.floor(i/4)%3});}const cols=Math.max(4,Math.ceil(Math.sqrt(lots.length)));return{cols,rows:Math.ceil(lots.length/cols),lots:lots.map((lot,index)=>({...lot,x:index%cols*155+10,y:Math.floor(index/cols)*155+10}))};}
 function draw(lot,a){const {box,poly,line,tree,bench,lamp,roofGable,windows,wall,mint,blue,rose,roof,dark,gold}=a,{x,y,variant}=lot;
  box(x,y,-7,118,112,7,['#bccc9f','#9aad85','#839a73']);
  if(lot.kind==='park'){
   poly([[x+5,y+5,.1],[x+113,y+5,.1],[x+113,y+107,.1],[x+5,y+107,.1]],'#b0c696');
   line([[x+7,y+57,1],[x+42,y+57,1],[x+62,y+78,1],[x+113,y+78,1]],'#ded8b8',10);
   if(variant===0){poly([[x+45,y+19,1],[x+78,y+14,1],[x+94,y+34,1],[x+81,y+52,1],[x+50,y+44,1]],'#7ea9a6');line([[x+56,y+24,1.2],[x+73,y+22,1.2]],'#c7dfc7',1);box(x+37,y+33,2,16,30,3,roof);for(let n=0;n<5;n++)line([[x+38,y+35+n*5,5.1],[x+52,y+35+n*5,5.1]],'#e2bf97',.8);}
   if(variant===1){for(let n=0;n<3;n++){box(x+47+n*17,y+18,0,13,31,3,roof);for(let m=0;m<4;m++)box(x+50+n*17,y+21+m*6,3,6,4,2,n%2?gold:mint);}box(x+71,y+91,0,27,12,3,wall);}
   if(variant===2){box(x+43,y+20,0,40,35,2,wall);for(const xx of [46,76])for(const yy of [23,48])box(x+xx,y+yy,2,2,2,27,roof);roofGable(x+41,y+18,30,45,39,mint);bench(x+50,y+32);}
   [[17,18,1.15],[22,92,.85],[103,21,.9],[91,96,.7]].forEach(([xx,yy,s])=>tree(x+xx,y+yy,s));bench(x+13,y+64);bench(x+72,y+66);lamp(x+108,y+101);
  }else{
   line([[x+10,y+91,1],[x+108,y+91,1]],'#ded7bb',9);
   const homes=variant===2?[[12,19,38,44],[65,28,35,35]]:[[12,17,30,40],[51,12,30,49],[82,49,27,31]];
   homes.forEach(([xx,yy,w,h],n)=>{const d=32,col=[wall,mint,rose][(n+variant)%3];box(x+xx,y+yy,0,w,d,h,col);windows(x+xx,y+yy,0,w,d,h);roofGable(x+xx,y+yy,h,w,d,(n+variant)%2?dark:roof);box(x+xx+w/2-3,y+yy+d,0,7,1,13,roof);line([[x+xx+w/2,y+yy+d+1,1],[x+xx+w/2,y+91,1]],'#ded7bb',5);box(x+xx+4,y+yy+5,h+8,4,5,12,wall);});
   tree(x+15,y+78,.55);tree(x+103,y+20,.7);for(let n=0;n<7;n++)box(x+11+n*14,y+105,0,2,2,7,wall);line([[x+11,y+105,5],[x+97,y+105,5]],'#e1d8b9',1.3);lamp(x+111,y+102);
  }
 }
 return{layout,draw};
})();
