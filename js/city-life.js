/* Ambient street life uses city coordinates so it follows zoom, pan and depth. */
window.CityLife = (() => {
  function loop(x,y,w,h,distance){
    let d=distance%(2*(w+h));
    if(d<w)return{x:x+d,y,dx:1,dy:0};d-=w;
    if(d<h)return{x:x+w,y:y+d,dx:0,dy:1};d-=h;
    if(d<w)return{x:x+w-d,y:y+h,dx:-1,dy:0};d-=w;
    return{x,y:y+h-d,dx:0,dy:-1};
  }
  function actors(cols,rows,count,time,districts){
    const result=[];
    for(let i=0;i<Math.min(12,Math.max(2,Math.ceil(count/4)));i++){
      const block=districts[i%districts.length],x=block.x+3,y=block.y+3;
      const p=loop(x,y,459,459,time*(12+i%3*2)+i*137);
      result.push({...p,kind:i%5===0?'van':'car',id:i,depth:p.x+p.y+10});
    }
    for(let i=0;i<Math.min(56,count*2);i++){
      const block=districts[i%districts.length],cell=i%9,x=block.x+cell%3*155-11,y=block.y+Math.floor(cell/3)*155-11;
      const p=loop(x,y,144,144,time*(3+i%3)+i*81);
      result.push({...p,kind:'person',id:i,phase:time*4+i,depth:p.x+p.y+3});
    }
    return result;
  }
  function paint(actor,a){
    const {box,line,circle,poly,wall,mint,blue,rose,gold,dark,roof}=a;
    const {x,y,dx,dy,id}=actor,colors=[blue,rose,gold,mint,wall];
    if(actor.kind==='person'){
      const stride=Math.sin(actor.phase)*1.25,c=colors[id%colors.length],skin=['#d4b48d','#b68966','#e4c8a2'][id%3],hair=['#51453e','#7b5942','#a58a65'][id%3];
      const at=(side,forward,z)=>[x-dy*side+dx*forward,y+dx*side+dy*forward,z];
      poly([at(-2,-2,.2),at(3,-2,.2),at(3,2,.2),at(-2,2,.2)],'rgba(60,65,51,.15)');
      for(const side of [-1,1]){
        const step=side*stride,foot=at(side,step,.7);
        line([at(side*.8,0,5.8),at(side,step*.5,3.2),foot],id%3===0?'#716e62':dark[2],1.25);
        line([foot,at(side,step+1,.5)],'#484440',1.6);
      }
      poly([at(-1.7,0,10),at(1.7,0,10),at(2,0,5.6),at(-2,0,5.6)],c[1]);
      poly([at(1.7,0,10),at(1.7,-1.8,9.4),at(2,-1.8,5.6),at(2,0,5.6)],c[2]);
      line([at(-1,0,9.7),at(0,.2,8.6),at(1,0,9.7)],'#e8dcc3',.65);
      for(const side of [-1,1]){
        const swing=-side*stride,hand=at(side*2,swing,5.9);
        line([at(side*1.7,0,9),at(side*2.2,swing*.5,7.5)],c[1],1.35);
        line([at(side*2.2,swing*.5,7.5),hand],skin,.9);
      }
      circle(x,y,12,2,skin);circle(x-dx*.5,y-dy*.5,13,1.7,hair);
      const nose=at(0,1.4,11.8);circle(...nose,.55,skin);
      if(id%5===0){line([at(-2,0,13.8),at(2,0,13.8)],gold[1],1.2);circle(x,y,14,1.45,gold[0]);}
      if(id%4===0){const bag=at(2,-.4,5.8);box(bag[0]-1,bag[1]-1,bag[2],2,2,2.7,roof);line([at(1.5,0,9.3),at(2,-.4,7)],roof[2],.6);}
      return;
    }
    const length=actor.kind==='van'?23:19,width=7,c=colors[id%colors.length],van=actor.kind==='van';
    // Directional coordinates keep windscreen, lamps and bonnet facing the travel direction.
    const v=(along,across,z)=>[x+dx*along-dy*across,y+dy*along+dx*across,z];
    const face=(pts,color)=>poly(pts.map(p=>v(...p)),color);
    const b=(along,across,z,l,w,h,col)=>{const corners=[v(along,across,z),v(along+l,across+w,z)];box(Math.min(corners[0][0],corners[1][0]),Math.min(corners[0][1],corners[1][1]),z,dy?w:l,dy?l:w,h,col);};
    face([[-length/2-1,-4,.1],[length/2+1,-4,.1],[length/2+1,4,.1],[-length/2-1,4,.1]],'rgba(50,56,47,.16)');
    b(-length/2,-width/2,2,length,width,3.5,c);
    for(const along of [-length/2+3,length/2-4])for(const side of [-3.8,3]){b(along-1.5,side,.5,3,.8,3.4,dark);const hub=v(along,side+.4,2.2);circle(...hub,.7,'#bbb9a7');}
    const rear=van?-9:-6,front=3,top=van?11:9;
    b(rear,-3,5.5,front-rear,6,top-5.5,c);
    // Sloping windscreen and hood, with dark seals and pale reflections.
    face([[front,-3,top],[front,3,top],[front+2,3,5.5],[front+2,-3,5.5]],'#759995');
    line([v(front+.4,-2.4,top-.7),v(front+.4,1.2,top-.7)],'#d6e2ce',.6);
    b(rear,-3,top,front-rear,6,.6,c);
    for(const side of [-3.08,3.08]){
      face([[rear+1,side,6.3],[front-1,side,6.3],[front-1,side,top-.6],[rear+1,side,top-.6]],'#829f9b');
      line([v(-1,side,6),v(-1,side,top)],c[2],.9);
      line([v(0,side,5),v(1.6,side,5)],'#d9d7c7',.65);
      if(van)line([v(rear+1,side,4),v(-2,side,4)],c[2],.6);
    }
    b(front+.7,-4.2,6,1.5,1,1,c);b(front+.7,3.2,6,1.5,1,1,c);
    b(length/2-.5,-3.5,2.2,.7,7,.8,dark);b(-length/2-.2,-3.5,2.2,.6,7,.8,dark);
    for(const side of [-2.8,1.6]){b(length/2-.3,side,3.4,.5,1.2,1.1,gold);b(-length/2-.3,side,3.4,.5,1.2,1.1,rose);}
    b(length/2-.35,-1,2.8,.55,2,.6,wall);
  }
  return {actors,paint};
})();
