//TREX Game by **Christian Chang ** using JS



//Declare variables for game objects and behaviour indicators(FLAGS)
var trex, trexRun, trexDead;
var ground, groundImage;
var invGround;
var cloud, cloudImage;
var cloudsGroup;
var cactus, cactusImg1, cactusImg2, cactusImg3, cactusImg4, cactusImg5, cactusImg6;
var cactiGroup;
var gameState, PLAY, END;
var gameOver, gameOverImg;
var restartIcon, restartIconImg;
var score, highScore, displayHS;
var jumpSound, dieSound;


//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
  trexRun = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexDead = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  cactusImg1 = loadImage("obstacle1.png");
  cactusImg2 = loadImage("obstacle2.png");
  cactusImg3 = loadImage("obstacle3.png");
  cactusImg4 = loadImage("obstacle4.png");
  cactusImg5 = loadImage("obstacle5.png");
  cactusImg6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");

  restartIconImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  
  dieSound = loadSound("die.mp3");
}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  createCanvas(windowWidth, windowHeight);

  //creation of trex 
  trex = createSprite(50, height - 50, 10, 40);
  trex.addAnimation("trexRun", trexRun);
  trex.addAnimation("trexDead", trexDead);
  trex.scale = 0.6;
  trex.debug = false;
  //trex.setCollider("rectangle", 0, 0, 400, 100);

  //creation of ground
  ground = createSprite(width / 2, height - 40, 600, 10);
  ground.addImage("groundImage", groundImage);

  //creation of invisible ground
  invGround = createSprite(width / 6, height - 20, 300, 10);
  invGround.shapeColor = "green";
  invGround.visible = false;


  PLAY = 1;
  END = 0;
  gameState = PLAY;

  //creation of groups
  cactiGroup = createGroup();
  cloudsGroup = new Group();

  //creation of game over message
  gameOver = createSprite(width / 2, height / 2, 300, 30);
  gameOver.addImage("gameOverImg", gameOverImg);

  //creation of restart icon
  restartIcon = createSprite(width / 2, height - 100, 10, 10);
  restartIcon.addImage("restartIconImg", restartIconImg);
  restartIcon.scale = 0.5;

  score = 0;
  highScore = 0;
  //flag which decides to display high score
  displayHS = false;
}

//All modifications, changes, conditions, manipulations, actions during the course of the program are written inside function draw.
//All commands to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  background("white");

  //display of score
  text("Score: " + score, width - 100, 20);
  if (gameState == PLAY) {

    
    gameOver.visible = false;
    restartIcon.visible = false;
    //calculation of score
    score = score + Math.round(getFrameRate() / 60);
    if (displayHS == true) {
      text("High Score: " + highScore, width / 2 + 70, 20);
    }
    //console.log (trex.y);
    //trex behavior
    if (keyDown("space") && trex.y >= height - 55) {
      trex.velocityY = -13;
      jumpSound.play();
    }
    trex.velocityY = trex.velocityY + 0.5;

    //ground behavior
    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //function call to create clouds
    spawnClouds();

    //function call to create cactus
    spawnCacti();

    //detection of collision between trex and cacti group.
    if (trex.isTouching(cactiGroup)) {
      gameState = END;
      dieSound.play();
    }
  } else if (gameState == END) {

    //trex behavior
    trex.velocityY = 0;
    trex.changeAnimation("trexDead", trexDead);

    //ground behavior
    ground.velocityX = 0;

    cactiGroup.setVelocityXEach(0);
    cactiGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);

    if (highScore < score) {
      highScore = score;
    }
    text("High Score: " + highScore, width / 2 + 70, 20);
    gameOver.visible = true;
    restartIcon.visible = true;
    if (mousePressedOver(restartIcon)) {
      startOver();
    }
  }

  trex.collide(invGround);
  drawSprites();
}

//function definition to create clouds
function spawnClouds() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(width, 50, 40, 10);
    cloud.addImage("cloudImage", cloudImage);
    cloud.velocityX = -6;
    cloud.y = random(0, height / 2);
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = (-1) * (width / cloud.velocityX);

    cloudsGroup.add(cloud);
  }
}
//function definition to create cacti
function spawnCacti() {
  if (frameCount % 130 == 0) {
    cactus = createSprite(width, height - 55, 10, 40);
    cactus.shapeColor = "yellow";
    cactus.velocityX = - (3 + score / 100);
    cactus.lifetime = (-1) * (width / cactus.velocityX);

    var caseNumber = Math.round(random(1, 6));
    //switch case passes a single variable to match with cases
    switch (6) {
      case 1:
        cactus.addImage("cactusImg1", cactusImg1);
        cactus.scale = 0.7;
        break;
      case 2:
        cactus.addImage("cactusImg2", cactusImg2);
        cactus.scale = 0.7;
        break;
      case 3:
        cactus.addImage("cactusImg3", cactusImg3);
        cactus.scale = 0.7;
        break;
      case 4:
        cactus.addImage("cactusImg4", cactusImg4);
        cactus.scale = 0.7;
        break;
      case 5:
        cactus.addImage("cactusImg5", cactusImg5);
        cactus.scale = 0.7;
        break;
      case 6:
        cactus.addImage("cactusImg6", cactusImg6);
        cactus.scale = 0.7;
        break;


    }
    cactus.debug = false;
    cactiGroup.add(cactus);
  }
}

//Function definition restart the game
function startOver() {
  gameState = PLAY;
  cactiGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("trexRun", trexRun);
  score = 0;
  displayHS = true;
}