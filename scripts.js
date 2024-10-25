let timer;
let sessions = 0
let isRunning = false;


let timeLeft = 25 * 60
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



function breakDisplay() {
    if (sessions === 5) {
    const minutes = Math.floor(longbreakLeft / 60);
    const seconds = longbreakLeft % 60;
    pizzatimeMsg.innerText = "Enjoy this long break. Take a walk or something :)"
    timer_container.appendChild(pizzatimeMsg)
    timer_display.textContent = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } 
    else {
        const minutes = Math.floor(smallbreakLeft / 60);
        const seconds = smallbreakLeft % 60;
        pizzatimeMsg.innerText = "Pizza time - Take a break and relax :)"
        timer_container.appendChild(pizzatimeMsg)
        timer_display.textContent = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}


function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();

                }
            else {
                clearInterval(timer)
                isRunning = false;
                sessions += 1
                if (sessions === 5) {
                    longbreakTimer()
                    sessions = 0
                }
                else {
                breakTimer()
                }
            }
               
        }, 1000);
    }
}

function breakTimer() {
        timer = setInterval(() => {
            if (smallbreakLeft > 0) {
                smallbreakLeft--;
                breakDisplay();
            } else {
                clearInterval(timer);;
                isRunning = false
                timeLeft = 25 * 60;
                pizzatimeMsg.innerText = ''
                
               

                // alert("Time's up!");
            }
        }, 1000);
    }




function longbreakTimer() {
    timer = setInterval(() => {
        if (longbreakLeft > 0) {
            longbreakLeft--;
            breakDisplay();
        } else {
            clearInterval(timer);
            isRunning = false
            timeLeft = 25 * 60;
            pizzatimeMsg.innerText = ''
            
           

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