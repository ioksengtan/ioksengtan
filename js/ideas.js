
 (()=>{
 const root=document.getElementById('iso-ideas'),q=s=>root.querySelector(s),canvas=q('canvas'),ctx=canvas.getContext('2d');
 let cards=window.IDEA_SNAPSHOT;
 const makeIdeas=()=>cards.map(c=>[c.title,c.theme,c.summary]);
 let ideas=makeIdeas(),count=cards.length,selected=0;const design={trees:true,roofDetail:true};
 function save(){}
 let cardOpen=false;
 let scale=1,ox=0,oy=0,hits=[],zoom=1,focus=false,panX=0,panY=0;
 const P=(x,y,z=0)=>[ox+(x-y)*.8660254*scale,oy+((x+y)*.5-z)*scale];
 function poly(points,color,stroke){ctx.beginPath();points.forEach((p,i)=>{const a=P(...p);i?ctx.lineTo(...a):ctx.moveTo(...a);});ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.7*scale;ctx.stroke();}}
 function line(points,color,width=1){ctx.beginPath();points.forEach((p,i)=>{const a=P(...p);i?ctx.lineTo(...a):ctx.moveTo(...a);});ctx.strokeStyle=color;ctx.lineWidth=width*scale;ctx.stroke();}
 function box(x,y,z,w,d,h,c){poly([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],c[1]);poly([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],c[2]);poly([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],c[0]);}
 const wall=['#f1e6c9','#dacbaa','#b4ad94'],mint=['#bad5c2','#89b2a6','#628f87'],blue=['#b1d4d9','#80acb7','#578b9c'],rose=['#e8b2a0','#c9907f','#a17063'],roof=['#de9d78','#b67559','#995a49'],dark=['#788d8a','#526c6a','#3c5557'],gold=['#ecd199','#d2ad70','#b58b53'];
 function roofGable(x,y,z,w,d,c=roof){poly([[x-3,y-3,z],[x+w/2,y-3,z+15],[x+w/2,y+d+3,z+15],[x-3,y+d+3,z]],c[0]);poly([[x+w/2,y-3,z+15],[x+w+3,y-3,z],[x+w+3,y+d+3,z],[x+w/2,y+d+3,z+15]],c[1]);poly([[x,y+d,z],[x+w,y+d,z],[x+w/2,y+d,z+15]],wall[1]);if(design.roofDetail){for(let v=6;v<d;v+=8)line([[x-3,y+v,z],[x+w/2,y+v,z+15],[x+w+3,y+v,z]],c[2],.7);}}
 function windows(x,y,z,w,d,h){for(let zz=10;zz<h-5;zz+=16){for(let xx=8;xx<w-6;xx+=13){poly([[x+xx,y+d+.15,z+zz],[x+xx+7,y+d+.15,z+zz],[x+xx+7,y+d+.15,z+zz+9],[x+xx,y+d+.15,z+zz+9]],'#536f70');line([[x+xx,y+d+.2,z+zz+4],[x+xx+7,y+d+.2,z+zz+4]],'#e5d5aa',.8);}for(let yy=7;yy<d-6;yy+=13)poly([[x+w+.15,y+yy,z+zz],[x+w+.15,y+yy+6,z+zz],[x+w+.15,y+yy+6,z+zz+9],[x+w+.15,y+yy,z+zz+9]],'#547d85');}}
 function tree(x,y,size=1){box(x-1,y-1,0,2,2,14*size,roof);const a=P(x,y,22*size);ctx.fillStyle='#4f8064';ctx.beginPath();ctx.ellipse(a[0],a[1],10*size*scale,13*size*scale,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#78a37c';ctx.beginPath();ctx.ellipse(a[0]-3*size*scale,a[1]-4*size*scale,7*size*scale,9*size*scale,0,0,Math.PI*2);ctx.fill();}
 function lamp(x,y){line([[x,y,0],[x,y,25]],'#5d746b',1.8);box(x-2,y-2,25,4,4,3,gold);}
 function car(x,y,c=rose){box(x,y,1,18,9,6,c);box(x+4,y+1,7,8,7,4,blue);for(const xx of [3,14])box(x+xx,y+8,0,3,2,4,dark);}
 function bench(x,y){box(x,y,2,16,5,3,roof);box(x,y+4,5,16,1.5,6,roof);}
 function sign(x,y,z,text){const a=P(x,y,z);ctx.save();ctx.translate(...a);ctx.transform(.8660254*scale,.5*scale,0,scale,0,0);ctx.fillStyle='#fff0c9';ctx.fillRect(-17,-6,34,11);ctx.fillStyle='#596457';ctx.font='5px sans-serif';ctx.textAlign='center';ctx.fillText(text,0,1);ctx.restore();}

 const features=['散熱鰭片、電路立面、屋頂晶片與運算指示燈','堆疊模組、像素螢幕、旋鈕與彩色接頭','巨型電子紙鳥類畫框、鳥巢庭園與收音麥克風','雙眼超音波探頭、雷達底座與輪式測試車','輪胎架、車身底盤、扳手工作檯與維修坡道','起伏坡道、木橋、溪流與迷你越野車','瓦片屋簷、木格紙窗、暖色窗光與階梯','大型炒鍋、紅色招牌、排煙管、蒸氣與圓桌','外露齒輪、機械連桿與可更換舞台','巨型咖啡杯、蛋糕櫥窗、遮陽棚與窗邊盆栽','識別證掛繩拱門、像素顯示與報到閘口','開放辦公室、四組工作站與協作機器人','大小機器人、工作告示牌與連成一片的小屋'];
 function disc(x,y,z,r,color){const p=P(x,y,z);ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(p[0],p[1],r*scale,r*scale,0,0,Math.PI*2);ctx.fill();}
 function bird(x,y,z){disc(x,y,z,2.4,'#d9ad69');line([[x-3,y,z+1],[x,y,z-1],[x+4,y,z+2]],'#556a62',1.2);}
 function robot(x,y,z,col=mint){box(x-3,y-3,z,6,6,8,col);box(x-4,y-4,z+8,8,8,6,wall);poly([[x-2,y+4.1,z+10],[x+2,y+4.1,z+10],[x+2,y+4.1,z+12],[x-2,y+4.1,z+12]],'#426664');}
 function gear(x,y,z,r){const p=P(x,y,z);ctx.save();ctx.translate(...p);ctx.scale(scale,scale);ctx.fillStyle='#b88e58';ctx.beginPath();for(let j=0;j<40;j++){const a=j*Math.PI/20,rr=j%4<2?r:r-2;const xx=Math.cos(a)*rr,yy=Math.sin(a)*rr;j?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}ctx.closePath();ctx.fill();ctx.fillStyle='#546961';ctx.beginPath();ctx.arc(0,0,r*.35,0,7);ctx.fill();ctx.restore();}
 function details(i,x,y){
 if(i===0){for(let n=0;n<6;n++)box(x+25+n*3,y+23,59,1.3,18,12,dark);box(x+43,y+48,54,15,11,3,gold);for(let n=0;n<4;n++){line([[x+22+n*9,y+62.4,8],[x+22+n*9,y+62.4,24],[x+25+n*9,y+62.4,29]],'#d7c878',.9);disc(x+25+n*9,y+62.5,29,1.2,'#eddc9a');}}
 if(i===1){for(let n=0;n<3;n++){box(x+17,y+23,37+n*10,25,22,9,[mint,blue,gold][n]);poly([[x+21,y+45.2,40+n*10],[x+32,y+45.2,40+n*10],[x+32,y+45.2,45+n*10],[x+21,y+45.2,45+n*10]],'#365861');disc(x+37,y+45.3,43+n*10,1.5,'#e7d5ac');}for(let n=0;n<4;n++)box(x+66,y+20+n*7,12,6,4,4,[roof,blue,gold,mint][n]);}
 if(i===2){box(x+18,y+63,7,27,2,19,wall);for(let n=0;n<3;n++){bird(x+23+n*8,y+65,18);bird(x+24+n*12,y+59,31);}for(let n=0;n<6;n++)line([[x+53+n,y+12,55],[x+61+n,y+20,55],[x+53+n,y+28,55]],'#a57b52',1);line([[x+69,y+39,3],[x+69,y+39,30]],'#60756c',2);disc(x+69,y+39,32,4,'#465c5a');}
 if(i===3){box(x+28,y+25,37,29,18,7,mint);for(const a of [35,49]){disc(x+a,y+43,46,7,'#d4ddca');disc(x+a,y+43.2,46,4.7,'#405957');disc(x+a-1,y+43.4,48,1.2,'#97b1a7');}box(x+34,y+27,44,5,8,6,dark);line([[x+17,y+66,4],[x+24,y+62,4],[x+30,y+65,4]],'#e0c479',2);}
 if(i===4){box(x+68,y+20,3,3,30,28,roof);for(let n=0;n<3;n++)for(let z=0;z<2;z++){disc(x+71,y+25+n*9,10+z*12,5,'#41514a');disc(x+71,y+25+n*9,10+z*12,2,'#acb7a4');}box(x+13,y+65,3,25,12,9,blue);line([[x+18,y+70,13],[x+31,y+70,13]],'#e6dab8',2);}
 if(i===5){poly([[x+47,y+8,5],[x+59,y+8,5],[x+43,y+73,5],[x+31,y+73,5]],'#7aaab0');for(let n=0;n<7;n++)box(x+25+n*4,y+38,8,3,13,3,roof);for(let n=0;n<5;n++)box(x+20+n*7,y+65-n*2,5,5,5,4+n%3,gold);}
 if(i===6){for(let a=21;a<64;a+=11){line([[x+a+3,y+59.5,10],[x+a+3,y+59.5,22]],'#9b805c',.8);line([[x+a,y+59.5,16],[x+a+7,y+59.5,16]],'#9b805c',.8);}box(x+20,y+65,6,45,5,3,wall);box(x+25,y+70,3,35,4,3,wall);}
 if(i===7){const p=P(x+36,y+37,53);ctx.fillStyle='#465653';ctx.beginPath();ctx.ellipse(p[0],p[1],15*scale,7*scale,0,0,7);ctx.fill();line([[x+44,y+37,53],[x+63,y+37,59]],'#566762',4);for(let n=0;n<3;n++)line([[x+31+n*6,y+34,58],[x+29+n*6,y+34,64],[x+33+n*6,y+34,71]],'#ede6d2',1.5);disc(x+38,y+76,9,6,'#c57862');box(x+28,y+62,24,27,1,7,roof);}
 if(i===8){gear(x+30,y+65,36,12);gear(x+51,y+65,28,8);line([[x+30,y+66,36],[x+49,y+66,47],[x+62,y+65,35]],'#a9875c',3);disc(x+49,y+66,47,3,'#ece2c9');robot(x+42,y+74,6,gold);}
 if(i===9){box(x+28,y+28,48,17,16,16,wall);poly([[x+29,y+29,64.2],[x+44,y+29,64.2],[x+44,y+43,64.2],[x+29,y+43,64.2]],'#775846');line([[x+45,y+33,61],[x+53,y+33,60],[x+53,y+33,51],[x+45,y+33,51]],'#f2e3bd',3);box(x+15,y+62,3,18,10,12,blue);box(x+20,y+65,15,7,6,4,rose);disc(x+23,y+68,20,1.4,'#b46d5f');tree(x+67,y+65,.45);}
 if(i===10){line([[x+20,y+60,3],[x+20,y+60,61],[x+46,y+60,61],[x+46,y+60,3]],'#d49b77',4);box(x+23,y+59,24,20,3,27,gold);for(let a=0;a<3;a++)for(let b=0;b<3;b++)if((a+b)%2===0)poly([[x+27+a*4,y+62.2,29+b*4],[x+30+a*4,y+62.2,29+b*4],[x+30+a*4,y+62.2,32+b*4],[x+27+a*4,y+62.2,32+b*4]],'#507570');}
 if(i===11){box(x+22,y+50,73,29,10,4,roof);robot(x+29,y+43,73,mint);robot(x+43,y+43,73,rose);robot(x+73,y+59,3,blue);}
 if(i===12){robot(x+16,y+71,3,mint);robot(x+58,y+53,3,blue);box(x+61,y+69,3,2,2,20,roof);box(x+55,y+69,14,15,2,10,wall);line([[x+58,y+71.2,18],[x+66,y+71.2,18]],'#719785',1.3);}
 }

function face(x,y,z,paint){const p=P(x,y,z);ctx.save();ctx.translate(...p);ctx.transform(.8660254*scale,.5*scale,0,-scale,0,0);paint();ctx.restore();}
function circle(x,y,z,r,color){const p=P(x,y,z);ctx.beginPath();ctx.ellipse(p[0],p[1],r*scale,r*scale,0,0,7);ctx.fillStyle=color;ctx.fill();}
function birdPaint(x,y,s,color){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(0,0,7,4,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(6,3,3,0,7);ctx.fill();ctx.fillStyle='#e0af63';ctx.beginPath();ctx.moveTo(8,3);ctx.lineTo(12,2);ctx.lineTo(8,1);ctx.fill();ctx.fillStyle='#3f5049';ctx.beginPath();ctx.arc(7,4,0.6,0,7);ctx.fill();ctx.strokeStyle='#6c745c';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(-1,-3);ctx.lineTo(-1,-7);ctx.moveTo(2,-3);ctx.lineTo(2,-7);ctx.stroke();ctx.fillStyle='#819a81';ctx.beginPath();ctx.ellipse(-1,1,4,2,-.2,0,7);ctx.fill();ctx.restore();}
function nest(x,y,z){for(let i=0;i<13;i++){const a=i*2.4;line([[x+Math.cos(a)*12,y+Math.sin(a)*9,z],[x+Math.cos(a+1)*14,y+Math.sin(a+1)*10,z+2],[x+Math.cos(a+2)*12,y+Math.sin(a+2)*9,z+1]],i%2?'#aa885d':'#c4a675',1.8);}for(let i=0;i<3;i++)circle(x-3+i*4,y,z+4,2.2,'#f0e3bd');}
function frameLandmark(){
 box(0,0,-7,108,90,7,['#bfce9f','#a7b98c','#869d77']);poly([[5,5,.2],[103,5,.2],[103,85,.2],[5,85,.2]],'#d7dec0');
 tree(11,13,1.35);tree(93,12,1.05);box(17,24,0,7,11,14,roof);box(80,24,0,7,11,14,roof);
 box(10,21,12,83,12,88,roof);box(14,32,16,75,2,80,wall);
 face(19,34.2,20,()=>{ctx.fillStyle='#f4ecd6';ctx.fillRect(0,0,65,71);ctx.fillStyle='#83916b';ctx.fillRect(4,62,24,2);ctx.fillRect(4,58,15,1);ctx.strokeStyle='#b6bd92';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(5,14);ctx.bezierCurveTo(24,24,30,27,62,19);ctx.stroke();birdPaint(20,38,1.7,'#b88b57');birdPaint(46,22,1.1,'#687f73');for(let i=0;i<6;i++){ctx.fillStyle='#a3af80';ctx.beginPath();ctx.ellipse(7+i*9,9+(i%2)*3,3,1.4,.5,0,7);ctx.fill();}ctx.fillStyle='#72846d';for(let i=0;i<4;i++)ctx.fillRect(5+i*15,3,10,1);});
 box(12,34,12,77,5,4,roof);nest(74,58,7);tree(14,72,.8);tree(94,66,.65);bench(28,72);
 line([[98,39,0],[98,39,35]],'#657b6b',2);circle(98,39,38,4,'#4d6259');for(let i=0;i<3;i++)line([[96+i,39,36],[96+i,39,41]],'#a7b9a4',.6);
 face(34,39,17,()=>birdPaint(0,0,.9,'#bd8d51'));face(81,31,105,()=>birdPaint(0,0,1.1,'#7f8c67'));
}
function stackLandmark(){
 box(0,0,-7,104,92,7,['#c7d5c1','#a4b7a8','#829b91']);box(11,12,0,72,61,8,dark);
 const layers=[gold,rose,blue];for(let j=0;j<3;j++){const z=9+j*19;box(12,12,z,68,57,17,layers[j]);box(14,14,z+17,64,53,2,dark);face(20,69.2,z+3,()=>{ctx.fillStyle='#394d51';ctx.fillRect(0,0,20,10);ctx.fillStyle='#c8d7b7';for(let k=0;k<5;k++)ctx.fillRect(2+k*3,2,1,6);ctx.fillStyle='#efdeb0';ctx.beginPath();ctx.arc(41,5,3,0,7);ctx.fill();});for(let n=0;n<4;n++)box(80,20+n*9,z+4,5,5,6,n%2?dark:wall);}
 box(12,12,68,68,57,39,dark);box(15,68,71,62,2,33,wall);
 face(19,70.2,75,()=>{ctx.fillStyle='#314e53';ctx.fillRect(0,0,53,24);ctx.fillStyle='#acd7b0';for(let x=0;x<10;x++){let hh=4+(x*7)%15;ctx.fillRect(3+x*4,3,2,hh);}ctx.fillStyle='#e7cf8e';ctx.fillRect(3,21,25,1);});
 box(20,20,107,49,37,3,blue);for(let a=0;a<6;a++)for(let b=0;b<3;b++)box(25+a*6,24+b*9,110,3,5,1,mint);
 box(89,39,0,13,25,19,gold);face(91,64.1,5,()=>{ctx.fillStyle='#415858';ctx.fillRect(0,0,8,10);});line([[87,43,15],[94,31,18],[85,20,30]],'#b3775a',3);box(13,77,0,26,13,5,blue);for(let n=0;n<6;n++)box(17+n*3,79,5,1,7,2,gold);
}
function sensorLandmark(){
 box(0,0,-7,114,94,7,['#d6ccb0','#b9aa8b','#968973']);poly([[4,4,.2],[110,4,.2],[110,90,.2],[4,90,.2]],'#dfd8bc');
 for(let x=18;x<104;x+=17)line([[x,78,1],[x+9,78,1]],'#b1a786',1.5);
 // Wheels on the two visible sides define the mobile silhouette.
 for(const y of [22,55]){circle(91,y,15,13,'#3e5151');circle(91,y,15,7,'#b1bcb0');circle(91,y,15,3,'#788e85');}
 for(const x of [26,67]){circle(x,73,15,13,'#394e4c');circle(x,73,15,7,'#c0c7b2');circle(x,73,15,3,'#82998b');}
 box(12,12,16,77,59,9,gold);box(17,17,25,65,47,5,mint);for(const x of [20,74])for(const y of [20,56])box(x,y,30,3,3,20,wall);box(15,15,50,71,50,5,blue);
 box(24,21,31,33,22,7,mint);for(let n=0;n<7;n++)box(25+n*4,20,34,2,2,2,gold);box(35,26,38,14,12,3,dark);line([[65,24,30],[67,37,42],[56,49,51]],'#bf765b',2);
 box(39,29,55,22,22,10,dark);box(20,25,65,60,28,26,blue);
 face(22,53.2,67,()=>{ctx.fillStyle='#a9c6c4';ctx.fillRect(0,0,56,22);for(const x of [14,43]){ctx.fillStyle='#e0e5d0';ctx.beginPath();ctx.arc(x,11,12,0,7);ctx.fill();ctx.fillStyle='#465f60';ctx.beginPath();ctx.arc(x,11,9,0,7);ctx.fill();ctx.strokeStyle='#91acac';ctx.lineWidth=.55;for(let n=-6;n<=6;n+=3){ctx.beginPath();ctx.moveTo(x-6,11+n);ctx.lineTo(x+6,11+n);ctx.stroke();}ctx.fillStyle='#d4e0d5';ctx.beginPath();ctx.arc(x-3,15,2,0,7);ctx.fill();}});
 line([[77,22,56],[77,22,103]],'#556e65',2);circle(77,22,104,3,'#c68a68');box(94,71,0,12,12,19,roof);box(88,81,0,9,9,10,wall);
 for(let n=0;n<3;n++)line([[28+n*12,91,1],[32+n*12,86,1],[36+n*12,91,1]],'#9cab8c',1.5);
}

function landmark(i){
 if(i===1){stackLandmark();return;}if(i===2){frameLandmark();return;}if(i===3){sensorLandmark();return;}
 box(0,0,-7,108,94,7,['#c7d3ac','#a9b894','#859e80']);
 if(i===0){
  box(12,14,0,78,59,9,mint);for(let a=0;a<8;a++){box(17+a*9,10,4,4,5,3,gold);box(17+a*9,73,4,4,5,3,gold);}
  box(27,25,9,46,37,22,dark);for(let a=0;a<8;a++)box(28+a*6,26,31,2,34,30,blue);
  for(let a=0;a<4;a++){line([[18+a*12,77,9],[18+a*12,87,9],[23+a*12,87,9]],'#ddce92',1.5);}
  box(79,27,9,10,28,13,wall);face(82,55,13,()=>{ctx.fillStyle='#42635b';ctx.fillRect(0,0,4,7);});
  box(13,31,9,8,8,8,rose);sign(51,79,12,'LOCAL AI');
 }else if(i===4){
  box(14,12,0,74,69,4,wall);for(const x of [19,77])for(const y of [20,63]){box(x,y,4,5,5,27,blue);}
  box(19,19,31,64,51,4,dark);for(const x of [27,74])for(const y of [24,61]){circle(x,y,37,10,'#405852');circle(x,y,37,5,'#b6c6b5');}
  box(29,28,35,43,28,4,mint);line([[34,30,41],[61,30,41],[67,43,41]],'#b87955',3);box(46,36,39,18,12,8,gold);
  for(let k=0;k<3;k++){circle(94,27+k*17,10,7,'#465853');circle(94,27+k*17,10,3,'#c6d3ba');}box(18,80,1,26,9,14,roof);sign(58,73,32,'MODULAR RC');
 }else if(i===5){
  poly([[3,3,1],[104,3,1],[104,90,1],[3,90,1]],'#aac793');
  poly([[55,3,2],[69,3,2],[46,92,2],[32,92,2]],'#83b4b5');
  for(let k=0;k<5;k++)box(9+k*12,11,1,14,26,7+k*5,gold);
  for(let k=0;k<9;k++)box(29+k*5,49,9,4,19,3,roof);
  line([[12,77,3],[27,69,3],[67,70,3],[91,44,3],[91,20,3]],'#e0c99d',10);car(72,62,rose);tree(85,12,1.2);tree(11,51,1);box(76,39,0,18,14,11,wall);
 }else if(i===6){
  box(13,15,1,73,63,7,dark);box(20,21,8,58,48,37,wall);
  for(let a=0;a<5;a++){box(22+a*12,69,8,2,3,37,roof);face(25+a*11,69.2,15,()=>{ctx.fillStyle='#f6d99a';ctx.fillRect(0,0,8,24);ctx.strokeStyle='#9f7f52';ctx.lineWidth=.8;ctx.strokeRect(0,0,8,24);ctx.beginPath();ctx.moveTo(4,0);ctx.lineTo(4,24);ctx.moveTo(0,12);ctx.lineTo(8,12);ctx.stroke();});}
  roofGable(12,13,48,76,63,dark);box(10,76,1,82,8,4,wall);box(22,83,0,56,7,3,wall);tree(97,50,.8);
 }else if(i===7){
  box(12,15,0,79,64,6,wall);box(19,19,6,21,39,17,dark);box(64,19,6,20,39,17,dark);
  const p=P(48,44,30);ctx.fillStyle='#435750';ctx.beginPath();ctx.ellipse(p[0],p[1],32*scale,17*scale,0,0,7);ctx.fill();ctx.fillStyle='#dfac6e';ctx.beginPath();ctx.ellipse(p[0],p[1],23*scale,9*scale,0,0,7);ctx.fill();line([[66,44,31],[102,44,40]],'#536761',6);
  for(let a=0;a<3;a++)line([[39+a*10,41,36],[35+a*10,41,49],[43+a*10,41,61]],'#e9dfc4',2);
  box(18,18,6,7,9,52,dark);box(15,17,58,15,13,5,dark);box(18,71,6,25,8,11,rose);face(21,79.2,9,()=>{ctx.fillStyle='#f4dcad';ctx.fillRect(0,0,17,5);});disc(77,78,9,10,'#bd795e');sign(50,82,10,'HOT STIR FRY');
 }else if(i===8){
  box(12,13,0,81,66,7,wall);box(18,20,7,16,19,51,dark);box(63,28,7,15,19,34,rose);
  gear(30,42,62,19);gear(67,51,42,14);line([[30,43,62],[55,46,85],[79,52,66]],'#ba925b',7);circle(55,46,85,6,'#e9d8ac');circle(79,52,66,5,'#c9ad74');
  box(78,44,54,8,12,15,blue);box(31,62,7,29,16,11,rose);robot(45,70,18,gold);sign(53,79,8,'MECHANICAL STORY');
 }else if(i===9){
  box(18,14,0,58,51,9,roof);box(20,16,9,54,45,48,wall);poly([[24,20,57.2],[70,20,57.2],[70,57,57.2],[24,57,57.2]],'#7b5b48');
  line([[76,24,49],[97,24,49],[97,24,23],[76,24,23]],'#e3d1ad',8);
  face(30,61.2,15,()=>{ctx.fillStyle='#739b97';ctx.fillRect(0,0,31,20);ctx.fillStyle='#eed6a9';ctx.fillRect(14,0,2,20);ctx.fillRect(0,9,31,1);});
  for(let a=0;a<6;a++)poly([[18+a*10,60,39],[28+a*10,60,39],[28+a*10,73,34],[18+a*10,73,34]],a%2?'#eddfbd':'#7fa597');
  box(20,75,0,21,11,14,blue);box(26,77,14,9,7,5,rose);circle(30,81,21,1.5,'#b26555');tree(84,73,.7);sign(45,61.4,43,'COFFEE');
 }else if(i===10){
  box(16,24,0,73,46,6,wall);line([[26,36,40],[26,36,116],[74,36,116],[74,36,40]],'#bd8570',7);
  box(23,32,9,55,10,77,blue);box(27,42,13,47,2,67,wall);
  face(31,44.2,17,()=>{ctx.fillStyle='#44686b';ctx.fillRect(0,15,39,42);ctx.fillStyle='#b6d5bd';ctx.fillRect(4,45,26,3);for(let a=0;a<5;a++)for(let b=0;b<5;b++)if((a*3+b*7)%4!==0)ctx.fillRect(7+a*5,20+b*4,3,3);ctx.fillStyle='#b88069';ctx.fillRect(3,3,33,7);});
  box(14,67,1,15,12,12,gold);box(75,67,1,15,12,12,gold);line([[29,73,9],[75,73,9]],'#d5b682',2);
 }else if(i===11){
  box(8,12,0,90,70,5,wall);box(8,12,5,90,3,42,blue);box(8,12,5,3,70,42,mint);
  for(const y of [21,51])for(const x of [20,60]){box(x,y,5,24,13,13,roof);box(x+5,y+3,18,13,2,10,dark);robot(x+12,y+21,5,x===20?mint:rose);}
  line([[15,20,47],[15,75,47],[93,75,47]],'#bcc9b6',2);box(87,24,5,6,19,32,blue);sign(48,81,7,'AGENTS OFFICE');
 }else if(i===12){
  [[7,10],[55,12],[32,55]].forEach(([x,y],n)=>{box(x,y,0,32,28,21,n===1?rose:mint);roofGable(x,y,21,32,28,n===1?roof:dark);windows(x,y,0,32,28,21);});
  robot(16,65,0,mint);robot(83,64,0,blue);robot(53,45,0,gold);line([[34,34,2],[52,48,2],[68,33,2]],'#e1d3b3',6);box(84,77,0,2,2,23,roof);box(78,78,15,15,2,10,wall);
 }
}
function genericLandmark(card){
 const seed=Array.from(card.id||card.source).reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,0),height=28+seed%18;
 const palette={sensing:mint,maker:gold,food:rose,ai:blue,creative:wall}[card.theme];
 box(0,0,-7,108,94,7,['#c7d3ac','#a9b894','#859e80']);box(18,18,0,64,52,height,palette);windows(18,18,0,64,52,height);
 if(card.theme==='ai'){box(15,15,height,70,58,4,dark);for(let n=0;n<6;n++)box(25+n*8,25,height+4,3,28,14,blue);}
 else if(card.theme==='sensing'){roofGable(14,14,height,72,60,mint);line([[80,24,height],[80,24,height+40]],'#657b6b',2);circle(80,24,height+40,7,'#b5cbb2');}
 else if(card.theme==='maker'){box(14,14,height,72,60,4,dark);gear(45,72,26,13);}
 else if(card.theme==='food'){roofGable(14,14,height,72,60,roof);for(let n=0;n<6;n++)box(17+n*11,70,24,10,12,2,n%2?wall:rose);}
 else roofGable(14,14,height,72,60,blue);
 tree(94,74,.8);bench(21,78);
}
function drawCityLandmark(i,x,y){const previousX=ox,previousY=oy;const p=P(x,y,0);ox=p[0];oy=p[1];if(selected===i)poly([[-4,-4,-.1],[118,-4,-.1],[118,98,-.1],[-4,98,-.1]],'#e4dba3');if(cards[i].model>=0)landmark(cards[i].model);else genericLandmark(cards[i]);ox=previousX;oy=previousY;const hit=P(x+53,y+43,45);hits.push({i,x:hit[0],y:hit[1],r:70*scale});}

 function draw(){const w=canvas.clientWidth,h=canvas.clientHeight,dpr=window.devicePixelRatio||1;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);hits=[];const cols=Math.min(count,Math.max(4,Math.ceil(Math.sqrt(ideas.length)))),rows=Math.ceil(count/cols),extentX=cols*155+10,extentY=rows*155+10;scale=zoom*Math.min((w-32)/((extentX+extentY)*.866),(h-95)/((extentX+extentY)*.5+80));ox=w/2-(extentX-extentY)*.433*scale;oy=(h-((extentX+extentY)*.5+55)*scale)/2+70*scale;
  if(focus){const cx=(selected%cols)*155+63,cy=Math.floor(selected/cols)*155+53;ox=(cardOpen&&w>640?w*.32:w*.5)-(cx-cy)*.8660254*scale;oy=h*(cardOpen&&w<=640?.32:.55)-((cx+cy)*.5-27)*scale;}ox+=panX;oy+=panY;q('#iso-zoom').textContent=Math.round(zoom*100)+'%';
  box(-12,-12,-18,extentX+24,extentY+24,15,['#c1cfa4','#9eaa83','#7e9373']);box(-12,-12,-3,extentX+24,extentY+24,3,['#c8d6af','#aebd95','#91a783']);
  for(let yy=0;yy<=rows;yy++){const y=yy*155-7;poly([[-6,y,.2],[extentX+6,y,.2],[extentX+6,y+15,.2],[-6,y+15,.2]],'#a0ada1');for(let x=0;x<extentX;x+=18)line([[x,y+7,.4],[x+8,y+7,.4]],'#e5e7d4',1.1);}
  for(let xx=0;xx<=cols;xx++){const x=xx*155-7;poly([[x,-6,.5],[x+15,-6,.5],[x+15,extentY+6,.5],[x,extentY+6,.5]],'#a0ada1');for(let y=0;y<extentY;y+=18)line([[x+7,y,.7],[x+7,y+8,.7]],'#e5e7d4',1.1);}
  const objects=[];for(let i=0;i<count;i++){let col=i%cols,row=Math.floor(i/cols);objects.push({i,x:col*155+10,y:row*155+10});}objects.sort((a,b)=>a.x+a.y-b.x-b.y).forEach(o=>drawCityLandmark(o.i,o.x,o.y));
  for(let y=25;y<extentY;y+=62){tree(extentX+14,y,.7);}for(let x=25;x<extentX;x+=70){tree(x,extentY+14,.65);}car(111,8,blue);if(count>6)car(7,218,gold);
  canvas.setAttribute('aria-label',count+' 棟等角建築，目前選取'+ideas[selected][0]+'。可用地圖上的探索建築清單選取。');
 }
 function sync(){q('.idea-card').hidden=!cardOpen;q('#iso-count').textContent=ideas.length;q('#iso-growth').max=ideas.length;q('#iso-growth').value=count;q('#iso-stage').textContent=count+' / '+ideas.length;q('#iso-select').replaceChildren();ideas.slice(0,count).forEach((a,i)=>{const o=document.createElement('option');o.value=i;o.textContent=a[0];q('#iso-select').append(o);});selected=Math.min(selected,count-1);q('#iso-select').value=selected;const card=cards[selected];q('#idea-category').textContent=card.category+' · repo 筆記摘錄';q('#idea-title').textContent=card.title;q('#iso-detail').textContent=card.summary;q('#idea-more').textContent=card.more;q('#idea-source').replaceChildren();if(card.url){const link=document.createElement('a');link.href=card.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=card.id?'查看原始清單項目 ↗':'閱讀完整筆記 ↗';q('#idea-source').append(link);}else q('#idea-source').textContent='本機遊戲原型，尚無公開筆記連結。';const oldRelated=q('#idea-related');if(oldRelated)oldRelated.remove();if(card.related?.length){const group=document.createElement('div');group.id='idea-related';const heading=document.createElement('h4');heading.textContent='延伸研究';group.append(heading);for(const note of card.related){const details=document.createElement('details'),summary=document.createElement('summary'),text=document.createElement('p'),link=document.createElement('a');summary.textContent=note.title;text.textContent=note.summary;link.href=note.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='閱讀研究筆記 ↗';details.append(summary,text,link);group.append(details);}q('#idea-source').before(group);}q('#iso-features').textContent='建築特徵 · '+(features[cards[selected].model]||'依主題產生的基本建築 · '+cards[selected].category);draw();}
 q('#iso-select').onchange=e=>{selectIdea(Number(e.target.value));};q('#iso-growth').oninput=e=>{count=Number(e.target.value);sync();};q('#iso-growth').onchange=save;


 function selectIdea(i){selected=i;cardOpen=true;focus=true;zoom=(canvas.clientWidth<=640?3.5:2.8)*Math.max(1,Math.ceil(Math.sqrt(ideas.length))/4);panX=panY=0;q('#idea-extra').hidden=true;q('#idea-expand').setAttribute('aria-expanded','false');q('#idea-expand').textContent='更多內容';sync();q('.idea-card').scrollTop=0;save();}
 function closeCard(){const x=ox,y=oy;cardOpen=false;q('.idea-card').hidden=true;draw();panX+=x-ox;panY+=y-oy;draw();}
 q('#idea-close').onclick=()=>{closeCard();q('#iso-select').focus({preventScroll:true});};
 root.addEventListener('keydown',e=>{if(e.key==='Escape'&&cardOpen){closeCard();q('#iso-select').focus({preventScroll:true});}});
 q('#idea-expand').onclick=()=>{const more=q('#idea-extra');more.hidden=!more.hidden;q('#idea-expand').setAttribute('aria-expanded',String(!more.hidden));q('#idea-expand').textContent=more.hidden?'更多內容':'收起內容';};
 function zoomAt(next,x,y){const old=zoom,oldX=ox,oldY=oy;zoom=Math.max(.65,Math.min(12,next));const ratio=zoom/old;draw();panX+=x-(x-oldX)*ratio-ox;panY+=y-(y-oldY)*ratio-oy;draw();}
 canvas.addEventListener('wheel',e=>{e.preventDefault();const r=canvas.getBoundingClientRect(),delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?canvas.clientHeight:1);zoomAt(zoom*Math.exp(-Math.max(-300,Math.min(300,delta))*.002),e.clientX-r.left,e.clientY-r.top);},{passive:false});
 const pointers=new Map();let drag=null,pinch=null;
 function pinchState(){const pts=[...pointers.values()],r=canvas.getBoundingClientRect();return {x:(pts[0].x+pts[1].x)/2-r.left,y:(pts[0].y+pts[1].y)/2-r.top,d:Math.max(1,Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y))};}
 canvas.onpointerdown=e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);if(pointers.size===1)drag={x:e.clientX,y:e.clientY,px:panX,py:panY,moved:false};else{drag=null;pinch=pinchState();}};
 canvas.onpointermove=e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size>=2){const n=pinchState();if(pinch){zoomAt(zoom*n.d/pinch.d,pinch.x,pinch.y);panX+=n.x-pinch.x;panY+=n.y-pinch.y;draw();}pinch=n;return;}if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>5)drag.moved=true;panX=drag.px+dx;panY=drag.py+dy;draw();};
 function endPointer(e,cancelled){const tap=!cancelled&&drag&&!drag.moved&&pointers.size===1;pointers.delete(e.pointerId);drag=null;pinch=null;if(pointers.size===1){const pt=[...pointers.values()][0];drag={x:pt.x,y:pt.y,px:panX,py:panY,moved:true};}if(!tap)return;const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const hit=hits.map(a=>({...a,d:Math.hypot(a.x-x,a.y-y)})).filter(a=>a.d<Math.max(a.r,22)).sort((a,b)=>a.d-b.d)[0];if(hit)selectIdea(hit.i);else closeCard();}
 canvas.onpointerup=e=>endPointer(e,false);canvas.onpointercancel=e=>endPointer(e,true);
 q('#iso-in').onclick=()=>zoomAt(zoom*1.25,canvas.clientWidth/2,canvas.clientHeight/2);q('#iso-out').onclick=()=>zoomAt(zoom/1.25,canvas.clientWidth/2,canvas.clientHeight/2);q('#iso-all').onclick=()=>{cardOpen=false;q('.idea-card').hidden=true;focus=false;zoom=1;panX=panY=0;draw();};
 new ResizeObserver(draw).observe(canvas);sync();
 IdeaSource.load(cards).then(next=>{const source=cards[selected]?.id||cards[selected]?.source,all=count===cards.length;cards=next;ideas=makeIdeas();count=all?cards.length:Math.min(count,cards.length);selected=Math.max(0,cards.findIndex(c=>(c.id||c.source)===source));sync();});if(globalThis.Tweak){const t=new Tweak({container:root,onChange:draw});t.addToggle(design,'roofDetail',{label:'屋頂瓦片細節'});}
 })();
