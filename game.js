var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var counter = 0;
var start = false;
var correct = false;

$(document).on("keydown", function(event){
  if(!start){
    $("h1").text("Level "+level);
    nextSequence();
    start = true;
    correct = true;
  }
});

$(".btn").on("click",function(event){
  if(correct){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
    playSound(userChosenColour);
  }
});

function checkAnswer(){
  if(userClickedPattern[counter] !== gamePattern[counter]){ //wrong button
    falseAnswer();
  }
  else{
    if(userClickedPattern.length == gamePattern.length){
      userClickedPattern = [];
      setTimeout(function(){nextSequence();},1000);
    }
    counter++;
  }
}

function falseAnswer(){
  correct = false;
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over...");
  setTimeout(function(){
    $("body").removeClass("game-over");
    startOver();
  },1000);
}

function startOver(){
  level = 0;
  counter = 0;
  start = false;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Press A Key to Start");
}

function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("h1").text("Level "+level);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  counter = 0;
}

function animatePress(key){
  $("#"+key).addClass("pressed");
  setTimeout(function(){$("#"+key).removeClass("pressed")},100);
}

function playSound(key) {
      var audio = new Audio("sounds/"+key+".mp3");
      audio.play();
}
