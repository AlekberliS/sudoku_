//! Sudoku game:
let selectedNumber = null;
let errorCount = 1;

let solve = [
  "316578492",
  "529134768 ",
  "487629531",
  "263415987",
  "974863125",
  "851792643",
  "138947256",
  "692351874",
  "745286319 ",
];

let problem = [
  "31-57-492",
  "52--347-8 ",
  "4-76-9--1",
  "2-34--98-",
  "--4-63--5",
  "8-1-9-6--",
  "1--94-25-",
  "6-235---4",
  "-45---3-9 ",
];

let countdownTime = 45; 


function startTimer() {
    const timerElement = document.getElementById("timer");


    let interval = setInterval(function () {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;

      
        timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (countdownTime <= 0) {
            clearInterval(interval);
            timerElement.innerText = "Time's up!";
           
          
        } else {
            countdownTime--;
        }
    }, 1000);
}


window.onload = function () {
  startGame();
  startTimer();
};




function startGame() {
  // Digit created
  for (let num = 1; num <= 9; num++) {
    let div = document.createElement("div");
    div.classList.add("number");
    div.innerText = num;
    div.addEventListener("click", numberSelect);
    document.querySelector(".numbers").append(div);
  }

  // board column and row created
  for (let r = 1; r <= 9; r++) {
    for (let c = 1; c <= 9; c++) {
      let div = document.createElement("div");
      div.id = r.toString() + "-" + c.toString();
      div.classList.add("box");
      if (problem[r - 1][c - 1] != "-") {
        div.innerText = problem[r - 1][c - 1];
        div.classList.add("start");
      }
      div.addEventListener("click", writeNumber);

      if (r == 3 || r == 6) {
        div.classList.add("column");
      }
      if (c == 3 || c == 6) {
        div.classList.add("row");
      }

      document.querySelector("#board").append(div);
    }
  }
}

function numberSelect() {
  // e.target => this
  document
    .querySelectorAll(".number")
    .forEach((item) => item.classList.remove("active"));
  selectedNumber = this.textContent;
  this.classList.add("active");
}

function writeNumber() {
  if (selectedNumber) {
    console.log(this.id);
    if (this.innerText != "") {
      return;
    }

    let coords = this.id.split("-");
    let r = coords[0] - 1;
    let c = coords[1] - 1;

    if (solve[r][c] == selectedNumber) {
      this.innerText = selectedNumber;
    } else {
      document.querySelector(".error-count").innerHTML = errorCount;
      if (errorCount == 3) {
       
        let modal = document.createElement("div");
        modal.className = "modal__over";
        modal.innerText = "Game Over!"
        document.body.appendChild(modal);
        setTimeout(function () {
            window.location.href = "http://127.0.0.1:5500/index.html";
        },2000)
      
      }
      errorCount++;
    }
  }
}
