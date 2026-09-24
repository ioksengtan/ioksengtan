/* Ambient street life uses city coordinates so it follows zoom, pan and depth. */
window.CityLife = (() => {
  function loop(x,y,w,h,distance){
    let d=distance%(2*(w+h));
    if(d<w)return{x:x+d,y,dx:1,dy:0};d-=w;
    if(d<h)return{x:x+w,y:y+d,dx:0,dy:1};d-=h;
    if(d<w)return{x:x+w-d,y:y+h,dx:-1,dy:0};d-=w;
    return{x,y:y+h-d,dx:0,dy:-1};
  }
  function actors(cols,rows,count,time){
    const result=[];
    for(let i=0;i<Math.min(12,Math.max(2,Math.ceil(count/4)));i++){
      const cell=(i*17)%count,x=cell%cols*155+3,y=Math.floor(cell/cols)*155+3;
      const p=loop(x,y,149,149,time*(12+i%3*2)+i*137);
      result.push({...p,kind:i%5===0?'van':'car',id:i,depth:p.x+p.y+10});
    }
    for(let i=0;i<Math.min(56,count*2);i++){
      const cell=(i*11)%count,x=cell%cols*155-11,y=Math.floor(cell/cols)*155-11;
      const p=loop(x,y,144,144,time*(3+i%3)+i*81);
      result.push({...p,kind:'person',id:i,phase:time*4+i,depth:p.x+p.y+3});
    }
    return result;
  }
  function paint(actor,a){
    const {box,line,circle,poly,wall,mint,blue,rose,gold,dark,roof}=a;
    const {x,y,dx,dy,id}=actor,colors=[blue,rose,gold,mint,wall];
    if(actor.kind==='person'){
      const stride=Math.sin(actor.phase)*1.3,c=colors[id%colors.length];
      poly([[x-2,y-1,.5],[x+3,y-1,.5],[x+3,y+2,.5],[x-2,y+2,.5]],'#869b7e');
      line([[x-1,y,5],[x-1+dx*stride,y+dy*stride,1]],dark[2],1.2);
      line([[x+1,y,5],[x+1-dx*stride,y-dy*stride,1]],dark[2],1.2);
      box(x-1.7,y-1.5,5,3.4,3,4.5,c);circle(x,y,12,2.1,['#d4b48d','#b68966','#e4c8a2'][id%3]);
      line([[x-2,y,8],[x-3-dx*stride,y-dy*stride,5]],c[1],1.2);
      line([[x+2,y,8],[x+3+dx*stride,y+dy*stride,5]],c[1],1.2);
      if(id%5===0)box(x-2,y-2,14,4,4,1,gold);
      if(id%4===0)box(x+2,y+1,5,2,2,3,roof);
      return;
    }
    const vertical=!!dy,length=actor.kind==='van'?21:17,width=6,c=colors[id%colors.length];
    const b=(along,across,z,l,w,h,col)=>vertical?box(x+across,y+along,z,w,l,h,col):box(x+along,y+across,z,l,w,h,col);
    b(-length/2,-width/2,2,length,width,4,c);b(-length/2+4,-2.6,6,actor.kind==='van'?12:8,5.2,4,c);
    b(-length/2+4.5,-2.7,7,actor.kind==='van'?10:6,5.4,2.5,blue);
    b(-length/2+4,-2.6,10,actor.kind==='van'?12:8,5.2,.8,c);
    for(const along of [-length/2+2,length/2-5])for(const side of [-3.6,2.6])b(along,side,.6,3,1,3,dark);
    const front=(dx+dy)>0?length/2-1:-length/2;
    for(const side of [-2.5,1.5])b(front,side,3,1,1,1,wall);
  }
  return {actors,paint};
})();
