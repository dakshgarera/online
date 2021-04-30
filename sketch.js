//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;

var fruit1;
var fruit2;
var fruit3;
var fruit4;

var knifeswooshsound;

var alien1;
var alien2;

var gameover;

function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1img = loadImage("fruit1.png");
  fruit2img = loadImage("fruit2.png");
  fruit3img = loadImage("fruit3.png");
  fruit4img = loadImage("fruit4.png");
  knifeswooshsound = loadSound("knifeSwoosh.mp3")
  alien1img = loadImage("alien1.png")
  alien2img = loadImage("alien2.png")
  gameoverimg = loadImage("gameover.png")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  fruitGroup = new Group();
  alienGroup = new Group();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    alien_monster();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
    // Increase score if knife touching fruit
   if(fruitGroup.isTouching(knife)){
     fruitGroup.destroyEach();
     score = score+2;
   }
    
    // Go to end state if knife touching enemy
      if(alienGroup.isTouching(knife)){
        gameState=END;
        alienGroup.destroyEach();
        fruitGroup.destroyEach();
        knife.addImage(gameoverimg)
        knife.x=300;
        knife.y=300;
      }
  }
  
  drawSprites();

  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
function fruits(){
  if(frameCount % 50 === 0){
    fruit = createSprite(0,300,40,40);
    fruit.scale = 0.2;
    fruit_=Math.round(random(1,4))
    if(fruit_ == 1){
      fruit.addImage(fruit1img)
    }else if(fruit_ == 2){
      fruit.addImage(fruit2img)
    }else if(fruit_ == 3){
      fruit.addImage(fruit3img)
    }else{
      fruit.addImage(fruit4img)
    }
    fruit.y=Math.round(random(50,350));
    
    fruit.velocityX =2;
    fruit.lifetime = 270;
    
    fruitGroup.add(fruit);
  }
}
function alien_monster(){
if(frameCount % 50 === 0){
  alien = createSprite(0,200,100,100);
  alien.scale = 0.8;
  alien_=Math.round(random(1,2))
  if(alien_ == 1){
    alien.addImage(alien1img)
  }else{
    alien.addImage(alien2img)
  }
  alien.y=Math.round(random(50,350));
  
  alien.velocityX =2;
  alien.lifetime = 280;
  
  alienGroup.add(alien);
}
}