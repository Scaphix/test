

  // 1. Quiz data 
  const quizData = [
    {
      quote: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.`,
      answer: "Pride and Prejudice",
      options: ["Pride and Prejudice", "Sense and Sensibility", "Emma", "Persuasion"]
    },
    {
      quote: "You pierce my soul. I am half agony, half hope.",
      answer: "Persuasion",
      options: ["Mansfield Park", "Emma", "Persuasion", "Northanger Abbey"]
    },
    {
      quote: "Know your own happiness. You want nothing but patience - or give it a more fascinating name: call it hope.",
      answer: "Sense and Sensibility",
      options: ["Sense and Sensibility", "Pride and Prejudice", "Emma", "Persuasion"]
    },
    {
      quote: `I always deserve the best treatment because I never put up with any other.`,
      answer: "Emma",
      options: ["Emma", "Sense and Sensibility", "Mansfield Park", "Pride and Prejudice"]
    },
   { 
      quote: `"My idea of good company...is the company of clever, well-informed people, who have a great deal of conversation; that is what I call good company."
               "You are mistaken," said he gently, "that is not good company, that is the best." `,
      answer: "Persuasion",
      options: ["Emma", "Sense and Sensibility", "Persuasion", "Pride and Prejudice"] 
      }
 





  ];

  let currentQuestion = 0;
  let score = 0;
 const quoteElement = document.querySelector('.quote');
  const quizCard = document.querySelector('.quiz-card');
  const button1 = document.getElementById('option1');
  const button2 = document.getElementById('option2');
  const button3 = document.getElementById('option3');
  const button4 = document.getElementById('option4');

const optionButtons = [button1,button2, button3, button4];
  // Show one question
  function showQuestion() {
    const question = quizData[currentQuestion];

    // Show the quote
    quoteElement.textContent = `"${question.quote}"`;


    // Create options
    
    button1.textContent = `${question.options[0]}`;
    button2.textContent = `${question.options[1]}`;
    button3.textContent = `${question.options[2]}`;
    button4.textContent = `${question.options[3]}`;
    
    // Reset buttons for this new question
  optionButtons.forEach(button => {
  button.classList.remove("correct", "wrong");
    button.disabled = false;
    // Add new click behavior
    button.onclick = () => checkAnswer(button, question.answer);
  });
      
    };
  
  // Check the clicked answer
  function checkAnswer(clickedButton, correctAnswer) {
    // Disable all buttons once an answer is clicked
  optionButtons.forEach(button => button.disabled = true); // lock after answering
// Highlight the correct answer
  optionButtons.forEach(button => {
    if (button.textContent === correctAnswer) {
      button.classList.add("correct"); // green
    }
  });

 // If the clicked button was wrong
 if  (clickedButton.textContent !== correctAnswer){

      clickedButton.classList.add("wrong");
     
      
    }
     else {
    score++; // only add score if correct
  };
 

    // Next question after 2 seconds
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1000);
  }



  // 5. Show final score
  function showResults() {
    quizCard.innerHTML = `
      <h2>Quiz Complete!</h2>
      <p>You scored ${score} out of ${quizData.length}.</p>
      <button onclick="location.reload()">Play Again</button>
    `;
  }

  // start page
   showQuestion();

 