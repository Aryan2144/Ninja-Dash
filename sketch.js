var bg, bgImg;
var invGround, invWall;
var ninja, ninjaImg, ninjaImg2;

var obstacle, obstacleImg, obstacleG;

var star1, star1Img, starG1;
var star2, starG2;
var starCount = 10;

var score = 0;

var gameState = "PLAY";

var gameOver, gameOverImg;

var ouch;

var clashSound;

var sound;

function preload(){

  bgImg = loadImage("bg.png");
  obstacleImg = loadImage("obstacle.png");
  starImg = loadImage("star.png");
  gameOverImg = loadImage("game over.png");
  
  ninjaImg = loadAnimation("ninja1.png", "ninja2.png");
  ninjaImg2 = loadAnimation("ninja2.png");
  
  ouch = loadSound("ouch.mp3");
  clashSound = loadSound("clash.mp3");
  sound = loadSound("sound.mp3");
}

function setup() {
  
  createCanvas(600, 400);
  
  bg = createSprite(300, 200)
  bg.addImage("bg", bgImg);
  bg.scale = 1.12;
  bg.velocityX = -(2 + 2*score/100);
  
  ninja = createSprite(70, 250);
  ninja.addAnimation("ninja", ninjaImg);
  ninja.scale = 0.4;
  ninja.setCollider("rectangle", 0, 0, 250, 400);
  
  invGround = createSprite(300, 330.2, 600, 2);
  invGround.visible = false;
  
  gameOver = createSprite(300, 200, 600, 400);
  gameOver.addImage("Game Over", gameOverImg);
  gameOver.scale = 0.1;
  
  sound.loop();

  obstacleG = new Group();
  starG1 = new Group();
  starG2 = new Group();
  
  score = 0;
  
}

function draw() {
 
  background(bgImg);
      
  console.log(" THIS IS BG VELOCITY : " + bg.velocityX);
  
  ninja.collide(invGround);
  
  if(gameState === "PLAY")
    {
        
      if(bg.x < 40)
        {
          bg.x = 300;
        }

      score = score + Math.round(getFrameRate()/60);
      bg.velocityX = -(2 + 2*score/100);

      
      if(keyDown("SPACE"))
        {
          ninja.velocityY = -10;
        }

      ninja.velocityY = ninja.velocityY + 0.5;

      spawnObstacles();
      spawnStar1();
    
     if(starCount > 0) 
       {
         if(keyWentDown("a"))
           {
             spawnStar2();
             starCount = starCount - 1;
           } 
       }
      
      if(starCount === 0)
        {
          if(keyDown("R"))
           {
             starCount = 10;
           } 
        }
      
      if(starG1.isTouching(starG2))
        {
          starG1.destroyEach();
          starG2.destroyEach();
          clashSound.play();
        }
      
     if(obstacleG.isTouching(ninja))
       {
         gameState = "END";
         obstacle.velocityX = 0;
         ouch.play();
       }
      
     if(starG1.isTouching(ninja)) 
       {
         gameState = "END";
         star1.velocityX = 0;
         ouch.play(); 
       }
      
     gameOver.visible = false;

    }
  
  if(gameState === "END")
    {
      obstacleG.setLifetimeEach(-1);
      starG1.setLifetimeEach(-1);
      star1.velocityX = 0;
      bg.velocityX = 0;
      ninja.velocityY = 0;
      ninja.addAnimation("ninja", ninjaImg2);
      ninja.y = 250;
      gameOver.visible = true;
      
      if(keyDown("g"))
        {
          reset();
        }      
    }
  
  drawSprites();
  
  textSize(20);
  fill("black");
  text("Score: "+ score,30,50);
  text("Stars Left: " + starCount, 460, 50);
  if(starCount === 0)
    {
      text("Press 'R' to reload the Stars", 160, 50);
    }

  if(gameState === "END")
    {
      fill("yellow");
      text("Press 'G' to restart", 210, 300)
    }
}

function spawnObstacles()
{
  if(frameCount%300 === 0)
    {
      obstacle = createSprite(600, 317, 10, 10);
      obstacle.addImage("ob", obstacleImg);
      obstacle.scale = 0.7;
      obstacle.velocityX = -(6 + 2*score/100);
      obstacle.lifetime = 200;
      obstacleG.add(obstacle);
    }
}

function spawnStar1()
{
  if(frameCount%200 === 0)
    {
      star1 = createSprite(600, 250);
      star1.addImage("star", starImg);
      star1.scale = 0.07;
      star1.velocityX = -(3 + 2*score/100);
      star1.lifetime = 200;
      starG1.add(star1);
    }
}

function spawnStar2()
{
      star2 = createSprite(90, 250);
      star2.addImage("star", starImg);
      star2.scale = 0.07;
      star2.velocityX = (3 + 2*score/100);
      star2.lifetime = 200;
      starG2.add(star2);
}

function reset()
{
  gameState = "PLAY";
  obstacleG.destroyEach();
  starG1.destroyEach();
  ninja.addAnimation("ninja", ninjaImg);
  gameOver.visible = false;  
  bg.velocityX = -(2 + 2*score/100);
  starCount = 10;
  score = 0;
  //starG1.velocityX = -(3 + 3*score/100); 

}
