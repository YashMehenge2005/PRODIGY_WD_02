let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

// Sound effect for lap
const lapSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');

function updateDisplay(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('running');
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('running');
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('running');
    isRunning = false;
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.insertBefore(lapItem, lapsList.firstChild);
        lapSound.play();
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

updateDisplay(elapsedTime); 