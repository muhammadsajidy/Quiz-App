import quiz from "./questions.js"

let introBox = document.querySelector(".intro");
let instructionBox = document.querySelector(".instructions");
let questionBox = document.querySelector(".questions");
let quizArr = [], answerArr = [];

let userName = document.getElementById("name");
let title = document.getElementById("title");

let saveButton = document.getElementById("save");
let goButton = document.getElementById("go");
let startButton = document.createElement("button");
startButton.setAttribute("id", "start");
startButton.innerText = "Start";
let answersButton = document.createElement("button");
answersButton.innerText = "Answers";
answersButton.setAttribute("id", "answers");

let score = 0;
let tempIndex = 1;

function displayQuestion(index) {
    questionBox.style.display = "flex";
    const question = document.createElement("h2");
    question.innerText = quiz[index].question;
    questionBox.appendChild(question);
    quizArr.push(question);
}

function displayAnswer(index) {
    let answerIndex = 0;
    let optiona, optionb, optionc, optiond;
    while (answerIndex < 4) {
        switch (answerIndex) {
            case answerIndex = 0:
                optiona = document.createElement("p");
                optiona.innerText = quiz[index].answers[0].a;
                optiona.classList.add("options");
                checkAnswer(optiona,index,0);
                break;
            case answerIndex = 1:
                optionb = document.createElement("p");
                optionb.innerText = quiz[index].answers[1].b;
                optionb.classList.add("options");
                checkAnswer(optionb,index,1);
                break;
            case answerIndex = 2:
                optionc = document.createElement("p");
                optionc.innerText = quiz[index].answers[2].c;
                optionc.classList.add("options");
                checkAnswer(optionc,index,2);
                break;
            case answerIndex = 3:
                optiond = document.createElement("p");
                optiond.innerText = quiz[index].answers[3].d;
                optiond.classList.add("options");
                checkAnswer(optiond,index,3);
                break;
        }
        answerIndex++;
    }
    quizArr.push(optiona, optionb, optionc, optiond);    
    questionBox.append(optiona,optionb,optionc,optiond);
}

function removeElements() {
    while (questionBox.hasChildNodes()) {
        questionBox.removeChild(questionBox.firstChild);
    }
}

function nextQuestionTrigger() {
    if (tempIndex < quiz.length) {
        removeElements();
        displayQuestion(tempIndex);
        displayAnswer(tempIndex);
        tempIndex++;
    } 
    else {
        removeElements();
        const scoreBox = document.createElement("p");
        scoreBox.classList.add("score");
        if (score == quiz.length) {
            scoreBox.innerText = `Congratulations ${userName.value}! You have aced the quiz. Your score is 5`
        }
        else {
            scoreBox.innerText = `${userName.value}, your score is: ${score}`;
        }
        questionBox.appendChild(scoreBox);
        questionBox.appendChild(answersButton);
    }
}

function checkAnswer(option,index,answerIndex) {
    if (quiz[index].answers[answerIndex].correct === true) {
        option.addEventListener("click", () => {
            option.classList.add("correct");
            score++;
            nextQuestionTrigger();
            answerArr.push(option.innerText);
        })
    }
    else {
        option.addEventListener("click", () => {
            option.classList.add("incorrect");
            nextQuestionTrigger();
            answerArr.push(option.innerText);
        })
    }
}

saveButton.addEventListener("click", () => {
    if (userName.value === "") {
        alert("Enter your name please");
    }
    else {
        let welcome = document.getElementById("welcome");
        welcome.innerText += " " + userName.value + " !";
        userName.remove();
        saveButton.remove();
        introBox.querySelector(".buttons").appendChild(startButton);
    }
})

startButton.addEventListener("click", () => {
    if (userName.value === "") {
        alert("Enter your name please");
    }
    else {
        title.remove();
        introBox.remove(); 
        instructionBox.style.display = "flex";   
    }
})

goButton.addEventListener("click",() => {
    instructionBox.remove();
    displayQuestion(0);
    displayAnswer(0);
})

answersButton.addEventListener("click", () => {
    questionBox.innerHTML = ''; 
    
    quiz.forEach((question) => {
        let p = document.createElement("p");
        let i = 0;
        p.innerHTML = question.question
        p.classList.add("quiz-answers");
        p.style.display = "flex";

        let correctAnswer = question.answers.find(answer => answer.correct);
        if (correctAnswer) {
            p.innerHTML += "<br>";
            p.innerHTML += `Correct Answer: ${Object.values(correctAnswer)[0]}`;
            p.innerHTML += "<br>";
            p.innerHTML += `Your Answer: ${answerArr[i]}`
        }
        questionBox.appendChild(p);
        i++;
    });
});
