window.addEventListener("load",function(){


    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  let lastTime=0;
  let particleArray=[];
  let littleStarArray=[];
  let startAmount=Math.floor(Math.random()*10)+15;
  let spawnTimer=0;
  let spawnInterval=1000;
    
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
  
    canvas.addEventListener("click", function (event) {
        let x = event.x;
        let y = event.y;
        particleArray.push(new Particle(x,y));
      });
   
class LittleStar{
    constructor(){
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height/2;
      this.vx=0.01;
    }
    update(){
      this.x+=this.vx;
      if(this.x>(canvas.width-1)||this.x<1)this.vx*=-1;
    }
    draw(){
        context.fillStyle = "aliceblue";
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}
   
    class Particle {
      constructor(x,y) {
        this.x =x;
        this.y = y;
        this.size =  Math.floor(Math.random()*5)+5;
        this.vx=1;
        this.vy =0;
        this.timer=0;
        this.interval=Math.floor(Math.random()*500)+500;
        this.hue=Math.random()*360;
        this.color = `hsl(${this.hue},100%,50%)`;
      }
     
      update(deltaTime) {
        this.timer+=deltaTime;
      this.x+=this.vx;
      this.y+=this.vy;
      this.size-=0.01;
     if(this.timer>this.interval){
      this.vx=-1;
      this.vy=1;
     } if(this.timer>this.interval*2){
      this.vx=0.5;
      this.vy=-1.5;
     } if(this.timer>this.interval*3){
      this.vx=0.5;
      this.vy=1.5;
     } if(this.timer>this.interval*4){
      this.vx=-1;
      this.vy=-1;
     }if(this.timer>this.interval*5){
      this.timer=0;
     this.vx=1;
     this.vy=0;
     }
      }
      draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
      }
    }
   
    for(let i=0;i<startAmount;i++){
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height;
        particleArray.push(new Particle(x,y));
        littleStarArray.push(new LittleStar());
    }
 
    function animate(timeStamp) {
      const deltaTime=timeStamp-lastTime;
      lastTime=timeStamp;
      context.fillStyle='rgba(0,0,14,0.07)';
      context.fillRect(0,0,canvas.width,canvas.height);
      if(spawnTimer>spawnInterval){
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height;
        particleArray.push(new Particle(x,y));
        spawnTimer=0;
      }else{
        spawnTimer+=deltaTime;
      }
      
      particleArray.forEach(particle => particle.update(deltaTime));
      particleArray.forEach(particle => particle.draw());
      littleStarArray.forEach(star => star.update());
      littleStarArray.forEach(star => star.draw());
      for(let i=0;i<particleArray.length;i++){
        if(particleArray[i].size<=0.3){
            particleArray.splice(i,1);
            i--;
        }
      }
      requestAnimationFrame(animate);
      
    }
    animate(0);



});