var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
    playSounds(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}


$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    playSounds(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function playSounds(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    nextSequence();
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
} else{
    var audios = new Audio("sounds/wrong.mp3");
    audios.play();
    $("body").addClass("game-over");
setTimeout(function(){
    $("body").removeClass("game-over");
}, 200);

$("#level-title").text("GameOver, Press Any Key to Restart");

startOver();
}
}

function startOver(){
    level = 0;
    gamePattern = [];
}


