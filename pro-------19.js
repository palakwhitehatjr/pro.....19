//Lets Start.
//define all variables
var path,boy,cash,diamonds,jwellery,sword,end,restart;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,ruby, rubyImg,endImg,resetImg,stop,ready;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var START = 1;
var PLAY = 2;
var OVER = 3;
var gameState = START;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  rubyImg = loadImage("ruby.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  resetImg=loadImage("reset.png");
  stop =loadAnimation("runner1.png");
  ready =loadAnimation("runner2.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(width/2,-20);
path.addImage(pathImg);
path.velocityY = 4;


//creating moving boy
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);   
boy.scale=0.08;
//boy.debug = true;  
boy.setCollider("circle",0,0,610);  

end = createSprite(width/2,120);
end.addImage(endImg);
end.scale=0.9;
restart = createSprite(width/2,350);
restart.addImage(resetImg);
restart.scale=0.42;
  
//creating all items Groups  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
rubyG=new Group();  
swordGroup=new Group();  

}

function draw() {
  if(gameState === START){
  background("red");
  path.velocityY = 0;
  end.visible=false;  
  restart.visible=false;
  boy.addAnimation("SahilRunning",boyImg); 
  boy.x=width/4
  boy.y=height-50
  }  
    
  if(keyDown("space")){
  gameState = PLAY;
  }  
  
  if(gameState === PLAY){
  end.visible=false;  
  restart.visible=false;  
  path.velocityY = 4;  
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
//code to reset the background
  if(path.y > height){
    path.y = height/2;
  }  
  
  createCash();
  createDiamonds();
  createJwellery();
  createRuby();  
  createSword();

  if (cashG.isTouching(boy)) {
  cashG.destroyEach();
  treasureCollection = treasureCollection+100;
  }if (diamondsG.isTouching(boy)) {
  diamondsG.destroyEach();
  treasureCollection = treasureCollection+200;    
  }if(jwelleryG.isTouching(boy)) {
  jwelleryG.destroyEach();
  treasureCollection = treasureCollection+300;
  }if(rubyG.isTouching(boy)) {
  rubyG.destroyEach();
  treasureCollection = treasureCollection+400;
  }
    
  if(boy.isTouching(swordGroup)){
  gameState = OVER;
  }
    
  }
  

  if(gameState === OVER){
    end.visible=true; 
    restart.visible=true;
    path.y=120;
    path.velocityY = 0;
    swordGroup.setVelocityYEach(0);
    swordGroup.setLifetimeEach(-1);
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    rubyG.destroyEach();
    boy.addAnimation("SahilRunning",stop);
    if(mousePressedOver(restart)){
    gameState=PLAY;
    treasureCollection=0;  
    swordGroup.destroyEach();  
    boy.addAnimation("SahilRunning",boyImg);    
    }  
  }
  
  
  drawSprites();
  textSize(20);
  fill("white");
  text("Treasure : "+ treasureCollection,width/1.4,30);
  if(gameState === START){
  textSize(25);
  fill("black");  
  text("PRESS 'SPACE' TO START",width/2-150,223);
  }
  if(gameState === OVER){
  textSize(35);
  fill("black");
  text("Try Again!",width/2-70,295);  
  }
}

function createCash() {
  if (World.frameCount % 90 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 180;
  cashG.add(cash);
  //cash.debug = true;  
  cash.setCollider("circle",0,0,220);  
  }
}

function createDiamonds() {
  if (World.frameCount % 220 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 180;
  diamondsG.add(diamonds);
  //diamonds.debug = true; 
  diamonds.setCollider("circle",0,0,900);  
}
}

function createJwellery() {
  if (World.frameCount % 310 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 180;
  jwelleryG.add(jwellery);
  //jwellery.debug = true;
  jwellery.setCollider("circle",0,0,200);  
  }
}

function createRuby() {
  if (World.frameCount % 400 == 0) {
  var ruby = createSprite(Math.round(random(50, width-50),40, 10, 10));
  ruby.addImage(rubyImg);
  ruby.scale=0.075;
  ruby.velocityY = 3;
  ruby.lifetime = 180;
  rubyG.add(ruby);
  //ruby.debug = true;
  ruby.setCollider("circle",0,0,200);  
  }
}

function createSword(){
  if (World.frameCount % 430 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (6+2*treasureCollection/600);
  sword.lifetime=180;  
  swordGroup.add(sword);
  //sword.debug = true; 
  sword.setCollider("circle",0,0,300);  
  }
}
//The End.