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
        answer: "B"
    },
    {
        title: "Question 3",
        choices: ["A", "B", "C", "D"],
        answer: "B"
    },
    {
        title: "Question 4",
        choices: ["A", "B", "C", "D"],
        answer: "B"
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
                alldone();
                timer.textContent = "Time is up! 🕔";
            }
        }, 1000);
    }
    newQuestion(questionIndex)
});

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
        var listItem = document.createElement("button");
        listItem.textContent = newItem;
        quizContent.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAns));
    })
}
function checkAns(event) {
    var element = event.target;
    if (element.matches("button")) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            newDiv.textContent = "Correct! ✅";
        } else {
            countdown -= penalty;
            newDiv.textContent = "Incorrect ❌";
        }
    }
}


