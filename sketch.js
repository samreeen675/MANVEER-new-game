var gameState = "loginPage1"
var startButton, login1, login2;
var spaceship, alien, hero, ufo;

function preload() {
  bgIMg = loadImage("spacewarsBg.jpg")
  bgIMg1 = loadImage("spaceBg.jpg")
  heroImg = loadImage("playerShip1.png")
  alienImage = loadImage("alien1.png")
  UFOImage = loadImage("ufo1.png")


}

function setup() {
  createCanvas(750, 600);
  login1 = new LoginPage1();
  login1.display()
  hero = createSprite(200, 550, 20, 50)
  hero.addImage(heroImg)
  score = 0
  alienGroup = new Group();
  bulltetGroup = new Group();
  UFOGroup = new Group();

}

function draw() {

  if (gameState === "playGame") {
    clear()
    background(bgIMg1);
    game()

  }

  if(gameState === "end"){
    textSize(20)
   text("YOU WON", 200, 50);
  }
}
function game() {
  
  // moving ground
  background.velocityX = -3

  if (background.x < 0) {
    background.x = background.width / 2;
  }

  //moving player
  hero.x = World.mouseX

  // release bulltet when space key is pressed
  if (keyDown("space")) {
    createBullets();
  }

  //creating continous enemies
  var select_balloon = Math.round(random(1, 2));

  if (World.frameCount % 50 == 0) {
    // console.log(select_balloon)
    if (select_balloon == 1) {
      spawnAliens();
    } else if (select_balloon == 2) {
      spawnUFO();
    }
  }

if(bulltetGroup.isTouching(alienGroup)){
  alienGroup.destroyEach()
  bulltetGroup.destroyEach()
  score = score + 1;

}

if(bulltetGroup.isTouching(UFOGroup)){
  UFOGroup.destroyEach()
  bulltetGroup.destroyEach()
  score = score + 1;

}
if(score === 10){
  gameState = "end"
}
  drawSprites();
  text("Score: " + score, 500, 50);
 

}
function spawnAliens() {
  alien = createSprite( Math.round(random(20, 370)), 0,10, 10);
  alien.addImage(alienImage);
  alien.velocityY = 3;
  alien.lifetime = 180;
  alien.scale = 0.15;
  alien.debug = true

  alienGroup.add(alien);

}

function spawnUFO() {
  UFO = createSprite( Math.round(random(20, 370)), 0,10, 10);
  UFO.addImage(UFOImage);
  UFO.velocityY = 3;
  UFO.lifetime = 180;
  UFO.scale = 0.15;
  UFO.debug = true

  UFOGroup.add(UFO);

}


function createBullets() {
  bulltet = createSprite(100, 500, 10, 60);
  // bulltet.addImage(bulltetImage);
  bulltet.x = hero.x;
  bulltet.velocityY = -4;
  bulltet.lifetime = 100;
  bulltet.scale = 0.3;
  bulltetGroup.add(bulltet);
  bulltet.shapeColor = "violet"
}
