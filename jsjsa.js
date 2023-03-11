var playing = false;
var score;
var timeremaining;
var action;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick= function(){
    //if we are playing
    if(playing == true){
        
        location.reload(); //reload page
    }
    //if we are not playing
    else{
        //change mode to playing
        playing = true;

        //set score to 0
        
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        //show countdown box
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

         //hide game over box
        
         hide("gameOver");

         //change button to reset
         document.getElementById("startreset").innerHTML = "reset Game";

        

        //start countdown
        //reduce time by 1s in loops
        startCountdown();

        //generate a new Q&A
        generateQA();

    }
}

//if we click on the answer boxes
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick= function(){
    //check if we are playing
    if(playing == true){
        //if answer correct, score up one
        if(this.innerHTML == correctAnswer){
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);

            //Generate new Q&A
            generateQA();

        }
        else{//if answer wrong, show wrong box
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);

            
        }

    }
}
   
}





//start counter
function startCountdown(){
    action = setInterval(function(){
        timeremaining--;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //if remaining time is zero which mean is gameover
        if(timeremaining == 0){
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }

    }, 1000)//display html stuff in 1s
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}


//show an element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

//hide an element

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//generate question and multiple answers
function generateQA(){
    var x = Math.floor((Math.random()*9)+1);//random generate a digit 1 to 9
    var y = Math.floor((Math.random()*9)+1);
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = Math.floor((Math.random()*4)+1);
     //fill one box with the correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; 


    //fill other boxes with wrong answers
    var answers = [correctAnswer];

    for(let i = 1; i< 5; i++){
        if(i != correctPosition){
            var wrongAnswer = Math.floor((Math.random()*99)+1);

            document.getElementById("box"+i).innerHTML = wrongAnswer; 
            answers.push(wrongAnswer);
        }
    }
   
}
