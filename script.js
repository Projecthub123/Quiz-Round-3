const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {   //Que 1
        question: "Q. 'Prakriti iti' is the nikruti of?",
        choices: ["Purusha", "Vikruti", "Prakruti", "Kevel purusha"],
        answer: "Prakruti"
    },
    {   //Que 2
        question: "Q. Minimum Blood Pressure is in?",
        choices: ["Aorta", "Arteries", "Capillaries", "Venules"],
        answer: "Venules"
    },
    {   //Que 3
        question: "Q. Which Dosha is not told by charak?",
        choices: ["vata", "Pitta", "Rapha", "Rakta"],
        answer: "Rakta"
    },
    {   //Que 4
        question: "Q. The terminal end of spiral cord is called as......?",
        choices: ["Filum terminal", "Quada equina", "Corus medullaris", "None of these"],
        answer: "Quada equina"
    },
    {   //Que 5
        question: "Q. According to Charak ....... is not a type Swapan?",
        choices: ["Dhrshta", "Shruta", "Doshaj", "Divaswapa"],
        answer: "Divaswapa"
    },
    {   //Que 6
        question: "Q. Kurpar sandhi is ...... type of sandhi?",
        choices: ["Kora", "Ulukhala", "Samudga", "Tunnasevani"],
        answer: "Ulukhala"
    },
    {   //Que 7
        question: "Q. Tobacco is ......... Poison ?",
        choices: ["Corossive", "Cardiac", "Sommiferous", "Spinal"],
        answer: "Cardiac"
    },
    {   //Que 8
        question: "Q. What is HRT ?",
        choices: ["Hormonal Reducing Therapy", "Hormonal Rising Therapy", "Hormonal Replacement therapy", "Hormonal Resisting Therapy"],
        answer: "Hormonal Replacement therapy"
    },
    {   //Que 9
        question: "Q. Which of the following is a vaccine disease ?",
        choices: ["Malaria", "HIV / AIDS", "Poliomyelitis", "Dengue Fever"],
        answer: "Poliomyelitis"
    },
    {   //Que 10
        question: "Q. peau d' orange is ?",
        choices: ["Acute appendietis", "maliganancy of tongue", "lymphatic odema of breast", "ulcer of stomach"],
        answer: "lymphatic odema of breast"
    },
    {   //Que 11
        question: "Q. Dry and lustreless condition of conjuctiva in eye is called as ?",
        choices: ["Chemosis", "Pinguecula", "Xerosis", "Pteryglum"],
        answer: "Xerosis"
    },
    {   //Que 12
        question: "Q. A patient comes with fever with Rigors, on examination patient tells of burning miturations. Based on the symptoms What is your diagnosis?",
        choices: ["UIT", "Cystitis", "BPH", "Mumps"],
        answer: "UIT"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 60;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent == quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 60;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 60;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 60;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});