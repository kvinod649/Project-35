var backImg;
var balloonImg, balloon;
var database, position;

function preload() {
  backImg = loadImage("Hot Air Ballon-01.png");
  balloonImg = loadAnimation("Hot Air Ballon-02.png", 
  "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();
  console.log(database);

  createCanvas(800,400);
  //createSprite(400, 200, 50, 50);

  balloon = createSprite(400, 200, 50, 50);
	balloon.addAnimation("balloonAnimation", balloonImg);
  balloon.scale = 0.3;
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backImg);  

  if (position !== undefined){


  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addAnimation("balloonAnimation", balloonImg);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.addAnimation("balloonAnimation", balloonImg);
    balloon.scale=balloon.scale +0.01;
  }
}
  drawSprites();
}

function readPosition(data){
  position = data.val();
  //console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error in writing to the database");
}

function writePosition(x,y){
  database.ref("balloon/position").set({
      'x': position.x + x,
      'y': position.y + y
  })
}