window.CityNeighborhoods=(()=>{
 // Append-only square-shell districts: increasing the count never moves existing plots.
 function district(n){let side=Math.floor(Math.sqrt(n)),offset=n-side*side;return offset<=side?[side,offset]:[2*side-offset,side];}
 const cache=new Map();
 function layout(count){
  if(cache.has(count))return cache.get(count);
  const lots=[],districts=[];let cols=3,rows=3;
  for(let d=0;d<Math.ceil(count/8);d++){
   const [dx,dy]=district(d),cx=dx*3,cy=dy*3;
   districts.push({x:cx*155,y:cy*155});cols=Math.max(cols,cx+3);rows=Math.max(rows,cy+3);
   // Eight resident homes share a central garden; vacant plots stay green.
   for(let slot=0;slot<9;slot++){
    const corner=[0,1,2,5,8,7,6,3].indexOf(slot),i=d*8+corner;
    const kind=corner>=0&&i<count?'idea':'park';
    lots.push({kind,...(kind==='idea'?{i}:{}),seed:d*19+slot*7,variant:(d+slot*5)%6,x:(cx+slot%3)*155+10,y:(cy+Math.floor(slot/3))*155+10});
   }
  }
  const result={cols,rows,lots,districts};if(cache.size>128)cache.clear();cache.set(count,result);return result;
 }
 function draw(lot,a){const {box,poly,line,tree,bench,lamp,roofGable,windows,wall,mint,blue,rose,roof,dark,gold}=a,{x,y,variant}=lot;
  box(x,y,-7,118,112,7,['#bccc9f','#9aad85','#839a73']);
  if(lot.kind==='park'){
   poly([[x+5,y+5,.1],[x+113,y+5,.1],[x+113,y+107,.1],[x+5,y+107,.1]],'#b0c696');
   const seed=lot.seed||0,shift=seed%13;
   line([[x+7,y+57,1],[x+35+shift,y+57,1],[x+62,y+70-shift,1],[x+113,y+70-shift,1]],'#ded8b8',variant%2?7:10);
   if(variant===0){poly([[x+45,y+19,1],[x+78,y+14,1],[x+94,y+34,1],[x+81,y+52,1],[x+50,y+44,1]],'#7ea9a6');line([[x+56,y+24,1.2],[x+73,y+22,1.2]],'#c7dfc7',1);box(x+37,y+33,2,16,30,3,roof);for(let n=0;n<5;n++)line([[x+38,y+35+n*5,5.1],[x+52,y+35+n*5,5.1]],'#e2bf97',.8);}
   if(variant===1){for(let n=0;n<3;n++){box(x+47+n*17,y+18,0,13,31,3,roof);for(let m=0;m<4;m++)box(x+50+n*17,y+21+m*6,3,6,4,2,n%2?gold:mint);}box(x+71,y+91,0,27,12,3,wall);}
   if(variant===2){box(x+43,y+20,0,40,35,2,wall);for(const xx of [46,76])for(const yy of [23,48])box(x+xx,y+yy,2,2,2,27,roof);roofGable(x+41,y+18,30,45,39,mint);bench(x+50,y+32);}
   if(variant===3){box(x+36,y+20,0,48,34,2,wall);box(x+43,y+26,2,34,22,2,blue);box(x+55,y+32,4,8,8,11,wall);line([[x+59,y+36,15],[x+59,y+36,23]],'#8fafab',3);}
   if(variant===4){for(let n=0;n<3;n++){box(x+34+n*21,y+20+n*7,0,15,22,3,roof);for(let m=0;m<3;m++)box(x+37+n*21,y+23+n*7+m*6,3,8,3,3,[rose,gold,mint][(n+m)%3]);}bench(x+43,y+87);}
   if(variant===5){for(const xx of [40,74]){box(x+xx,y+21,0,3,3,28,roof);box(x+xx,y+46,0,3,3,28,roof);}line([[x+41,y+23,28],[x+76,y+23,28]],roof[2],3);for(const xx of [50,66]){line([[x+xx,y+23,27],[x+xx,y+31,10]],dark[2],1);box(x+xx-4,y+29,9,8,6,2,gold);}}
   [[13+shift,14,.8+seed%4*.12],[18,91-shift,.65],[103-shift,18,.9],[94,98,.6+seed%3*.1]].forEach(([xx,yy,s])=>tree(x+xx,y+yy,s));bench(x+13,y+64);bench(x+72,y+66);lamp(x+108,y+101);
  }else{
   // One two-storey Japanese detached home per plot: stepped roof, genkan and enclosed garden.
   const plaster=['#f3ead4','#e5d9bd','#c7bea6'],tiles=variant===1?['#b78068','#98624f','#805447']:['#c28a71','#a56d57','#865746'];
   const timber=['#c3a384','#a08368','#806956'],glass='#8fafab';
   box(x+5,y+7,0,108,3,13,wall);box(x+5,y+7,0,3,96,13,wall);
   poly([[x+9,y+11,.2],[x+109,y+11,.2],[x+109,y+99,.2],[x+9,y+99,.2]],'#b6c69e');
   box(x+18,y+19,0,70,53,4,['#c4c4af','#a9ad98','#909b87']);
   box(x+21,y+21,4,62,48,29,plaster);
   box(x+27,y+22,33,50,38,28,plaster);
   // Lower eaves wrap around the projecting ground floor; the taller roof sits behind them.
   poly([[x+17,y+61,35],[x+86,y+61,35],[x+86,y+74,29],[x+17,y+74,29]],tiles[1]);
   poly([[x+77,y+18,35],[x+89,y+18,29],[x+89,y+74,29],[x+77,y+61,35]],tiles[2]);
   for(let n=0;n<12;n++)line([[x+18+n*6,y+61,35.1],[x+18+n*6,y+74,29.2]],tiles[2],.65);
   line([[x+17,y+74,29],[x+87,y+74,29]],timber[2],1.8);
   roofGable(x+23,y+18,63,58,47,tiles);
   line([[x+52,y+15,78],[x+52,y+68,78]],tiles[0],2);
   // Broad sliding windows with shutters and timber sills.
   const windowFront=(xx,yy,z,w,h)=>{box(x+xx-1,y+yy,z-1,w+2,1,h+2,timber);poly([[x+xx,y+yy+1.2,z],[x+xx+w,y+yy+1.2,z],[x+xx+w,y+yy+1.2,z+h],[x+xx,y+yy+1.2,z+h]],glass);line([[x+xx+w/2,y+yy+1.4,z],[x+xx+w/2,y+yy+1.4,z+h]],'#e8dec4',1);line([[x+xx,y+yy+1.4,z+h*.45],[x+xx+w,y+yy+1.4,z+h*.45]],'#e8dec4',.8);box(x+xx-2,y+yy,z-2,w+4,3,2,timber);};
   windowFront(31,60,41,17,15);windowFront(56,60,41,17,15);
   for(const xx of [29,49,54,74])box(x+xx,y+60,40,2,2,17,timber);
   windowFront(49,69,9,25,15);
   poly([[x+83.2,y+30,10],[x+83.2,y+47,10],[x+83.2,y+47,24],[x+83.2,y+30,24]],glass);
   line([[x+83.4,y+38,10],[x+83.4,y+38,24]],'#eee1c4',1);
   box(x+27,y+69,4,15,1.5,22,timber);poly([[x+30,y+70.6,16],[x+39,y+70.6,16],[x+39,y+70.6,23],[x+30,y+70.6,23]],'#acbcb0');
   box(x+26,y+71,2,18,9,2,wall);box(x+24,y+77,0,22,6,2,wall);
   line([[x+35,y+82,1],[x+35,y+109,1]],'#d9d5bf',13);for(let n=0;n<4;n++)line([[x+29,y+85+n*6,1.2],[x+41,y+85+n*6,1.2]],'#b5bba5',.6);
   // Garden, low masonry boundary, gate posts, nameplate and mailbox.
   tree(x+99,y+25,.9);tree(x+92,y+84,.65);box(x+61,y+84,0,18,7,4,roof);for(let n=0;n<3;n++)box(x+63+n*5,y+85,4,3,3,3,[rose,gold,mint][(n+variant)%3]);
   box(x+6,y+102,0,19,3,13,wall);box(x+46,y+102,0,67,3,13,wall);box(x+23,y+100,0,4,7,18,wall);box(x+44,y+100,0,4,7,18,wall);
   for(let n=0;n<4;n++)line([[x+48,y+105.2,3+n*3],[x+112,y+105.2,3+n*3]],'#b4baa3',.5);
   box(x+44,y+107,10,4,1,5,dark);box(x+51,y+105,7,9,3,5,roof);line([[x+52,y+108.2,10],[x+59,y+108.2,10]],'#ead9b7',.8);lamp(x+112,y+108);
  }
 }
 return{layout,draw};
})();
