let soundEnabled = false;

document.getElementById("mute-btn").addEventListener("click", function () {
  soundEnabled = !soundEnabled; // toggle

  this.innerHTML = soundEnabled ? `<i class="fa-solid fa-volume-high"></i> ` : `<i class="fa-solid fa-volume-xmark"></i> `;
});



// DOM Elements

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreScreen = document.getElementById("score-screen");

const scoreButton = document.getElementById("score-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.querySelector(".final-score");
const myName = document.getElementById("name-display");
const maxScoreSpan = document.getElementById("max-score");

const progressBar = document.getElementById("progress");

const quoteElement = document.querySelector(".quote");
const quizCard = document.querySelector(".quiz-card");
const button1 = document.getElementById("option1");
const button2 = document.getElementById("option2");
const button3 = document.getElementById("option3");
const button4 = document.getElementById("option4");

const optionButtons = [button1, button2, button3, button4];

const restartButton = document.getElementById("restart-btn");
const restartBtn = document.getElementById("restart-button");

// 1. Quiz data
const quizData = [
  {
    quote: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.`,
    answer: "Pride and Prejudice",
    options: [
      "Pride and Prejudice",
      "Sense and Sensibility",
      "Emma",
      "Persuasion",
    ],
  },
  {
    quote: "You pierce my soul. I am half agony, half hope.",
    answer: "Persuasion",
    options: ["Mansfield Park", "Emma", "Persuasion", "Northanger Abbey"],
  },
  {
    quote:
      "Know your own happiness. You want nothing but patience - or give it a more fascinating name: call it hope.",
    answer: "Sense and Sensibility",
    options: [
      "Sense and Sensibility",
      "Pride and Prejudice",
      "Emma",
      "Persuasion",
    ],
  },
  {
    quote: `I always deserve the best treatment because I never put up with any other.`,
    answer: "Emma",
    options: [
      "Emma",
      "Sense and Sensibility",
      "Mansfield Park",
      "Pride and Prejudice",
    ],
  },
  {
    quote: `"My idea of good company...is the company of clever, well-informed people, who have a great deal of conversation; that is what I call good company."
               "You are mistaken," said he gently, "that is not good company, that is the best." `,
    answer: "Persuasion",
    options: [
      "Emma",
      "Sense and Sensibility",
      "Persuasion",
      "Pride and Prejudice",
    ],
  },
];

let currentQuestion = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizData.length;
maxScoreSpan.textContent = quizData.length;

// event listeners

restartButton.addEventListener("click", restartQuiz);
restartBtn.addEventListener("click", restartQuiz);
scoreButton.addEventListener("click", showScore);

startQuiz();

function startQuiz() {
  // reset vars
  currentQuestion = 0;
  score = 0;
  scoreSpan.textContent = 0;
  //randomize the quotes
  quizData.sort(() => Math.random() - 0.5);
  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;
   const question = quizData[currentQuestion];
  currentQuestionSpan.textContent = currentQuestion + 1;
  // Show the quote
  quoteElement.textContent = `${question.quote}`;
  //randomise the options:
  question.options = question.options.sort(() => Math.random() - 0.5);
  // Create buttons
  button1.textContent = `${question.options[0]}`;
  button2.textContent = `${question.options[1]}`;
  button3.textContent = `${question.options[2]}`;
  button4.textContent = `${question.options[3]}`;
  // Reset buttons for this new question
  optionButtons.forEach((button) => {
    button.classList.remove("correct", "wrong");
    button.disabled = false;
    // Add new click behavior
    button.onclick = () => checkAnswer(button, question.answer);
  });

}

// Check the clicked answer
function checkAnswer(clickedButton, correctAnswer) {
  // Disable all buttons once an answer is clicked
  optionButtons.forEach((button) => (button.disabled = true)); // lock after answering
  
  // Highlight the correct answer

  optionButtons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add("correct"); // green
    }
  });
  // If the clicked button was wrong
  if (clickedButton.textContent !== correctAnswer) {
    clickedButton.classList.add("wrong");
        playWrongSound();
   
  } else {
    score++; // only add score if correct
    playCorrectSound();
    scoreSpan.textContent = score;
  }

  function playCorrectSound(){
    if (soundEnabled === true){
  const correctSound = document.getElementById("correct-sound");
  correctSound.pause();         // stop if already playing
  correctSound.currentTime = 0; // rewind to start
  correctSound.play();
   }
}
function playWrongSound(){
    if  (soundEnabled === true){
  const wrongSound = document.getElementById("wrong-sound");
  wrongSound.pause();
  wrongSound.currentTime = 0;
  wrongSound.play();
  }
}
  // Next question after 1 seconds
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  
   let finalScore = localStorage.setItem("playerScore", score);
   const title = localStorage.getItem("playerTitle");
   document.querySelector(".title-display").textContent = title;
}
function showScore() {
  resultScreen.classList.remove("active");
  scoreScreen.classList.add("active");
    // get the data
    let name = localStorage.getItem("playerName");
    let score = localStorage.getItem("playerScore");
    console.log(name,score);
    document.querySelector(".name-display").textContent = name;
    
        // 4. Show data on page
    document.querySelector(".final-score").textContent = score;
    document.getElementById("high-score").textContent = 10 ;
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  scoreScreen.classList.remove("active");
  quizScreen.classList.add("active");
  startQuiz();
}
