var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var gameOver,gameOverImg
var restartImg, restart;
var birdImg;
var phegasusImg;
var unicornImg;
var bg,bgImg;
var man,manImg;
var obstacle,obstaclesGroup;

localStorage["HighestScore"] = 0;

function preload(){
  manImg = loadImage("man.png")
  birdImg = loadImage("bird.jpg");
  phegasusImg = loadImage("phegasus.png");
  unicornImg = loadImage("unicorn.png");
  gameOverImg = loadImage("gameover.webp");
  restartImg = loadImage("restart.jpg");
}
function setup(){
    createCanvas(600, 200);
  
  bg = createSprite(50,70,600,200);
  bg.addImage(bgImg);

  man = createSprite(50,180,20,50);
  man.addImage(manImg);
  man.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;

  obstaclesGroup = new Group();
}
function draw(){
    //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);

  spawnObstacles();
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    man.velocityX = -(6 + 3*score/100);
  
   if(obstaclesGroup.isTouching(man)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
  //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(unicornImg);
                break;
        case 2: obstacle.addImage(phegasusImg);
                break;
        case 3: obstacle.addImage(birdImg);
                break;
       default: break;
      }
    //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    
    if(localStorage["HighestScore"]<score){
      localStorage["HighestScore"] = score;
    }
    console.log(localStorage["HighestScore"]);
    
    score = 0;
    
  }