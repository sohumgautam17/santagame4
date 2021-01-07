const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var backimg, santa, santaBody;
var engine, world;
var snow = [];
var maxSnowFlakes = 100; 
var ground; 
var santaImg;
var cookieImg, presentImg, cadyCaneImg, grinchImg, coinImg, playImg, snowImg;
var xmasSound, rules;
var fastForwardImg;
var obstaclesGroup, grinchGroup, coinGroup;
var score=0;
var playImg;
var play1;
var rules,rulesImage;
var gameState = "serve";


function preload(){

backimg = loadImage("bg1.jpg");

santaImg = loadImage("santa.jpg")
cookieImg = loadImage("cookie2.png")
candyCaneImg = loadImage("candyCane2.png")
presentImg = loadImage("present2.png")
grinchImg = loadAnimation("grinch1.png","grinch2.png","grinch3.png", "grinch4.png", "grinch5.png", "grinch6.png", "grinch7.png", "grinch8.png", "grinch9.png", "grinch10.png", "grinch11.png", );
playImg = loadImage("play.png")
coinImg = loadAnimation("coin1.png", "coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png");
xmasSound = loadSound("xmasMusic.mp3");
rulesImage = loadImage("pressStart.jpg");

fastForwardImg = loadImage("fastForward.png")
playImg=loadImage("play.png");  
}

function setup() 
{
 engine = Engine.create();
 world = engine.world;
 createCanvas(900, 600);
 text("Score:" + score, 500, 100);
 fill("black")
 //console.log(score);
 xmasSound.loop();
  back1=createSprite(450,325,900,600);
  back1.addImage(backimg);
  back1.x=back1.width/2;
  back1.velocityX=-4;
  back1.scale = 1.4

  santa = createSprite(200, 300, 90, 70);
  santa.addImage(santaImg);
  santa.scale = .4;

  ground = createSprite(450, 500, 1800, 20);
  ground.x = ground.width /2;
  ground.visible = false;
 


    for (var j = 0; j < maxSnowFlakes; j++) 
    {
     snow.push(new Snow(random(0,900), random(0,900)));
    }
    
    obstaclesGroup = new Group();
    grinchGroup = new Group();
    coinGroup = new Group();
}

  
function draw() {
  Engine.update(engine);
  background(225);
  text("SCORE: "+ score, 500,50);
  //console.log("beginning: "+gameState);
  
  play1 = createSprite(450, 300, 10, 10);
  play1.addImage(playImg);
  play1.visible = true;

if(gameState ==="serve")
{
  back1.visible=false;
  santa.visible=false;
  play1.visible = true;

  rules= createSprite(400,300, 50,50); 
  rules.scale=2; 
  rules.addImage("ri",rulesImage);
  if(keyDown("space"))
    {
      gameState="play"
    }

   /*if(mousePressedOver(play1)) 
   {
     //console.log("Mouse is here")
     play1.visible=false;
    gameState = "play"
    console.log(play1.visible);
   // xmasSound.play();
    
  }*/
  drawSprites();
}

else if (gameState ==="play")
  {
    play1.visible=false;
    rules.visible=false;
    
    //console.log("inside play: "+gameState);
    back1.visible=true;
    santa.visible=true;
    
    

    ground.velocityX = -2

        if (ground.x < 0)
        {
          ground.x = ground.width/2;
        }
        
        if(santa.y> 100)
        {
          if(keyDown("space"))
          {
            // console.log("hi")
            santa.velocityY = -10;
          }
        }
        santa.velocityY = santa.velocityY + 1.2;


          if(back1.x<150)
          {
            back1.x=back1.width/2;
          }
        
          santa.display();
          santa.collide(ground);
          drawSprites();
          for (var i = 0; i < maxSnowFlakes; i++)
          {
            
            snow[i].display();
            snow[i].updateY();      
          }
          spawnCookies();

          spawnGrinches();

          spawnCoins();

        for(var i=0;i<obstaclesGroup.length;i++)
        {
          if(obstaclesGroup.get(i).isTouching(santa))
          {
            //console.log("score before:"+score)
            score = score+4;
            //console.log("score after:"+score);
            obstaclesGroup.get(i).destroy();
          }
        }

      for(var i=0;i<grinchGroup.length;i++)
      {
        if(grinchGroup.get(i).isTouching(santa))
        {
          score = score-10;
          grinchGroup.get(i).destroy();
        }
      }

      for(var i=0;i<coinGroup.length;i++)
      {
        if(coinGroup.get(i).isTouching(santa))
        {
          score = score+10;
          coinGroup.get(i).destroy();
        }
      }
  }
  /*else if(gameState===END)
  {
    santa.velocityY = 0;
   // score = 0

    back1.velocityX = 0; 

    obstaclesGroup.setVelocityXEach(0);
    grinchGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
  }*/
  
  text("SCORE: "+ score, 500,50);
   
    
}
function spawnCookies() {
  var randY = random(100, 500);
  

  if(frameCount % 160 === 0) {
    var obstacle = createSprite(900 , randY,10,40);
    obstacle.velocityX = -4;

    //console.log(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(cookieImg);
              break;
      case 2: obstacle.addImage(candyCaneImg);
              break;
      case 3: obstacle.addImage(presentImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.17;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnGrinches() {
  //write code here to spawn the grinchs
  if (frameCount % 250 === 0) {
    var grinch = createSprite(900,120,40,10);
    grinch.y = Math.round(random(100,500));
    grinch.addAnimation("running", grinchImg);
    grinch.scale = 1.5;
    grinch.velocityX = -4;
    
     //assign lifetime to the variable
    grinch.lifetime = 300;
    
    
    //add each grinch to the group
    grinchGroup.add(grinch);
  }
  
}


function spawnCoins() {
  //write code here to spawn the grinchs
  if (frameCount % 700 === 0) {
    var coin = createSprite(900,120,40,10);
    coin.y = Math.round(random(100,500));
    coin.addAnimation("running", coinImg);
    coin.scale = .9;
    coin.velocityX = -4;
    
     //assign lifetime to the variable
    coin.lifetime = 300;
    
    
    //add each grinch to the group
    coinGroup.add(coin);
  }
  
}