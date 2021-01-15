var ball, food, add, feed, wh;
var database;
var foodCount = 60;
var dogImg, happyDog, foodImg, add1Img, feedImg, whImg;

function preload(){
dogImg = loadImage("Dog.png");
happyDog = loadImage("happydog.png");
foodImg = loadImage("Milk.png");
add1Img = loadImage("Add.png");
feedImg = loadImage("Feed.png");
whImg = loadImage("white.png");
}

function setup(){
    createCanvas(800,500);
  database = firebase.database();

    food = createSprite(700,250,10,10);
    food.addImage(foodImg);
    food.scale = 0.3;

    add = createSprite(700,50,10,10);
    add.addImage(add1Img);
    add.scale = 1.5;

    feed = createSprite(600,50,10,10);
    feed.addImage(feedImg);
    feed.scale = 1.5;

    ball = createSprite(250,250,10,10);
    ball.addImage(dogImg);
    ball.scale = 0.3;

    var ballref = database.ref("food");
    ballref.on("value",readdata);
}

function draw(){

    background("white");
    if(mousePressedOver(feed)){
        database.ref("/").update({
        'food' : foodCount - 1,
    })
        ball.addImage(happyDog);
    }

    if(mousePressedOver(add)){
        database.ref("/").update({
            'food' : foodCount + 1,
        })  
    }

    if(foodCount == 0 || foodCount < 0){
        food.addImage(whImg);
        textSize(32)
        text("Food is over add it",400,400)
    }

   
    if(foodCount > 0){
        food.addImage(foodImg);
    } 
    
    text("Foods = " + foodCount, 10, 100);
    drawSprites();
}


function readdata(data){
foodCount = data.val();
}

