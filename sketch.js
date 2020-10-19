//Create variables here
var dog, dogh, dogS;
var database,Foods;
var lastFeed, feedTime, addFood, feed, foodobj;
function preload()
{ 
  //load images here
  dogh= loadImage("images/dogImg.png");
  dogS= loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 700);
  database=firebase.database();
  foodobj=new Food();
  dog=createSprite(250,300,150,150);
  dog.addImage(dogS);
  dog.scale=0.1;
  foodstock=database.ref("Food");
  foodstock.on("value",readStock);
   feed=createButton("Feed the dog");
   feed.position(650,90);
   feed.mousePressed(feedDog);
   addFood=createButton("Add Food");
   addFood.position(750,90);
   addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);
  
  drawSprites();
  //add styles here
  fill (255,255,254);
  stroke ("black");
  text("Food reamining"+ Foods,170,200);
}
function readStock(data) {
  Foods=data.val();
}
function writeStock(x) {
  if(x<=0) {
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}
function addFoods() {
  Foods++;
  database.ref("/").update({
    Food:Foods
  })
}
 function feedDog() {
   dog .addImage(dogh);
   foodobj.updateFoodStock(foodobj.getFoodStock()-1);
   database.ref("/").update({
     Food:foodobj.getFoodStock(),
     feedTime:hour ()

   })
 }

