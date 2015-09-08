function Mouse(x,y){
  this.x = x|canvas.width/2;
  this.y = y|canvas.height/2;
  this.speed = 5;
  this.dir = 0;
  this.movement = [];
  this.timer = 0;
  this.collisionArray = [];
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Mouse.prototype = Object.create(Entity.prototype);
Mouse.prototype.draw = function(){
  ctx.drawImage(spriteSheet, this.dir*spriteWidth, 0, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
}
Mouse.prototype.move = function(){
  this.timer==15?this.timer=0:null;
  !this.timer?(function(){this.dir = ~~(Math.random()*5);this.timer++;}).call(this,null):this.timer++;
  this.dir==1?this.x-=this.speed:null;
  this.dir==2?this.x+=this.speed:null;
  this.dir==3?this.y+=this.speed:null;
  this.dir==4?this.y-=this.speed:null;
  this.x<0-spriteWidth?this.x=canvas.width:null;
  this.x>canvas.width?this.x=0:null;
  this.y>canvas.height?this.y=0:null;
  this.y<0-spriteHeight?this.y=canvas.height:null;
  this.hitBox = {top:this.y,left:this.x,bottom:this.y+spriteHeight,right:this.x+spriteWidth};
  this.hitBox.centerX = (this.hitBox.left+this.hitBox.right)/2;
  this.hitBox.centerY = (this.hitBox.top+this.hitBox.bottom)/2; 
}
Mouse.prototype.collision = function(){
  this.initCollisions();
  if(hero.hitBox.left<this.hitBox.right&&hero.hitBox.right>this.hitBox.left&&hero.hitBox.top<this.hitBox.bottom&&hero.hitBox.bottom>this.hitBox.top){
    entities.splice(entities.indexOf(this),1);
    score++;
    entities.push(new Mouse(~~(Math.random()*canvas.width),~~(Math.random()*canvas.height)));
    entities.push(new Dog(~~(Math.random()*canvas.width),~~(Math.random()*canvas.height)));
  }
}