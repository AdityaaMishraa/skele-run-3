var bgI, bg, bgLandI, bgLand;
var groundI, ground, invisibleGround;
var skeletonI, skeleton, skeletonJump, skeletonDead;
var pitI, pit, pitGroup;
var gameState = "main menu";
var score = 0;
var font;
var ghostI, ghost, ghostGroup;
var fireI, fire, fireGroup;
var graveStoneI, graveStone;
var mainMenuI, mainMenu, playI, play, controlIconI, controlIconI, controlsI, controls, backI, back, homeI, home, restartI, restart;
var mainMenuSound, gameSound, clickSound;
var health,ghostHealth;
var skeletonStanding;
function preload() {
  bgI = loadImage("images/bg sky.png")

  bgLandI = loadImage("images/grave.png")

  groundI = loadImage("images/ground.png");

  skeletonI = loadAnimation("images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png", "images/7.png");

  pitI = loadImage("images/pit1.png");

  skeletonJump = loadAnimation("images/jump.png");

  skeletonDead = loadAnimation("images/death.png");

  fireI = loadAnimation("images/fire1.png", "images/fire2.png", "images/fire3.png", "images/fire4.png", "images/fire5.png");

  ghostI = loadAnimation("images/ghost1.png", "images/ghost2.png", "images/ghost3.png ", "images/ghost4.png");

  graveStoneI = loadImage("images/graveStone.png");

  font = loadFont("IndieFlower-Regular.ttf");
  mainMenuI = loadImage("images/main menu.png");
  controlIconI = loadImage("images/control icon.png");
  playI = loadImage("images/play.png");
  controlsI = loadImage("images/controls.png");
  backI = loadImage("images/back.png");
  homeI = loadImage("images/home.png");
  restartI = loadImage("images/reset.png");
  mainMenuSound = loadSound("main menu sound.mp3");

  skeletonStanding = loadImage("images/7.png")
}

function setup() {
  createCanvas(600, 300);
  pitGroup = new Group();
  ghostGroup = new Group();
  fireGroup = new Group();

  bg = createSprite(300, 150, 10, 10);
  bg.addImage(bgI);
  bg.scale = 0.5

  

  bgLand = createSprite(750, 240, 10, 10);
  bgLand.addImage(bgLandI);
  bgLand.scale = 0.5;


  ground = createSprite(450, 275, 10, 10);
  ground.addImage(groundI);
  ground.scale = 0.3;

  mainMenu = createSprite(300, 150, 10, 10);
  mainMenu.addImage(mainMenuI);
  mainMenu.scale = 0.65;
  mainMenu.visible = false;

  play = createSprite(300, 180, 10, 10);
  play.addImage(playI);
  play.scale = 0.5;
  play.visible = false;

  controlIcon = createSprite(300, 230, 10, 10);
  controlIcon.addImage(controlIconI);
  controlIcon.scale = 0.5;
  controlIcon.visible = false;

  controls = createSprite(300, 150, 10, 10);
  controls.addImage(controlsI);
  controls.scale = 0.65;
  controls.visible = false;

  back = createSprite(560, 280, 10, 10);
  back.addImage(backI);
  back.scale = 0.5;
  back.visible = false;


 
  skeleton = createSprite(30, 220, 10, 10);
  skeleton.addAnimation("running", skeletonI);
  skeleton.scale = 2.5;
  skeleton.addAnimation("jump", skeletonJump);
  skeleton.addAnimation("death", skeletonDead);
  skeleton.addAnimation("standing", skeletonStanding);
  skeleton.setCollider("rectangle", -4, 7, 10, 20)
  skeleton.visible = false;

  home = createSprite(25, 25, 10, 10);
  home.addImage(homeI);
  home.scale = 0.5;
  home.visible = false;

  restart = createSprite(home.x + 50, home.y, 10, 10);
  restart.addImage(restartI);
  restart.scale = 0.5;
  restart.visible = false;

  invisibleGround = createSprite(width / 2, 260, width, 10);
  invisibleGround.visible = false;

  graveStone = createSprite(300, 160, 10, 10);
  graveStone.addImage(graveStoneI);
  graveStone.scale = 0.6;
  graveStone.visible = false;
  mainMenuSound.loop();
  mainMenuSound.setVolume(0.2)

  ghostBoss = createSprite(650, 210, 10, 10);
  ghostBoss.addAnimation("ghost", ghostI);
  ghostBoss.scale=4;
  ghostBoss.visible=false;

  health = new healthBar(skeleton.x,0);
  bossHealth = new healthBar(250,100);
  bossHealth.color = "red"
}

function draw() {
  
  background("black");
  home.y= skeleton.y-180
  restart.y = home.y
  // console.log(bossHealth.width)
  camera.position.y = skeleton.y - 58
  
  // bg = image(bgI,0,0,600,300);
  skeleton.velocityY = skeleton.velocityY + 0.8;

  skeleton.collide(invisibleGround);

  if (mousePressedOver(home)) {
    gameState = "main menu";
    skeleton.y = 220
    invisibleGround.y = 260;

  }
  if (gameState == "main menu") {
    mainMenu.visible = true;
    play.visible = true;
    controlIcon.visible = true;
    home.visible = false;
    restart.visible = false;
    controls.visible = false;
    back.visible = false;
    skeleton.visible = false;
    pitGroup.destroyEach();
    ghostGroup.destroyEach();
    graveStone.visible = false;

    score=0;
    if (mousePressedOver(play)) {
      gameState = "play";
      home.visible = true;
      restart.visible = false;
    }

    if (mousePressedOver(controlIcon)) {
      gameState = "controls";
    }
  }

  if (gameState == "controls") {
    controls.visible = true;
    back.visible = true;

    mainMenu.visible = false;
    play.visible = false;
    controlIcon.visible = false;
    home.visible = false;
    restart.visible = false;
    skeleton.visible = false;
    pitGroup.destroyEach();
    ghostGroup.destroyEach();
    graveStone.visible = false;

    if (mousePressedOver(back)) {
      gameState = "main menu";
    }

  }
  if (gameState == "play") {

    mainMenu.visible = false;
    play.visible = false;
    controlIcon.visible = false;
    controls.visible = false;
    back.visible = false;
    home.visible = true;
    restart.visible = false;
    score = score + round(getFrameRate() / 60)

    skeleton.visible = true;
    skeleton.changeAnimation("running")
    bgLand.velocityX = -(2 + 3 * score / 100);
    ground.velocityX = bgLand.velocityX - 3;
    if (ground.x < 140) {
      ground.x = 450
    }

    if (bgLand.x < -150) {
      bgLand.x = 750
    }
    if (((keyDown("space")) || (keyDown("up"))) && (skeleton.y >= 200)) {
      skeleton.velocityY = -12;
      skeleton.changeAnimation("jump")    
    
    }
    if (keyWentDown("right")) {
      fireball()
    }
    if (fireGroup.isTouching(ghostGroup)) {
      ghostGroup.destroyEach();
      fireGroup.destroyEach();
      score=score+20;
    }
    if (keyWentUp("space") || (keyWentUp("up"))) {
      skeleton.changeAnimation("running")
    }


    if (frameCount % 100 == 0) {
      pits();
    }
  }
  
  if (skeleton.isTouching(pitGroup)) {
    health.width = health.width-100;
    gameState = "end"
    skeleton.changeAnimation("death");
    if (skeleton.isTouching(pitGroup)) {
      invisibleGround.y = 300;
      camera.position.y = skeleton.position.y - 95
    } else {
      invisibleGround.y = 260;
      
    }

  }
  drawSprites();

  if (gameState == "play") {
    fill("white");
    textSize(20);
    textFont(font)
    text("Score- " + score, 500, skeleton.y-180)
    
    health.display();
    health.y=skeleton.y-50

    if (frameCount % 200 == 0) {
    ghosts();
  }

  if(score>=500){
    bgLand.velocityX=0;
    ground.velocityX=0;
    gameState="final";
  }
  if (skeleton.isTouching(ghostGroup)) {
    health.width = health.width-25;
    ghostGroup.destroyEach();
  }

  if(health.width<=75&&health.width>=50){
    health.color = "yellow"
  }
  if(health.width<=50&&health.width>=25){
    health.color = "orange"
  }
  if(health.width<=25){
    health.color = "red"
    if(health.width==0){
      gameState="end";
      skeleton.visible=false
     }
  }
}

  if(gameState=="final"){

    skeleton.changeAnimation("standing")    
  

    fill("white");
    textSize(20);
    textFont(font)
    text("Score- " + score, 500, skeleton.y-180)

    fill("black")
    textSize(30);
    textFont(font);
    stroke(20)
    text("Defeat The BOSS!",180,80)
   
    health.display();
    health.y=skeleton.y-50

    ghostBoss.visible=true;
    ghostBoss.velocityX=-2
 
    
    if (skeleton.isTouching(ghostGroup)) {
      health.width = health.width-25;
      ghostGroup.destroyEach();
    }
  
    if(health.width<=75&&health.width>=50){
      health.color = "yellow"
    }
    if(health.width<=50&&health.width>=25){
      health.color = "orange"
    }
    if(health.width<=25){
      health.color = "red"
      if(health.width==0){
        gameState="end";
        skeleton.visible=false
       }
    }

   if(ghostBoss.x<=550){
     ghostBoss.velocityX=0

     if (((keyDown("space")) || (keyDown("up"))) && (skeleton.y >= 200)) {
      skeleton.velocityY = -12;
      skeleton.changeAnimation("jump")    
    
    }
    if (keyWentDown("right")) {
      fireball()
    }

    if (fireGroup.isTouching(ghostBoss)) {
      bossHealth.width = bossHealth.width-20;
      fireGroup.destroyEach();
      score=score+50;
   
    }

    if (fireGroup.isTouching(ghostGroup)){
     ghostGroup.destroyEach();
     fireGroup.destroyEach();
     score=score+20;
    }
    bossHealth.display();

    
    if (keyWentUp("space") || (keyWentUp("up"))) {
      skeleton.changeAnimation("running")
    }
    if (frameCount % 100 == 0) {
      ghosts();
    }
  }
  if(bossHealth.width<=0){
    gameState="end"
    ghostBoss.destroy();
    ghostGroup.destroyEach();
    skeleton.visible=false;

  }
  }
  if (gameState == "end") {
    
    fill("black");
    textSize(30);
    textFont(font);
    stroke("black");
    text("Score- " + score, graveStone.x - 55, graveStone.y + 10);

    mainMenu.visible = false;
    play.visible = false;
    controlIcon.visible = false;
    controls.visible = false;
    back.visible = false;
    home.visible = true;
    restart.visible = true;

    bgLand.velocityX = 0;
    ground.velocityX = 0;
    pitGroup.setVelocityXEach(0);

    ghostGroup.destroyEach();
    fireGroup.destroyEach();
    ghostBoss.destroy();
    graveStone.visible = true;

    if (keyDown("r") || mousePressedOver(restart)) {
      reset();
    }
  }

 
}



function pits() {
  pit = createSprite(700, 273, 10, 10);
  pit.addImage(pitI);
  pit.scale = 0.28;
  pit.velocityX = ground.velocityX;
  pitGroup.add(pit);
  pit.lifetime = windowWidth / pit.velocityX;
  // pit.debug=true;
  pit.setCollider("rectangle", 30, 0, 180, 180)
  pit.depth = skeleton.depth++
}

function fireball() {
  fire = createSprite(skeleton.x + 20, skeleton.y - 20, 10, 10);
  fire.addAnimation("fire", fireI);
  fire.scale = 0.1;
  fire.velocityX = 4;
  fire.lifetime = width / fire.velocityX;
  fireGroup.add(fire);
}

function ghosts() {
  var rand=random(1, 3);
  ghost = createSprite(600, random(120, 210), 10, 10);
  ghost.addAnimation("ghost", ghostI);
  ghost.scale = 1;
  ghost.velocityX = (ground.velocityX - rand );
  ghost.lifetime = width / ghost.velocityX;

  ghostHealth = createSprite(ghost.x,ghost.y-20,50,10)
  ghostHealth.shapeColor="red"
  // ghostHealth.width = 50;
  // ghostHealth.display();
  ghostHealth.velocityX= (ground.velocityX - rand)
  ghostGroup.add(ghost);
  ghostGroup.add(ghostHealth);
}

function reset() {
  gameState = "play";
  score = 0;
  skeleton.changeAnimation("running");
  graveStone.visible = false;
  invisibleGround.y = 260;
  pitGroup.destroyEach();
  bgLand.velocityX = -(2 + 3 * score / 100);
  ground.velocityX = bgLand.velocityX - 3;
  skeleton.y = 220
  
  health=new healthBar(skeleton.x,skeleton.y-50);
  health.width=100

  ghostBoss = createSprite(650, 210, 10, 10);
  ghostBoss.addAnimation("ghost", ghostI);
  ghostBoss.scale=4;
  ghostBoss.visible=false;

  bossHealth=new healthBar(250,100);
  bossHealth.width=100
  bossHealth.color="red";
}