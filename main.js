let allWords = {
  Easy: [
    "Hello",
    "Welcome",
    "Python",
    "Java",
    "World",
    "Hacker",
    "Play",
    "Remove",
    "Remote",
    "Style",
    "Run",
    "Ball",
    "Lala",
    "Teacher",
    "Goal",
    "Help",
    "Street",
    "Noise",
    "Math",
    "Egypt",
  ],
  Normal: [
    "Data",
    "Improve",
    "Github",
    "Photoshop",
    "Adobe",
    "Coding",
    "Zamalek",
    "Sport",
    "Rust",
    "Scala",
    "Php",
    "Html",
    "Web",
    "Programmer",
    "Windows",
    "Mouse",
    "Crack",
    "Game",
    "Action",
    "Phone",
  ],
  Hard: [
    "Developer",
    "Internet",
    "Football",
    "Graphic",
    "Designer",
    "Developer",
    "datastructure",
    "Javascript",
    "Array",
    "Language",
    "Study",
    "Fan",
    "Chair",
    "impossible",
    "Facebook",
    "Laptop",
    "Computer",
    "Playstation",
    "Screen",
    "Medicine",
  ],
};
// create levels
let levels = {
  Easy: 7,
  Normal: 5,
  Hard: 3,
};
let levelText = document.querySelector(".lvl");
let secound = document.querySelector(".seconds");
let time = document.querySelector(".time span");
let mainLevel = document.querySelector(".levels");
let selcLevel = document.querySelectorAll(".levels div");
let finalWin = new Audio("win.wav");
let correct = new Audio("right.wav");
let lose = new Audio("lose2.wav");
// default value
let defaultValue = "Normal";
// add second
secound.innerHTML = levels[defaultValue];
// add time value
time.innerHTML = levels[defaultValue];
// add levels
levelText.innerHTML = defaultValue;

let mainArray = allWords[defaultValue];
let change = true;
selcLevel.forEach((e) => {
  e.addEventListener("click", function (lvl) {
    selectLevels(lvl);
  });
});
// create function select levels
function selectLevels(lvl) {
  if (change) {
    selcLevel.forEach((el) => el.classList.remove("active"));
    lvl.currentTarget.classList.add("active");
    defaultValue = lvl.currentTarget.innerHTML;
    levelText.innerHTML = defaultValue;
    secound.innerHTML = levels[defaultValue];
    time.innerHTML = levels[defaultValue];
    mainArray = allWords[defaultValue];
    totalScore.innerHTML = mainArray.length;
  }
}

let upComingWord = document.querySelector(".upcoming-word");
let startBtn = document.querySelector(".start");
let userInput = document.querySelector(".input");
let totalScore = document.querySelector(".score .total");
let currentScore = document.querySelector(".score .got");
let theWord = document.querySelector(".the-word");
let finish = document.querySelector(".finish");
let lastScore = document.querySelector(".last");
// generate upcoming-word
function getWord() {
  upComingWord.innerHTML = "";
  getRandomWord();
  for (let i = 0; i < mainArray.length; i++) {
    let div = document.createElement("div");
    let text = document.createTextNode(mainArray[i]);
    div.appendChild(text);
    upComingWord.appendChild(div);
  }
  startGameBtn();
}

// add score value
currentScore.innerHTML = 0;
totalScore.innerHTML = mainArray.length;

// check local storage
if (localStorage.getItem("score")) {
  lastScore.innerHTML = localStorage.getItem("score");
}
function startGameBtn() {
  // add time count
  time.innerHTML = levels[defaultValue];
  let timeCount = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML == 0) {
      clearInterval(timeCount);
      if (userInput.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
        userInput.value = "";
        currentScore.innerHTML++;
        correct.play();
        if (mainArray.length > 0) {
          getWord();
        } else {
          winShow();
        }
      } else {
        loseShow();
      }
      window.localStorage.setItem(
        "score",
        `${currentScore.innerHTML} From ${totalScore.innerHTML} [ ${defaultValue} Mode ]`
      );
    }
  }, 1000);
}
// function create win text and win sound
function winShow() {
  let span = document.createElement("span");
  let mainDiv = document.createElement("div");
  let spanScore = document.createElement("p");
  spanScore.innerHTML = `Your Score Is <span>${currentScore.innerHTML}</span> From <span>${totalScore.innerHTML}</span>`;
  span.innerHTML = "Congrats";
  span.className = "win";
  mainDiv.appendChild(span);
  mainDiv.appendChild(spanScore);
  finish.appendChild(mainDiv);
  finish.classList.add("active");
  upComingWord.remove();
  userInput.blur();
  setTimeout(() => {
    location.reload();
  }, 3000);
  finalWin.play();
}
// function create lose text and lose sound
function loseShow() {
  let span = document.createElement("span");
  let txt = document.createTextNode("Game Over");
  let spanScore = document.createElement("p");
  let mainDiv = document.createElement("div");
  spanScore.innerHTML = `Your Score Is <span>${currentScore.innerHTML}</span> From <span>${totalScore.innerHTML}</span>`;
  span.className = "lose";
  span.appendChild(txt);
  mainDiv.appendChild(span);
  mainDiv.appendChild(spanScore);
  userInput.blur();
  // span.appendChild(scoreText);
  finish.appendChild(mainDiv);
  finish.classList.add("active");
  lose.play();
  setTimeout(() => {
    location.reload();
  }, 2000);
}

// start get random word function
function getRandomWord() {
  let randomWord = mainArray[Math.floor(Math.random() * mainArray.length)];
  mainArray.splice(mainArray.indexOf(randomWord), 1);
  theWord.innerHTML = randomWord;
}

startBtn.addEventListener("click", function () {
  getWord();
  this.remove();
  userInput.focus();
  userInput.value = "";
  // mainLevel.remove();
  change = false;
});

// display userPaste on input
userInput.onpaste = function () {
  return false;
};
