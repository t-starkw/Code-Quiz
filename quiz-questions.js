var score = 0;
var container = document.querySelector("#container");
var quizContent = document.querySelector("#quizContent");
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start")

var questions = [
    {
        title: "Question 1",
        choices: ["A", "B", "C", "D"],
        answer: "B"
    },
    {
        title: "Question 2",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    },
    {
        title: "Question 3",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    },
    {
        title: "Question 4",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    },
    {
        title: "Question 5",
        choices: ["A", "B", "C", "D"],
        answer: "B"
    }
];
var questionIndex = 0;

var createUl = document.createElement("ul");

var timeInterval = 0;
var countdown = 75;
var penalty = 5;

startBtn.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            countdown--;
            timer.textContent = "Time: " + countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                theEnd();
                timer.textContent = "Time is up! 🕔";
            }
        }, 1000);
    }
    newQuestion(questionIndex)
});

// generates a new question
function newQuestion(questionIndex) {
    quizContent.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var displayQuestion = questions[questionIndex].title;
        var displayChoices = questions[questionIndex].choices;
        quizContent.textContent = displayQuestion;
    }
    console.log(displayChoices);
    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + newItem + "</button>";
        quizContent.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAns));
    })
}

var i = 0;
var newDiv = document.createElement("div");
var feedback = document.createElement("h2");
newDiv.setAttribute("id", "newDiv");
// checks to see if selected answer is correct & inserts feedback (correct/incorrect)
function checkAns(event) {
        var choice = event.target;
        i++
        console.log(i);
        quizContent.appendChild(newDiv);
        newDiv.appendChild(feedback);

        console.log(choice);
        console.log(questions[questionIndex].answer);
// condition that selected answer is correct
    if (choice.textContent == questions[questionIndex].answer) {
        score++;

        feedback.textContent = "Correct! 😊";
        newDiv.appendChild(feedback);
        var next = document.createElement("button");
        next.textContent = "Next Question";
        newDiv.appendChild(next);
        next.addEventListener("click", (movingOn));
//condition that the selected answer is incorrect
    } else {
        countdown = countdown - penalty;
        feedback.textContent = "Incorrect! 🙁";
        newDiv.appendChild(feedback);
    }
}
function movingOn(event) {
    newDiv.innerHTML = "";
    questionIndex++;
    if (questionIndex >= questions.length) {
        theEnd();
    } else {
        newQuestion(questionIndex);

    }
}


function theEnd() {
    quizContent.innerHTML = "";
    timer.innerHTML = "";
// highscore page where you enter initials and submit
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!"
    quizContent.appendChild(newH1);

    var newP = document.createElement("p");
    newP.setAttribute("id", "newP");
    quizContent.appendChild(newP);

// calculation and display of final score
    if (countdown >= 0) {
        var timeLeft = countdown;
        clearInterval(timeInterval);
        var newP2 = document.createElement("p");
        newP2.textContent = "Your final score is: " + timeLeft;
        newP.appendChild(newP2);
    }

// Initials submission box
    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox")  
    inputBox.textContent = "";
    quizContent.appendChild(inputBox)
    
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    quizContent.appendChild(submit);

// Event listener for initials and score
    submit.addEventListener("click", function() {
        var initials = inputBox.value;

        if (initials === null) {
            alert("Please enter your initials");

        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
        }
    // Storage of past scores
        var storeScores = localStorage.getItem("storeScores");
        if (storeScores === null) {
            storeScores = [];
        } else {
            storeScores = JSON.parse(storeScores);
        }
        storeScores.push(finalScore);
        var newScore = JSON.stringify(storeScores);
        localStorage.setItem("storeScores", newScore);
        window.location.replace("highscores.html");
    })
};
