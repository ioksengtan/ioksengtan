/* Explicit silhouettes for collected ideas. No category-based building substitution. */
window.IdeaLandmarks = (() => {
  const specs = [
    ['雙手拉線','maze','傾斜迷宮盤、兩側拉線旋鈕與落球洞'],
    ['公車到站','bus','巨型鑰匙環、公車到站螢幕與站牌'],
    ['Game Boy','gameboy','掌機卡套輪廓、十字鍵與露出的紙卡'],
    ['九九乘法','math','直立翻題卡、九宮答案孔與驗證插棒'],
    ['酒瓶','lantern','酒瓶燈芯、馬燈提把與開放式骨架'],
    ['電子錶','watchbot','樂高人偶四肢與電子錶螢幕胸口'],
    ['虛構鈔票','money','放大的雕版鈔票、肖像浮雕與印鈔滾筒'],
    ['平交道','crossing','交叉警示牌、紅燈與升起的條紋柵欄'],
    ['60Hz','epaper','兩片磁吸拼接電子紙、接點與刷新波形'],
    ['數位書架','books','整座開放書架、錯落書脊與取出的書'],
    ['疊層山脈','mountain','層層紙張堆出的山峰與剝起的紙頁'],
    ['三角造型','triangle','三角鏤空機身、三隻爬行腿與發光核心'],
    ['歷史插畫','papership','立體紙帆船、摺紙帆與展示底座'],
    ['河流水系','river','樹枝狀河流地鐵線、匯流節點與圖幅框架'],
    ['圍棋規則','go','地形棋盤、城市路網與黑白棋子'],
    ['國旗地標','flags','翻起的國旗卡、配對卡與迷你地標'],
    ['大型電玩','arcade','直立街機螢幕、斜面控制台與太鼓'],
    ['會員歡迎禮','sprue','注塑模型框架、連接細枝與可拆小物'],
    ['魔術方塊','cube','三層旋轉方塊、日期格與錯位中層'],
    ['落葉裁切','leaves','由葉片拼出的漸層牆與裁切工作檯'],
    ['滑蓋透視','gift','半拉開滑蓋、透視視窗與內部禮物'],
    ['透明壓克力','acrylic','交錯透明卡榫片與透光立體拼圖'],
    ['手動拉桿','train','翻牌目的地看板、鐵道時鐘與側面拉桿'],
    ['牆面月曆','calendar','七欄日期卡牆、可抽換日期與月份標籤'],
    ['實體卡片序列','coding','箭頭指令卡序列、讀卡台與終點機器人'],
    ['高爾夫','golf','六角地形、斜坡球道、球洞與旗桿'],
    ['籃球','basket','球形鏤空底座、可旋轉籃板與籃框'],
    ['打字訓練','typing','電子紙文字螢幕、機械鍵盤與進度游標'],
    ['薛西弗斯','sisyphus','陡峭石階、推石角色與連續紀錄計數器'],
    ['桌遊收納','storage','堆疊卡榫盒、轉盤計分器與翻頁數字牌']
  ];
  const find = card => specs.find(s => card.title.includes(s[0]));
  function draw(card,a) {
    const spec=find(card);if(!spec)return false;
    const {box,poly,line,circle,face,gear,robot,car,tree,ctx,wall,mint,blue,rose,roof,dark,gold}=a;
    const panel=(x,y,z,w,h,color=wall)=>box(x,y,z,w,5,h,color);
    const text=(x,y,z,label,size=10,color='#405957')=>face(x,y,z,()=>{ctx.save();ctx.scale(1,-1);ctx.fillStyle=color;ctx.font='500 '+size+'px sans-serif';ctx.fillText(label,0,0);ctx.restore();});
    const front=(x,y,z,w,h,color='#426467')=>face(x,y,z,()=>{ctx.fillStyle=color;ctx.fillRect(0,0,w,h);});
    const ring=(x,y,z,r,color='#597978',width=3)=>{const pts=[];for(let i=0;i<=32;i++){const t=i*Math.PI/16;pts.push([x+Math.cos(t)*r,y,z+Math.sin(t)*r]);}line(pts,color,width);};
    const cylinder=(x,y,z,r,h,c)=>{const pts=Array.from({length:25},(_,i)=>{const t=i*Math.PI/12;return[x+Math.cos(t)*r,y+Math.sin(t)*r,z+h];});poly(pts.map(p=>[p[0],p[1],z]),c[2]);for(let i=0;i<24;i++)poly([[pts[i][0],pts[i][1],z],[pts[i+1][0],pts[i+1][1],z],pts[i+1],pts[i]],i<12?c[1]:c[2]);poly(pts,c[0]);};
    box(0,0,-7,108,94,7,['#c7d3ac','#a9b894','#859e80']);
    switch(spec[1]){
      case 'maze':
        box(9,12,0,8,65,27,roof);box(90,12,0,8,65,27,roof);box(16,14,26,74,59,6,gold);
        for(const [x,y,w,d] of [[18,16,68,3],[18,68,68,3],[18,16,3,54],[83,16,3,54],[30,16,3,34],[44,30,3,40],[57,16,3,37],[68,42,15,3]])box(x,y,32,w,d,5,wall);
        for(const [x,y] of [[25,54],[38,24],[52,60],[73,29]])circle(x,y,33,4,'#465f58');circle(73,55,38,4,'#cc795d');
        ring(9,80,27,10);ring(99,80,27,10);line([[9,80,27],[9,45,40],[18,45,32]],'#637568',2);line([[99,80,27],[99,45,40],[86,45,32]],'#637568',2);break;
      case 'bus':
        ring(52,32,99,17,'#849c8c',5);panel(23,31,8,59,67,blue);front(29,36.2,27,47,38);text(33,36.5,54,'BUS',11,'#e4d5a7');text(33,36.5,35,'12   3m',8,'#c9ddba');front(34,36.3,16,35,5,'#d9bf84');
        box(89,61,0,3,3,47,dark);panel(81,61,37,20,19,gold);text(84,66.1,43,'BUS',7);car(18,76,blue);break;
      case 'gameboy':
        panel(20,29,1,64,84,wall);panel(27,25,66,49,30,rose);front(29,34.2,41,47,35,'#819d8d');front(33,34.4,46,39,25,'#c3d1a0');
        front(32,34.3,18,20,7);front(39,34.4,11,6,21);circle(67,35,24,5,'#b87165');circle(77,35,19,5,'#b87165');for(let i=0;i<3;i++)front(60+i*6,34.2,6,2,6,'#8b9c8c');break;
      case 'math':
        box(13,13,0,77,66,12,blue);panel(20,27,12,61,67,wall);text(28,32.2,59,'7 × 8',15);text(36,32.2,41,'= ?',13);
        for(let x=0;x<3;x++)for(let y=0;y<3;y++){circle(29+x*20,45+y*13,13,4,'#536c62');}line([[68,74,14],[85,84,43]],'#b68158',4);break;
      case 'lantern':
        cylinder(52,46,0,29,8,dark);cylinder(52,46,8,16,39,mint);cylinder(52,46,47,7,19,mint);cylinder(52,46,66,8,5,gold);
        front(44,62,20,16,23,'#f5d27e');for(const x of [23,81])line([[x,46,8],[x,46,65],[52,46,83]],'#566e65',4);ring(52,46,92,12,'#596f64',3);cylinder(52,46,69,25,5,dark);break;
      case 'watchbot':
        box(23,35,0,20,25,24,blue);box(58,35,0,20,25,24,blue);box(24,30,24,54,29,38,gold);box(30,32,64,41,25,27,wall);box(43,36,91,16,14,6,wall);
        box(6,32,29,14,18,30,rose);box(82,32,29,14,18,30,rose);front(33,59.2,32,35,24);text(37,59.4,39,'12:48',10,'#d4dfb6');circle(41,57.2,80,2,'#405957');circle(61,57.2,80,2,'#405957');break;
      case 'money':
        panel(7,28,20,94,52,mint);front(12,33.2,25,84,42,'#d6d7ad');ring(51,33.5,46,16,'#779582',2);circle(51,34,48,9,'#9fb69a');text(14,33.4,57,'100',9);text(75,33.4,31,'100',9);
        for(let k=0;k<7;k++)line([[16,33.5,30+k*4],[30,33.5,33+k*4]],'#90a68c',.7);cylinder(28,73,0,12,13,dark);cylinder(76,73,0,12,13,dark);box(24,71,13,55,6,4,gold);break;
      case 'crossing':
        for(const x of [40,65])line([[x,0,1],[x,94,1]],'#657870',3);for(let y=5;y<94;y+=9)box(35,y,0,36,3,2,roof);
        box(15,47,0,6,6,64,dark);line([[3,50,84],[34,50,61]],'#e7d5ac',5);line([[3,50,61],[34,50,84]],'#e7d5ac',5);circle(11,54,57,6,'#c87461');circle(29,54,57,6,'#c87461');
        line([[20,51,24],[90,51,54]],'#f1dfb8',5);for(let k=0;k<6;k++)line([[24+k*11,51,26+k*4.7],[29+k*11,51,28+k*4.7]],'#be7160',5);break;
      case 'epaper':
        panel(6,26,13,44,67,dark);panel(59,26,13,44,67,blue);front(10,31.2,18,36,56,'#e1dfc4');front(63,31.2,18,36,56,'#e1dfc4');text(15,31.4,56,'60',19);text(70,31.4,56,'Hz',17);
        for(let n=0;n<5;n++)box(51,26,24+n*9,7,4,3,gold);line([[13,31.4,28],[22,31.4,38],[31,31.4,24],[42,31.4,40]],'#719789',2);box(20,65,0,68,19,5,mint);for(let n=0;n<10;n++)box(23+n*6,66,5,3,4,2,gold);break;
      case 'books':
        for(const x of [8,94])box(x,21,0,5,37,91,roof);for(const z of [0,29,58,87])box(8,21,z,91,37,4,roof);
        for(let row=0;row<3;row++)for(let n=0;n<8;n++){const h=17+(n*7+row*3)%9;box(16+n*9,27,row*29+4,7,24,h,[mint,rose,blue,gold][(n+row)%4]);}box(22,70,0,52,20,6,blue);box(27,73,6,46,16,3,wall);break;
      case 'mountain':
        for(let n=0;n<12;n++){const w=91-n*6;box(8+n*3,10+n*2,n*4,w,68-n*4,4,n%3===0?wall:blue);}poly([[22,78,4],[87,78,4],[87,87,16],[22,87,16]],'#e7dfbc');
        poly([[32,26,51],[53,26,77],[74,26,51],[53,49,54]],'#f0e8d0');break;
      case 'triangle':
        poly([[53,12,69],[12,63,40],[94,63,40]],'#81aaa5');poly([[53,12,69],[94,63,40],[53,49,28]],'#507e7c');
        for(const [x,y,z] of [[25,52,47],[48,30,60],[67,53,47]])ring(x,y,z,5,'#d5e2bd',2);
        for(const [x,y,xx,yy] of [[22,57,4,82],[84,57,103,81],[53,17,57,2]])line([[x,y,42],[xx,yy,25],[xx-6,yy+6,3]],'#637b71',6);circle(53,64,44,6,'#efcd82');break;
      case 'papership':
        poly([[9,42,18],[96,42,18],[77,65,3],[28,65,3]],'#b77d60');poly([[9,42,18],[31,25,18],[85,25,18],[96,42,18]],'#e5cda0');
        for(const x of [38,68]){line([[x,42,15],[x,42,99]],'#886d51',2);poly([[x,42,96],[x,42,52],[x+26,42,53]],'#f1e4c6');poly([[x-2,42,87],[x-2,42,48],[x-24,42,52]],'#c6d3b5');}line([[10,42,19],[38,42,99],[97,42,19]],'#a39572',.8);break;
      case 'river':
        panel(7,25,9,94,77,wall);front(11,30.2,14,86,67,'#d6debe');
        for(const pts of [[[20,65],[35,48],[51,43],[61,29],[86,21]],[[38,73],[35,48]],[[77,71],[70,53],[51,43]],[[89,50],[70,53]]]){line(pts.map(([x,z])=>[x,30.5,z]),'#5b96a7',3);for(const [x,z] of pts)circle(x,31,z,2.5,'#f2e6c4');}break;
      case 'go':
        box(8,10,0,91,72,6,gold);poly([[17,21,7],[41,14,7],[78,23,7],[88,58,7],[65,75,7],[23,64,7]],'#adc39b');
        const nodes=[[25,28],[51,22],[77,34],[29,55],[57,48],[78,65]];for(const [a,b] of [[0,1],[1,2],[0,3],[1,4],[2,4],[3,4],[4,5]])line([[...nodes[a],8],[...nodes[b],8]],'#739886',2);nodes.forEach(([x,y],i)=>{cylinder(x,y,8,6,4,i%2?wall:dark);});break;
      case 'flags':
        for(let n=0;n<4;n++){const x=12+n%2*45,y=15+Math.floor(n/2)*35;box(x,y,0,35,26,3,blue);if(n<2){panel(x,y+7,3,35,28,wall);front(x+3,y+12.2,7,29,20,n?'#789bb6':'#c87c69');front(x+14,y+12.4,7,7,20,'#eadbb7');}}
        line([[75,70,4],[75,70,63]],'#a1845c',3);line([[61,70,4],[75,70,63],[89,70,4]],'#a1845c',3);line([[67,70,25],[83,70,25]],'#a1845c',2);break;
      case 'arcade':
        box(24,20,0,59,41,29,rose);box(24,20,29,59,23,60,blue);panel(21,20,89,65,12,gold);front(30,43.2,48,47,33);text(37,43.4,61,'PLAY',12,'#efdaa6');box(20,44,27,67,23,8,dark);
        cylinder(52,59,35,17,11,gold);cylinder(52,59,46,16,2,wall);line([[33,76,42],[45,58,56]],'#b17c59',2);line([[72,76,42],[60,58,56]],'#b17c59',2);break;
      case 'sprue':
        line([[9,35,5],[9,35,91],[97,35,91],[97,35,5],[9,35,5]],'#78958d',4);line([[53,35,5],[53,35,91]],'#78958d',3);
        for(const z of [25,66]){line([[9,35,z],[97,35,z]],'#78958d',3);box(20,30,z-9,22,9,22,z===25?gold:rose);box(66,30,z-9,19,9,21,blue);}ring(30,40,68,6);front(69,39.2,61,12,11,'#d8e3c4');break;
      case 'cube':
        for(let z=0;z<3;z++)for(let x=0;x<3;x++)for(let y=0;y<3;y++){const offset=z===1?8:0;box(18+x*22+offset,12+y*22,z*22,20,20,20,[gold,blue,rose][z]);if(y===2)text(23+x*22+offset,76.2,z*22+6,String(1+x+z*3),11);}break;
      case 'leaves':
        panel(10,26,8,88,75,wall);for(let x=0;x<7;x++)for(let z=0;z<5;z++){const xx=16+x*11,zz=17+z*12;poly([[xx,31.2,zz],[xx+3,31.2,zz+10],[xx+9,31.2,zz+12],[xx+7,31.2,zz+3]],['#64886f','#91a775','#c4b177','#cf9366','#b57458'][Math.min(4,Math.floor(x*.7))]);}box(22,66,0,60,18,6,roof);break;
      case 'gift':
        box(15,18,0,77,56,22,rose);box(21,24,22,65,44,3,dark);box(28,32,25,22,22,17,gold);box(60,31,25,15,27,12,mint);
        box(39,9,45,65,4,5,wall);box(39,54,45,65,4,5,wall);box(39,9,45,4,49,5,wall);box(100,9,45,4,49,5,wall);ctx.save();ctx.globalAlpha=.3;poly([[43,13,48],[100,13,48],[100,54,48],[43,54,48]],'#beded9');ctx.restore();break;
      case 'acrylic':
        for(let n=0;n<6;n++){ctx.save();ctx.globalAlpha=.66;poly([[14+n*13,16,0],[14+n*13,70,0],[14+n*13,70,30+n*7],[14+n*13,43,83-n*4],[14+n*13,16,30+n*7]],['#7aafb6','#89bdb7','#b0c7a0','#dac389','#d8a989','#b795ab'][n]);ctx.restore();}for(const z of [16,36])box(12,40,z,83,3,2,wall);break;
      case 'train':
        box(16,30,0,5,8,30,dark);box(83,30,0,5,8,30,dark);panel(10,27,30,87,40,dark);front(16,32.2,36,75,27,'#e3dbc0');text(22,32.4,46,'TAIPEI',14);line([[16,32.5,48],[91,32.5,48]],'#7b8d7a',1);
        circle(52,32,86,17,'#e4d8b6');ring(52,32.3,86,17);line([[52,32.5,97],[52,32.5,86],[62,32.5,83]],'#4e6863',2);line([[98,31,42],[106,31,63],[106,31,82]],'#a07a52',3);break;
      case 'calendar':
        panel(7,25,4,95,86,mint);for(let x=0;x<7;x++)for(let row=0;row<5;row++){const num=row*7+x+1;if(num>31)continue;panel(11+x*12,30,65-row*12,10,10,wall);text(12+x*12,35.2,68-row*12,String(num),5);}
        text(16,30.2,80,'SEPTEMBER',8);box(29,68,0,21,17,4,rose);text(32,85.2,5,'24',9);break;
      case 'coding':
        for(let n=0;n<4;n++){box(9+n*22,62,0,19,21,3,wall);line([[14+n*22,73,4],[23+n*22,73,4],[19+n*22,69,4]],'#638e85',2);}
        box(8,17,0,25,28,18,blue);front(12,45.2,5,17,8);line([[34,31,2],[70,31,2],[70,53,2]],'#cfb577',4);robot(76,30,0,gold);box(69,23,20,14,12,3,mint);break;
      case 'golf':
        for(const [x,y] of [[26,27],[61,27],[43,57],[78,57]]){const hex=Array.from({length:6},(_,n)=>[x+Math.cos(n*Math.PI/3)*21,y+Math.sin(n*Math.PI/3)*21,4]);poly(hex,'#a7bd83','#7e9d76');}
        poly([[20,23,5],[30,20,5],[76,53,5],[67,61,5]],'#e4d5aa');box(37,33,5,17,13,9,gold);circle(75,58,5,4,'#4d715d');line([[75,58,5],[75,58,51]],'#717d66',2);poly([[75,58,51],[93,58,45],[75,58,39]],'#cf8c70');circle(25,26,8,3,'#f2e6c7');break;
      case 'basket':
        for(let n=0;n<6;n++){const yy=28+n*8;line([[16,yy,5],[30,yy,28],[52,yy,38],[75,yy,28],[92,yy,5]],'#71948d',2);}line([[17,43,4],[17,43,88]],'#7c9588',4);panel(8,38,68,50,29,wall);front(20,43.2,73,25,17,'#bcd1bf');ring(36,56,63,13,'#bb7c5c',3);for(let n=0;n<5;n++)line([[26+n*5,56,62],[30+n*3,56,46]],'#d4c9a5',1);circle(72,65,28,9,'#c58b5d');break;
      case 'typing':
        panel(14,18,18,78,64,dark);front(19,23.2,24,68,52,'#e8e3ce');for(let row=0;row<5;row++)front(25,23.5,63-row*7,48-row%2*12,1.5,'#6e8377');front(59,23.5,31,2,7,'#71958a');box(10,40,0,86,37,10,blue);for(let x=0;x<11;x++)for(let y=0;y<3;y++)box(15+x*7,45+y*9,10,5,6,3,wall);box(34,74,10,36,5,3,gold);break;
      case 'sisyphus':
        for(let n=0;n<9;n++)box(13+n*8,24,0,9,39,7+n*7,wall);circle(76,43,85,17,'#97a995');line([[55,57,43],[58,57,58],[71,47,71]],'#99795b',4);circle(59,57,64,5,'#b89268');line([[56,57,46],[47,64,33]],'#99795b',3);panel(9,78,0,40,21,dark);text(14,83.2,6,'024',13,'#ddcf9e');break;
      case 'storage':
        for(let n=0;n<4;n++){box(13+n*3,16+n*2,n*17,56,42,14,[mint,rose,blue,gold][n]);box(17+n*3,14+n*2,n*17+14,48,3,3,dark);front(33+n*3,58+n*2+.2,n*17+5,13,4,'#eadfbc');}
        cylinder(83,70,0,17,7,gold);for(let n=0;n<8;n++){const t=n*Math.PI/4;box(82+Math.cos(t)*12,69+Math.sin(t)*12,7,2,2,2,dark);}panel(12,74,0,31,23,wall);text(17,79.2,5,'18',14);break;
    }
    return true;
  }
  return {find,draw};
})();
