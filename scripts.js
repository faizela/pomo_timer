let timer;
let sessions;
let isRunning = false;
let breakStart = false
let timeLeft = 25 * 60;
let smallbreakLeft = 5 * 60
let longbreakLeft = 15 * 60
const timer_display =  document.getElementById('timer-display')
const Start_btn = document.getElementById('Start_btn')
const Pause_btn = document.getElementById('Pause_btn')
const Reset_btn = document.getElementById('Reset_btn')
const pizzatimeMsg = document.createElement('p')
const timer_container = document.getElementById('timer_container')

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer_display.textContent = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function smallbreakDisplay () {
    const minutes = Math.floor(smallbreakLeft / 60);
    const seconds = smallbreakLeft % 60;
    pizzatimeMsg.innerText = "Pizza time - Take a break and relax :)"
    timer_container.appendChild(pizzatimeMsg)
    timer_display.textContent = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}



function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
                sessions++
                }
            else {
                clearInterval(timer)
                isRunning = false;
                breakTimer()
            }
               
        }, 1000);
    }
}

function breakTimer() {
        breakStart = true;
        timer = setInterval(() => {
            if (smallbreakLeft > 0) {
                smallbreakLeft--;
                smallbreakDisplay();
            } else {
                clearInterval(timer);
                breakStart = false;
               

                // alert("Time's up!");
            }
        }, 1000);
    }

// if (sessions <= 5) {
//     smallbreakDisplay()
// }

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60; // Reset to 25 minutes
    updateDisplay();
}


Start_btn.addEventListener('click', startTimer)
Pause_btn.addEventListener('click', pauseTimer)
Reset_btn.addEventListener('click', resetTimer)
updateDisplay()